var device_selector = $('#device-selector');
var add_device = $('#add-device');
var device_info = $('#device-info');

var devices = {};

function appendToDeviceSelector(device) {
  const productInfo = 'Product 0x' + ('0000' + device.productId.toString(16)).slice(-4) +
    ' Vendor 0x' + ('0000' + device.vendorId.toString(16)).slice(-4);
  device_selector.append($("<option></option>")
    .attr("value",device.device)
    .text(productInfo));
};

function appendDeviceInfo(name, value) {
  var el = document.createElement('b');
  el.textContent = name + ': '
  device_info[0].appendChild(el);
  device_info[0].appendChild(document.createTextNode(value));
  device_info[0].appendChild(document.createElement('br'));
}

function populateDeviceInfo(handle, callback) {
  chrome.usb.getConfiguration(handle, function(config) {
    if (chrome.runtime.lastError != undefined) {
      var el = document.createElement('em');
      el.textContent = 'Failed to read device configuration: ' +
          chrome.runtime.lastError.message;
      device_info[0].appendChild(el);
    } else {
      var el = document.createElement('h2');
      el.textContent = 'Configuration ' + config.configurationValue;
      device_info[0].appendChild(el);

      for (var iface of config.interfaces) {
        el = document.createElement('h3');
        el.textContent = 'Interface ' + iface.interfaceNumber;
        device_info[0].appendChild(el);

        appendDeviceInfo('Alternate Setting', iface.alternateSetting);
        appendDeviceInfo('Inteface Class', iface.interfaceClass);
        appendDeviceInfo('Interface Subclass', iface.interfaceSubclass);
        appendDeviceInfo('Interface Protocol', iface.interfaceProtocol);

        for (var endpoint of iface.endpoints) {
          el = document.createElement('h4');
          el.textContent = 'Endpoint ' + endpoint.address;
          device_info[0].appendChild(el);

          appendDeviceInfo('Type', endpoint.type);
          appendDeviceInfo('Direction', endpoint.direction);
          appendDeviceInfo('Maximum Packet Size', endpoint.maximumPacketSize);
        }
      }
    }

    callback();
  });
}

function deviceSelectionChanged() {
  device_info[0].innerHTML = "";

  var index = device_selector[0].selectedIndex;
  if (index == -1) {
    var el = document.createElement('em');
    el.textContent = 'No device selected.';
    device_info[0].appendChild(el);
  } else {
    var device = devices[device_selector[0].options.item(index).value];

    appendDeviceInfo(
        'Product ID',
        '0x' + ('0000' + device.productId.toString(16)).slice(-4));
    appendDeviceInfo(
        'Vendor ID',
        '0x' + ('0000' + device.vendorId.toString(16)).slice(-4));

    chrome.usb.openDevice(device, function(handle) {
      if (chrome.runtime.lastError != undefined) {
        var el = document.createElement('em');
        el.textContent = 'Failed to open device: ' +
            chrome.runtime.lastError.message;
        device_info[0].appendChild(el);
      } else {
        populateDeviceInfo(handle, function () {
          chrome.usb.closeDevice(handle);
        });
      }
    });
  }
}

chrome.usb.getDevices({}, function(found_devices) {
  if (chrome.runtime.lastError != undefined) {
    console.warn('chrome.usb.getDevices error: ' +
                 chrome.runtime.lastError.message);
    return;
  }

  for (var device of found_devices) {
    devices[device.device] = device;
    appendToDeviceSelector(device);
  }
});

if (chrome.usb.onDeviceAdded) {
  chrome.usb.onDeviceAdded.addListener(function (device) {
    devices[device.device] = device;
    appendToDeviceSelector(device);
  });
}

if (chrome.usb.onDeviceRemoved) {
  chrome.usb.onDeviceRemoved.addListener(function (device) {
    delete devices[device.device];
    for (var i = 0; i < device_selector[0].length; ++i) {
      if (device_selector[0].options.item(i).value == device.device) {
        device_selector[0].remove(i);
        deviceSelectionChanged();
        break;
      }
    }
  });
}

add_device.click(function() {
  chrome.usb.getUserSelectedDevices({
    'multiple': false
  }, function(selected_devices) {
    if (chrome.runtime.lastError != undefined) {
      console.warn('chrome.usb.getUserSelectedDevices error: ' +
                   chrome.runtime.lastError.message);
      return;
    }

    for (var device of selected_devices) {
      var deviceInfo = { 'device': device, 'index': undefined };
      if (device.device in devices) {
        for (var i = 0; i < device_selector[0].length; ++i) {
          if (device_selector[0].options.item(i).value == device.device) {
            device_selector[0].selectedIndex = i;
            break;
          }
        }
      } else {
        devices[device.device] = device;
        appendToDeviceSelector(device);
        device_selector[0].selectedIndex = device_selector[0].options.length - 1;
      }
      deviceSelectionChanged();
    }
  });
});

device_selector.change(deviceSelectionChanged);

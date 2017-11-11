var device_info = $('#device-info');

var app = angular.module("view-usb", []);

app.controller('DeviceListController', function($scope, $timeout) {
  $scope.ListName = "Devices";
  $scope.UsbDevices = [];
  $scope.FindDevice = function() {
    chrome.usb.getUserSelectedDevices({
      'multiple': false
    }, function(selected_devices) {
      if (chrome.runtime.lastError != undefined) {
        console.warn('chrome.usb.getUserSelectedDevices error: ' +
                     chrome.runtime.lastError.message);
        return;
      }
      for (var device of selected_devices) {
        if (device.device in $scope.UsbDevices) {
          console.log("[in]device -> " + device.device + "desp" + device.productId.toString());
        } else {
          $scope.UsbDevices.push(device);
          console.log("[new]device -> " + device.device + "desp" + device.productId.toString());
        }
      }
      $timeout(function() {
        $scope.selectedDevice = device;    
      }, 0);
    });

    if (chrome.usb.onDeviceRemoved) {
      chrome.usb.onDeviceRemoved.addListener(function (device) {
        for (var i = 0; i < $scope.UsbDevices.length; ++i) {
          if ($scope.UsbDevices[i].device == device.device) {
            $scope.UsbDevices.splice(i, 1);
            $timeout(function() {
              $scope.selectedDevice = null;    
            }, 0);
            break;
          }
        }
      });
    }
  },
  $scope.DeviceInfo = function() {
    device_info[0].innerHTML = "";
    console.log($scope.selectedDevice);
    if( $scope.selectedDevice == undefined ||
        $scope.selectedDevice == null) {
      var el = document.createElement('em');
      el.textContent = "No device selected.";
      device_info[0].appendChild(el);
      return;
    } 
    appendDeviceInfo(
        'Product ID',
        '0x' + ('0000' + $scope.selectedDevice.productId.toString(16)).slice(-4));
    appendDeviceInfo(
        'Vendor ID',
        '0x' + ('0000' + $scope.selectedDevice.vendorId.toString(16)).slice(-4));

    chrome.usb.openDevice($scope.selectedDevice, function(handle) {
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
});

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
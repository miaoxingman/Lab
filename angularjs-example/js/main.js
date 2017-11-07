var app = angular.module('myApp', []);
var apiKey = 'MDExODQ2OTg4MDEzNzQ5OTM4Nzg5MzFiZA001';
var  nprUrl = 'http://api.npr.org/query?id=61&fields=relatedLink,title,byline,text,audio,image,pullQuote,all&output=JSON';
console.log("loaded");

app.directive('nprLink', function() {
    return {
        restrict: "EA",
        require: ['^ngModel'],
        replace: true,
        scope: {
            ngModel: '=',
            play: '&'
        },
        templateUrl: "views/nprListItem.html",
        link: function(scope, ele, attr) {
            scope.duration = scope.ngModel.audio[0].duration.$text;
        }
    }
});

app.controller('PlayerController', ['$scope', '$http', function($scope, $http) {
    var audio = document.createElement('audio');
    $scope.audio = audio;
    //audio.src = 'http://pd.npr.org/npr-mp4/npr/sf/2013/07/20130726_sf_05.mp4?orgId=1&topicId=1032&ft=3&f=61';
    //audio.play();
    $scope.play = function(program) {
        if($scope.playing)
            audio.pause();
        var url = program.audio[0].format.mp4.$text;
        audio.src = url;
        audio.play;
        $scope.playing = true;
    }
    $http({
        method : "JSONP",
        url : nprUrl + '&apiKey=' + apiKey + '&callback=JSON_CALLBACK'
    }).success(function(data, status) {
        $scope.programs = data.list.story;
        console.log("return data" + data);
    }).error(function(data, status) {
        console.log("get data error");
    });
}]);

app.controller('RelatedController', ['$scope', function($scope) {
}]);

app.controller('FrameController', ['$scope', function($scope) {
}]);
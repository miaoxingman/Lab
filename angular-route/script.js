
var myApp = angular.module('myApp', ['ngRoute', 'ngAnimate']);
console.log("test")
myApp.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl : "/template/page-home.html",
        controller  : "mainController"
    })
    .when('/about', {
        templateUrl : '/template/page-about.html',
        controller  : 'aboutController'
    })
    .when('/contact', {
        templateUrl : "/template/page-contact.html",
        controller  : "contactController"
    });
});
console.log("done")
myApp.controller("mainController", ['$scope', function($scope) {
    $scope.pageClass = "page-home";
}]);
console.log("done1")
myApp.controller('aboutController', function($scope) {
    $scope.pageClass = "page-about";
});

console.log("done2")
myApp.controller('contactController', function($scope) {
    $scope.pageClass = "page-contact";
});
console.log("done3")




































var myApp = angular.module('myApp', ['ngRoute', 'ngAnimate']);

myApp.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl : "template/page-home.html",
        controller  : "mainController"
    })
    .when('/about', {
        templateUrl : 'template/page-about.html',
        controller  : 'aboutController'
    })
    .when('/contact', {
        templateUrl : "template/page-contact.html",
        controller  : "contactController"
    });
});

myApp.controller("mainController", ['$scope', function($scope) {
    $scope.pageClass = "page-home";
}]);

myApp.controller('aboutController', function($scope) {
    $scope.pageClass = "page-about";
});

myApp.controller('contactController', function($scope) {
    $scope.pageClass = "page-contact";
});

myApp.run(['$rootScope', '$location', function($rootScope, $location) {
    $rootScope.$on('$locationChangeStart', function locationChangeStart(event) {
        console.log(event.name);
    });
    $rootScope.$on('$locationChangeSuccess', function locationChangeSuccess(event) {
        console.log(event.name);
    });
    $rootScope.$on('$routeChangeStart', function routeChangeStart(event) {
        console.log(event.name);
    });
    $rootScope.$on('$routeChangeSuccess', function routeChangeSuccess(event) {
        console.log(event.name);
    });

}]);



































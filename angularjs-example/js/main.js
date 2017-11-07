var app = angular.module('myApp', []);
console.log("loaded");

app.run(function($rootScope) {
    $rootScope.name = "ari lerner";
    console.log("app.run");
});
'use strict';
/* userControllers */

var userControllers = angular.module('userControllers', []);

userControllers.controller('indexCtrl', function ($scope, $routeParams, $rootScope, $http, $location, $window) {

    $scope.requiresLogin = false;

});

userControllers.controller('smsCtrl', function ($scope, $routeParams, $rootScope, $http, $location, $window) {

    $scope.requiresLogin = false;

});

userControllers.controller('loginCtrl', function ($scope, $routeParams, $rootScope, $http, $location, $window) {

    $scope.requiresLogin = false;

});

userControllers.controller('profileCtrl', function ($scope, $routeParams, $rootScope, $http, $location, $window) {

    $scope.requiresLogin = true;

});

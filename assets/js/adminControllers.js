'use strict';
/* adminControllers */

var adminControllers = angular.module('adminControllers', []);

adminControllers.controller('adminLoginCtrl', function ($scope, $routeParams, $rootScope, $http, $location) {

    $scope.login = function (users) {

        var credentials = {
            username: $scope.username,
            password: $scope.password
        };

        $http.post($rootScope.STATIC_URL + 'admins/adminLogin', credentials).success(function (response) {
            if (response.status)
            {
                $location.path('/index');
            } else {
                $scope.invalidlogin = true;
            }
            console.log(response);
        }).error(function (err) {
            console.log("failure");
        });

    }

});


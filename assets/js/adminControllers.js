'use strict';
/* adminControllers */

var adminControllers = angular.module('adminControllers', ['appServices']);

adminControllers.controller('adminLoginCtrl', function ($scope, $routeParams, $rootScope, $http, $location, $window, AuthenticationService) {

    $rootScope.adminNavigation = 0;

    $scope.loginSubmit = function () {

        var username = $scope.username;
        var password = $scope.password;
        var params = {
            username: username,
            password: password
        };

        if (username && password) {
            $http.post('admins/adminLogin', params).success(function (response) {

                if (response.status === 1) {
                    AuthenticationService.isAuthenticated = true;
                    $window.sessionStorage.isAuthenticated = 'true';
                    $window.sessionStorage.token = response.data.token.token;
                    $location.path('/admin/dashboard');
                } else {
                    $scope.login_error_message = "Invalid login credentials";
                }

            }).error(function () {

                console.log("EROOR _______________");

            });
        } else if (username) {
            $scope.login_error_message = "Please Enter the password";
        } else if (password) {
            $scope.login_error_message = "Please Enter the Username";
        } else {
            $scope.login_error_message = "All fields are mandatory";
        }
    };

    $scope.adminLogout = function () {
//        if (AuthenticationService.isAuthenticated) {
//            AuthenticationService.isAuthenticated = false;
//            $window.sessionStorage.isAuthenticated = 'false';
//            delete $window.sessionStorage.token;
//            $location.path("/admin.login");
//        }
    };

});


adminControllers.controller('adminDashboardCtrl', function ($scope, $routeParams, $rootScope, $http, $location, $window) {

    $rootScope.adminNavigation = 1;


});

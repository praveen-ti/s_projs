'use strict';
/* adminControllers */

var adminControllers = angular.module('adminControllers', []);

adminControllers.controller('adminLoginCtrl', function ($scope, $routeParams, $rootScope, $http, $location, $window) {


     $scope.loginSubmit = function() {
            var username = $scope.username;
            var password  = $scope.password;
        var angParams = {
            username: username,
            password: password
        };

        if (username && password) {
            $http.post($rootScope.STATIC_URL+'admins/adminLogin',angParams).success(function(response) {
                            if(response.status == 1)
                            {
                                $window.location.href = '/admin/dashboard';
                            }
                            else if(response.status == 2)
                            {

                                    $scope.login_error_message = response.message;
                                    console.log($scope.login_error_message);
                             }
                             else
                             {
                                    $scope.login_error_message = "Error Occured";
                                    console.log($scope.login_error_message);
                             }

                    }).error(function() {
                               $scope.login_error_message = "Error Occured while Posting";
                    });
        }
        else {
               $scope.login_error_message = "All fields are mandatory";
        }
    };

});


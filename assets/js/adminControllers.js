'use strict';
/* adminControllers */

var adminControllers = angular.module('adminControllers', []);

adminControllers.controller('adminLoginCtrl', function ($scope, $routeParams, $rootScope, $http, $location, $window) {


     $scope.loginSubmit = function() {
            var username = $scope.username;
            var password  = $scope.password;
        var params = {
            username: username,
            password: password
        };
        if (username && password) {
            $http.post('admins/adminLogin',params).success(function(response) {

                                console.log("SUCCESS _______________");

                            if(response.status == 1)
                            {
                                $window.location.href = '/admin/dashboard';
                            }
                            else
                            {
                                $scope.login_error_message = "Invalid login credentials";
                            }

                    }).error(function() {

                        console.log("EROOR _______________");

                    });
        }
        else if(username){
                $scope.login_error_message = "Please Enter the password";
              }
        else if(password){
                $scope.login_error_message = "Please Enter the Username";
              }
        else {
               $scope.login_error_message = "All fields are mandatory";
        }
    };

});


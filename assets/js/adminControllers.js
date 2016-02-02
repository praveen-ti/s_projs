'use strict';
/* adminControllers */

var adminControllers = angular.module('adminControllers', []);

adminControllers.controller('adminLoginCtrl', function ($scope, $routeParams, $rootScope, $http, $location) {


     $scope.loginSubmit = function() {
        var params = {
            username: $scope.username,
            password: $scope.password
        };
        if (username && password) {
            $http.post($rootScope.STATIC_URL + 'admins/adminLogin',params).success(function(data, status, headers, config) {

                                console.log("SUCCESS _______________");
                                /*
                                                if(data.status == 1)
                                                {
                                                    $window.location.href = '/admin/dashboard';
                                                }
                                                else
                                                {
                                                    $scope.login_error_message = "Invalid login credentials";
                                                }
                                 */
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


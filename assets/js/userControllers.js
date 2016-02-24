'use strict';
/* userControllers */

var userControllers = angular.module('userControllers', []);

userControllers.controller('indexCtrl', function ($scope, $routeParams, $rootScope, $http, $location, $window) {

    $scope.requiresLogin = false;

});

userControllers.controller('smsCtrl', function ($scope, $routeParams, $rootScope, $http, $location, $window) {

    $scope.requiresLogin = false;

    $scope.sendSms = function () {

        var to = $scope.to;
        var message = $scope.message;

        var params = {
            to: to,
            message: message
        };

        $http.post($rootScope.STATIC_URL + 'users/smsService', params).success(function (response) {

            if (response.status === 1) {
                console.log('success');
            } else {
                $scope.errorMessage = "Error in sending sms.";
            }

        }).error(function (err) {

            console.log("Error");
            console.log(JSON.stringify(err));

        });

    }

});

userControllers.controller('testtCtrl', function ($scope, $routeParams, $rootScope, $http, $location, $window) {

    $scope.requiresLogin = false;

    $scope.getLocation = function () {
        $scope.htmlContent = "";
        if ($window.navigator.geolocation) {
            $window.navigator.geolocation.getCurrentPosition(showPosition, showError);
        } else {
            $scope.htmlContent = "Geolocation is not supported by this browser.";
        }
    }

    var showPosition = function (position) {

        $scope.$apply(function () {

            $scope.htmlContent = "Latitude: " + position.coords.latitude +
                    ", Longitude: " + position.coords.longitude +
                    ", Accuracy: " + position.coords.accuracy +
                    ", Altitude: " + position.coords.altitude +
                    ", AltitudeAccuracy: " + position.coords.altitudeAccuracy +
                    ", Heading: " + position.coords.heading +
                    ", Speed: " + position.coords.speed +
                    ", Timestamp: " + position.coords.timestamp;
        });
    }

    var showError = function (error) {
        var errorMsg = "";
        switch (error.code) {
            case error.PERMISSION_DENIED:
                errorMsg = "User denied the request for Geolocation."
                break;
            case error.POSITION_UNAVAILABLE:
                errorMsg = "Location information is unavailable."
                break;
            case error.TIMEOUT:
                errorMsg = "The request to get user location timed out."
                break;
            case error.UNKNOWN_ERROR:
                errorMsg = "An unknown error occurred."
                break;
        }
        $scope.$apply(function () {
            $scope.htmlContent = errorMsg;
        });
    }



});

userControllers.controller('loginCtrl', function ($scope, $routeParams, $rootScope, $http, $location, $window) {

    $scope.requiresLogin = false;

    var validateEmail = function (email)
    {
        var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        if (reg.test(email)) {
            return true;
        } else {
            return false;
        }
    }

    $scope.userLogin = function () {

        console.log('userLogin');

        var email = $scope.email;
        var password = $scope.password;
        var params = {
            email: email,
            password: password
        };

        $scope.errorMessage = null;

        if (!email) {

            $scope.errorMessage = "Please enter email.";

        } else if (!validateEmail(email)) {

            $scope.errorMessage = "Please enter correct email format.";

        } else if (!password) {

            $scope.errorMessage = "Please enter password.";

        } else if (validateEmail(email) && password) {

            $http.post($rootScope.STATIC_URL + 'users/userLogin', params).success(function (response) {
                
                if (response.status === 1) {
                    //var a = response.data2
                    $window.sessionStorage.isAuthenticated = 'true';
                    $window.sessionStorage.token = response.data.token.token;
                    $window.sessionStorage.adminType = "user";
                
                    //$location.path('/profile');
                    $window.location.href = "/profile";
                } else {
                    $scope.errorMessage = "Invalid login credentials.";
                }

            }).error(function (err) {

                console.log("ERROR" + err);

            });
        }
    };


});

userControllers.controller('profileCtrl', function ($scope, $routeParams, $rootScope, $http, $location, $window) {

    $scope.requiresLogin = true;

});

/*===================================================================================================================================
    mailboxInboxCtrl
 ====================================================================================================================================*/

userControllers.controller('mailboxInboxCtrl', function ($scope, $routeParams, $rootScope, $http, $location, $window) {

    $rootScope.adminNavigation = 1;
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.errorMessage = "";

    //var adminId = $routeParams.adminId;
    var request = "";
    var token = $window.sessionStorage.token;
    console.log(token);

 });

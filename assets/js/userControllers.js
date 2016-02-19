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

});

userControllers.controller('loginCtrl', function ($scope, $routeParams, $rootScope, $http, $location, $window) {

    $scope.requiresLogin = false;

});

userControllers.controller('profileCtrl', function ($scope, $routeParams, $rootScope, $http, $location, $window) {

    $scope.requiresLogin = true;

});

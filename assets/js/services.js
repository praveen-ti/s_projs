'use strict';

/* Services */

var appServices = angular.module('appServices', []);

appServices.factory('AuthenticationService', function () {
    var auth = {
        isAuthenticated: false
    }
    return auth;
});


appServices.factory('TokenInterceptor', function ($q, $window, $location, AuthenticationService) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
            }
            return config;
        },
        requestError: function (rejection) {
            return $q.reject(rejection);
        },
        /* Set Authentication.isAuthenticated to true if 200 received */
        response: function (response) {
            if (response != null && response.status == 1 && $window.sessionStorage.token && $window.sessionStorage.isAuthenticated === 'false') {
                //AuthenticationService.isAuthenticated = true;
                $window.sessionStorage.isAuthenticated = 'true';
            }
            return response || $q.when(response);
        },
        /* Revoke client authentication if 401 is received */
        responseError: function (rejection) {
            if (rejection != null && rejection.status === 2 && ($window.sessionStorage.token || $window.sessionStorage.isAuthenticated === 'true')) {
                delete $window.sessionStorage.token;
                //AuthenticationService.isAuthenticated = false;
                $window.sessionStorage.isAuthenticated = 'false';
                $location.path("/admin/login");
            }

            return $q.reject(rejection);
        }
    };
});

'use strict';

var zentiera = angular.module('zentiera', ['userControllers', 'adminControllers', 'appServices']);


zentiera.config(function ($httpProvider) {
    $httpProvider.interceptors.push('TokenInterceptor');
});


zentiera.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

        $locationProvider.html5Mode(true);
        $routeProvider.
                when('/', {
                    templateUrl: 'templates/index.html',
                    //controller: 'loginCtrl',
                    access: {
                        requiresLogin: false,
                        role: 'user'
                    }
                }).
                when('/index', {
                    templateUrl: 'templates/index.html',
                    controller: 'indexCtrl',
                    access: {
                        requiresLogin: false,
                        role: 'user'
                    }
                }).
                when('/login', {
                    templateUrl: 'templates/login.html',
                    controller: 'loginCtrl',
                    access: {
                        requiresLogin: false,
                        role: 'user'
                    }
                }).
                when('/profile', {
                    templateUrl: 'templates/profile.html',
                    controller: 'profileCtrl',
                    access: {
                        requiresLogin: true,
                        role: 'user'
                    }
                }).
                when('/admin', {
                    templateUrl: 'templates/admin/login.html',
                    controller: 'adminLoginCtrl',
                    access: {
                        requiresLogin: false,
                        role: 'admin'
                    }
                }).
                when('/admin/login', {
                    templateUrl: 'templates/admin/login.html',
                    controller: 'adminLoginCtrl',
                    access: {
                        requiresLogin: false,
                        role: 'admin'
                    }
                }).
                when('/admin/dashboard', {
                    templateUrl: 'templates/admin/dashboard.html',
                    controller: 'adminDashboardCtrl',
                    access: {
                        requiresLogin: true,
                        role: 'admin'
                    }
                }).
                otherwise({
                    redirectTo: '/'
                });
    }
]);


zentiera.run(function ($rootScope, $location, $http, $window, AuthenticationService) {

    $rootScope.STATIC_URL = $location.protocol() + '://' + $location.host() + ':' + $location.port() + '/';
    //$rootScope.STATIC_URL = "http://localhost:2000/";

    $rootScope.$on("$routeChangeStart", function (event, nextRoute, currentRoute) {

        if (angular.isUndefined($window.sessionStorage.isAuthenticated)) {
            $window.sessionStorage.isAuthenticated = 'false';
        }

        //console.log('$window.sessionStorage.isAuthenticated');
        //console.log(nextRoute.access.requiresLogin);
        //console.log($window.sessionStorage.isAuthenticated);
        //console.log(angular.isUndefined($window.sessionStorage.token));

        if (nextRoute.access.requiresLogin && ($window.sessionStorage.isAuthenticated === 'false') && angular.isUndefined($window.sessionStorage.token)) {
            console.log('ee');
            if (nextRoute.access.role === 'user') {
                $location.path("/login");
            } else {
                $location.path("/admin/login");
                $rootScope.adminNavigation = 0;
            }
            //$window.location.href = "/admin/login";

        } else {

            if (nextRoute.access.role === 'user') {

            } else {
                $location.path("/admin/dashboard");
                $rootScope.adminNavigation = 1;
            }
            console.log('hh');
        }

    });
//    $rootScope.logOut = function () {
//
//        UserService.logOut().success(function (data) {
//            $window.sessionStorage.uid = 0;
//            $window.sessionStorage.isAuthenticated = "false";
//            $window.sessionStorage.removeItem('currentUser');
//            $location.path("/test");
//        }).error(function (status, data) {
//            console.log(status);
//            //console.log(data);
//        });
//    }
//
//    $rootScope.isLogged = function () {
//        return $window.sessionStorage.isAuthenticated;
//    }


});

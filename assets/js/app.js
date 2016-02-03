'use strict';

var zentiera = angular.module('zentiera', ['adminControllers']);

zentiera.config(['$routeProvider', '$locationProvider',

    function ($routeProvider, $locationProvider) {

        $locationProvider.html5Mode(true);

        $routeProvider.
                when('/', {
                    templateUrl: 'templates/index.html'
                            //controller: 'loginCtrl'
                }).
                when('/login', {
                    templateUrl: 'templates/login.html'
                            //controller: 'loginCtrl'
                }).
                when('/admin', {
                    templateUrl: 'templates/admin/login.html',
                    controller: 'adminLoginCtrl'
                }).
                when('/admin/login', {
                    templateUrl: 'templates/admin/login.html',
                    controller: 'adminLoginCtrl'
                }).
                when('/admin/dashboard', {
                    templateUrl: 'templates/admin/dashboard.html',
                    //controller: 'adminController'
                }).
                when('/admin/manageSubAdmin', {
                    templateUrl: 'templates/admin/manageSubAdmin.html',
                    controller: 'manageSubAdminController'
                }).
                otherwise({
                    redirectTo: '/'
                });

    }
]);

zentiera.run(function ($rootScope, $location, $http, $window) {

    $rootScope.STATIC_URL = $location.protocol()+"://"+$location.host()+":"+$location.port()+"/";

    console.log($rootScope.STATIC_URL);
    //$rootScope.STATIC_URL = "http://localhost:2000/";

//    if (angular.isUndefined($window.sessionStorage.isAuthenticated) || angular.isUndefined(($window.sessionStorage.uid))) {
//        $window.sessionStorage.uid = 0;
//        $window.sessionStorage.isAuthenticated = "false";
//    }
//
//    $rootScope.$on("$routeChangeStart", function (event, nextRoute, currentRoute) {
//
//        if ($window.sessionStorage.isAuthenticated == "true") {
//            $rootScope.currentUser = CurrentUserService.getCurrentUserData();
//        }
//
//        if ((nextRoute.access.requiredLogin && ($window.sessionStorage.isAuthenticated == "false")) || angular.isUndefined($window.sessionStorage.isAuthenticated)) {
//            $location.path("/test");
//        }
//
//    });

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

'use strict';

var zentieraApp = angular.module('zentieraApp', []);
zentieraApp.config(['$routeProvider', '$locationProvider',
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
                    //controller: 'adminController'
                }).
                when('/admin/login', {
                    templateUrl: 'templates/admin/login.html',
                    //controller: 'adminController'
                }).
                otherwise({
                    redirectTo: '/'
                });

    }
]);
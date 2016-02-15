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
                when('/sms', {
                    templateUrl: 'templates/sms.html',
                    controller: 'smsCtrl',
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
                        role: 'admin',
                        page: 'login'
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
                when('/admin/package', {
                    templateUrl: 'templates/admin/package.html',
                    controller: 'adminPackageCtrl',
                    access: {
                        requiresLogin: true,
                        role: 'admin'
                    }
                }).
                when('/admin/members', {
                    templateUrl: 'templates/admin/members.html',
                    controller: 'adminMembersCtrl',
                    access: {
                        requiresLogin: true,
                        role: 'admin'
                    }
                }).
                when('/admin/member/:id', {
                    templateUrl: 'templates/admin/memberInfo.html',
                    controller: 'adminMemberInfoCtrl',
                    access: {
                        requiresLogin: true,
                        role: 'admin'
                    }
                }).
                when('/admin/member/:id/review', {
                    templateUrl: 'templates/admin/memberReview.html',
                    controller: 'adminMemberReviewCtrl',
                    access: {
                        requiresLogin: true,
                        role: 'admin'
                    }
                }).
                when('/admin/member/:id/subscription', {
                    templateUrl: 'templates/admin/memberSubscription.html',
                    controller: 'adminMemberSubscriptionCtrl',
                    access: {
                        requiresLogin: true,
                        role: 'admin'
                    }
                }).
                when('/admin/member/:id/referral', {
                    templateUrl: 'templates/admin/memberReferral.html',
                    controller: 'adminMemberReferralCtrl',
                    access: {
                        requiresLogin: true,
                        role: 'admin'
                    }
                }).
                when('/admin/member/:id/photo', {
                    templateUrl: 'templates/admin/memberPhoto.html',
                    controller: 'adminMemberPhotoCtrl',
                    access: {
                        requiresLogin: true,
                        role: 'admin'
                    }
                }).
                when('/admin/member/:id/video', {
                    templateUrl: 'templates/admin/memberVideo.html',
                    controller: 'adminMemberVideoCtrl',
                    access: {
                        requiresLogin: true,
                        role: 'admin'
                    }
                }).
                when('/admin/manageSubAdmin', {
                    templateUrl: 'templates/admin/manageSubAdmin.html',
                    controller: 'manageSubAdminCtrl',
                    access: {
                        requiresLogin: true,
                        role: 'admin'
                    }
                }).
                 when('/admin/manageSubAdmin/subAdmin/:adminId', {
                     templateUrl: 'templates/admin/subAdminDetails.html',
                     controller: 'subAdminDetailsCtrl',
                     access: {
                        requiresLogin: true,
                        role: 'admin'
                    }
                }).
                when('/admin/Privileges', {
                    templateUrl: 'templates/admin/privileges.html',
                    controller: 'privilegesCtrl',
                    access: {
                        requiresLogin: true,
                        role: 'admin'
                    }
                }).
                when('/admin/Settings', {
                    templateUrl: 'templates/admin/settings.html',
                    controller: 'settingsCtrl',
                    access: {
                        requiresLogin: true,
                        role: 'admin'
                    }
                }).
                 when('/admin/manageCmsPage', {
                    templateUrl: 'templates/admin/manageCmsPage.html',
                    controller: 'manageCmsPageCtrl',
                    access: {
                        requiresLogin: true,
                        role: 'admin'
                    }
                }).
                 when('/admin/manageCmsPage/:cmsPageId', {
                     templateUrl: 'templates/admin/cmsPageDetails.html',
                     controller: 'cmsPageDetailsCtrl',
                     access: {
                        requiresLogin: true,
                        role: 'admin'
                    }
                }).
                 when('/admin/manageAdvertisement/page', {
                     templateUrl: 'templates/admin/manageAdPage.html',
                     controller: 'manageAdPageCtrl',
                     access: {
                        requiresLogin: true,
                        role: 'admin'
                    }
                }).
                when('/admin/manageAdvertisement/position', {
                     templateUrl: 'templates/admin/manageAdPosition.html',
                     controller: 'manageAdPositionCtrl',
                     access: {
                        requiresLogin: true,
                        role: 'admin'
                    }
                }).
                when('/admin/manageAdvertisement/userAdList', {
                     templateUrl: 'templates/admin/manageAdUser.html',
                     controller: 'manageAdUserCtrl',
                     access: {
                        requiresLogin: true,
                        role: 'admin'
                    }
                }).
                when('/admin/manageAdvertisement/ad/:userAdId', {
                     templateUrl: 'templates/admin/adUserDetails.html',
                     controller: 'adUserDetailsCtrl',
                     access: {
                        requiresLogin: true,
                        role: 'admin'
                    }
                }).
                 when('/admin/blog/list', {
                     templateUrl: 'templates/admin/manageBlog.html',
                     controller: 'manageBlogCtrl',
                     access: {
                        requiresLogin: true,
                        role: 'admin'
                    }
                }).
                when('/admin/blog/:blogId', {
                     templateUrl: 'templates/admin/blogDetails.html',
                     controller: 'blogDetailsCtrl',
                     access: {
                        requiresLogin: true,
                        role: 'admin'
                    }
                }).
                 when('/admin/blog/comments/:blogId', {
                     templateUrl: 'templates/admin/blogComments.html',
                     controller: 'blogCommentsCtrl',
                     access: {
                        requiresLogin: true,
                        role: 'admin'
                    }
                }).
                when('/admin/poll/list', {
                     templateUrl: 'templates/admin/managePoll.html',
                     controller: 'managePollCtrl',
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
    
    if (angular.isUndefined($window.sessionStorage.isAuthenticated)) {
        $window.sessionStorage.isAuthenticated = 'false';
    }

    $rootScope.$on("$routeChangeStart", function (event, nextRoute, currentRoute) {

        //if (angular.isUndefined($window.sessionStorage.isAuthenticated)) {
        //    $window.sessionStorage.isAuthenticated = 'false';
        //}

        //console.log('$window.sessionStorage.isAuthenticated');
        //console.log(nextRoute.access.requiresLogin);
        //console.log($window.sessionStorage.isAuthenticated);
        //console.log(angular.isUndefined($window.sessionStorage.token));

        if (nextRoute.access.requiresLogin && ($window.sessionStorage.isAuthenticated === 'false') && angular.isUndefined($window.sessionStorage.token)) {
            console.log('Logged - No');
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
                console.log('Logged - Yes, Role - Admin');
                $rootScope.adminNavigation = 1;
            }
            console.log('Logged - Yes');
        }

    });

    $rootScope.adminLogout = function () {

         var angParams = {
                token: $window.sessionStorage.token
            };
        $http.post($rootScope.STATIC_URL + 'admins/adminLogout', angParams).success(function (response) {

            if (response.status === 1) {
                $window.sessionStorage.isAuthenticated = 'false';
                delete $window.sessionStorage.token;
                $location.path('/admin/login');
            } else {
                $scope.login_error_message = "Invalid login credentials";
            }

        }).error(function () {

            console.log("EROOR - Admin logout.");

        });

    };


});

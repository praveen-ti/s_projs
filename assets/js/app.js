'use strict';
//var fitHudl = angular.module('fitHudl', ['ngRoute','textAngular']);
var zentiera = angular.module('zentiera', ['ngRoute', 'userControllers', 'adminControllers', 'appServices', 'textAngular']);


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
                        clientSide: 'USER'
                    }
                }).
                when('/index', {
                    templateUrl: 'templates/index.html',
                    controller: 'indexCtrl',
                    access: {
                        requiresLogin: false,
                        clientSide: 'USER'
                    }
                }).
                when('/sms', {
                    templateUrl: 'templates/sms.html',
                    controller: 'smsCtrl',
                    access: {
                        requiresLogin: false,
                        clientSide: 'USER'
                    }
                }).
                when('/testing', {
                    templateUrl: 'templates/test.html',
                    controller: 'testtCtrl',
                    access: {
                        requiresLogin: false,
                        clientSide: 'USER'
                    }
                }).
                when('/login', {
                    templateUrl: 'templates/login.html',
                    controller: 'loginCtrl',
                    access: {
                        requiresLogin: false,
                        clientSide: 'USER'
                    }
                }).
                when('/profile', {
                    templateUrl: 'templates/profile.html',
                    controller: 'profileCtrl',
                    access: {
                        requiresLogin: true,
                        clientSide: 'USER'
                    }
                }).
                when('/admin', {
                    templateUrl: 'templates/admin/login.html',
                    controller: 'adminLoginCtrl',
                    access: {
                        requiresLogin: false,
                        clientSide: 'ADMIN',
                        page: 'login'
                    }
                }).
                when('/admin/login', {
                    templateUrl: 'templates/admin/login.html',
                    controller: 'adminLoginCtrl',
                    access: {
                        requiresLogin: false,
                        clientSide: 'ADMIN'
                    }
                }).
                when('/admin/dashboard', {
                    templateUrl: 'templates/admin/dashboard.html',
                    controller: 'adminDashboardCtrl',
                    access: {
                        requiresLogin: true,
                        clientSide: 'ADMIN'
                    }
                }).
                when('/admin/package', {
                    templateUrl: 'templates/admin/package.html',
                    controller: 'adminPackageCtrl',
                    access: {
                        requiresLogin: true,
                        clientSide: 'ADMIN'
                    }
                }).
                when('/admin/members', {
                    templateUrl: 'templates/admin/members.html',
                    controller: 'adminMembersCtrl',
                    access: {
                        requiresLogin: true,
                        clientSide: 'ADMIN'
                    }
                }).
                when('/admin/member/:id', {
                    templateUrl: 'templates/admin/memberInfo.html',
                    controller: 'adminMemberInfoCtrl',
                    access: {
                        requiresLogin: true,
                        clientSide: 'ADMIN'
                    }
                }).
                when('/admin/member/:id/review', {
                    templateUrl: 'templates/admin/memberReview.html',
                    controller: 'adminMemberReviewCtrl',
                    access: {
                        requiresLogin: true,
                        clientSide: 'ADMIN'
                    }
                }).
                when('/admin/member/:id/subscription', {
                    templateUrl: 'templates/admin/memberSubscription.html',
                    controller: 'adminMemberSubscriptionCtrl',
                    access: {
                        requiresLogin: true,
                        clientSide: 'ADMIN'
                    }
                }).
                when('/admin/member/:id/referral', {
                    templateUrl: 'templates/admin/memberReferral.html',
                    controller: 'adminMemberReferralCtrl',
                    access: {
                        requiresLogin: true,
                        clientSide: 'ADMIN'
                    }
                }).
                when('/admin/member/:id/report', {
                    templateUrl: 'templates/admin/memberReport.html',
                    controller: 'adminMemberReportCtrl',
                    access: {
                        requiresLogin: true,
                        clientSide: 'ADMIN'
                    }
                }).
                when('/admin/member/:id/photo', {
                    templateUrl: 'templates/admin/memberPhoto.html',
                    controller: 'adminMemberPhotoCtrl',
                    access: {
                        requiresLogin: true,
                        clientSide: 'ADMIN'
                    }
                }).
                when('/admin/member/:id/video', {
                    templateUrl: 'templates/admin/memberVideo.html',
                    controller: 'adminMemberVideoCtrl',
                    access: {
                        requiresLogin: true,
                        clientSide: 'ADMIN'
                    }
                }).
                when('/admin/manageSubAdmin', {
                    templateUrl: 'templates/admin/manageSubAdmin.html',
                    controller: 'manageSubAdminCtrl',
                    access: {
                        requiresLogin: true,
                        clientSide: 'ADMIN'
                    }
                }).
                when('/admin/manageSubAdmin/subAdmin/:adminId', {
                    templateUrl: 'templates/admin/subAdminDetails.html',
                    controller: 'subAdminDetailsCtrl',
                    access: {
                        requiresLogin: true,
                        clientSide: 'ADMIN'
                    }
                }).
                when('/admin/Privileges', {
                    templateUrl: 'templates/admin/privileges.html',
                    controller: 'privilegesCtrl',
                    access: {
                        requiresLogin: true,
                        clientSide: 'ADMIN'
                    }
                }).
                when('/admin/Settings', {
                    templateUrl: 'templates/admin/settings.html',
                    controller: 'settingsCtrl',
                    access: {
                        requiresLogin: true,
                        clientSide: 'ADMIN'
                    }
                }).
                when('/admin/manageCmsPage', {
                    templateUrl: 'templates/admin/manageCmsPage.html',
                    controller: 'manageCmsPageCtrl',
                    access: {
                        requiresLogin: true,
                        clientSide: 'ADMIN'
                    }
                }).
                when('/admin/manageCmsPage/:cmsPageId', {
                    templateUrl: 'templates/admin/cmsPageDetails.html',
                    controller: 'cmsPageDetailsCtrl',
                    access: {
                        requiresLogin: true,
                        clientSide: 'ADMIN'
                    }
                }).
                when('/admin/manageAdvertisement/page', {
                    templateUrl: 'templates/admin/manageAdPage.html',
                    controller: 'manageAdPageCtrl',
                    access: {
                        requiresLogin: true,
                        clientSide: 'ADMIN'
                    }
                }).
                when('/admin/manageAdvertisement/page/:adPageId/adInPage', {
                    templateUrl: 'templates/admin/adInPage.html',
                    controller: 'adInPageCtrl',
                    access: {
                        requiresLogin: true,
                        clientSide: 'ADMIN'
                    }
                }).
                when('/admin/manageAdvertisement/position', {
                    templateUrl: 'templates/admin/manageAdPosition.html',
                    controller: 'manageAdPositionCtrl',
                    access: {
                        requiresLogin: true,
                        clientSide: 'ADMIN'
                    }
                }).
                when('/admin/manageAdvertisement/position/:adPositionId/adInPosition', {
                    templateUrl: 'templates/admin/adInPosition.html',
                    controller: 'adInPositionCtrl',
                    access: {
                        requiresLogin: true,
                        clientSide: 'ADMIN'
                    }
                }).
                when('/admin/manageAdvertisement/userAdList', {
                    templateUrl: 'templates/admin/manageAdUser.html',
                    controller: 'manageAdUserCtrl',
                    access: {
                        requiresLogin: true,
                        clientSide: 'ADMIN'
                    }
                }).
                when('/admin/manageAdvertisement/ad/:userAdId', {
                    templateUrl: 'templates/admin/adUserDetails.html',
                    controller: 'adUserDetailsCtrl',
                    access: {
                        requiresLogin: true,
                        clientSide: 'ADMIN'
                    }
                }).
                when('/admin/blog/list', {
                    templateUrl: 'templates/admin/manageBlog.html',
                    controller: 'manageBlogCtrl',
                    access: {
                        requiresLogin: true,
                        clientSide: 'ADMIN'
                    }
                }).
                when('/admin/blog/:blogId', {
                    templateUrl: 'templates/admin/blogDetails.html',
                    controller: 'blogDetailsCtrl',
                    access: {
                        requiresLogin: true,
                        clientSide: 'ADMIN'
                    }
                }).
                when('/admin/blog/comments/:blogId', {
                    templateUrl: 'templates/admin/blogComments.html',
                    controller: 'blogCommentsCtrl',
                    access: {
                        requiresLogin: true,
                        clientSide: 'ADMIN'
                    }
                }).
                when('/admin/poll/list', {
                    templateUrl: 'templates/admin/managePoll.html',
                    controller: 'managePollCtrl',
                    access: {
                        requiresLogin: true,
                        clientSide: 'ADMIN'
                    }
                }).
                when('/admin/poll/addNewPoll', {
                    templateUrl: 'templates/admin/addNewPoll.html',
                    controller: 'addNewPollCtrl',
                    access: {
                        requiresLogin: true,
                        clientSide: 'ADMIN'
                    }
                }).
                when('/admin/poll/:pollId', {
                    templateUrl: 'templates/admin/pollDetails.html',
                    controller: 'pollDetailsCtrl',
                    access: {
                        requiresLogin: true,
                        clientSide: 'ADMIN'
                    }
                }).
                when('/admin/poll/editPoll/:pollId', {
                    templateUrl: 'templates/admin/editPoll.html',
                    controller: 'editPollsCtrl',
                    access: {
                        requiresLogin: true,
                        clientSide: 'ADMIN'
                    }
                }).
                when('/admin/poll/comments/:pollId', {
                    templateUrl: 'templates/admin/pollComments.html',
                    controller: 'pollCommentsCtrl',
                    access: {
                        requiresLogin: true,
                        clientSide: 'ADMIN'
                    }
                }).
                when('/mailbox/inbox', {
                    templateUrl: 'templates/mailboxInbox.html',
                    controller: 'mailboxInboxCtrl',
                    access: {
                        requiresLogin: true,
                        role: 'user'
                    }
                }).
                when('/mailbox/sent', {
                    templateUrl: 'templates/mailboxSent.html',
                    controller: 'mailboxSentCtrl',
                    access: {
                        requiresLogin: true,
                        role: 'user'
                    }

                }).
                when('/mailbox/draft', {
                    templateUrl: 'templates/mailboxDraft.html',
                    controller: 'mailboxDraftCtrl',
                    access: {
                        requiresLogin: true,
                        role: 'user'
                    }

                }).
                 when('/mailbox/trash', {
                    templateUrl: 'templates/mailboxTrash.html',
                    controller: 'mailboxTrashCtrl',
                    access: {
                        requiresLogin: true,
                        role: 'user'
                    }

                }).
                 when('/mailbox/folder/:folderName', {
                    templateUrl: 'templates/mailboxFolder.html',
                    controller: 'mailboxFolderCtrl',
                    access: {
                        requiresLogin: true,
                        role: 'user'
                    }

                }).
                when('/mailbox/conversations', {
                    templateUrl: 'templates/mailboxConversations.html',
                    controller: 'mailboxConversationsCtrl',
                    access: {
                        requiresLogin: true,
                        role: 'user'
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

        if (nextRoute.access.requiresLogin && ($window.sessionStorage.isAuthenticated === 'false') && angular.isUndefined($window.sessionStorage.token)) {
            console.log('Logged - No');
            if (nextRoute.access.clientSide === 'USER') {
                //$location.path("/login");
                $window.location.href = "/login";
            } else {
                $rootScope.adminNavigation = 0;
                $location.path("/admin/login");
                //$window.location.href = "/admin/login";
            }

        } else {

            if (nextRoute.access.clientSide === 'USER') {

            } else {

                $rootScope.adminType = $window.sessionStorage.adminType;
                //$rootScope.privileges = $window.sessionStorage.privileges;
                //console.log($window.sessionStorage.privileges);


                $rootScope.privMembers = $window.sessionStorage.privMembers;
                $rootScope.privPackages = $window.sessionStorage.privPackages;
                $rootScope.privSettings = $window.sessionStorage.privSettings;
                $rootScope.privCmsPages = $window.sessionStorage.privCmsPages;
                $rootScope.privAdvertisements = $window.sessionStorage.privAdvertisements;
                $rootScope.privBlog = $window.sessionStorage.privBlog;
                $rootScope.privPoll = $window.sessionStorage.privPoll;

                $rootScope.adminNavigation = 1;

                if ((nextRoute.originalPath === '/admin' || nextRoute.originalPath === '/admin/login') && $window.sessionStorage.isAuthenticated === 'true') {
                    $location.path("/admin/dashboard");
                }
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
                delete $window.sessionStorage.adminType;

                delete $window.sessionStorage.privMembers;
                delete $window.sessionStorage.privPackages;
                delete $window.sessionStorage.privSettings;
                delete $window.sessionStorage.privCmsPages;
                delete $window.sessionStorage.privAdvertisements;
                delete $window.sessionStorage.privBlog;
                delete $window.sessionStorage.privPoll;

                $location.path('/admin/login');
            } else {
                $scope.login_error_message = "Invalid login credentials";
            }

        }).error(function () {

            console.log("EROOR - Admin logout.");

        });

    };

    $rootScope.userLogout = function () {

        var angParams = {
            token: $window.sessionStorage.token
        };
        $http.post($rootScope.STATIC_URL + 'users/userLogout', angParams).success(function (response) {

            if (response.status === 1) {
                $window.sessionStorage.isAuthenticated = 'false';

                delete $window.sessionStorage.token;
                delete $window.sessionStorage.adminType;

                $window.location.href = '/login';
            } else {

            }

        }).error(function () {

            console.log("EROOR - Admin logout.");

        });

    };


});

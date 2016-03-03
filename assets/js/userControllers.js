'use strict';
/* userControllers */

var userControllers = angular.module('userControllers', []);

userControllers.filter('removeSpaces', [function() {
    return function(string) {
        if (!angular.isString(string)) {
            return string;
        }
        return string.replace(/[\s]/g, '_');
    };
}]);

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
                    console.log(response);
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

userControllers.controller('mailboxInboxCtrl', function ($scope, $routeParams, $rootScope, $http, $location, $window, $filter, $timeout) {

    $rootScope.adminNavigation = 1;
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.errorMessage = "";
    //var box = $routeParams.box;
    console.log("$routeParams ----------");
    console.log($location.path());
    var boxArray = $location.path().split("/");
    var box      = boxArray[2];
    console.log(boxArray);
    console.log(box);
    console.log("$routeParams ----------");

    //var adminId = $routeParams.adminId;
    var request = "";
    var token = $window.sessionStorage.token;
    console.log("mailboxInboxCtrl ===================>>>>>>>>>>>>>>>>");
    console.log(token);

    request = {box : box};
    console.log(request);



      //Count of Unread Inbox Messages
        $http.post($rootScope.STATIC_URL + 'mail/getUnreadInboxCount', {token: token}).success(function (response) {
                if (response.status == 1)
                {
                    console.log(response);
                    $scope.unreadInboxMailCount = response.data;
                }

            }).error(function () {
                     $scope.errorMessage = "Please Try Again";
            });


     //List the User created Folders
        $http.post($rootScope.STATIC_URL + 'mail/getUserFolders', {token: token}).success(function (response) {
                if (response.status == 1)
                {
                    console.log(response);
                    $scope.listUCFolders = response.data;
                    /*$scope.numberOfPages = function () {
                        return Math.ceil(($scope.mailboxFolder).length / $scope.pageSize);
                    }*/
                }

            }).error(function () {
                     $scope.errorMessage = "Please Try Again";
            });

    //List Inbox Mails
    $http.post($rootScope.STATIC_URL + 'mail/mailbox', {token: token, request: request}).success(function (response) {
        if (response.status == 1)
        {
            console.log(response);
            $scope.mailboxInbox = response.data;
            $scope.numberOfPages = function () {
                return Math.ceil(($scope.mailboxInbox).length / $scope.pageSize);
            }
        }

    }).error(function () {
             $scope.errorMessage = "Please Try Again";
    });



     $scope.selectedMail = function () {
        $scope.checkedMail = $filter('filter')($scope.mailboxInbox, {checked: true});
    }

     //Update Mail Status
      $scope.updateMailStatus = function ($event) {
              var chkMailArray = $scope.checkedMail;
              console.log(chkMailArray);
              var mailStatus = $event.currentTarget.id;
              console.log(mailStatus);

              var splitMailStatus = mailStatus.split('_');
              mailStatus = splitMailStatus[0];
              var folderId = splitMailStatus[1];
console.log(mailStatus);
console.log(folderId);
                request = {mailStatus: mailStatus, chkMailArray: chkMailArray, folderId: folderId};
                $http.post($rootScope.STATIC_URL + 'mail/updateMailStatus', {token: token, request: request}).success(function (response) {
                    console.log("response Mail Status");
                    console.log(response);
                    if (response.status == 1)
                    {
                        console.log("response Enter");
                            //List Inbox Mails
                            request = {box : box};
                            $http.post($rootScope.STATIC_URL + 'mail/mailbox', {token: token, request: request}).success(function (response) {
                                console.log(response);
                                if (response.status == 1)
                                {
                                    console.log(response);
                                    $scope.mailboxInbox = response.data;
                                    $scope.numberOfPages = function () {
                                        return Math.ceil(($scope.mailboxInbox).length / $scope.pageSize);
                                    }
                                }

                            }).error(function () {
                                     $scope.errorMessage = "Please Try Again";
                            });
                    }
                    else if(response.status == 2){
                            $scope.errorMessage = response.message;
                            $timeout(function() {
                                $scope.errorMessage = false;
                            }, 3000);
                    }
                }).error(function () {
                    $scope.errorMessage = "Please Try Again";
                });

      }



 });





 /*===================================================================================================================================
    mailboxSentCtrl
 ====================================================================================================================================*/

userControllers.controller('mailboxSentCtrl', function ($scope, $routeParams, $rootScope, $http, $location, $window, $filter, $timeout) {

    $rootScope.adminNavigation = 1;
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.errorMessage = "";
    //var box = $routeParams.box;
    console.log("$routeParams ----------");
    console.log($location.path());
    var boxArray = $location.path().split("/");
    var box      = boxArray[2];
    console.log(boxArray);
    console.log(box);
    console.log("$routeParams ----------");
    //var adminId = $routeParams.adminId;
    var request = "";
    var token = $window.sessionStorage.token;
    console.log("mailboxSentCtrl ===================>>>>>>>>>>>>>>>>");
    console.log(token);
    request = {box : box};
    console.log(request);



       //Count of Unread Inbox Messages
        $http.post($rootScope.STATIC_URL + 'mail/getUnreadInboxCount', {token: token}).success(function (response) {
                if (response.status == 1)
                {
                    console.log(response);
                    $scope.unreadInboxMailCount = response.data;
                }

            }).error(function () {
                     $scope.errorMessage = "Please Try Again";
            });

      //List the User created Folders
        $http.post($rootScope.STATIC_URL + 'mail/getUserFolders', {token: token}).success(function (response) {
                if (response.status == 1)
                {
                    console.log(response);
                    $scope.listUCFolders = response.data;
                    /*$scope.numberOfPages = function () {
                        return Math.ceil(($scope.mailboxFolder).length / $scope.pageSize);
                    }*/
                }

            }).error(function () {
                     $scope.errorMessage = "Please Try Again";
            });

    //List Sent Mails
    $http.post($rootScope.STATIC_URL + 'mail/mailbox', {token: token, request: request}).success(function (response) {
        if (response.status == 1)
        {
            console.log(response);
            $scope.mailboxSent = response.data;
            $scope.numberOfPages = function () {
                return Math.ceil(($scope.mailboxSent).length / $scope.pageSize);
            }
        }

    }).error(function () {
             $scope.errorMessage = "Please Try Again";
    });



    $scope.selectedMail = function () {
        $scope.checkedMail = $filter('filter')($scope.mailboxSent, {checked: true});
    }

     //Update Mail Status
      $scope.updateMailStatus = function ($event) {
              var chkMailArray = $scope.checkedMail;
              console.log(chkMailArray);
              var mailStatus = $event.currentTarget.id;
              console.log(mailStatus);

              var splitMailStatus = mailStatus.split('_');
              mailStatus = splitMailStatus[0];
              var folderId = splitMailStatus[1];
console.log(mailStatus);
console.log(folderId);
                request = {mailStatus: mailStatus, chkMailArray: chkMailArray, folderId: folderId};
                $http.post($rootScope.STATIC_URL + 'mail/updateMailStatus', {token: token, request: request}).success(function (response) {
                    console.log("response Mail Status");
                    console.log(response);
                    if (response.status == 1)
                    {
                        console.log("response Enter");
                            //List Inbox Mails
                            request = {box : box};
                            $http.post($rootScope.STATIC_URL + 'mail/mailbox', {token: token, request: request}).success(function (response) {
                                if (response.status == 1)
                                {
                                    console.log(response);
                                    $scope.mailboxSent = response.data;
                                    $scope.numberOfPages = function () {
                                        return Math.ceil(($scope.mailboxSent).length / $scope.pageSize);
                                    }
                                }

                            }).error(function () {
                                     $scope.errorMessage = "Please Try Again";
                            });
                    }
                    else if(response.status == 2){
                            $scope.errorMessage = response.message;
                            $timeout(function() {
                                $scope.errorMessage = false;
                            }, 3000);
                    }
                }).error(function () {
                    $scope.errorMessage = "Please Try Again";
                });

      }



 });

/*===================================================================================================================================
    mailboxDraftCtrl
 ====================================================================================================================================*/

userControllers.controller('mailboxDraftCtrl', function ($scope, $routeParams, $rootScope, $http, $location, $window, $filter, $timeout) {

    $rootScope.adminNavigation = 1;
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.errorMessage = "";
    //var box = $routeParams.box;
    console.log("$routeParams ----------");
    console.log($location.path());
    var boxArray = $location.path().split("/");
    var box      = boxArray[2];
    console.log(boxArray);
    console.log(box);
    console.log("$routeParams ----------");

    //var adminId = $routeParams.adminId;
    var request = "";
    var token = $window.sessionStorage.token;
    console.log("mailboxDraftCtrl ===================>>>>>>>>>>>>>>>>");
    console.log(token);
    request = {box : box};
    console.log(request);

      //Count of Unread Inbox Messages
        $http.post($rootScope.STATIC_URL + 'mail/getUnreadInboxCount', {token: token}).success(function (response) {
                if (response.status == 1)
                {
                    console.log(response);
                    $scope.unreadInboxMailCount = response.data;
                }

            }).error(function () {
                     $scope.errorMessage = "Please Try Again";
            });

      //List the User created Folders
        $http.post($rootScope.STATIC_URL + 'mail/getUserFolders', {token: token}).success(function (response) {
                if (response.status == 1)
                {
                    console.log(response);
                    $scope.listUCFolders = response.data;
                    /*$scope.numberOfPages = function () {
                        return Math.ceil(($scope.mailboxFolder).length / $scope.pageSize);
                    }*/
                }

            }).error(function () {
                     $scope.errorMessage = "Please Try Again";
            });

    //List Sent Mails
    $http.post($rootScope.STATIC_URL + 'mail/mailbox', {token: token, request: request}).success(function (response) {
        if (response.status == 1)
        {
            console.log(response);
            $scope.mailboxDraft = response.data;
            $scope.numberOfPages = function () {
                return Math.ceil(($scope.mailboxDraft).length / $scope.pageSize);
            }
        }

    }).error(function () {
             $scope.errorMessage = "Please Try Again";
    });



    $scope.selectedMail = function () {
        $scope.checkedMail = $filter('filter')($scope.mailboxDraft, {checked: true});
    }

     //Update Mail Status
      $scope.updateMailStatus = function ($event) {
              var chkMailArray = $scope.checkedMail;
              console.log(chkMailArray);
              var mailStatus = $event.currentTarget.id;
              console.log(mailStatus);

              var splitMailStatus = mailStatus.split('_');
              mailStatus = splitMailStatus[0];
              var folderId = splitMailStatus[1];
console.log(mailStatus);
console.log(folderId);
                request = {mailStatus: mailStatus, chkMailArray: chkMailArray, folderId: folderId};
                $http.post($rootScope.STATIC_URL + 'mail/updateMailStatus', {token: token, request: request}).success(function (response) {
                    console.log("response Mail Status");
                    console.log(response);
                    if (response.status == 1)
                    {
                        console.log("response Enter");
                            //List Inbox Mails
                            request = {box : box};
                            $http.post($rootScope.STATIC_URL + 'mail/mailbox', {token: token, request: request}).success(function (response) {
                                if (response.status == 1)
                                {
                                    console.log(response);
                                    $scope.mailboxDraft = response.data;
                                    $scope.numberOfPages = function () {
                                        return Math.ceil(($scope.mailboxDraft).length / $scope.pageSize);
                                    }
                                }

                            }).error(function () {
                                     $scope.errorMessage = "Please Try Again";
                            });
                    }
                    else if(response.status == 2){
                            $scope.errorMessage = response.message;
                            $timeout(function() {
                                $scope.errorMessage = false;
                            }, 3000);
                    }
                }).error(function () {
                    $scope.errorMessage = "Please Try Again";
                });

      }



 });

/*===================================================================================================================================
    mailboxTrashCtrl
 ====================================================================================================================================*/

userControllers.controller('mailboxTrashCtrl', function ($scope, $routeParams, $rootScope, $http, $location, $window, $filter, $timeout) {

    $rootScope.adminNavigation = 1;
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.errorMessage = "";
    //var box = $routeParams.box;
    console.log("$routeParams ----------");
    console.log($location.path());
    var boxArray = $location.path().split("/");
    var box      = boxArray[2];
    console.log(boxArray);
    console.log(box);
    console.log("$routeParams ----------");

    //var adminId = $routeParams.adminId;
    var request = "";
    var token = $window.sessionStorage.token;
    console.log("mailboxTrashCtrl ===================>>>>>>>>>>>>>>>>");
    console.log(token);
    request = {box : box};
    console.log(request);

     //Count of Unread Inbox Messages
        $http.post($rootScope.STATIC_URL + 'mail/getUnreadInboxCount', {token: token}).success(function (response) {
                if (response.status == 1)
                {
                    console.log(response);
                    $scope.unreadInboxMailCount = response.data;
                }

            }).error(function () {
                     $scope.errorMessage = "Please Try Again";
            });
   //List the User created Folders
        $http.post($rootScope.STATIC_URL + 'mail/getUserFolders', {token: token}).success(function (response) {
                if (response.status == 1)
                {
                    console.log(response);
                    $scope.listUCFolders = response.data;
                    /*$scope.numberOfPages = function () {
                        return Math.ceil(($scope.mailboxFolder).length / $scope.pageSize);
                    }*/
                }

            }).error(function () {
                     $scope.errorMessage = "Please Try Again";
            });

    //List Sent Mails
    $http.post($rootScope.STATIC_URL + 'mail/mailbox', {token: token, request: request}).success(function (response) {
        if (response.status == 1)
        {
            console.log(response);
            $scope.mailboxTrash = response.data;
            $scope.numberOfPages = function () {
                return Math.ceil(($scope.mailboxTrash).length / $scope.pageSize);
            }
        }

    }).error(function () {
             $scope.errorMessage = "Please Try Again";
    });



    $scope.selectedMail = function () {
        $scope.checkedMail = $filter('filter')($scope.mailboxTrash, {checked: true});
    }

     //Update Mail Status
     $scope.updateMailStatus = function ($event) {
              var chkMailArray = $scope.checkedMail;
              console.log(chkMailArray);
              var mailStatus = $event.currentTarget.id;

              var splitMailStatus = mailStatus.split('_');
              mailStatus = splitMailStatus[0];
              var folderId = splitMailStatus[1];

                request = {mailStatus: mailStatus, chkMailArray: chkMailArray, folderId: folderId};
                $http.post($rootScope.STATIC_URL + 'mail/updateMailStatus', {token: token, request: request}).success(function (response) {
                    console.log("response Mail Status");
                    console.log(response);
                    if (response.status == 1)
                    {
                        console.log("response Enter");
                            //List Inbox Mails
                            request = {box : box};
                            $http.post($rootScope.STATIC_URL + 'mail/mailbox', {token: token, request: request}).success(function (response) {
                                if (response.status == 1)
                                {
                                    console.log(response);
                                    $scope.mailboxTrash = response.data;
                                    $scope.numberOfPages = function () {
                                        return Math.ceil(($scope.mailboxTrash).length / $scope.pageSize);
                                    }
                                }

                            }).error(function () {
                                     $scope.errorMessage = "Please Try Again";
                            });
                    }
                    else if(response.status == 2){
                            $scope.errorMessage = response.message;
                            $timeout(function() {
                                $scope.errorMessage = false;
                            }, 3000);
                    }
                }).error(function () {
                    $scope.errorMessage = "Please Try Again";
                });

      }



 });

/*===================================================================================================================================
    mailboxFolderCtrl
 ====================================================================================================================================*/

userControllers.controller('mailboxFolderCtrl', function ($scope, $routeParams, $rootScope, $http, $location, $window, $filter, $timeout) {

    $rootScope.adminNavigation = 1;
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.errorMessage = "";
    //var box = $routeParams.box;
    console.log("$routeParams ----------");
    console.log($location.path());
    var boxArray   = $location.path().split("/");
    var box        = boxArray[2];
    var folderName = $routeParams.folderName;
    console.log(boxArray);
    console.log(box);
    console.log(folderName);
    console.log("$routeParams ----------");

    //var adminId = $routeParams.adminId;
    var request = "";
    var token = $window.sessionStorage.token;
    console.log("mailboxFolderCtrl ===================>>>>>>>>>>>>>>>>");
    console.log(token);
    request = {box : box, folderName: folderName};
    console.log(request);

       //Count of Unread Inbox Messages
        $http.post($rootScope.STATIC_URL + 'mail/getUnreadInboxCount', {token: token}).success(function (response) {
                if (response.status == 1)
                {
                    console.log(response);
                    $scope.unreadInboxMailCount = response.data;
                }

            }).error(function () {
                     $scope.errorMessage = "Please Try Again";
            });

       //List the User created Folders
        $http.post($rootScope.STATIC_URL + 'mail/getUserFolders', {token: token}).success(function (response) {
                if (response.status == 1)
                {
                    console.log(response);
                    $scope.listUCFolders = response.data;
                    /*$scope.numberOfPages = function () {
                        return Math.ceil(($scope.mailboxFolder).length / $scope.pageSize);
                    }*/
                }

            }).error(function () {
                     $scope.errorMessage = "Please Try Again";
            });

    //List Sent Mails
    $http.post($rootScope.STATIC_URL + 'mail/mailbox', {token: token, request: request}).success(function (response) {
        if (response.status == 1)
        {
            console.log(response);
            $scope.mailboxFolder = response.data;
            $scope.numberOfPages = function () {
                return Math.ceil(($scope.mailboxFolder).length / $scope.pageSize);
            }
        }

    }).error(function () {
             $scope.errorMessage = "Please Try Again";
    });



    $scope.selectedMail = function () {
        $scope.checkedMail = $filter('filter')($scope.mailboxFolder, {checked: true});
    }

     //Update Mail Status
     $scope.updateMailStatus = function ($event) {
              var chkMailArray = $scope.checkedMail;
              console.log(chkMailArray);
              var mailStatus = $event.currentTarget.id;
              console.log(mailStatus);

              var splitMailStatus = mailStatus.split('_');
              mailStatus = splitMailStatus[0];
              var folderId = splitMailStatus[1];
console.log(mailStatus);
console.log(folderId);
                request = {mailStatus: mailStatus, chkMailArray: chkMailArray, folderId: folderId};

                $http.post($rootScope.STATIC_URL + 'mail/updateMailStatus', {token: token, request: request}).success(function (response) {
                    console.log("response Mail Status");
                    console.log(response);
                    if (response.status == 1)
                    {
                        console.log("response Enter  == Folder");
                            //List Inbox Mails
                            request = {box : box};
                            $http.post($rootScope.STATIC_URL + 'mail/mailbox', {token: token, request: request}).success(function (response) {
                                if (response.status == 1)
                                {
                                    console.log(response);
                                    console.log("response =======>>>>>");
                                    //$scope.mailboxFolder = response.data;
                                    //location.reload();
                                    $scope.numberOfPages = function () {
                                        return Math.ceil(($scope.mailboxFolder).length / $scope.pageSize);
                                    }
                                }

                            }).error(function () {
                                     $scope.errorMessage = "Please Try Again";
                            });
                    }
                    else if(response.status == 2){
                            $scope.errorMessage = response.message;
                            $timeout(function() {
                                $scope.errorMessage = false;
                            }, 3000);
                    }
                }).error(function () {
                    $scope.errorMessage = "Please Try Again";
                });

      }



 });


 /*===================================================================================================================================
    mailboxConversationsCtrl
 ====================================================================================================================================*/

userControllers.controller('mailboxConversationsCtrl', function ($scope, $routeParams, $rootScope, $http, $location, $window, $filter, $timeout) {

    $rootScope.adminNavigation = 1;
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.errorMessage = "";
    //var box = $routeParams.box;
    console.log("$routeParams ----------");
    console.log($location.path());
    var boxArray   = $location.path().split("/");
    var box        = boxArray[2];
    var folderName = $routeParams.folderName;
    console.log(boxArray);
    console.log(box);
    console.log(folderName);
    console.log("$routeParams ----------");

    //var adminId = $routeParams.adminId;
    var request = "";
    var token = $window.sessionStorage.token;
    console.log("mailboxFolderCtrl ===================>>>>>>>>>>>>>>>>");
    console.log(token);
    request = {box : box, folderName: folderName};
    console.log(request);

       //Count of Unread Inbox Messages
        $http.post($rootScope.STATIC_URL + 'mail/getUnreadInboxCount', {token: token}).success(function (response) {
                if (response.status == 1)
                {
                    console.log(response);
                    $scope.unreadInboxMailCount = response.data;
                }

            }).error(function () {
                     $scope.errorMessage = "Please Try Again";
            });

       //List the User created Folders
        $http.post($rootScope.STATIC_URL + 'mail/getUserFolders', {token: token}).success(function (response) {
                if (response.status == 1)
                {
                    console.log(response);
                    $scope.listUCFolders = response.data;
                    /*$scope.numberOfPages = function () {
                        return Math.ceil(($scope.mailboxFolder).length / $scope.pageSize);
                    }*/
                }

            }).error(function () {
                     $scope.errorMessage = "Please Try Again";
            });

    //List All Mail Conversations
    $http.post($rootScope.STATIC_URL + 'mail/mailbox', {token: token, request: request}).success(function (response) {
        if (response.status == 1)
        {
            console.log(response);
            $scope.mailboxConversations = response.data;
            $scope.numberOfPages = function () {
                return Math.ceil(($scope.mailboxConversations).length / $scope.pageSize);
            }
        }

    }).error(function () {
             $scope.errorMessage = "Please Try Again";
    });



  /*  $scope.selectedMail = function () {
        $scope.checkedMail = $filter('filter')($scope.mailboxFolder, {checked: true});
    }
*/
     //Update Mail Status
 /*    $scope.updateMailStatus = function ($event) {
              var chkMailArray = $scope.checkedMail;
              console.log(chkMailArray);
              var mailStatus = $event.currentTarget.id;
              console.log(mailStatus);

              var splitMailStatus = mailStatus.split('_');
              mailStatus = splitMailStatus[0];
              var folderId = splitMailStatus[1];
console.log(mailStatus);
console.log(folderId);
                request = {mailStatus: mailStatus, chkMailArray: chkMailArray, folderId: folderId};

                $http.post($rootScope.STATIC_URL + 'mail/updateMailStatus', {token: token, request: request}).success(function (response) {
                    console.log("response Mail Status");
                    console.log(response);
                    if (response.status == 1)
                    {
                        console.log("response Enter  == Folder");
                            //List Inbox Mails
                            request = {box : box};
                            $http.post($rootScope.STATIC_URL + 'mail/mailbox', {token: token, request: request}).success(function (response) {
                                if (response.status == 1)
                                {
                                    console.log(response);
                                    console.log("response =======>>>>>");
                                    //$scope.mailboxFolder = response.data;
                                    //location.reload();
                                    $scope.numberOfPages = function () {
                                        return Math.ceil(($scope.mailboxFolder).length / $scope.pageSize);
                                    }
                                }

                            }).error(function () {
                                     $scope.errorMessage = "Please Try Again";
                            });
                    }
                    else if(response.status == 2){
                            $scope.errorMessage = response.message;
                            $timeout(function() {
                                $scope.errorMessage = false;
                            }, 3000);
                    }
                }).error(function () {
                    $scope.errorMessage = "Please Try Again";
                });

      }
*/


 });



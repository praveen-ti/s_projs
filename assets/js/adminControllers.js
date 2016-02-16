'use strict';
/* adminControllers */

var adminControllers = angular.module('adminControllers', ['appServices']);


adminControllers.controller('RepeatCtrl', function RepeatController($scope) {

    $scope.indexNumber = ($scope.$index + 1) + ($scope.currentPage) * $scope.pageSize;

});

adminControllers.filter('startFrom', function () {
    return function (input, start) {
        if (!input || !input.length) {
            return;
        }
        start = +start; //parse to int
        return input.slice(start);
    }
});



adminControllers.controller('adminLoginCtrl', function ($scope, $routeParams, $rootScope, $http, $location, $window) {

    $rootScope.adminNavigation = 0;

    $scope.loginSubmit = function () {

        var username = $scope.username;
        var password = $scope.password;
        var params = {
            username: username,
            password: password
        };

        $scope.errorMessage = null;

        if (!username) {

            $scope.errorMessage = "Please enter username.";

        } else if (!password) {

            $scope.errorMessage = "Please enter password.";

        } else if (username && password) {

            $http.post($rootScope.STATIC_URL + 'admins/adminLogin', params).success(function (response) {

                if (response.status === 1) {
                    $window.sessionStorage.isAuthenticated = 'true';
                    $window.sessionStorage.token = response.data.token.token;
                    $location.path('/admin/dashboard');
                } else {
                    $scope.errorMessage = "Invalid login credentials.";
                }

            }).error(function (err) {

                console.log("ERROR" + err);

            });
        }
    };

});

adminControllers.controller('adminDashboardCtrl', function ($scope, $routeParams, $rootScope, $http, $location, $window) {
    $rootScope.adminNavigation = 1;
});

adminControllers.controller('adminPackageCtrl', function ($scope, $routeParams, $rootScope, $http, $location, $window) {
    $rootScope.adminNavigation = 1;

    $scope.currentPage = 0;
    $scope.pageSize = 10;
    var params = {
        userRole: 'admin',
        token: $window.sessionStorage.token
    };

    $http.post($rootScope.STATIC_URL + 'subscription/getAllPackages', params).success(function (response) {

        if (response.status == 1) {
            $scope.packages = response.data;
            $scope.numberOfPages = function () {
                return Math.ceil(($scope.packages).length / $scope.pageSize);
            }
        }

    });

    $scope.statusUpdate = function ($event, packageId, status) {

        var params = {
            packageId: packageId,
            status: status,
            token: $window.sessionStorage.token
        };

        var args = {
            userRole: 'admin',
            token: $window.sessionStorage.token
        };

        if (!confirm('Are you sure you want to ' + status + ' this Package?')) {
            $event.preventDefault();
        } else {

            $http.post($rootScope.STATIC_URL + 'subscription/updatePackageStatus', params).success(function (response) {

                if (response.status == 1) {
                    $http.post($rootScope.STATIC_URL + 'subscription/getAllPackages', args).success(function (data) {
                        if (data.status == 1) {
                            $scope.packages = data.data;
                        }
                    });
                }

            });

        }
    }

    $scope.addPackage = function () {

        var fd = new FormData();
        var name = $scope.name;
        var description = $scope.description;
        var cost = $scope.cost;
        var validDays = $scope.validDays;
        var status = $scope.status;
        var token = $window.sessionStorage.token;

        var args = {
            userRole: 'admin',
            token: $window.sessionStorage.token
        };

        $scope.errorMessage = '';

        if (!name) {

            $scope.errorMessage = 'Please enter a package name.';

        } else if (!cost) {

            $scope.errorMessage = 'Please enter cost for package.';

        } else if (!validDays) {

            $scope.errorMessage = 'Please enter number of valid days.';

        } else if (!status) {

            $scope.errorMessage = 'Please select a status.';

        } else if (name && cost && validDays && status) {

            fd.append('name', name);
            fd.append('description', description);
            fd.append('cost', cost);
            fd.append('validDays', validDays);
            fd.append('status', status);
            fd.append('token', token);

            $http.post($rootScope.STATIC_URL + 'subscription/addPackage', fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}

            }).success(function (response) {
                if (response.status == 1) {

                    $http.post($rootScope.STATIC_URL + 'subscription/getAllPackages', args).success(function (response) {

                        if (response.status == 1) {
                            $scope.packages = response.data;
                            $scope.numberOfPages = function () {
                                return Math.ceil(($scope.packages).length / $scope.pageSize);
                            }
                        }
                    });

                    var index = $scope.index;

                    $('#addPackage').modal('hide');
                    $scope.name = "";
                    $scope.description = "";
                    $scope.cost = "";
                    $scope.validDays = "";
                    $scope.status = "";
                }

            }).error(function (err) {
                $scope.errorMessage = "Some error occured. Please try again.";
            });

        }

    }

    $scope.getPackageById = function (packageId, index, currentPage, pageSize) {

        $scope.index = index;
        $scope.extra = parseInt(currentPage) * parseInt(pageSize);

        var params = {
            packageId: packageId,
            userRole: 'admin',
            token: $window.sessionStorage.token
        };

        $http.post($rootScope.STATIC_URL + 'subscription/getPackageById', params).success(function (response) {

            if (response.status == 1) {
                $scope.packageDetails = response.data;
            }

        });

    }

    $scope.updatePackageDetails = function () {

        var id = $scope.packageDetails.id;
        var name = $scope.packageDetails.name;
        var description = $scope.packageDetails.description;
        var cost = $scope.packageDetails.cost;
        var validDays = $scope.packageDetails.validDays;
        var status = $scope.packageDetails.status;
        var index = $scope.index;


        $scope.errorMessage = '';

        if (!name) {

            $scope.errorMessage = 'Please enter a package name.';

        } else if (!cost) {

            $scope.errorMessage = 'Please enter cost for package.';

        } else if (!validDays) {

            $scope.errorMessage = 'Please enter number of valid days.';

        } else if (!status) {

            $scope.errorMessage = 'Please select a status.';

        } else if (name && cost && validDays && status) {

            var fd = new FormData();
            fd.append('id', id);
            fd.append('name', name);
            fd.append('description', description);
            fd.append('cost', cost);
            fd.append('validDays', validDays);
            fd.append('status', status);
            fd.append('token', $window.sessionStorage.token);

            $http.post($rootScope.STATIC_URL + 'subscription/updatePackageDetails', fd,
                    {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    }).success(function (response) {

                index = $scope.index + $scope.extra;
                $scope.packages[index].name = name;
                $scope.packages[index].description = description;
                $scope.packages[index].cost = cost;
                $scope.packages[index].validDays = validDays;
                $scope.packages[index].status = status;

                $('#editPackage').modal('hide');

            }).error(function (err) {
                $scope.errorMessage = "Some error occured. Please try again.";
            });

        }

    }

});

adminControllers.controller('adminMembersCtrl', function ($scope, $routeParams, $rootScope, $http, $location, $window) {
    $rootScope.adminNavigation = 1;
    $scope.currentPage = 0;
    $scope.pageSize = 10;

    var params = {
        userRole: 'admin',
        token: $window.sessionStorage.token
    };

    $http.post($rootScope.STATIC_URL + 'users/getAllMembers', params).success(function (response) {

        if (response.status == 1) {
            $scope.users = response.data;
            $scope.numberOfPages = function () {
                return Math.ceil(($scope.users).length / $scope.pageSize);
            }
        }

    });

    $scope.updateMemberStatus = function ($event, userId, status) {

        var params = {
            userId: userId,
            status: status,
            token: $window.sessionStorage.token
        };

        var args = {
            userRole: 'admin',
            token: $window.sessionStorage.token
        };

        if (!confirm('Are you sure you want to ' + status + ' this User?')) {
            $event.preventDefault();
        } else {

            $http.post($rootScope.STATIC_URL + 'users/updateUserStatus', params).success(function (response) {

                if (response.status === 1) {
                    $http.post($rootScope.STATIC_URL + 'users/getAllMembers', args).success(function (data) {
                        if (data.status === 1) {
                            $scope.users = data.data;
                            $scope.numberOfPages = function () {
                                return Math.ceil(($scope.users).length / $scope.pageSize);
                            }
                        }
                    });
                }

            });

        }
    }

    $scope.blacklistAMember = function ($event, userId, status) {

        var params = {
            userId: userId,
            status: status,
            token: $window.sessionStorage.token
        };

        var args = {
            userRole: 'admin',
            token: $window.sessionStorage.token
        };

        var text = 'blacklist';
        if (status === 'no') {
            text = 'whitelist';
        }

        if (!confirm('Are you sure you want to ' + text + ' this User?')) {
            $event.preventDefault();
        } else {

            $http.post($rootScope.STATIC_URL + 'users/blacklistAMember', params).success(function (response) {

                if (response.status === 1) {
                    $http.post($rootScope.STATIC_URL + 'users/getAllMembers', args).success(function (data) {
                        if (data.status === 1) {
                            $scope.users = data.data;
                        }
                    });
                }

            });

        }
    }

});

adminControllers.controller('adminMemberInfoCtrl', function ($scope, $routeParams, $rootScope, $http, $location, $window) {
    $rootScope.adminNavigation = 1;

    var params = {
        userId: $routeParams.id,
        userRole: 'admin',
        token: $window.sessionStorage.token
    };

    $http.post($rootScope.STATIC_URL + 'users/getUserDetails', params).success(function (response) {

        if (response.status == 1) {
            $scope.member = response.data[0];
        }

    });

});

adminControllers.controller('adminMemberReviewCtrl', function ($scope, $routeParams, $rootScope, $http, $location, $window) {
    $rootScope.adminNavigation = 1;
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.userId = $routeParams.id;

    var userParams = {
        userId: $routeParams.id,
        userRole: 'admin',
        token: $window.sessionStorage.token
    };

    $http.post($rootScope.STATIC_URL + 'users/getUserBasicDetails', userParams).success(function (response) {

        if (response.status == 1) {
            $scope.member = response.data[0];
        }

    });

    var params = {
        userId: $routeParams.id,
        userRole: 'admin',
        token: $window.sessionStorage.token
    };

    $http.post($rootScope.STATIC_URL + 'users/getUserReviews', params).success(function (response) {

        if (response.status == 1) {
            $scope.reviews = response.data;
            $scope.numberOfPages = function () {
                return Math.ceil(($scope.reviews).length / $scope.pageSize);
            }
        }

    });

    $scope.updateReviewStatus = function ($event, reviewId, approvalStatus) {

        var args = {
            reviewId: reviewId,
            approvalStatus: approvalStatus,
            token: $window.sessionStorage.token
        };

        if (!confirm('Are you sure you want to change status to ' + approvalStatus + ' for this review?')) {
            $event.preventDefault();
        } else {

            $http.post($rootScope.STATIC_URL + 'admins/userReviewApproval', args).success(function (response) {

                if (response.status === 1) {
                    $http.post($rootScope.STATIC_URL + 'users/getUserReviews', params).success(function (data) {
                        if (data.status === 1) {
                            $scope.reviews = data.data;
                            $scope.numberOfPages = function () {
                                return Math.ceil(($scope.reviews).length / $scope.pageSize);
                            }
                        }
                    });
                }

            });

        }
    }




});

adminControllers.controller('adminMemberSubscriptionCtrl', function ($scope, $routeParams, $rootScope, $http, $location, $window) {
    $rootScope.adminNavigation = 1;
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.userId = $routeParams.id;

    var userParams = {
        userId: $routeParams.id,
        userRole: 'admin',
        token: $window.sessionStorage.token
    };

    $http.post($rootScope.STATIC_URL + 'users/getUserBasicDetails', userParams).success(function (response) {

        if (response.status == 1) {
            $scope.member = response.data[0];
        }

    });

    $http.post($rootScope.STATIC_URL + 'subscription/getUserSubscriptions', userParams).success(function (response) {

        if (response.status == 1) {
            $scope.subscriptions = response.data;
            $scope.numberOfPages = function () {
                return Math.ceil(($scope.subscriptions).length / $scope.pageSize);
            }
        }

    });


});

adminControllers.controller('adminMemberReferralCtrl', function ($scope, $routeParams, $rootScope, $http, $location, $window) {
    $rootScope.adminNavigation = 1;
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.userId = $routeParams.id;

    var userParams = {
        userId: $routeParams.id,
        userRole: 'admin',
        token: $window.sessionStorage.token
    };

    $http.post($rootScope.STATIC_URL + 'users/getUserBasicDetails', userParams).success(function (response) {

        if (response.status == 1) {
            $scope.member = response.data[0];
        }

    });

    $http.post($rootScope.STATIC_URL + 'users/getReferredUsers', userParams).success(function (response) {

        if (response.status == 1) {
            $scope.refferedUsers = response.data;
            $scope.numberOfPages = function () {
                return Math.ceil(($scope.refferedUsers).length / $scope.pageSize);
            }
        }

    });
});

adminControllers.controller('adminMemberPhotoCtrl', function ($scope, $routeParams, $rootScope, $http, $location, $window) {
    $rootScope.adminNavigation = 1;
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.userId = $routeParams.id;

    var userParams = {
        userId: $routeParams.id,
        userRole: 'admin',
        token: $window.sessionStorage.token
    };

    $http.post($rootScope.STATIC_URL + 'users/getUserBasicDetails', userParams).success(function (response) {

        if (response.status == 1) {
            $scope.member = response.data[0];
        }

    });

    $http.post($rootScope.STATIC_URL + 'users/getPhotosByUserId', userParams).success(function (response) {

        if (response.status == 1) {
            $scope.photos = response.data;
            $scope.numberOfPages = function () {
                return Math.ceil(($scope.photos).length / $scope.pageSize);
            }
        }

    });

    $scope.getPhotoDetails = function (photoId, index, currentPage, pageSize) {

        $scope.index = index;
        $scope.extra = parseInt(currentPage) * parseInt(pageSize);

        var params = {
            photoId: photoId,
            userRole: 'admin',
            token: $window.sessionStorage.token
        };

        $http.post($rootScope.STATIC_URL + 'users/getPhotoById', params).success(function (response) {

            if (response.status == 1) {
                $scope.photoDetails = response.data[0];
            }

        });

    }

});

adminControllers.controller('adminMemberVideoCtrl', function ($scope, $routeParams, $rootScope, $http, $location, $window) {
    $rootScope.adminNavigation = 1;
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.userId = $routeParams.id;

    var userParams = {
        userId: $routeParams.id,
        userRole: 'admin',
        token: $window.sessionStorage.token
    };

    $http.post($rootScope.STATIC_URL + 'users/getUserBasicDetails', userParams).success(function (response) {

        if (response.status == 1) {
            $scope.member = response.data[0];
        }

    });

    $http.post($rootScope.STATIC_URL + 'users/getVideosByUserId', userParams).success(function (response) {

        if (response.status == 1) {
            $scope.videos = response.data;
            $scope.numberOfPages = function () {
                return Math.ceil(($scope.videos).length / $scope.pageSize);
            }
        }

    });

    $scope.getVideoDetails = function (videoId, index, currentPage, pageSize) {

        $scope.index = index;
        $scope.extra = parseInt(currentPage) * parseInt(pageSize);

        var params = {
            videoId: videoId,
            userRole: 'admin',
            token: $window.sessionStorage.token
        };

        $http.post($rootScope.STATIC_URL + 'users/getVideoById', params).success(function (response) {

            if (response.status == 1) {
                $scope.videoDetails = response.data[0];
            }

        });

    }
});



/*===================================================================================================================================
 Manage Sub Admin Controller   -----  II
 ====================================================================================================================================*/

adminControllers.controller('manageSubAdminCtrl', function ($scope, $routeParams, $rootScope, $http, $location, $window) {

    $rootScope.adminNavigation = 1;
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.errorMessage = "";
    var request = "";
    var token = $window.sessionStorage.token;

    $http.post($rootScope.STATIC_URL + 'admins/getSubadminList', {token: token}).success(function (response) {
        if (response.status == 1) {
            $scope.subAdmins = response.data;
            $scope.numberOfPages = function () {
                return Math.ceil(($scope.subAdmins).length / $scope.pageSize);
            }
        } else if (response.status == 3) {

            //$scope.errorMessage = "Token Expired";
            $window.location.href = $rootScope.STATIC_URL + 'admin/login';
        }

    });

//Add New Sub Admin
    $scope.addNewSubAdmin = function () {

        var fd = new FormData();
        var userName = $scope.newUserName;
        var firstName = $scope.newFirstName;
        var lastName = $scope.newLastName;
        var password = $scope.newPassword;
        var blockStatus = "active";

        if (!userName && !password && !firstName) {
            $scope.errorMessage = "Please Enter all fields";
        }
        else if (!userName) {
            $scope.errorMessage = "Please Enter a Username";
        }
        else if (!password) {
            $scope.errorMessage = "Please Enter a Password";
        }
        else if (!firstName) {
            $scope.errorMessage = "Please Enter a First Name";
        }
        else
        {
            fd.append('username', userName);
            fd.append('firstname', firstName);
            fd.append('lastname', lastName);
            fd.append('password', password);
            fd.append('blockStatus', blockStatus);
            fd.append('token', token);

            $http.post($rootScope.STATIC_URL + 'admins/addSubadmin', fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}

            }).success(function (response) {
                if (response.status == 1)
                {

                    //$scope.subAdmins.push(response.data);
                    //$scope.subAdmins.unshift(response.data);
                    //To get full active admin list
                    $http.post($rootScope.STATIC_URL + 'admins/getSubadminList', {token: token}).success(function (response) {
                        if (response.status == 1)
                        {
                            $scope.subAdmins = response.data;
                            $scope.numberOfPages = function () {
                                return Math.ceil(($scope.subAdmins).length / $scope.pageSize);
                            }
                        }
                    });
                    var index = $scope.index;

                    //console.log($scope.subAdmins.username);
                    $('#newSubAdmin').modal('hide');
                    $scope.newUserName = "";
                    $scope.newFirstName = "";
                    $scope.newLastName = "";
                    $scope.newPassword = "";
                    $scope.newBlockStatus = "";
                }
            })
                    .error(function () {
                        $scope.errorMessage = "Please Try Again";
                    });

        }
    }


// Update Block Status
    $scope.updateBlockStatus = function ($event, adminId) {

        var blockStatus = $event.currentTarget.id;

        if (!confirm('Are you sure to ' + blockStatus + ' this subAdmin?'))
        {
            $event.preventDefault();
        }
        else
        {
            console.log("$scope.subAdmins");
            console.log($scope.subAdmins);
            var returnedData = $.grep($scope.subAdmins, function (element, index) {
                return element.id == adminId;
            });
            console.log(blockStatus);
            request = {token: token, blockStatus: blockStatus, returnedData: returnedData[0]};
            console.log(request);


            $http.post($rootScope.STATIC_URL + 'admins/updateBlockStatus', {request: request}).success(function (response) {

                if (response.status == 1)
                {
                    //get full user details
                    $http.post($rootScope.STATIC_URL + 'admins/getSubadminList', {token: token}).success(function (response) {
                        if (response.status == 1)
                        {
                            $scope.subAdmins = response.data;
                            $scope.numberOfPages = function () {
                                return Math.ceil(($scope.subAdmins).length / $scope.pageSize);
                            }
                        }
                    }).error(function () {
                        $scope.errorMessage = "Please Try Again";
                    });

                }

            }).error(function () {
                $scope.errorMessage = "Please Try Again";
            });
        }
    }

//Edit Subadmin

    $scope.editSubAdmin = function (adminId, index, currentPage, pageSize)
    {


        request = {adminId: adminId};
        $scope.index = index;
        $scope.extra = parseInt(currentPage) * parseInt(pageSize);
        //get details of a single user
        $http.post($rootScope.STATIC_URL + 'admins/getSubadminDetails', {request: request, token: token}).success(function (response) {
            if (response.status == 1)
            {
                $scope.editSubAdminDetails = response.data;
            }

        }).error(function () {
            $scope.errorMessage = "Please Try Again";
        });

    }

//Update Subadmin details
    $scope.updateSubAdminDetails = function ()
    {

        var id = $scope.editSubAdminDetails.id;
        var userName = $scope.editSubAdminDetails.username;
        var firstName = $scope.editSubAdminDetails.firstname;
        var lastName = $scope.editSubAdminDetails.lastname;
        var password = $scope.editSubAdminDetails.password;
        var blockStatus = $scope.editSubAdminDetails.blockStatus;
        var adminType = $scope.editSubAdminDetails.adminType;
        var index = $scope.index;


        if (!userName && !password && !firstName) {
            $scope.errorMessage = "Please Enter all fields";
        }
        else if (!userName) {
            $scope.errorMessage = "Please Enter a Username";
        }
        else if (!password) {
            $scope.errorMessage = "Please Enter a Password";
        }
        else if (!firstName) {
            $scope.errorMessage = "Please Enter a First Name";
        }
        else {



            var fd = new FormData();
            fd.append('username', userName);
            fd.append('firstname', firstName);
            fd.append('lastname', lastName);
            fd.append('password', password);
            fd.append('blockStatus', blockStatus);
            fd.append('adminType', adminType);
            fd.append('id', id);
            fd.append('token', token);

            $http.post($rootScope.STATIC_URL + 'admins/updateAdminDetails', fd,
                    {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    }).success(function (response) {

                index = $scope.index + $scope.extra;
                $scope.subAdmins[index].username = userName;
                $scope.subAdmins[index].firstname = firstName;
                $scope.subAdmins[index].lastname = lastName;
                $scope.subAdmins[index].password = password;
                $scope.subAdmins[index].blockStatus = blockStatus;
                $scope.subAdmins[index].adminType = adminType;

                $('#editSubAdmin').modal('hide');

            }).error(function () {
                $scope.errorMessage = "Please Try Again";
            });


        }
    }

    /*
     //Privileges of SubAdmin
     $scope.subAdminPrivileges = function(adminId)
     {
     
     request           = {adminId : adminId};
     //get Privileges of a single user
     $http.post($rootScope.STATIC_URL+'admins/getSubadminPrivileges',{request:request, token:token}).success(function(response) {
     if(response.status == 1)
     {
     console.log(response);
     $scope.editSubAdminDetails = response.data;
     }
     
     }).error(function(){
     $scope.errorMessage = "Please Try Again";
     });
     
     }
     */

});

/*===================================================================================================================================
 Sub Admin Details Controller   -----
 ====================================================================================================================================*/


adminControllers.controller('subAdminDetailsCtrl', function ($scope, $routeParams, $rootScope, $http, $location, $window, $filter) {

    $rootScope.adminNavigation = 1;
    $scope.errorMessage = "";
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    var adminId = $routeParams.adminId;
    var request = "";
    var token = $window.sessionStorage.token;
    console.log(token);

    request = {adminId: adminId};



    //get Privileges of a single user
    $http.post($rootScope.STATIC_URL + 'admins/getSubadminPrivileges', {request: request, token: token}).success(function (response) {
        if (response.status == 1)
        {
            $scope.subAdminPrivileges = response.data;

            $scope.numberOfPages = function () {
                return Math.ceil(($scope.subAdminPrivileges).length / $scope.pageSize);
            }
        }


    }).error(function () {
        $scope.errorMessage = "Please Try Again";
    });



// Get All Privileges
    $scope.getAllPrivileges = function ()
    {

        /*request = {adminId : adminId};
         $scope.index      = index;
         $scope.extra      = parseInt(currentPage)*parseInt(pageSize);*/
        //get details of a single user
        $http.post($rootScope.STATIC_URL + 'adminprivileges/getPrivilegesList', {token: token}).success(function (response) {
            if (response.status == 1)
            {
                console.log("All Privileges");
                console.log(response);
                $scope.privileges = response.data;
            }

        }).error(function () {
            $scope.errorMessage = "Please Try Again";
        });
    }

    /* ****************************************************Need To Complete *************/
// Get All Remaining Privileges
    $scope.getRemainingPrivileges = function ()
    {

        /*request = {adminId : adminId};
         $scope.index      = index;
         $scope.extra      = parseInt(currentPage)*parseInt(pageSize);*/

        request = {adminId: adminId};
        //get Remaining Privileges of sub Admin
        $http.post($rootScope.STATIC_URL + 'admins/getRemainingPrivilegesList', {request: request, token: token}).success(function (response) {
            if (response.status == 1)
            {
                console.log("All Remaining Privileges");
                console.log(response);
                $scope.subAdminRemainingPrivileges = response.data;
                console.log($scope.subAdminRemainingPrivileges);
            }

        }).error(function () {
            $scope.errorMessage = "Please Try Again";
        });


    }



    $scope.selectedSAPrivilege = function () {
        $scope.checkedSAPrivilege = $filter('filter')($scope.subAdminRemainingPrivileges, {checked: true});

    }


//Add New Sub Admin Privilege
    $scope.addNewSubAdminPrivileges = function () {

        //$scope.newPrivilegeName = {};
        var chkPrivilegeArray = $scope.checkedSAPrivilege;
        console.log("Selected CheckBOx");
        console.log(adminId);

        console.log("chkPrivilegeArray   ===============");
        console.log(chkPrivilegeArray);

        request = {chkPrivilegeArray: chkPrivilegeArray, adminId: adminId};
        $http.post($rootScope.STATIC_URL + 'admins/setSubadminPrivilege', {request: request, token: token})
                .success(function (response) {
                    if (response.status == 1)
                    {


                        request = {adminId: adminId};
                        //get Privileges of a single user
                        $http.post($rootScope.STATIC_URL + 'admins/getSubadminPrivileges', {request: request, token: token}).success(function (response) {
                            if (response.status == 1)
                            {
                                console.log("subAdminPrivileges  ");
                                console.log(response);
                                $scope.subAdminPrivileges = response.data;
                            }

                        }).error(function () {
                            $scope.errorMessage = "Please Try Again";
                        });
                        var index = $scope.index;


                        //console.log($scope.subAdmins.username);
                        $('#newSubAdminPrivilege').modal('hide');

                    }
                })
                .error(function () {
                    $scope.errorMessage = "Please Try Again";
                });


    }



    $scope.deleteSubAdminPrivilege = function ($event, prvlLogId) {

        if (!confirm('Are you sure to delete this Privilege?'))
        {
            $event.preventDefault();
        }
        else
        {
            console.log("prvlLogId  ------------");
            console.log(prvlLogId);
            //request = {token : token, privilegeId: privilegeId};

            $http.post($rootScope.STATIC_URL + 'admins/deleteSubadminPrivilege', {id: prvlLogId, token: token}).success(function (response) {

                if (response.status == 1)
                {
                    //console.log(response);

                    request = {adminId: adminId};
                    //get Privileges of a single user
                    $http.post($rootScope.STATIC_URL + 'admins/getSubadminPrivileges', {request: request, token: token}).success(function (response) {
                        if (response.status == 1)
                        {
                            console.log("subAdminPrivileges  ");
                            console.log(response);
                            $scope.subAdminPrivileges = response.data;
                        }

                    }).error(function () {
                        $scope.errorMessage = "Please Try Again";
                    });
                }


            }).error(function () {
                $scope.errorMessage = "Please Try Again";
            });

        }

    }

});


/*===================================================================================================================================
 Privileges Controller   -----
 ====================================================================================================================================*/

adminControllers.controller('privilegesCtrl', function ($scope, $routeParams, $rootScope, $http, $location, $window) {

    $rootScope.adminNavigation = 1;
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.errorMessage = "";

    var adminId = $routeParams.adminId;
    var request = "";
    var token = $window.sessionStorage.token;
    console.log(token);

    request = {adminId: adminId};


    //List All Privileges
    $http.post($rootScope.STATIC_URL + 'adminprivileges/getPrivilegesList', {token: token}).success(function (response) {
        if (response.status == 1)
        {
            console.log("All Privileges");
            console.log(response);
            $scope.privileges = response.data;
        }

    }).error(function () {
        $scope.errorMessage = "Please Try Again";
    });

//Add New Privilege

    $scope.addNewPrivilege = function () {
        console.log("Add Clicked");
        $scope.errorMessage = "";

        var fd = new FormData();
        var name = $scope.newName;
        var description = $scope.newDescription;


        if (!name && !description) {
            $scope.errorMessage = "Please Enter all fields";
        }
        else if (!name) {
            $scope.errorMessage = "Please Enter a Name";
        }
        else if (!description) {
            $scope.errorMessage = "Please Enter a Description";
        }
        else
        {
            fd.append('name', name);
            fd.append('description', description);
            fd.append('token', token);

            $http.post($rootScope.STATIC_URL + 'adminprivileges/addPrivilege', fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}

            }).success(function (response) {
                if (response.status == 1)
                {
                    //List All Privileges
                    $http.post($rootScope.STATIC_URL + 'adminprivileges/getPrivilegesList', {token: token}).success(function (response) {
                        if (response.status == 1)
                        {
                            console.log("All Privileges");
                            console.log(response);
                            $scope.privileges = response.data;
                        }

                    }).error(function () {
                        $scope.errorMessage = "Please Try Again";
                    });

                    var index = $scope.index;
                    $('#newPrivilege').modal('hide');
                    $scope.newName = "";
                    $scope.newDescription = "";
                }
            })
                    .error(function () {
                        $scope.errorMessage = "Please Try Again";
                    });

        }
    }

//Edit Privilege

    $scope.editPrivilege = function (privilegeId, index, currentPage, pageSize)
    {
        $scope.errorMessage = "";
        request = {privilegeId: privilegeId};
        $scope.index = index;
        $scope.extra = parseInt(currentPage) * parseInt(pageSize);

        //get current privilege
        $http.post($rootScope.STATIC_URL + 'adminprivileges/getPrivilegeDetails', {request: request, token: token}).success(function (response) {
            if (response.status == 1)
            {
                $scope.editPrivilegeDetails = response.data;
            }

        }).error(function () {
            $scope.errorMessage = "Please Try Again";
        });

    }



//Update Privilege details
    $scope.updatePrivilegeDetails = function ()
    {
        console.log("Entered Update Privilege");
        var id = $scope.editPrivilegeDetails.id;
        var name = $scope.editPrivilegeDetails.name;
        var description = $scope.editPrivilegeDetails.description;
        var index = $scope.index;


        if (!name && !description) {
            $scope.errorMessage = "Please Enter all fields";
        }
        else if (!name) {
            $scope.errorMessage = "Please Enter a Name";
        }
        else if (!description) {
            $scope.errorMessage = "Please Enter a Description";
        }
        else
        {

            var fd = new FormData();
            fd.append('name', name);
            fd.append('description', description);
            fd.append('id', id);
            fd.append('token', token);

            $http.post($rootScope.STATIC_URL + 'adminprivileges/updatePrivilegeDetails', fd,
                    {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    }).success(function (response) {

                index = $scope.index + $scope.extra;
                $scope.privileges[index].name = name;
                $scope.privileges[index].description = description;

                $('#editPrivilege').modal('hide');

            }).error(function () {
                $scope.errorMessage = "Please Try Again";
            });


        }
    }




//Delete Privilege

    $scope.deletePrivilege = function ($event, privilegeId) {

        if (!confirm('Are you sure to delete this Privilege?'))
        {
            $event.preventDefault();
        }
        else
        {
            request = {token: token, privilegeId: privilegeId};

            $http.post($rootScope.STATIC_URL + 'adminprivileges/deletePrivilege', {request: request}).success(function (response) {

                if (response.status == 1)
                {
                    console.log(response);

                    //Get All privileges
                    $http.post($rootScope.STATIC_URL + 'adminprivileges/getPrivilegesList', {token: token}).success(function (response) {
                        if (response.status == 1)
                        {
                            $scope.privileges = response.data;
                        }

                    }).error(function () {
                        $scope.errorMessage = "Please Try Again";
                    });
                }

            }).error(function () {
                $scope.errorMessage = "Please Try Again";
            });
        }
    }


});


/*===================================================================================================================================
 Settings Controller   -----
 ====================================================================================================================================*/

adminControllers.controller('settingsCtrl', function ($scope, $routeParams, $rootScope, $http, $location, $window) {

    $rootScope.adminNavigation = 1;
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.errorMessage = "";

    var request = "";
    var token = $window.sessionStorage.token;

    //List All Settings
    $http.post($rootScope.STATIC_URL + 'settings/getSettingsList', {token: token}).success(function (response) {
        if (response.status == 1)
        {
            $scope.settings = response.data;
        }

    }).error(function () {
        $scope.errorMessage = "Please Try Again";
    });


//Edit Settings
    $scope.editSettings = function (settingsId, index, currentPage, pageSize)
    {
        $scope.errorMessage = "";
        request = {settingsId: settingsId};
        $scope.index = index;
        $scope.extra = parseInt(currentPage) * parseInt(pageSize);

        //get Settings List
        $http.post($rootScope.STATIC_URL + 'settings/getSettingsDetails', {request: request, token: token}).success(function (response) {
            if (response.status == 1)
            {
                $scope.editSettingsDetails = response.data;
                console.log($scope.editSettingsDetails);
            }

        }).error(function () {
            $scope.errorMessage = "Please Try Again";
        });

    }


//Update Settings
    $scope.updateSettingsDetails = function ()
    {
        var id = $scope.editSettingsDetails.id;
        var key = $scope.editSettingsDetails.key;
        var value = $scope.editSettingsDetails.value;
        var index = $scope.index;


        if (!value) {
            $scope.errorMessage = "Please Enter a Value";
        }
        else
        {

            var fd = new FormData();
            fd.append('key', key);
            fd.append('value', value);
            fd.append('id', id);
            fd.append('token', token);

            $http.post($rootScope.STATIC_URL + 'settings/updateSettingsDetails', fd,
                    {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    }).success(function (response) {

                index = $scope.index + $scope.extra;
                $scope.settings[index].value = value;

                $('#editSettings').modal('hide');

            }).error(function () {
                $scope.errorMessage = "Please Try Again";
            });


        }
    }


});

/*===================================================================================================================================
 Manage CMS Page Controller   -----
 ====================================================================================================================================*/

adminControllers.controller('manageCmsPageCtrl', function ($scope, $routeParams, $rootScope, $http, $location, $window) {

    console.log("manageCmsPageCtrl");
    $rootScope.adminNavigation = 1;
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.errorMessage = "";
    var request = "";
    var token = $window.sessionStorage.token;
    var userRole = "admin";

    //To get full active CMS Page list
    $http.post($rootScope.STATIC_URL + 'cmspage/getCmsPageList', {token: token}).success(function (response) {
        console.log("getCmsPageList   ---- inside");
        console.log(response);
        if (response.status == 1) {
            $scope.cmsPages = response.data;
            $scope.numberOfPages = function () {
                return Math.ceil(($scope.cmsPages).length / $scope.pageSize);
            }
        } else if (response.status == 3) {

            //$scope.errorMessage = "Token Expired";
            $window.location.href = $rootScope.STATIC_URL + 'admin/login';
        }


    });


    //Add New CMS Page
    $scope.addNewCmsPage = function () {

        var fd = new FormData();
        var pageName = $scope.newPageName;
        var content = $scope.newContent;

        if (!pageName && !content) {
            $scope.errorMessage = "Please Enter all fields";
        }
        else if (!pageName) {
            $scope.errorMessage = "Please Enter a PageName";
        }
        else if (!content) {
            $scope.errorMessage = "Please Enter a Content";
        }
        else
        {
            fd.append('pageName', pageName);
            fd.append('content', content);
            fd.append('token', token);

            $http.post($rootScope.STATIC_URL + 'cmspage/addCmsPage', fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}

            }).success(function (response) {
                if (response.status == 1)
                {

                    //To get full active CMS Page list
                    $http.post($rootScope.STATIC_URL + 'cmspage/getCmsPageList', {token: token}).success(function (response) {
                        if (response.status == 1)
                        {
                            $scope.cmsPages = response.data;
                            $scope.numberOfPages = function () {
                                return Math.ceil(($scope.cmsPages).length / $scope.pageSize);
                            }
                        }
                    });
                    var index = $scope.index;

                    //console.log($scope.subAdmins.username);
                    $('#newCmsPage').modal('hide');
                    $scope.newPageName = "";
                    $scope.newContent = "";

                }
            }).error(function () {
                $scope.errorMessage = "Please Try Again";
            });

        }
    }


// Update Status
    $scope.updateCmsPageStatus = function ($event, cmsPageId) {

        var cmsPageStatus = $event.currentTarget.id;

        if (!confirm('Are you sure to ' + cmsPageStatus + ' this subAdmin?'))
        {
            $event.preventDefault();
        }
        else
        {
            var returnedData = $.grep($scope.cmsPages, function (element, index) {
                return element.id == cmsPageId;
            });

            request = {token: token, cmsPageStatus: cmsPageStatus, returnedData: returnedData[0]};

            $http.post($rootScope.STATIC_URL + 'cmspage/updateCmsPageStatus', {request: request}).success(function (response) {
                if (response.status == 1)
                {
                    //To get full active Ad Page list
                    $http.post($rootScope.STATIC_URL + 'cmspage/getCmsPageList', {token: token}).success(function (response) {
                        if (response.status == 1)
                        {
                            $scope.cmsPages = response.data;
                            $scope.numberOfPages = function () {
                                return Math.ceil(($scope.cmsPages).length / $scope.pageSize);
                            }
                        }
                    });
                }

            }).error(function () {
                $scope.errorMessage = "Please Try Again";
            });
        }
    }


    //Delete CMS Page

    $scope.deleteCmsPage = function ($event, cmsPageId) {

        if (!confirm('Are you sure to delete this CMS Page?'))
        {
            $event.preventDefault();
        }
        else
        {
            request = {token: token, cmsPageId: cmsPageId};

            $http.post($rootScope.STATIC_URL + 'cmspage/deleteCmsPage', {request: request}).success(function (response) {

                if (response.status == 1)
                {
                    console.log(response);

                    //To get full active CMS Page list
                    $http.post($rootScope.STATIC_URL + 'cmspage/getCmsPageList', {token: token}).success(function (response) {
                        if (response.status == 1)
                        {
                            $scope.cmsPages = response.data;
                            $scope.numberOfPages = function () {
                                return Math.ceil(($scope.cmsPages).length / $scope.pageSize);
                            }
                        }
                    });
                }

            }).error(function () {
                $scope.errorMessage = "Please Try Again";
            });
        }
    }

});


/*===================================================================================================================================
 CMS Page Details Controller   -----
 ====================================================================================================================================*/

adminControllers.controller('cmsPageDetailsCtrl', function ($scope, $routeParams, $rootScope, $http, $location, $window) {

    console.log("cmsPageDetailsCtrl");
    $rootScope.adminNavigation = 1;
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.errorMessage = "";
    var request = "";
    var token = $window.sessionStorage.token;
    var userRole = "admin";
    var cmsPageId = $routeParams.cmsPageId;

    request = {cmsPageId: cmsPageId};

//get Cms Page Details
    $http.post($rootScope.STATIC_URL + 'cmspage/getCmsPageDetails', {request: request, token: token, userRole: userRole}).success(function (response) {
        console.log(response);
        if (response.status == 1)
        {
            $scope.editCmsPageDetails = response.data;
        }

    }).error(function () {
        $scope.errorMessage = "Please Try Again";
    });


//Update CMS Page details
    $scope.updateCmsPageDetails = function ()
    {


        var id = $scope.editCmsPageDetails.id;
        var pageName = $scope.editCmsPageDetails.pageName;
        var content = $scope.editCmsPageDetails.content;
        var index = $scope.index;


        if (!pageName && !content) {
            $scope.errorMessage = "Please Enter all fields";
        }
        else if (!pageName) {
            $scope.errorMessage = "Please Enter a Page Name";
        }
        else if (!content) {
            $scope.errorMessage = "Please Enter a Content";
        }
        else
        {

            var fd = new FormData();
            fd.append('pageName', pageName);
            fd.append('content', content);
            fd.append('id', id);
            fd.append('token', token);
            console.log("fd--------------");
            console.log(content);
            $http.post($rootScope.STATIC_URL + 'cmspage/updateCmsPageDetails', fd,
                    {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    }).success(function (response) {

                $scope.successMessage = "Successfully Updated";


            }).error(function () {
                $scope.errorMessage = "Please Try Again";
            });


        }
    }

});


/*===================================================================================================================================
 Manage Ad Page Controller   -----
 ====================================================================================================================================*/
adminControllers.controller('manageAdPageCtrl', function ($scope, $routeParams, $rootScope, $http, $location, $window) {

    $rootScope.adminNavigation = 1;
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.errorMessage = "";
    var request = "";
    var token = $window.sessionStorage.token;
    var userRole = "admin";

    //To get full active AD Page list
    $http.post($rootScope.STATIC_URL + 'adpage/getAdPageList', {token: token}).success(function (response) {
        console.log("getAdPageList   ---- inside");
        console.log(response);
        if (response.status == 1) {
            $scope.adPages = response.data;
            $scope.numberOfPages = function () {
                return Math.ceil(($scope.adPages).length / $scope.pageSize);
            }
        } else if (response.status == 3) {

            //$scope.errorMessage = "Token Expired";
            $window.location.href = $rootScope.STATIC_URL + 'admin/login';
        }


    });
    /*
     //Add New Ad Page
     $scope.addNewAdPage = function () {
     
     var fd              = new FormData();
     var name            = $scope.newName;
     var description     = $scope.newDescription;
     var cost            = $scope.newCost;
     
     if (!name && !description && !cost) {
     $scope.errorMessage = "Please Enter all fields";
     }
     else if (!name) {
     $scope.errorMessage = "Please Enter a Name";
     }
     else if (!description) {
     $scope.errorMessage = "Please Enter a Description";
     }
     else if (!cost) {
     $scope.errorMessage = "Please Enter a Cost";
     }
     else
     {
     fd.append('name', name);
     fd.append('description', description);
     fd.append('cost', cost);
     fd.append('token', token);
     
     $http.post($rootScope.STATIC_URL + 'adpage/createAdPage', fd, {
     transformRequest: angular.identity,
     headers: {'Content-Type': undefined}
     
     }).success(function (response) {
     if (response.status == 1)
     {
     
     //To get full active Ad Page list
     $http.post($rootScope.STATIC_URL + 'adpage/getAdPageList', {token: token}).success(function (response) {
     if (response.status == 1)
     {
     $scope.adPages = response.data;
     $scope.numberOfPages = function () {
     return Math.ceil(($scope.adPages).length / $scope.pageSize);
     }
     }
     });
     var index = $scope.index;
     
     //console.log($scope.subAdmins.username);
     $('#newAdPage').modal('hide');
     $scope.newName                  = "";
     $scope.newDescription           = "";
     $scope.newCost                  = "";
     $scope.errorMessage             = "";
     
     }
     }).error(function () {
     $scope.errorMessage = "Please Try Again";
     });
     
     }
     }
     */
//Edit Ad Page

    $scope.editAdPages = function (adPageId, index, currentPage, pageSize)
    {
        console.log("editAdPages   >>>");

        $scope.errorMessage = "";
        request = {adPageId: adPageId};
        $scope.index = index;
        $scope.extra = parseInt(currentPage) * parseInt(pageSize);

        //get Cms Page Details
        $http.post($rootScope.STATIC_URL + 'adpage/getAdPageDetails', {request: request, token: token, userRole: userRole}).success(function (response) {
            console.log(response);
            if (response.status == 1)
            {
                $scope.editAdPageDetails = response.data;
            }

        }).error(function () {
            $scope.errorMessage = "Please Try Again";
        });

    }

//Update Ad Page details
    $scope.updateAdPageDetails = function ()
    {

        var id = $scope.editAdPageDetails.id;
        var name = $scope.editAdPageDetails.name;
        var description = $scope.editAdPageDetails.description;
        var cost = $scope.editAdPageDetails.cost;
        var index = $scope.index;


        if (!cost || isNaN(cost)) {
            $scope.errorMessage = "Please Enter a Valid Cost";
        }
        else
        {

            var fd = new FormData();
            fd.append('name', name);
            fd.append('description', description);
            fd.append('cost', cost);
            fd.append('id', id);
            fd.append('token', token);

            $http.post($rootScope.STATIC_URL + 'adpage/updateAdPageDetails', fd,
                    {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    }).success(function (response) {

                index = $scope.index + $scope.extra;
                $scope.adPages[index].name = name;
                $scope.adPages[index].description = description;
                $scope.adPages[index].cost = cost;


                $('#editAdPage').modal('hide');
                $scope.errorMessage = "";

            }).error(function () {
                $scope.errorMessage = "Please Try Again";
            });


        }
    }

    //Delete Ad Page
    $scope.deleteAdPage = function ($event, adPageId) {

        if (!confirm('Are you sure to delete this Ad Page?'))
        {
            $event.preventDefault();
        }
        else
        {
            request = {token: token, adPageId: adPageId};

            $http.post($rootScope.STATIC_URL + 'adpage/deleteAdPage', {request: request}).success(function (response) {

                if (response.status == 1)
                {
                    console.log(response);

                    //To get full active Ad Page list
                    $http.post($rootScope.STATIC_URL + 'adpage/getAdPageList', {token: token}).success(function (response) {
                        if (response.status == 1)
                        {
                            $scope.adPages = response.data;
                            $scope.numberOfPages = function () {
                                return Math.ceil(($scope.adPages).length / $scope.pageSize);
                            }
                        }
                    });
                }

            }).error(function () {
                $scope.errorMessage = "Please Try Again";
            });
        }
    }

// Update Status
    $scope.updateAdPageStatus = function ($event, adPageId) {

        var adPageStatus = $event.currentTarget.id;

        if (!confirm('Are you sure to ' + adPageStatus + ' this subAdmin?'))
        {
            $event.preventDefault();
        }
        else
        {
            var returnedData = $.grep($scope.adPages, function (element, index) {
                return element.id == adPageId;
            });

            request = {token: token, adPageStatus: adPageStatus, returnedData: returnedData[0]};
            console.log(adPageStatus);
            console.log(returnedData[0]);
            $http.post($rootScope.STATIC_URL + 'adpage/updateAdPageStatus', {request: request}).success(function (response) {

                if (response.status == 1)
                {
                    //To get full active Ad Page list
                    $http.post($rootScope.STATIC_URL + 'adpage/getAdPageList', {token: token}).success(function (response) {
                        if (response.status == 1)
                        {
                            $scope.adPages = response.data;
                            $scope.numberOfPages = function () {
                                return Math.ceil(($scope.adPages).length / $scope.pageSize);
                            }
                        }
                    });
                }

            }).error(function () {
                $scope.errorMessage = "Please Try Again";
            });
        }
    }



});


/*===================================================================================================================================
 Manage Ad Position Controller   -----
 ====================================================================================================================================*/
adminControllers.controller('manageAdPositionCtrl', function ($scope, $routeParams, $rootScope, $http, $location, $window) {

    $rootScope.adminNavigation = 1;
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.errorMessage = "";
    var request = "";
    var token = $window.sessionStorage.token;
    var userRole = "admin";

    //To get full active AD Position list
    $http.post($rootScope.STATIC_URL + 'adposition/getAdPositionList', {token: token}).success(function (response) {
        if (response.status == 1) {
            $scope.adPositions = response.data;
            $scope.numberOfPages = function () {
                return Math.ceil(($scope.adPositions).length / $scope.pageSize);
            }
        } else if (response.status == 3) {

            //$scope.errorMessage = "Token Expired";
            $window.location.href = $rootScope.STATIC_URL + 'admin/login';
        }


    });

//Edit Ad Page

    $scope.editAdPositions = function (adPositionId, index, currentPage, pageSize)
    {

        $scope.errorMessage = "";
        request = {adPositionId: adPositionId};
        $scope.index = index;
        $scope.extra = parseInt(currentPage) * parseInt(pageSize);

        //get Cms Page Details
        $http.post($rootScope.STATIC_URL + 'adposition/getAdPositionDetails', {request: request, token: token, userRole: userRole}).success(function (response) {
            console.log(response);
            if (response.status == 1)
            {
                $scope.editAdPositionDetails = response.data;
            }

        }).error(function () {
            $scope.errorMessage = "Please Try Again";
        });

    }

//Update Ad Position details
    $scope.updateAdPositionDetails = function ()
    {

        var id = $scope.editAdPositionDetails.id;
        var name = $scope.editAdPositionDetails.name;
        var description = $scope.editAdPositionDetails.description;
        var cost = $scope.editAdPositionDetails.cost;
        var index = $scope.index;


        if (!cost || isNaN(cost)) {
            $scope.errorMessage = "Please Enter a Valid Cost";
        }
        else
        {

            var fd = new FormData();
            fd.append('name', name);
            fd.append('description', description);
            fd.append('cost', cost);
            fd.append('id', id);
            fd.append('token', token);

            $http.post($rootScope.STATIC_URL + 'adposition/updateAdPositionDetails', fd,
                    {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    }).success(function (response) {

                index = $scope.index + $scope.extra;
                $scope.adPages[index].name = name;
                $scope.adPages[index].description = description;
                $scope.adPages[index].cost = cost;


                $('#editAdPosition').modal('hide');
                $scope.errorMessage = "";

            }).error(function () {
                $scope.errorMessage = "Please Try Again";
            });


        }
    }

    //Delete Ad Position
    $scope.deleteAdPosition = function ($event, adPositionId) {

        if (!confirm('Are you sure to delete this Ad Position?'))
        {
            $event.preventDefault();
        }
        else
        {
            request = {token: token, adPositionId: adPositionId};

            $http.post($rootScope.STATIC_URL + 'adposition/deleteAdPosition', {request: request}).success(function (response) {

                if (response.status == 1)
                {
                    console.log(response);

                    //To get full active Ad Position list
                    $http.post($rootScope.STATIC_URL + 'adposition/getAdPositionList', {token: token}).success(function (response) {
                        if (response.status == 1)
                        {
                            $scope.adPositions = response.data;
                            $scope.numberOfPages = function () {
                                return Math.ceil(($scope.adPositions).length / $scope.pageSize);
                            }
                        }
                    });
                }

            }).error(function () {
                $scope.errorMessage = "Please Try Again";
            });
        }
    }

// Update Status
    $scope.updateAdPositionStatus = function ($event, adPositionId) {

        var adPositionStatus = $event.currentTarget.id;

        if (!confirm('Are you sure to ' + adPositionStatus + ' this subAdmin?'))
        {
            $event.preventDefault();
        }
        else
        {
            var returnedData = $.grep($scope.adPositions, function (element, index) {
                return element.id == adPositionId;
            });

            request = {token: token, adPositionStatus: adPositionStatus, returnedData: returnedData[0]};
            $http.post($rootScope.STATIC_URL + 'adposition/updateAdPositionStatus', {request: request}).success(function (response) {

                if (response.status == 1)
                {
                    //To get full active Ad Position list
                    $http.post($rootScope.STATIC_URL + 'adposition/getAdPositionList', {token: token}).success(function (response) {
                        if (response.status == 1)
                        {
                            $scope.adPositions = response.data;
                            $scope.numberOfPages = function () {
                                return Math.ceil(($scope.adPositions).length / $scope.pageSize);
                            }
                        }
                    });
                }

            }).error(function () {
                $scope.errorMessage = "Please Try Again";
            });
        }
    }



});


/*===================================================================================================================================
 Manage Ad User Controller   -----
 ====================================================================================================================================*/
adminControllers.controller('manageAdUserCtrl', function ($scope, $routeParams, $rootScope, $http, $location, $window) {


    console.log("manageAdUserCtrl   >>>>>>>>>>>");
    $rootScope.adminNavigation = 1;
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.errorMessage = "";
    var request = "";
    var token = $window.sessionStorage.token;
    var userRole = "admin";

    //To get full User Ad list
    $http.post($rootScope.STATIC_URL + 'aduser/getAdUserList', {token: token, userRole: userRole}).success(function (response) {

        if (response.status == 1) {
            $scope.adUsers = response.data;
            $scope.numberOfPages = function () {
                return Math.ceil(($scope.adUsers).length / $scope.pageSize);
            }
        } else if (response.status == 3) {

            //$scope.errorMessage = "Token Expired";
            $window.location.href = $rootScope.STATIC_URL + 'admin/login';
        }


    });

// Update Status
    $scope.updateAdUserStatus = function ($event, adUserId) {

        var adUserStatus = $event.currentTarget.id;

        if (!confirm('Are you sure to ' + adUserStatus + ' this subAdmin?'))
        {
            $event.preventDefault();
        }
        else
        {
            var returnedData = $.grep($scope.adUsers, function (element, index) {
                return element.id == adUserId;
            });

            request = {token: token, adUserStatus: adUserStatus, returnedData: returnedData[0]};
            $http.post($rootScope.STATIC_URL + 'aduser/updateAdUserStatus', {request: request}).success(function (response) {
                console.log("updateAdUserStatus     response ");
                console.log(response);
                if (response.status == 1)
                {
                    //To get full User Ad list
                    $http.post($rootScope.STATIC_URL + 'aduser/getAdUserList', {token: token, userRole: userRole}).success(function (response) {
                        if (response.status == 1) {
                            $scope.adUsers = response.data;
                            $scope.numberOfPages = function () {
                                return Math.ceil(($scope.adUsers).length / $scope.pageSize);
                            }
                        }
                    });
                }

            }).error(function () {
                $scope.errorMessage = "Please Try Again";
            });
        }
    }

// Update BannerType
    $scope.updateAdBannerType = function ($event, adUserId) {

        var adBannerType = $event.currentTarget.id;

        if (!confirm('Are you sure to ' + adBannerType + ' this subAdmin?'))
        {
            $event.preventDefault();
        }
        else
        {
            var returnedData = $.grep($scope.adUsers, function (element, index) {
                return element.id == adUserId;
            });

            request = {token: token, adBannerType: adBannerType, returnedData: returnedData[0]};
            $http.post($rootScope.STATIC_URL + 'aduser/updateAdBannerType', {request: request}).success(function (response) {
                console.log("updateAdBannerType     response ");
                console.log(response);
                if (response.status == 1)
                {
                    //To get full User Ad list
                    $http.post($rootScope.STATIC_URL + 'aduser/getAdUserList', {token: token, userRole: userRole}).success(function (response) {
                        if (response.status == 1) {
                            $scope.adUsers = response.data;
                            $scope.numberOfPages = function () {
                                return Math.ceil(($scope.adUsers).length / $scope.pageSize);
                            }
                        }
                    });
                }

            }).error(function () {
                $scope.errorMessage = "Please Try Again";
            });
        }
    }


});

/*===================================================================================================================================
 Ad User Details Controller   -----
 ====================================================================================================================================*/
adminControllers.controller('adUserDetailsCtrl', function ($scope, $routeParams, $rootScope, $http, $location, $window) {


    console.log("adUserDetailsCtrl   >>>>>>>>>>>");
    $rootScope.adminNavigation = 1;
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.errorMessage = "";
    var request = "";
    var token = $window.sessionStorage.token;
    var userRole = "admin";
    var userAdId = $routeParams.userAdId;

    request = {userAdId: userAdId};

    //get Ad User Details
    $http.post($rootScope.STATIC_URL + 'aduser/getAdUserDetails', {request: request, token: token, userRole: userRole}).success(function (response) {
        console.log(response);
        if (response.status == 1)
        {
            //$scope.editCmsPageDetails = response.data;
            $scope.adUsersDetails = response.data;
        }

    }).error(function () {
        $scope.errorMessage = "Please Try Again";
    });

});



/*===================================================================================================================================
 Manage Blog Controller   -----
 ====================================================================================================================================*/
adminControllers.controller('manageBlogCtrl', function ($scope, $routeParams, $rootScope, $http, $location, $window) {


    console.log("manageBlogCtrl   >>>>>>>>>>>");
    $rootScope.adminNavigation = 1;
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.errorMessage = "";
    var request = "";
    var token = $window.sessionStorage.token;
    var userRole = "admin";


    //get all Blog List
    $http.post($rootScope.STATIC_URL + 'blog/getBlogList', {request: request, token: token, userRole: userRole}).success(function (response) {
        console.log(response);
        if (response.status == 1)
        {
            $scope.blogs = response.data;

            $scope.numberOfPages = function () {
                return Math.ceil(($scope.blogs).length / $scope.pageSize);
            }

        }

    }).error(function () {
        $scope.errorMessage = "Please Try Again";
    });




//Add New Blog
    $scope.addNewBlog = function () {

        console.log("ENETERED ===========");
        $scope.errorMessage = "";

        var fd = new FormData();
        var title = $scope.newTitle;
        var description = $scope.newDescription;


        if (!title && !description) {
            $scope.errorMessage = "Please Enter all fields";
        }
        else if (!title) {
            $scope.errorMessage = "Please Enter a Title";
        }
        else if (!description) {
            $scope.errorMessage = "Please Enter a Description";
        }
        else
        {
            fd.append('title', title);
            fd.append('description', description);
            fd.append('userRole', userRole);
            fd.append('token', token);

            $http.post($rootScope.STATIC_URL + 'blog/addBlog', fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}

            }).success(function (response) {
                if (response.status == 1)
                {
                    //get all Blog List
                    $http.post($rootScope.STATIC_URL + 'blog/getBlogList', {request: request, token: token, userRole: userRole}).success(function (response) {
                        if (response.status == 1)
                        {
                            $scope.blogs = response.data;

                            $scope.numberOfPages = function () {
                                return Math.ceil(($scope.blogs).length / $scope.pageSize);
                            }
                        }

                    }).error(function () {
                        $scope.errorMessage = "Please Try Again";
                    });
                    var index = $scope.index;
                    $('#newBlog').modal('hide');
                    $scope.newTitle = "";
                    $scope.newDescription = "";
                }
            }).error(function () {
                $scope.errorMessage = "Please Try Again";
            });

        }

    }



// Update Status
    $scope.updateBlogStatus = function ($event, blogId) {

        var blogStatus = $event.currentTarget.id;

        if (!confirm('Are you sure to ' + blogStatus + ' this blog?'))
        {
            $event.preventDefault();
        }
        else
        {
            var returnedData = $.grep($scope.blogs, function (element, index) {
                return element.id == blogId;
            });

            request = {token: token, blogStatus: blogStatus, returnedData: returnedData[0]};

            $http.post($rootScope.STATIC_URL + 'blog/updateBlogStatus', {request: request}).success(function (response) {
                if (response.status == 1)
                {
                    //get all Blog List
                    $http.post($rootScope.STATIC_URL + 'blog/getBlogList', {request: request, token: token, userRole: userRole}).success(function (response) {
                        if (response.status == 1)
                        {
                            $scope.blogs = response.data;
                        }

                    }).error(function () {
                        $scope.errorMessage = "Please Try Again";
                    });
                }

            }).error(function () {
                $scope.errorMessage = "Please Try Again";
            });
        }
    }

    // Update ApprovalStatus
    $scope.updateApprovalStatus = function ($event, blogId) {

        var approvalStatus = $event.currentTarget.id;

        if (!confirm('Are you sure to ' + approvalStatus + ' this blog?'))
        {
            $event.preventDefault();
        }
        else
        {
            var returnedData = $.grep($scope.blogs, function (element, index) {
                return element.id == blogId;
            });

            request = {token: token, approvalStatus: approvalStatus, returnedData: returnedData[0]};

            $http.post($rootScope.STATIC_URL + 'blog/updateApprovalStatus', {request: request}).success(function (response) {
                if (response.status == 1)
                {
                    //get all Blog List
                    $http.post($rootScope.STATIC_URL + 'blog/getBlogList', {request: request, token: token, userRole: userRole}).success(function (response) {
                        if (response.status == 1)
                        {
                            $scope.blogs = response.data;
                        }

                    }).error(function () {
                        $scope.errorMessage = "Please Try Again";
                    });
                }

            }).error(function () {
                $scope.errorMessage = "Please Try Again";
            });
        }
    }

});


/*===================================================================================================================================
 Blog Details  Controller   -----
 ====================================================================================================================================*/
adminControllers.controller('blogDetailsCtrl', function ($scope, $routeParams, $rootScope, $http, $location, $window) {

    $rootScope.adminNavigation = 1;
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.errorMessage = "";
    var request = "";
    var token = $window.sessionStorage.token;
    var userRole = "admin";
    var blogId = $routeParams.blogId;

    request = {blogId: blogId};

    //get Ad User Details
    $http.post($rootScope.STATIC_URL + 'blog/getBlogDetails', {request: request, token: token, userRole: userRole}).success(function (response) {
        console.log(response);
        if (response.status == 1)
        {
            $scope.blogDetails = response.data;
        }

    }).error(function () {
        $scope.errorMessage = "Please Try Again";
    });


//Edit Blog

    $scope.editBlog = function (index, currentPage, pageSize)
    {
        $scope.errorMessage = "";
        request = {blogId: blogId};
        $scope.index = index;
        $scope.extra = parseInt(currentPage) * parseInt(pageSize);

        //get Blog Details
        $http.post($rootScope.STATIC_URL + 'blog/getBlogDetails', {request: request, token: token, userRole: userRole}).success(function (response) {
            console.log("get blog Details >>>>>>>>>>>");
            console.log(response);

            if (response.status == 1)
            {
                $scope.editBlogDetails = response.data;

            }

        }).error(function () {
            $scope.errorMessage = "Please Try Again";
        });

    }

    //Update Ad Position details
    $scope.updateBlogDetails = function ()
    {

        var id = $scope.editBlogDetails.id;
        var title = $scope.editBlogDetails.title;
        var description = $scope.editBlogDetails.description;
        var index = $scope.index;


        if (!title)
        {
            $scope.errorMessage = "Please Enter a Title";
        }
        else if (!description)
        {
            $scope.errorMessage = "Please Enter a Description";
        }
        else
        {

            var fd = new FormData();
            fd.append('title', title);
            fd.append('description', description);
            fd.append('id', id);
            fd.append('token', token);

            $http.post($rootScope.STATIC_URL + 'blog/updateBlogDetails', fd,
                    {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    }).success(function (response) {

                index = $scope.index + $scope.extra;
                $scope.blogDetails.title = title;
                $scope.blogDetails.description = description;

                $('#editBlog').modal('hide');
                $scope.errorMessage = "";

            }).error(function () {
                $scope.errorMessage = "Please Try Again";
            });


        }
    }

});


/*===================================================================================================================================
 Blog Comments  Controller   -----
 ====================================================================================================================================*/
adminControllers.controller('blogCommentsCtrl', function ($scope, $routeParams, $rootScope, $http, $location, $window) {

    $rootScope.adminNavigation = 1;
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.errorMessage = "";
    var request = "";
    var token = $window.sessionStorage.token;
    var userRole = "admin";
    var blogId = $routeParams.blogId;

    request = {blogId: blogId};

    //get Comment List
    $http.post($rootScope.STATIC_URL + 'blog/getBlogcommentList', {request: request, token: token, userRole: userRole}).success(function (response) {
        console.log(response);
        if (response.status == 1)
        {
            $scope.blogComments = response.data;

            $scope.numberOfPages = function () {
                return Math.ceil(($scope.blogComments).length / $scope.pageSize);
            }
        }

    }).error(function () {
        $scope.errorMessage = "Please Try Again";
    });


// Update ApprovalStatus
    $scope.updateBlogCommentApprovalStatus = function ($event, blogCommentId) {

        console.log("request   Entered ");
        console.log(blogCommentId);
        var approvalStatus = $event.currentTarget.id;

        if (!confirm('Are you sure to ' + approvalStatus + ' this blog?'))
        {
            $event.preventDefault();
        }
        else
        {

            request = {token: token, approvalStatus: approvalStatus, blogCommentId: blogCommentId};

            $http.post($rootScope.STATIC_URL + 'blog/updateBlogCommentApprovalStatus', {request: request}).success(function (response) {
                if (response.status == 1)
                {

                    request = {blogId: blogId};
                    //get Comment List
                    $http.post($rootScope.STATIC_URL + 'blog/getBlogcommentList', {request: request, token: token, userRole: userRole}).success(function (response) {
                        console.log(response);
                        console.log("response }}}}}}}}");
                        if (response.status == 1)
                        {
                            $scope.blogComments = response.data;
                        }

                    }).error(function () {
                        $scope.errorMessage = "Please Try Again";
                    });


                }

            }).error(function () {
                $scope.errorMessage = "Please Try Again";
            });
        }
    }


});





/*===================================================================================================================================
 Manage Poll  Controller   -----
 ====================================================================================================================================*/
adminControllers.controller('managePollCtrl', function ($scope, $routeParams, $rootScope, $http, $location, $window) {

    $rootScope.adminNavigation = 1;
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.errorMessage = "";
    var request = "";
    var token = $window.sessionStorage.token;
    var userRole = "admin";


    //get all Poll List
    $http.post($rootScope.STATIC_URL + 'poll/getPollList', {request: request, token: token, userRole: userRole}).success(function (response) {
        if (response.status == 1)
        {
            $scope.polls = response.data;
            $scope.numberOfPages = function () {
                return Math.ceil(($scope.polls).length / $scope.pageSize);
            }

        }

    }).error(function () {
        $scope.errorMessage = "Please Try Again";
    });



// Update Status
    $scope.updatePollStatus = function ($event, pollId) {
        var pollStatus = $event.currentTarget.id;

        if (!confirm('Are you sure to ' + pollStatus + ' this Poll?'))
        {
            $event.preventDefault();
        }
        else
        {
            var returnedData = $.grep($scope.polls, function (element, index) {
                return element.id == pollId;
            });

            request = {token: token, pollStatus: pollStatus, returnedData: returnedData[0]};

            $http.post($rootScope.STATIC_URL + 'poll/updatePollStatus', {request: request}).success(function (response) {
                if (response.status == 1)
                {
                    //get all Poll List
                    $http.post($rootScope.STATIC_URL + 'poll/getPollList', {request: request, token: token, userRole: userRole}).success(function (response) {
                        if (response.status == 1)
                        {
                            $scope.polls = response.data;
                            $scope.numberOfPages = function () {
                                return Math.ceil(($scope.polls).length / $scope.pageSize);
                            }

                        }

                    }).error(function () {
                        $scope.errorMessage = "Please Try Again";
                    });
                }

            }).error(function () {
                $scope.errorMessage = "Please Try Again";
            });
        }
    }


// Update ApprovalStatus
    $scope.updateApprovalStatus = function ($event, pollId) {

        var approvalStatus = $event.currentTarget.id;

        if (!confirm('Are you sure to ' + approvalStatus + ' this poll?'))
        {
            $event.preventDefault();
        }
        else
        {
            var returnedData = $.grep($scope.polls, function (element, index) {
                return element.id == pollId;
            });

            request = {token: token, approvalStatus: approvalStatus, returnedData: returnedData[0]};

            $http.post($rootScope.STATIC_URL + 'poll/updateApprovalStatus', {request: request}).success(function (response) {
                if (response.status == 1)
                {
                    //get all Poll List
                    $http.post($rootScope.STATIC_URL + 'poll/getPollList', {request: request, token: token, userRole: userRole}).success(function (response) {
                        if (response.status == 1)
                        {
                            $scope.polls = response.data;
                            $scope.numberOfPages = function () {
                                return Math.ceil(($scope.polls).length / $scope.pageSize);
                            }

                        }

                    }).error(function () {
                        $scope.errorMessage = "Please Try Again";
                    });
                }

            }).error(function () {
                $scope.errorMessage = "Please Try Again";
            });
        }
    }

});

/*===================================================================================================================================
 Add New Poll  Controller   -----
 ====================================================================================================================================*/
adminControllers.controller('addNewPollCtrl', function ($scope, $routeParams, $rootScope, $http, $location, $window) {

    $rootScope.adminNavigation = 1;
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.errorMessage = "";
    var request = "";
    var token = $window.sessionStorage.token;
    var userRole = "admin";



    $scope.qoptions = [];

    //Add new Dynamic Row
    $scope.addRow = function () {
        console.log("AddNew");
        if (!$scope.newAnswer) {
            $scope.errorMessage = "Please Enter a valid Option";
        } else {
            $scope.qoptions.push({'newAnswer': $scope.newAnswer});
            $scope.newAnswer = '';
            //console.log($scope.qoptions);
        }


    };

    //Remove Dynamic Row
    $scope.removeRow = function (newAnswer) {
        var index = -1;
        var comArr = eval($scope.qoptions);
        for (var i = 0; i < comArr.length; i++) {
            if (comArr[i].newAnswer === newAnswer) {
                index = i;
                break;
            }
        }
        if (index === -1) {
            alert("Something gone wrong");
        }
        $scope.qoptions.splice(index, 1);
    };


    //Add New Poll
    $scope.addNewPoll = function () {

        $scope.errorMessage = "";

        var fd = new FormData();
        var title = $scope.newTitle;
        var question = $scope.newQuestion;
        var ansOptionType = $scope.newAnsOptType;
        var answerOptions = $scope.qoptions;


        if (!title && !question && !answerOptions && !ansOptionType) {
            $scope.errorMessage = "Please Enter All Details";
        }
        else if (!title) {
            $scope.errorMessage = "Please Enter a Title";
        }
        else if (!question) {
            $scope.errorMessage = "Please Enter a Question";
        }
        else if (!ansOptionType) {
            $scope.errorMessage = "Please Select an Option Type";
        }
        else if (answerOptions.length == 0) {
            $scope.errorMessage = "Please Enter Options";
        }
        else
        {

            fd.append('title', title);
            fd.append('question', question);
            fd.append('ansOptionType', ansOptionType);
            fd.append('token', token);
            fd.append('userRole', userRole);
            for (var i = 0; i < answerOptions.length; i++) {
                fd.append('answerOptions', answerOptions[i].newAnswer);
            }

            $http.post($rootScope.STATIC_URL + 'poll/addpoll', fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}

            }).success(function (response) {
                if (response.status == 1)
                {
                    var index = $scope.index;
                    $scope.newTitle = "";
                    $scope.newQuestion = "";
                    $scope.newAnsOptType = "";
                    $scope.qoptions = "";
                    location.reload();
                }
            }).error(function () {
                $scope.errorMessage = "Please Try Again";
            });
        }
    }





});

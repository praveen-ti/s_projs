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

                console.log("EROOR _______________");

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
    console.log("<<<<<<<<<<<<<<<   subAdminDetailsCtrl   ");
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
        $http.post($rootScope.STATIC_URL+'admins/getSubadminPrivileges',{request:request, token:token}).success(function(response) {
            if(response.status == 1)
            {
                console.log("subAdminPrivileges  =======");
                console.log(response);
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
$scope.getRemainingPrivileges = function()
    {

        /*request = {adminId : adminId};
        $scope.index      = index;
        $scope.extra      = parseInt(currentPage)*parseInt(pageSize);*/

        request = {adminId : adminId};
        //get Remaining Privileges of sub Admin
            $http.post($rootScope.STATIC_URL+'admins/getRemainingPrivilegesList',{request : request,token:token}).success(function(response) {
                if(response.status == 1)
                {
                    console.log("All Remaining Privileges");
                    console.log(response);
                    $scope.subAdminRemainingPrivileges = response.data;
                    console.log($scope.subAdminRemainingPrivileges);
                }

            }).error(function(){
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

        request = {chkPrivilegeArray : chkPrivilegeArray, adminId : adminId};
                $http.post($rootScope.STATIC_URL+'admins/setSubadminPrivilege',{request : request, token:token})
                        .success(function(response) {
                            if(response.status == 1)
                            {


                                request           = {adminId : adminId};
                                //get Privileges of a single user
                                $http.post($rootScope.STATIC_URL+'admins/getSubadminPrivileges',{request:request, token:token}).success(function(response) {
                                    if(response.status == 1)
                                    {
                                        console.log("subAdminPrivileges  ");
                                        console.log(response);
                                        $scope.subAdminPrivileges = response.data;
                                    }

                                }).error(function(){
                                                     $scope.errorMessage = "Please Try Again";
                                });
                                var index          = $scope.index;


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

                        }).error(function(){
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

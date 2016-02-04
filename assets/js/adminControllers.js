'use strict';
/* adminControllers */

var adminControllers = angular.module('adminControllers', ['appServices']);


adminControllers.controller('RepeatCtrl', function RepeatController($scope) {

    $scope.number = ($scope.$index + 1) + ($scope.currentPage) * $scope.pageSize;

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

            }).error(function () {

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



/*===================================================================================================================================
 Manage Sub Admin Controller   -----  II
 ====================================================================================================================================*/

adminControllers.controller('manageSubAdminCtrl', function ($scope, $routeParams, $rootScope, $http, $location, $window) {

    $rootScope.adminNavigation = 1;
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    var request = "";

    var angParams = {
        token: $window.sessionStorage.token
    };

    $http.post($rootScope.STATIC_URL + 'admins/getSubadminList', angParams).success(function (response) {

        if (response.status == 1) {
            $scope.subAdmins = response.data;
            $scope.numberOfPages = function () {
                return Math.ceil(($scope.subAdmins).length / $scope.pageSize);
            }
        }

    });



//Add New Sub Admin
    $scope.addNewSubAdmin = function () {

        var fd = new FormData();
        var userName = $scope.newUserName;
        var firstName = $scope.newFirstName;
        var lastName = $scope.newLastName;
        var password = $scope.newPassword;
        var blockStatus = $scope.newBlockStatus;
        var token = $window.sessionStorage.token;

        $scope.newSubAdmin_error_message = '';
        $scope.newAddSubAdmin_error_message = '';


        if (userName && password && firstName && lastName && blockStatus)
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
                    console.log("Add success");
                    console.log(response);
                    console.log(response.data);

                    //$scope.subAdmins.push(response.data);
                    //$scope.subAdmins.unshift(response.data);
                    //To get full active admin list
                    $http.post($rootScope.STATIC_URL + 'admins/getSubadminList', angParams).success(function (response) {
                        console.log(response);
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
                        console.log("Add error");
                        $scope.newSubAdmin_error_message = "Error Occured while Posting";
                    });

        } else {
            $scope.newAddSubAdmin_error_message = "Please fill all the fields.";
        }
    }


// Update Block Status
    $scope.updateBlockStatus = function ($event, adminId) {

        var blockStatus = $event.currentTarget.id;

        if (!confirm('Are you sure to delete this subAdmin?'))
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
            request = {blockStatus: blockStatus, returnedData: returnedData[0]};
            console.log(request);


            $http.post($rootScope.STATIC_URL + 'admins/updateBlockStatus', {request: request}).success(function (response) {

                if (response.status == 1)
                {
                    //get full user details
                    var angParams = {
                        token: $window.sessionStorage.token
                    };
                    $http.post($rootScope.STATIC_URL + 'admins/getSubadminList', angParams).success(function (response) {
                        console.log(response);
                        if (response.status == 1)
                        {
                            $scope.subAdmins = response.data;
                            $scope.numberOfPages = function () {
                                return Math.ceil(($scope.subAdmins).length / $scope.pageSize);
                            }
                        }
                    });

                }

            });
        }
    }

//Edit Subadmin

    $scope.editSubAdmin = function (adminId, index, currentPage, pageSize)
    {
        request = adminId;
        $scope.index = index;
        $scope.extra = parseInt(currentPage) * parseInt(pageSize);
        //get details of a single user
        $http.post($rootScope.STATIC_URL + 'admins/getSubadminDetails', {request: request}).success(function (response) {

            if (response.status == 1)
            {
                $scope.editSubAdminDetails = response.data;
                console.log("$scope.editSubAdminDetails");
                console.log($scope.editSubAdminDetails);
            }

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
        var index = $scope.index;


        if (userName && firstName && lastName && password && blockStatus) {

            var fd = new FormData();
            fd.append('username', userName);
            fd.append('firstname', firstName);
            fd.append('lastname', lastName);
            fd.append('password', password);
            fd.append('blockStatus', blockStatus);
            fd.append('id', id);

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

                $('#editSubAdmin').modal('hide');

            });

        } else {
            $scope.editSubAdmin_error_message = "All the fields are required";
        }
    }



});

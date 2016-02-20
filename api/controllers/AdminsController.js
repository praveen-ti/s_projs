/**
 * AdminController
 *
 * @description :: Server-side logic for managing admins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var crypto = require('crypto');

var reviewConstants = sails.config.constants.review;
var adminConstants = sails.config.constants.admin;

module.exports = {
    /*===================================================================================================================================
     Get all subadmins
     ====================================================================================================================================*/

    getSubadminList: function (req, res) {

        AdmintokenService.checkToken(req.body.token, function (err, tokenCheck) {

            if (err)
            {
                return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
            }
            else
            {
                if (tokenCheck.status == 1)
                {

                    var query = "SELECT * FROM admin WHERE adminType =  '" + adminConstants.ADMIN_TYPE_SUBADMIN +"' AND blockStatus != '"+adminConstants.BLOCK_STATUS_DELETE+"' ORDER BY createdAt DESC";
                    console.log(query);
                    Admin.query(query, function (err, result) {
                        if (err)
                        {
                            return res.json(200, {status: 2, error_details: err});
                        }
                        else
                        {
                            //console.log(result);
                            return res.json(200, {status: 1, message: "success", data: result});
                        }
                    });
                }
                else
                {
                    return res.json(200, {status: 3, message: 'token expired'});
                }
            }
        });

    },
    /*===================================================================================================================================
     Get subadmin's details
     ====================================================================================================================================*/


    getSubadminDetails: function (req, res) {
var request = req.body.request;
console.log(request.adminId);
console.log(req.body.token);
        AdmintokenService.checkToken(req.body.token, function (err, tokenCheck) {

            if (err)
            {
                return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
            }
            else
            {
                console.log("Inside else  ");
                if (tokenCheck.status == 1)
                {
                    Admin.findOne({id: request.adminId}).exec(function findCB(err, result) {
                        if (err)
                        {
                            return res.json(200, {status: 2, error_details: err});
                        }
                        else
                        {
                            console.log(result);
                            return res.json(200, {status: 1, data: result});
                        }

                    });
                }
                else
                {
                    return res.json(200, {status: 3, message: 'token expired'});
                }
            }
        });
    },


    /*===================================================================================================================================
     Create/Add a subadmin
     ====================================================================================================================================*/


    addSubadmin: function (req, res) {

        AdmintokenService.checkToken(req.body.token, function (err, tokenCheck) {

            if (err)
            {
                return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
            }
            else
            {
                if (tokenCheck.status == 1)
                {
                    var password = crypto.createHash('md5').update(req.body.password).digest("hex");
                    var values = {
                        username: req.body.username,
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        password: password,
                        adminType: req.body.adminType,
                        blockStatus: req.body.blockStatus
                    };
                    Admin.create(values).exec(function (err, result) {
                        if (err)
                        {
                            return res.json(200, {status: 2, message: 'Some error occured', errorDetails: err});
                        } else
                        {
                            return res.json(200, {status: 1, message: 'success', data: result});
                        }
                    });
                }
                else
                {
                    return res.json(200, {status: 3, message: 'token expired'});
                }
            }
        });
    },
    /*===================================================================================================================================
     Edit admin
     ====================================================================================================================================*/


    updateAdminDetails: function (req, res) {

        AdmintokenService.checkToken(req.body.token, function (err, tokenCheck) {

            if (err)
            {
                return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
            }
            else
            {
                if (tokenCheck.status == 1)
                {
                var password = crypto.createHash('md5').update(req.body.password).digest("hex");
                    Admin.findOne({id: req.body.id}).exec(function findCB(err, result) {
                        if (err)
                        {
                            return res.json(200, {status: 2, error_details: err});
                        }
                        else
                        {
                            console.log(result);
                            var values = {
                                username: req.body.username,
                                firstname: req.body.firstname,
                                lastname: req.body.lastname,
                                password: password,
                                adminType: req.body.adminType,
                                blockStatus: req.body.blockStatus
                            };
                            //return res.json(200, {status: 1, message: 'success'});
                            var criteria = {id: result.id};
                            Admin.update(criteria, values).exec(function (err, updatedAdmin) {
                                if (err)
                                {
                                    return res.json(200, {status: 2, error_details: err});
                                }
                                else
                                {
                                    console.log("updatedAdmin-----------");
                                    console.log(updatedAdmin);
                                    return res.json(200, {status: 1, data: updatedAdmin});
                                }

                            });
                        }
                    });
                }
                else
                {
                    return res.json(200, {status: 3, message: 'token expired'});
                }

            }
        });
    },

 /*===================================================================================================================================
    Block Status update
    ====================================================================================================================================*/


    updateBlockStatus: function (req, res) {

console.log("updateBlockStatus <<<<<<<<<<<<>>>>>>>>>>>>>>>>>");

var request = req.body.request;
console.log(request);
        AdmintokenService.checkToken(request.token, function (err, tokenCheck) {

            if (err)
            {
                return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
            }
            else
            {
                if (tokenCheck.status == 1)
                {
                    Admin.findOne({id: request.returnedData.id}).exec(function findCB(err, result) {
                        if (err)
                        {
                            return res.json(200, {status: 2, error_details: err});
                        }
                        else
                        {
                            var values = {
                                 blockStatus: request.blockStatus
                            };
                            var criteria = {
                                              id          : result.id
                                            };
                            Admin.update(criteria, values).exec(function (err, updateStatus) {
                                if (err)
                                {
                                    return res.json(200, {status: 2, error_details: err});
                                }
                                else
                                {
                                    console.log(updateStatus);
                                    return res.json(200, {status: 1, data: updateStatus});
                                }

                            });
                        }
                    });
                }
                else
                {
                    return res.json(200, {status: 3, message: 'token expired'});
                }

            }
        });
    },


    /*===================================================================================================================================
     Delete a subadmin
     ====================================================================================================================================*/
    deleteSubadmin: function (req, res) {

      /*  AdmintokenService.checkToken(req.body.token, function (err, tokenCheck) {

            if (err)
            {
                return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
            }
            else
            {
                if (tokenCheck.status == 1)
                {*/
                    Admin.destroy({id: req.body.adminId}).exec(function deleteCB(err) {
                        if (err)
                        {
                            return res.json(200, {status: 2, error_details: err});
                        }
                        else
                        {
                            console.log("success");
                            console.log(req.body.adminId);
                            return res.json(200, {status: 1, message: 'success'});
                        }

                    });
               /* }
                else
                {
                    return res.json(200, {status: 3, message: 'token expired'});
                }
            }
        });*/
    },

/*===================================================================================================================================
     Get RemainingPrivilegesList of SubAdmin
   ====================================================================================================================================*/


    getRemainingPrivilegesList: function (req, res) {

var request = req.body.request;

        AdmintokenService.checkToken(req.body.token, function (err, tokenCheck) {

            if (err)
            {
                return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
            }
            else
            {
                if (tokenCheck.status == 1)
                {
                    //Query to know Subadmin have already the privilege or not
                    Admin_privilege_log.find({adminId: request.adminId}).exec(function findCB(err, result) {
                        if (err)
                        {
                            return res.json(200, {status: 2, error_details: err});
                        }
                        else
                        {

                               //If the subadmin Already have other Privilege
                              if(result.length!=0){
                                  console.log("result.length!=0");
                                  console.log(result.length);
                                  findRemainingArray = [];
                                    result.forEach(function(factor, index){

                                            console.log(factor);
                                            console.log(index);
                                            findRemainingArray.push(factor.privilegeId);

                                    });
                                        //Query to get Remaining Privileges
                                       // var query = "SELECT * FROM  admin_privilege_log WHERE  adminId ="+request.adminId+" privilegeId NOT IN ("+findRemainingArray+")";
                                       var query = "SELECT * FROM  admin_privilege WHERE  id NOT IN ("+findRemainingArray+")";

                                        console.log("query------");
                                        console.log(query);
                                        Admin_privilege_log.query(query, function (err, remainingPrivilege) {
                                                if (err)
                                                {
                                                    return res.json(200, {status: 2, error_details: err});
                                                }
                                                else
                                                {

                                                        return res.json(200, {status: 1, message: "success", data: remainingPrivilege});

                                                }
                                            });
                                        //return res.json(200, {status: 1, data: result});
                            }
                            else{
                                    console.log("result.length==0");
                                    console.log(result.length);

                                    //Query to get Remaining Privileges
                                        var query = "SELECT * FROM  admin_privilege";
                                        console.log("query------");
                                        console.log(query);
                                        Admin_privilege_log.query(query, function (err, remainingPrivilege) {
                                                if (err)
                                                {
                                                    return res.json(200, {status: 2, error_details: err});
                                                }
                                                else
                                                {

                                                        return res.json(200, {status: 1, message: "success", data: remainingPrivilege});

                                                }
                                            });
                                        //return res.json(200, {status: 1, data: result});

                                }
                        }

                    });

                }
                else
                {
                    return res.json(200, {status: 3, message: 'token expired'});
                }
            }
        });
    },

    /*===================================================================================================================================
     Set subadmin privileges
     ====================================================================================================================================*/
  /*  setSubadminPrivilege: function (req, res) {
var request = req.body.request;
var chkPrivilegeArray =  request.chkPrivilegeArray;

console.log("chkPrivilegeArray =================");
console.log(chkPrivilegeArray);
console.log(request);
        AdmintokenService.checkToken(req.body.token, function (err, tokenCheck) {

            if (err)
            {
                return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
            }
            else
            {
                if (tokenCheck.status == 1)
                {

var query = "";
        var chkPrivilegeIdArray = [];
        chkPrivilegeArray.forEach(function(factor, index){

                console.log(factor);
                console.log(index);
                chkPrivilegeIdArray.push("("+request.adminId+","+factor.id+",'','')");

        });

console.log(chkPrivilegeIdArray);

var query = "INSERT INTO admin_privilege_log(adminId, privilegeId,createdAt,updatedAt) VALUES "+chkPrivilegeIdArray;
console.log(query);
                 Admin_privilege_log.query(query, function (err, result) {
                      if (err)
                        {
                            return res.json(200, {status: 2, message: 'Some error occured', errorDetails: err});
                        } else
                        {
                            console.log(result);
                            return res.json(200, {status: 1, message: 'success', data: result});
                        }
                 });

                }
                else
                {
                    return res.json(200, {status: 3, message: 'token expired'});
                }
            }
        });
    },

   */

setSubadminPrivilege: function (req, res) {

            var request = req.body.request;
            var chkPrivilegeArray =  request.chkPrivilegeArray;
            var chkPrivilegeIdArray = [];
            chkPrivilegeArray.forEach(function(factor, index){

                    console.log(factor);
                    console.log(index);
                    chkPrivilegeIdArray.push(factor.id);

            });
            chkPrivilegeIdArray = chkPrivilegeIdArray.toString();

        AdmintokenService.checkToken(req.body.token, function (err, tokenCheck) {

            if (err)
            {
                return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
            }
            else
            {
                if (tokenCheck.status == 1)
                {
                    Admin_privilege_log.findOne({adminId : request.adminId}).exec(function (err, result) {
                            if (err) {
                                return res.json(200, {status: 2, message: 'some error occured', error: err});

                            } else {

                                   if(typeof result == "undefined"){
                                             var values = {
                                                    adminId             :  request.adminId,
                                                    privilegeId         : chkPrivilegeIdArray,
                                                };

                                            Admin_privilege_log.create(values).exec(function (err, addprivilege) {
                                                  if (err)
                                                    {
                                                        console.log(err);
                                                        return res.json(200, {status: 2, message: 'Some error occured', errorDetails: err});
                                                    } else
                                                    {
                                                        console.log(addprivilege);
                                                        return res.json(200, {status: 1, message: 'success', data: addprivilege});
                                                    }
                                             });
                                    }else{

                                              var values = {
                                                     privilegeId         : chkPrivilegeIdArray,
                                                };
                                                var criteria = {
                                                                  id          : result.id
                                                                };
                                                Admin_privilege_log.update(criteria, values).exec(function (err, updatePrivilege) {
                                                    if (err)
                                                    {
                                                        return res.json(200, {status: 2, error_details: err});
                                                    }
                                                    else
                                                    {
                                                        return res.json(200, {status: 1, data: updatePrivilege});
                                                    }

                                                });
                                    }


                            }
                        });

                }
                else
                {
                    return res.json(200, {status: 3, message: 'token expired'});
                }
            }
        });
    },


    /*===================================================================================================================================
     Delete a subadmin privilege
     ====================================================================================================================================*/
    deleteSubadminPrivilege: function (req, res) {
var request = req.body.request;
console.log(request);
        AdmintokenService.checkToken(req.body.token, function (err, tokenCheck) {

            if (err)
            {
                return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
            }
            else
            {
                if (tokenCheck.status == 1)
                {
                    Admin_privilege_log.destroy({id: req.body.id}).exec(function deleteCB(err) {
                        if (err)
                        {
                            return res.json(200, {status: 2, error_details: err});
                        }
                        else
                        {
                            return res.json(200, {status: 1, message: 'success'});
                        }

                    });
                }
                else
                {
                    return res.json(200, {status: 3, message: 'token expired'});
                }
            }
        });
    },


    /*===================================================================================================================================
     Get Each subadmin's Privilege[for subadmin only]
     ====================================================================================================================================*/


    getSubadminPrivileges: function (req, res) {

       /* var request = req.body.request;
        console.log("===== getSubadminPrivileges ====");
        console.log(request);

        AdmintokenService.checkToken(req.body.token, function (err, tokenCheck) {

            if (err)
            {
                return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
            }
            else
            {
                if (tokenCheck.status == 1)
                {
                    var query = "SELECT ap.name, ap.description, apl.id prvlLogId" +
                            " FROM" +
                            " admin_privilege_log apl" +
                            " INNER JOIN" +
                            " admin_privilege ap" +
                            " ON" +
                            " apl.privilegeId = ap.id" +
                            " AND apl.adminId = " + request.adminId +
                            " ORDER BY apl.createdAt DESC";
//console.log(query);
                    Admin_privilege_log.query(query, function (err, result) {
                        if (err)
                        {
                            return res.json(200, {status: 2, error_details: err});
                        }
                        else
                        {

                            return res.json(200, {status: 1, message: "success", data: result});
                        }
                    });
                }
                else
                {
                    return res.json(200, {status: 3, message: 'token expired'});
                }
            }
        });
    },

     */
        var request = req.body.request;
        console.log("===== getSubadminPrivileges ====");
        console.log(request);

        AdmintokenService.checkToken(req.body.token, function (err, tokenCheck) {

            if (err)
            {
                return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
            }
            else
            {
                if (tokenCheck.status == 1)
                {
                    Admin_privilege_log.findOne({adminId : request.adminId}).exec(function (err, result) {
                            if (err) {
                                return res.json(200, {status: 2, message: 'some error occured', error: err});

                            } else {
                                console.log(result);
                                return res.json(200, {status: 1, message: 'success', data : result});
                            }
                    });
                }
                else
                {
                    return res.json(200, {status: 3, message: 'token expired'});
                }
            }
        });
    },

    /*===================================================================================================================================
     List subadmin's Privilege List[for superadmin only]
     ====================================================================================================================================*/

/*
    listSubadminPrivileges: function (req, res) {

        AdmintokenService.checkToken(req.body.token, function (err, tokenCheck) {

            if (err)
            {
                return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
            }
            else
            {
                if (tokenCheck.status == 1)
                {
                    var query = "SELECT apl.id, apl.adminId, ap.name, ap.description, CONCAT( adm.firstname, adm.lastname ) AS adminName" +
                            " FROM admin_privilege_log apl" +
                            " INNER JOIN admin_privilege ap ON apl.privilegeId = ap.id" +
                            " INNER JOIN admin adm ON adm.id = apl.adminId" +
                            " ORDER BY apl.createdAt DESC ";

                    Admin_privilege_log.query(query, function (err, result) {
                        if (err)
                        {
                            return res.json(200, {status: 2, error_details: err});
                        }
                        else
                        {
                            console.log(result);
                            return res.json(200, {status: 1, message: "success", data: result});
                        }
                    });
                }
                else
                {
                    return res.json(200, {status: 3, message: 'token expired'});
                }
            }
        });
    },
*/

    /*===================================================================================================================================
     Admin Login
     ====================================================================================================================================*/

    adminLogin: function (req, res) {
        var password = crypto.createHash('md5').update(req.body.password).digest("hex");
        //var password = req.body.password;
        var values = {
            username: req.body.username,
            password: password
        };

        // Get Admin details
        Admin.findOne(values).exec(function (err, result) {
            if (err) {

                sails.log.debug('Some error occured ' + err);
                return res.json(200, {status: 2, message: 'some error occured', error: err});

            } else {

                if (typeof result == "undefined")
                {
                    sails.log.debug({message: 'No admin found'});
                    return res.json(200, {status: 2, message: 'No admin found', data: result});

                }
                else
                {
                    // Create new access token on login
                    AdmintokenService.createToken(result.id, function (err, details) {
                        if (err) {
                            return res.json(200, {status: 2, message: 'some error occured', error: details});
                        } else {

                        Admin.findOne({id : details.token.adminId}).exec(function (err, adminType) {
                                if (err) {
                                    return res.json(200, {status: 2, message: 'some error occured', error: err});

                                } else {
                                    var switchKey = adminType.adminType;
                                             switch (switchKey)
                                            {

                                                   case 'super_admin':
                                                           return res.json(200, {status: 1, message: 'succes', data: details , adminType: adminType.adminType, privileges: "All privileges"});
                                                   break;
                                                   case 'sub_admin':
                                                       Admin_privilege_log.findOne({adminId : details.token.adminId}).exec(function (err, privilegelog) {
                                                        if (err) {
                                                            return res.json(200, {status: 2, message: 'some error occured', error: err});

                                                        } else {



                                                 /*var query =  " SELECT ap.id, ap.name, apl.id, apl.adminId, apl.privilegeId, ad.adminType"+
                                                              " FROM"+
                                                              " admin_privilege ap"+
                                                              " INNER JOIN"+
                                                              " admin_privilege_log apl"+
                                                              " ON"+
                                                              " ap.id IN (apl.privilegeId)"+
                                                              " INNER JOIN"+
                                                              " admin ad"+
                                                              " ON"+
                                                              " apl.adminId = ad.id"+
                                                              " WHERE apl.adminId = "+details.token.adminId;
                                                    */

                                                                  var query =  "SELECT name"+
                                                                               " FROM"+
                                                                               " admin_privilege"+
                                                                               " WHERE"+
                                                                               " id IN ("+privilegelog.privilegeId+")";

                                                                            Admin.query(query, function (err, privilege) {
                                                                                if (err)
                                                                                {
                                                                                    return res.json(200, {status: 2, error_details: err});
                                                                                }
                                                                                else
                                                                                {
                                                                                    privileArray = [];
                                                                                    var ctr = 0;
                                                                                    privilege.forEach(function(factor, index){
                                                                                            ctr ++;
                                                                                            console.log(factor);
                                                                                            console.log(ctr);
                                                                                            privileArray.push(factor.name);
                                                                                    });

                                                                                    console.log(privileArray);
                                                                                    console.log(adminType);
                                                                                    return res.json(200, {status: 1, message: 'succes', data: details , adminType: adminType.adminType, privileges: privileArray});
                                                                                }
                                                                            });
                                                                }
                                                            });

                                                   break;
                                             }

                                    }
                            });





                        }
                    });

                }

            }
        });

    },
    /*===================================================================================================================================
     Admin Logout
     ====================================================================================================================================*/
    adminLogout: function (req, res) {
        AdmintokenService.deleteToken(req.body.token, function (err, result) {
            if (err) {
                return res.json(200, {status: 2, message: 'some error occured', error_details: result});
            } else {
                return res.json(200, {status: 1, message: 'success', data: result});
                //res.view('login');
            }
        });

    },
    userReviewApproval: function (req, res) {

        var reviewId = req.body.reviewId;
        var approvalStatus = req.body.approvalStatus;

        AdmintokenService.checkToken(req.body.token, function (err, tokenCheck) {

            if (err) {
                return res.json(200, {status: 2, message: 'Error in token check', error: tokenCheck});
            } else {

                if (tokenCheck.status == 1)
                {
                    var criteria = {id: reviewId};
                    var data = {approvalStatus: approvalStatus};

                    Review.update(criteria, data).exec(function (err, updatedData) {

                        if (err) {
                            return res.json(200, {status: 2, message: 'some error has occured', error_details: updatedData});
                        } else {

                            if (updatedData.length == 0) {
                                return res.json(200, {status: 2, message: "Error in review status updation"});
                            } else {
                                return res.json(200, {status: 1, message: "success", data: updatedData});
                            }
                        }
                    });

                } else {
                    return res.json(200, {status: 3, message: 'Token expired'});
                }
            }
        });

    },
    userReportApproval: function (req, res) {

        var reportId = req.body.reportId;
        var approvalStatus = req.body.approvalStatus;

        AdmintokenService.checkToken(req.body.token, function (err, tokenCheck) {

            if (err) {
                return res.json(200, {status: 2, message: 'Error in token check', error: tokenCheck});
            } else {

                if (tokenCheck.status == 1)
                {
                    var criteria = {id: reportId};
                    var data = {approvalStatus: approvalStatus};

                    Report.update(criteria, data).exec(function (err, updatedData) {

                        if (err) {
                            return res.json(200, {status: 2, message: 'some error has occured', error_details: updatedData});
                        } else {

                            if (updatedData.length == 0) {
                                return res.json(200, {status: 2, message: "Error in review status updation"});
                            } else {
                                return res.json(200, {status: 1, message: "success", data: updatedData});
                            }
                        }
                    });

                } else {
                    return res.json(200, {status: 3, message: 'Token expired'});
                }
            }
        });

    },
    /*================================================================================================================================
     Socket - Check
     =================================================================================================================================*/


    dbcheck: function (req, res) {

        sails.models.Admin.DbVersionCheck(function (result) {
            return res.json(200, {success: 'Success', response: result});
        });

    },
    subscribeToFunRoom: function (req, res) {
        //r roomName = req.param('roomName');
        //console.log(req);
        roomName = req.body.roomName;
        console.log(roomName);
        sails.sockets.join(req.socket, roomName);
        sails.sockets.join(req.socket, "room55");
        //sails.sockets.broadcast(roomName, { msg: 'Hi there!' });
        res.json({
            messages: 'Subscribed to a fun room called ' + roomName + '!'
        });
        //sails.sockets.emit(friendId, 'privateMessage', {from: req.session.userId, msg: 'Hi!'});
        //sails.sockets.broadcast(1, { msg: 'Hi there!' });
    },
    indexcheck: function (req, res) {
        result = {};
        result.message = req.body.message;

        //return res.json(200, { success: 'Success' ,response: result});

    }


    /*######################*/
    /*    indexj: function (req,res) {

     var socket = req.socket;
     var io = sails.io;

     // emit to all sockets (aka publish)
     // including yourself
     io.sockets.emit('messageName', {thisIs: 'theMessage'});

     // broadcast to a room (aka publish)
     // excluding yourself, if you're in it
     socket.broadcast.to('roomName').emit('messageName', {thisIs: 'theMessage'});

     // emit to a room (aka publish)
     // including yourself
     io.sockets.in('roomName').emit('messageName', {thisIs: 'theMessage'});

     // Join a room (aka subscribe)
     // If you're in the room already, no problem, do nothing
     // If the room doesn't exist yet, it gets created
     socket.join('roomName');

     // Leave a room (aka unsubscribe)
     // If you're not in the room, no problem, do nothing
     // If the room doesn't exist yet, no problem, do nothing
     socket.leave('roomName');

     // Get all connected sockets in the app
     sails.io.sockets.clients();

     // Get all conneted sockets in the room, "roomName"
     sails.io.sockets.clients('roomName');


     },*/

};


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

                    var query = "SELECT * FROM admin WHERE adminType =  '" + adminConstants.ADMIN_TYPE_SUBADMIN +"' ORDER BY createdAt DESC";
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
     Set subadmin privileges
     ====================================================================================================================================*/
    setSubadminPrivilege: function (req, res) {
var request = req.body.request;
var chkPrivilegeArray =  request.chkPrivilegeArray;

        AdmintokenService.checkToken(req.body.token, function (err, tokenCheck) {

            if (err)
            {
                return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
            }
            else
            {
                if (tokenCheck.status == 1)
                {


        var chkPrivilegeIdArray = [];
        chkPrivilegeArray.forEach(function(factor, index){

                console.log(factor);
                console.log(index);
                chkPrivilegeIdArray.push(factor.id);
        });


                    var values = {
                        adminId: request.adminId,
                        privilegeId: chkPrivilegeIdArray,
                    };
                    Admin_privilege_log.create(values).exec(function (err, result) {
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
                    Admin_privilege_log.destroy({id: request.id}).exec(function deleteCB(err) {
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
                            if(result != ""){
                                return res.json(200, {status: 1, message: "success", data: result});
                            }
                            else{
                                return res.json(200, {status: 1, message: "success", data: "No Privilege Found"});
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
                            //return res.view('login_home');
                            //res.redirect('login_home');
                            // res.view('login_home', {status: 1, message: 'succes', details: details});
                            //req.session.authenticated = true;
                            //req.session.token = details.token.token;

                            return res.json(200, {status: 1, message: 'succes', data: details});
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


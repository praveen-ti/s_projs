/**
 * AdminController
 *
 * @description :: Server-side logic for managing admins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var crypto = require('crypto');

module.exports = {

/*===================================================================================================================================
                                                        Get all subadmins
 ====================================================================================================================================*/

    getSubadminList : function(req, res) {

        AdmintokenService.checkToken(req.body.token, function(err, tokenCheck) {

                    if(err)
                    {
                         return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
                    }
                    else
                    {
                        if(tokenCheck.status == 1)
                            {
                                console.log("Checktoken");
                                console.log(tokenCheck);
                                    var query ="SELECT * FROM admin WHERE adminType =  'sub' ORDER BY createdAt DESC";
                                    Admin.query(query, function(err, result) {
                                        if(err)
                                        {
                                            return res.json(200, {status: 2, error_details: err});
                                        }
                                        else
                                        {
                                            console.log(result);
                                            return res.json(200, {status: 1, message: "success", result: result});
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


    getSubadminDetails : function(req, res) {

       AdmintokenService.checkToken(req.body.token, function(err, tokenCheck) {

                    if(err)
                    {
                         return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
                    }
                    else
                    {
                        if(tokenCheck.status == 1)
                            {
                                Admin.findOne({id: req.body.adminId}).exec(function findCB(err, result) {
                                    if(err)
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


    addSubadmin : function(req, res) {

         AdmintokenService.checkToken(req.body.token, function(err, tokenCheck) {

                    if(err)
                    {
                         return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
                    }
                    else
                    {
                        if(tokenCheck.status == 1)
                            {
                                 var password   = crypto.createHash('md5').update(req.body.password).digest("hex");
                                 var values = {username: req.body.username, firstname: req.body.firstname, lastname: req.body.lastname, password: password, adminType: req.body.adminType, blockStatus: req.body.blockStatus};
                                 Admin.create(values).exec(function(err, result){
                                        if (err)
                                        {
                                            return res.json(200, {status: 2, message: 'Some error occured', errorDetails: err});
                                        } else
                                        {
                                            return res.json(200, {status: 1, message: 'success', result: result});
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


    updateAdminDetails : function(req, res) {

          AdmintokenService.checkToken(req.body.token, function(err, tokenCheck) {

                    if(err)
                    {
                         return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
                    }
                    else
                    {
                         if(tokenCheck.status == 1)
                            {
                                Admin.findOne({id: req.body.adminId}).exec(function findCB(err, result) {
                                    if(err)
                                    {
                                        return res.json(200, {status: 2, error_details: err});
                                    }
                                    else
                                    {
                                        console.log(result);
                                        var values = {username: req.body.username, firstname: req.body.firstname, lastname: req.body.lastname, password: req.body.password, adminType: req.body.adminType, blockStatus: req.body.blockStatus};
                                        //return res.json(200, {status: 1, message: 'success'});
                                        var criteria = {id: result.id};
                                        Admin.update(criteria, values).exec(function(err, updatedAdmin) {
                                            if(err)
                                            {
                                                return res.json(200, {status: 2, error_details: err});
                                            }
                                            else
                                            {
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
                                                      Delete a subadmin
 ====================================================================================================================================*/
    deleteSubadmin : function(req, res) {

     AdmintokenService.checkToken(req.body.token, function(err, tokenCheck) {

                    if(err)
                    {
                         return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
                    }
                    else
                    {
                         if(tokenCheck.status == 1)
                            {
                                Admin.destroy({id: req.body.adminId}).exec(function deleteCB(err){
                                    if(err)
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
                                                      Set subadmin privileges
 ====================================================================================================================================*/
    setSubadminPrivilege : function(req, res) {

        AdmintokenService.checkToken(req.body.token, function(err, tokenCheck) {

                    if(err)
                    {
                         return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
                    }
                    else
                    {
                        if(tokenCheck.status == 1)
                            {
                                 var values = {adminId: req.body.adminId, privilegeId: req.body.privilegeId};
                                 Admin_privilege_log.create(values).exec(function(err, result){
                                        if (err)
                                        {
                                            return res.json(200, {status: 2, message: 'Some error occured', errorDetails: err});
                                        } else
                                        {
                                            return res.json(200, {status: 1, message: 'success', result: result});
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
    deleteSubadminPrivilege : function(req, res) {

      AdmintokenService.checkToken(req.body.token, function(err, tokenCheck) {

                    if(err)
                    {
                         return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
                    }
                    else
                    {
                        if(tokenCheck.status == 1)
                            {
                                Admin_privilege_log.destroy({id: req.body.id}).exec(function deleteCB(err){
                                    if(err)
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
                                                        Get all Privileges
 ====================================================================================================================================*/

    getPrivilegesList : function(req, res) {

     AdmintokenService.checkToken(req.body.token, function(err, tokenCheck) {

                    if(err)
                    {
                         return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
                    }
                    else
                    {
                        if(tokenCheck.status == 1)
                            {
                                var query ="SELECT * FROM admin_privilege ORDER BY createdAt DESC";
                                Admin_privilege.query(query, function(err, result) {
                                    if(err)
                                    {
                                        return res.json(200, {status: 2, error_details: err});
                                    }
                                    else
                                    {
                                        console.log(result);
                                        return res.json(200, {status: 1, message: "success", result: result});
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
                                                      Get subadmin's Privilege
 ====================================================================================================================================*/


    getSubadminPrivileges : function(req, res) {

       AdmintokenService.checkToken(req.body.token, function(err, tokenCheck) {

                    if(err)
                    {
                         return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
                    }
                    else
                    {
                        if(tokenCheck.status == 1)
                            {
                                Admin_privilege_log.findOne({id: req.body.adminId}).exec(function findCB(err, result1) {
                                    if(err)
                                    {
                                        return res.json(200, {status: 2, error_details: err});
                                    }
                                    else
                                    {


                                         Admin_privilege.findOne({id: result1.privilegeId}).exec(function findCB(err, result2) {
                                            if(err)
                                            {
                                                return res.json(200, {status: 2, error_details: err});
                                            }
                                            else
                                            {
                                                console.log("result1");
                                                console.log(result1);
                                                console.log("result2");
                                                console.log(result2);
                                                return res.json(200, {status: 1, data: result2});

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
                                                        Admin Login
 ====================================================================================================================================*/

    admin_login: function(req, res){

        //var password = crypto.createHash('md5').update(req.body.password).digest("hex");
        var password = req.body.password;
        var values = {username: req.body.username, password: password};

        // Get Admin details
        Admin.findOne(values).exec(function(err, result){
            if (err) {

                sails.log.debug('Some error occured ' + err);
                return res.json(200, {status: 2, message: 'some error occured', error: err});

            } else {

                if(typeof result == "undefined")
                {
                    sails.log.debug({message: 'No admin found'});
                    return res.json(200, {status: 2, message: 'No admin found', result: result});

                }
                else
                {
                    // Create new access token on login
                    AdmintokenService.createToken(result.id, function(err, details) {
                        if(err) {
                            return res.json(200, {status: 2, message: 'some error occured', error: details});
                        } else {

                            return res.json(200, {status: 1, message: 'succes', details: details});
                        }
                    });

                }

            }
        });

    },

/*===================================================================================================================================
                                                        Admin Logout
 ====================================================================================================================================*/
    admin_logout: function(req, res){

        AdmintokenService.deleteToken(req.body.token, function(err, result) {
            if(err) {
                 return res.json(200, {status: 2, message: 'some error occured', error_details: result});
            } else {
                 //req.session.destroy();
                 return res.json(200, {status: 1, message: 'success', result: result});

            }
        });

    },


};


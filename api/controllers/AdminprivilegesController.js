/**
 * AdminprivilegesController
 *
 * @description :: Server-side logic for managing adminprivileges
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

 /*===================================================================================================================================
     Get all Privileges
  ====================================================================================================================================*/

    getPrivilegesList: function (req, res) {

        AdmintokenService.checkToken(req.body.token, function (err, tokenCheck) {

            if (err)
            {
                return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
            }
            else
            {
                if (tokenCheck.status == 1)
                {
                    var query = "SELECT * FROM admin_privilege ORDER BY createdAt DESC";
                    Admin_privilege.query(query, function (err, result) {
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

  /*===================================================================================================================================
     Get current privilege
     ====================================================================================================================================*/


    getPrivilegeDetails: function (req, res) {
var request = req.body.request;
//console.log(request.adminId);
//console.log(req.body.token);
        AdmintokenService.checkToken(req.body.token, function (err, tokenCheck) {

            if (err)
            {
                return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
            }
            else
            {
                if (tokenCheck.status == 1)
                {
                    Admin_privilege.findOne({id: request.privilegeId}).exec(function findCB(err, result) {
                        if (err)
                        {
                            return res.json(200, {status: 2, error_details: err});
                        }
                        else
                        {

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


    addPrivilege: function (req, res) {

//var request = req.body.request;
//request.token
        AdmintokenService.checkToken(req.body.token, function (err, tokenCheck) {

            if (err)
            {
                return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
            }
            else
            {
                if (tokenCheck.status == 1)
                {
                    var values = {
                            name        : req.body.name,
                            description : req.body.description,
                    };
                    Admin_privilege.create(values).exec(function (err, result) {
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
     Edit Privilege
   ====================================================================================================================================*/


    updatePrivilegeDetails: function (req, res) {

        AdmintokenService.checkToken(req.body.token, function (err, tokenCheck) {

            if (err)
            {
                return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
            }
            else
            {
                if (tokenCheck.status == 1)
                {

                    Admin_privilege.findOne({id: req.body.id}).exec(function findCB(err, result) {
                        if (err)
                        {
                            return res.json(200, {status: 2, error_details: err});
                        }
                        else
                        {

                            var values = {
                                name        : req.body.name,
                                description : req.body.description,
                            };

                            var criteria = {id: result.id};
                            Admin_privilege.update(criteria, values).exec(function (err, updatedPrivilege) {
                                if (err)
                                {
                                    return res.json(200, {status: 2, error_details: err});
                                }
                                else
                                {
                                    return res.json(200, {status: 1, data: updatedPrivilege});
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
     Delete Privilege
     ====================================================================================================================================*/

         deletePrivilege: function (req, res) {

                var request = req.body.request;
                AdmintokenService.checkToken(request.token, function (err, tokenCheck) {

                    if (err)
                    {
                        return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
                    }
                    else
                    {
                        if (tokenCheck.status == 1)
                        {
                            Admin_privilege.destroy({id: request.privilegeId}).exec(function deleteCB(err) {
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

};


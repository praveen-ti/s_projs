/**
 * SettingsController
 *
 * @description :: Server-side logic for managing Settings
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


/*===================================================================================================================================
     Get all Settings
  ====================================================================================================================================*/

    getSettingsList: function (req, res) {

        AdmintokenService.checkToken(req.body.token, function (err, tokenCheck) {

            if (err)
            {
                return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
            }
            else
            {
                if (tokenCheck.status == 1)
                {
                    var query = "SELECT * FROM settings ORDER BY createdAt DESC";
                    Settings.query(query, function (err, result) {
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
                                                   Create/Add a Settings
 ====================================================================================================================================*/

/*
    addSettings : function(req, res) {

           AdmintokenService.checkToken(req.body.token, function(err, tokenCheck) {

                    if(err)
                    {
                         return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
                    }
                    else
                    {
                        if(tokenCheck.status == 1)
                            {
                                 var values = {
                                                key         :    req.body.key,
                                                value       :    req.body.value
                                               };
                                 Settings.create(values).exec(function(err, result){
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
*/


 /*===================================================================================================================================
     Get current Settings
     ====================================================================================================================================*/


    getSettingsDetails: function (req, res) {
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
                    Settings.findOne({id: request.settingsId}).exec(function findCB(err, result) {
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
                                                      Edit Settings
 ====================================================================================================================================*/


    updateSettingsDetails : function(req, res) {

          AdmintokenService.checkToken(req.body.token, function(err, tokenCheck) {

                    if(err)
                    {
                         return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
                    }
                    else
                    {
                        if(tokenCheck.status == 1)
                            {
                                    Settings.findOne({key: req.body.key}).exec(function findCB(err, result) {
                                        if(err)
                                        {

                                            return res.json(200, {status: 2, error_details: err});
                                        }
                                        else
                                        {
                                            var values = {value: req.body.value};
                                            //return res.json(200, {status: 1, message: 'success'});
                                            var criteria = {key: result.key};
                                            Settings.update(criteria, values).exec(function(err, updatedSettings) {
                                                if(err)
                                                {
                                                    return res.json(200, {status: 2, error_details: err});
                                                }
                                                else
                                                {
                                                    return res.json(200, {status: 1, data: updatedSettings});
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



};


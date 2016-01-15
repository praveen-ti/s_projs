/**
 * SettingsController
 *
 * @description :: Server-side logic for managing Settings
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

/*===================================================================================================================================
                                                   Create/Add a Settings
 ====================================================================================================================================*/


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

/*===================================================================================================================================
                                                      Edit Settings
 ====================================================================================================================================*/


    updateSettings : function(req, res) {

          AdmintokenService.checkToken(req.body.token, function(err, tokenCheck) {

                    if(err)
                    {
                        console.log("Update Settings");
                        console.log(tokenCheck);
                         return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
                    }
                    else
                    {
                        if(tokenCheck.status == 1)
                            {
                                    console.log(tokenCheck);
                                    Settings.findOne({key: req.body.key}).exec(function findCB(err, result) {
                                        if(err)
                                        {
                                            console.log("Error");
                                            console.log(err);
                                            return res.json(200, {status: 2, error_details: err});
                                        }
                                        else
                                        {
                                            console.log(result);
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


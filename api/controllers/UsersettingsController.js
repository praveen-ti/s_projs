/**
 * UsersettingsController
 *
 * @description :: Server-side logic for managing usersettings
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


 /*===================================================================================================================================
                                                   Get user's Settings[Mail Preferences]
 ====================================================================================================================================*/

getUserSettings : function(req, res) {

        UsertokenService.checkToken(req.body.token, function(err, tokenCheck) {

                    if(err)
                    {
                         return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
                    }
                    else
                    {
                        if(tokenCheck.status == 1)
                            {
                                Usersettings.findOne({userId: tokenCheck.tokenDetails.userId}).exec(function findCB(err, result) {
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
                                                   update user's Settings
 ====================================================================================================================================*/
updateUserSettings : function(req, res) {

         UsertokenService.checkToken(req.body.token, function(err, tokenCheck) {

                    if(err)
                    {
                         return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
                    }
                    else
                    {
                        if(tokenCheck.status == 1)

                            {

                                var settingsDetails = '{"settingsDetails" : {"searchProfileStatus": "'+req.body.searchProfileStatus+
                                                                            '","sensualAdStatus": "'+req.body.sensualAdStatus+
                                                                            '","autoLogin": "'+req.body.autoLogin+
                                                                            '","setOffLine": "'+req.body.setOffLine+
                                                                            '","favouriteMailStatus": "'+req.body.favouriteMailStatus+
                                                                            '","provisitMailStatus": "'+req.body.provisitMailStatus+
                                                                            '","newMailStatus": "'+req.body.newMailStatus+
                                                                            '","pollMailStatus": "'+req.body.pollMailStatus+
                                                                            '" }}';
                                var jsonSettingsDetails = JSON.parse(settingsDetails);
                                console.log(jsonSettingsDetails);

                                 Usersettings.findOne({userId: tokenCheck.tokenDetails.userId}).exec(function findCB(err, result) {
                                    if(err)
                                    {
                                        return res.json(200, {status: 2, error_details: err});
                                    }
                                    else
                                    {
                                        var values = {
                                                        searchProfileStatus     : jsonSettingsDetails.settingsDetails.searchProfileStatus,
                                                        sensualAdStatus         : jsonSettingsDetails.settingsDetails.sensualAdStatus,
                                                        autoLogin               : jsonSettingsDetails.settingsDetails.autoLogin,
                                                        setOffLine              : jsonSettingsDetails.settingsDetails.setOffLine,
                                                        favouriteMailStatus     : jsonSettingsDetails.settingsDetails.favouriteMailStatus,
                                                        provisitMailStatus      : jsonSettingsDetails.settingsDetails.provisitMailStatus,
                                                        newMailStatus           : jsonSettingsDetails.settingsDetails.newMailStatus,
                                                        pollMailStatus          : jsonSettingsDetails.settingsDetails.pollMailStatus,
                                                     };

                                        var criteria = {id: result.id};

                                        Usersettings.update(criteria, values).exec(function(err, updatedSettings) {
                                            if(err)
                                            {
                                                return res.json(200, {status: 2, error_details: err});
                                            }
                                            else
                                            {

                                                return res.json(200, {status: 1, data: updatedSettings});
                                            }

                                        });
                                        //console.log(result);
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


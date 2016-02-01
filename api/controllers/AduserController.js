/**
 * AduserController
 *
 * @description :: Server-side logic for managing adusers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var adUserConstants = sails.config.constants.adUser;

module.exports = {

/*===================================================================================================================================
                                                  Submit an advertisement
 ====================================================================================================================================*/


    createAdUser : function(req, res) {

         UsertokenService.checkToken(req.body.token, function(err, tokenCheck) {

                    if(err)
                    {
                         return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
                    }
                    else
                    {
                        if(tokenCheck.status == 1)
                            {
                                 var adStatus = "active";
                                 var values = {
                                                banner                  :       req.body.banner,
                                                bannerType              :       req.body.bannerType,
                                                status                  :       adStatus,
                                                adPageId                :       req.body.adPageId,
                                                adPositionId            :       req.body.adPositionId,
                                                userId                  :       tokenCheck.tokenDetails.userId,
                                                totalCost               :       req.body.totalCost,
                                                adStartDate             :       req.body.adStartDate,
                                                adEndDate               :       req.body.adEndDate,
                                              };
                                 Aduser.create(values).exec(function(err, result){
                                        if (err)
                                        {
                                            return res.json(200, {status: 2, message: 'Some error occured', errorDetails: err});
                                        } else
                                        {
                                            console.log(result);
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
                         change status Active/Inactive/Delete of a user's Banner Img By Admin Or By useritself
 ============================================================================== ======================================================*/

 updateAdUser : function(req, res) {


        var userRole = req.body.userRole;
        var tokenService = tokenService || {};
         var userId = "";

        if (userRole == 'user') {
            tokenService = UsertokenService;

        } else if (userRole == 'admin') {
            tokenService = AdmintokenService;
        }

         tokenService.checkToken(req.body.token, function(err, tokenCheck) {

                                //Delete by user itself OR by admin
                                    if (userRole == 'user') {
                                        userId = tokenCheck.tokenDetails.userId;

                                    } else if (userRole == 'admin') {
                                        userId = req.body.userId;
                                    }

                    if(err)
                    {
                         return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
                    }
                    else
                    {
                        if(tokenCheck.status == 1)
                            {
                                var adUserDetails = '{"adUserDetails" :'+
                                                ' {'+
                                                 ' "adId": '+req.body.adId+','+
                                                 ' "status": "'+req.body.status+'",'+
                                                 ' "bannerType": "'+req.body.bannerType+'",'+
                                                 ' "userId": '+req.body.userId+
                                                ' }'+
                                        ' }';
                                var jsonAdUserDetails = JSON.parse(adUserDetails);

                                Aduser.findOne({id: req.body.adId}).exec(function findCB(err, result) {
                                    if(err)
                                    {
                                        return res.json(200, {status: 2, error_details: err});
                                    }
                                    else
                                    {
                                              if (userRole == 'admin') {
                                                   var values = {
                                                       bannerType                :       jsonAdUserDetails.adUserDetails.bannerType,
                                                       status                    :       jsonAdUserDetails.adUserDetails.status,
                                                      };

                                              } else if (userRole == 'user') {
                                                    var values = {
                                                        status                    :       "delete",
                                                      };
                                              }


                                        //return res.json(200, {status: 1, message: 'success'});
                                        var criteria = {id: result.id};
                                        Aduser.update(criteria, values).exec(function(err, updatedAdUser) {
                                            if(err)
                                            {
                                                return res.json(200, {status: 2, error_details: err});
                                            }
                                            else
                                            {
                                                return res.json(200, {status: 1, updatedAdUser: updatedAdUser});
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
                                                        Get all Advertisements(By admin & User)
 ====================================================================================================================================*/

    getAdList : function(req, res) {

        var userRole        =   req.body.userRole;
        var tokenService    =   tokenService || {};
        var userId          =   "";
        var sensualAdStatus =   "enable";

        if (userRole == 'user') {
            tokenService = UsertokenService;

        } else if (userRole == 'admin') {
            tokenService = AdmintokenService;
        }

         tokenService.checkToken(req.body.token, function(err, tokenCheck) {

                        if (userRole == 'user') {
                            userId = tokenCheck.tokenDetails.userId;
                        } else if (userRole == 'admin') {
                            userId = req.body.userId;
                        }

                    if(err)
                    {
                         return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
                    }
                    else
                    {
                        if(tokenCheck.status == 1)
                            {

                                    Usersettings.findOne({userId: userId, sensualAdStatus: sensualAdStatus}).exec(function findCB(err, sensualCheck) {
                                    if(err)
                                    {
                                        return res.json(200, {status: 2, error_details: err});
                                    }
                                    else
                                    {
                                        if(typeof sensualCheck != 'undefined'){

                                            if (userRole == 'user') {
                                                query ="SELECT * FROM  aduser WHERE userId = "+tokenCheck.tokenDetails.userId+" AND status != '"+adUserConstants.ADUSER_STATUS_DELETE+"' ORDER BY  createdAt DESC";


                                            } else if (userRole == 'admin') {
                                                query ="SELECT * FROM  aduser WHERE status = '"+adUserConstants.ADUSER_STATUS_ACTIVE+"' ORDER BY  createdAt DESC";
                                            }

                                        }
                                        else{

                                            if (userRole == 'user') {
                                                query ="SELECT * FROM  aduser WHERE userId = "+tokenCheck.tokenDetails.userId+
                                                        " AND status != '"+adUserConstants.ADUSER_STATUS_DELETE+"'"+
                                                        " AND bannerType = 'therapeutic'"+
                                                        " ORDER BY  createdAt DESC";

                                            } else if (userRole == 'admin') {
                                                query ="SELECT * FROM  aduser WHERE status = '"+adUserConstants.ADUSER_STATUS_ACTIVE+"' ORDER BY  createdAt DESC";
                                            }

                                        }

                                            Aduser.query(query, function(err, result) {
                                                    if(err)
                                                    {
                                                        return res.json(200, {status: 2, error_details: err});
                                                    }
                                                    else
                                                    {
                                                        return res.json(200, {status: 1, message: "success", result: result});
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
                                                      Get Advertisement details
 ====================================================================================================================================*/


    getAdDetails : function(req, res) {

        var userRole = req.body.userRole;
        var tokenService = tokenService || {};

        if (userRole == 'user') {
            tokenService = UsertokenService;

        } else if (userRole == 'admin') {
            tokenService = AdmintokenService;
        }

         tokenService.checkToken(req.body.token, function(err, tokenCheck) {
                    if(err)
                    {
                         return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});

                    }
                    else
                    {
                        if(tokenCheck.status == 1)
                            {
                                Aduser.findOne({id: req.body.adId}).exec(function findCB(err, result) {
                                    if(err)
                                    {
                                        return res.json(200, {status: 2, error_details: err});
                                    }
                                    else
                                    {

                                        console.log(result);
                                        return res.json(200, {status: 1, result: result});
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


/**
 * AduserController
 *
 * @description :: Server-side logic for managing adusers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var adUserConstants         = sails.config.constants.adUser;
var userSettingsConstants   = sails.config.constants.userSettings;


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

 updateAdUserStatus : function(req, res) {

var request = req.body.request;
    /*
        var userRole = req.body.userRole;
        var tokenService = tokenService || {};
         var userId = "";

        if (userRole == 'user') {
            tokenService = UsertokenService;

        } else if (userRole == 'admin') {
            tokenService = AdmintokenService;
        }
*/
         AdmintokenService.checkToken(request.token, function(err, tokenCheck) {

                                  /*
                                //Delete by user itself OR by admin
                                    if (userRole == 'user') {
                                        userId = tokenCheck.tokenDetails.userId;

                                    } else if (userRole == 'admin') {
                                        userId = req.body.userId;
                                    }
                                */
                    if(err)
                    {
                         return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
                    }
                    else
                    {
                        if(tokenCheck.status == 1)
                            {

                                Aduser.findOne({id: request.returnedData.id}).exec(function findCB(err, result) {
                                    if(err)
                                    {
                                        return res.json(200, {status: 2, error_details: err});
                                    }
                                    else
                                    {
                                              /*if (userRole == 'admin') {
                                                   var values = {
                                                       bannerType                :       jsonAdUserDetails.adUserDetails.bannerType,
                                                       status                    :       jsonAdUserDetails.adUserDetails.status,
                                                      };

                                              } else if (userRole == 'user') {
                                                    var values = {
                                                        status                    :       "delete",
                                                      };
                                              }*/


                                       var values = {
                                                     status         : request.adUserStatus
                                                };

                                       var criteria = {
                                                       id          : result.id
                                                };
console.log(values);
console.log(criteria);
                                            Aduser.update(criteria, values).exec(function(err, updatedAdUser) {
                                                if(err)
                                                {
                                                    return res.json(200, {status: 2, error_details: err});
                                                }
                                                else
                                                {
                                                    return res.json(200, {status: 1, data: updatedAdUser});
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
                         change Banner Type
 ============================================================================== ======================================================*/

 updateAdBannerType : function(req, res) {

var request = req.body.request;

         AdmintokenService.checkToken(request.token, function(err, tokenCheck) {

                    if(err)
                    {
                         return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
                    }
                    else
                    {
                        if(tokenCheck.status == 1)
                            {

                                Aduser.findOne({id: request.returnedData.id}).exec(function findCB(err, result) {
                                    if(err)
                                    {
                                        return res.json(200, {status: 2, error_details: err});
                                    }
                                    else
                                    {
                                       var values = {
                                                     bannerType         : request.adBannerType
                                                };

                                       var criteria = {
                                                       id          : result.id
                                                };
console.log(values);
console.log(criteria);
                                            Aduser.update(criteria, values).exec(function(err, updatedAdUser) {
                                                if(err)
                                                {
                                                    return res.json(200, {status: 2, error_details: err});
                                                }
                                                else
                                                {
                                                    return res.json(200, {status: 1, data: updatedAdUser});
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

    getAdUserList : function(req, res) {

        var userRole        =   req.body.userRole;
        var tokenService    =   tokenService || {};
        var userId          =   "";
        var switchKey       =   req.body.userRole;

        if (userRole == 'user') {
            tokenService = UsertokenService;

        } else if (userRole == 'admin') {
            tokenService = AdmintokenService;
        }

         tokenService.checkToken(req.body.token, function(err, tokenCheck) {

                        //if (userRole == 'user') {
                            userId = tokenCheck.tokenDetails.userId;
                        //} else if (userRole == 'admin') {
                        //    userId = req.body.userId;
                        //}

                    if(err)
                    {
                         return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
                    }
                    else
                    {
                        if(tokenCheck.status == 1)
                            {


                                switch (switchKey)
                                    {

                                           case 'user':

                                                        Usersettings.findOne({userId: userId, sensualAdStatus: userSettingsConstants.SENSUAL_ADSTATUS_ENABLE}).exec(function findCB(err, sensualCheck) {
                                                                if(err)
                                                                {
                                                                    return res.json(200, {status: 2, error_details: err});
                                                                }
                                                                else
                                                                {
                                                                    if(typeof sensualCheck != 'undefined'){

                                                                            query ="SELECT * FROM  aduser WHERE userId = "+tokenCheck.tokenDetails.userId+" AND status != '"+adUserConstants.ADUSER_STATUS_DELETE+"' ORDER BY  createdAt DESC";

                                                                    }
                                                                    else{


                                                                            query ="SELECT * FROM  aduser WHERE userId = "+tokenCheck.tokenDetails.userId+
                                                                                    " AND status != '"+adUserConstants.ADUSER_STATUS_DELETE+"'"+
                                                                                    " AND bannerType = 'therapeutic'"+
                                                                                    " ORDER BY  createdAt DESC";
                                                                    }

                                                                        Aduser.query(query, function(err, result) {
                                                                                if(err)
                                                                                {
                                                                                    return res.json(200, {status: 2, error_details: err});
                                                                                }
                                                                                else
                                                                                {
                                                                                    return res.json(200, {status: 1, message: "success", data: result});
                                                                                }
                                                                       });
                                                                }

                                                            });
                                           break;

                                           case 'admin':
                                                           //query ="SELECT * FROM  aduser ORDER BY  createdAt DESC";
                                                          /* query = "SELECT ausr.id, ausr.banner, ausr.bannerType, ausr.status, ausr.totalCost,"+
                                                                    " ausr.adStartDate, ausr.adEndDate, CONCAT( usr.firstname,' ',usr.lastname ) userName,"+
                                                                    " apg.name adPageName, apo.name adPositionName,"+
                                                                    " CAST( ausr.adEndDate AS DATE ) adExpDate,"+
                                                                    " CAST( ausr.adEndDate AS TIME ) adExpTime,"+
                                                                    " MONTHNAME( ausr.adEndDate ) adExpMonth,"+
                                                                    " DAY( ausr.adEndDate ) adExpDay,"+
                                                                    " YEAR( ausr.adEndDate ) adExpYear"+
                                                                    " FROM aduser ausr"+
                                                                    " INNER JOIN user usr ON ausr.userId = usr.id"+
                                                                    " INNER JOIN adpage apg ON ausr.adPageId = apg.id"+
                                                                    " INNER JOIN adposition apo ON ausr.adPositionId = apo.id"+
                                                                    " ORDER BY ausr.createdAt DESC";
                                                             */
                                                           query="SELECT ausr.id, ausr.banner, ausr.bannerType, ausr.status,ausr.totalCost,"+
                                                                  " MONTHNAME( ausr.adEndDate ) adExpMonth,"+
                                                                  " DAY( ausr.adEndDate ) adExpDay,"+
                                                                  " YEAR( ausr.adEndDate ) adExpYear"+
                                                                  " FROM aduser ausr"+
                                                                  " ORDER BY createdAt DESC ";
                                                           Aduser.query(query, function(err, result) {
                                                                            if(err)
                                                                            {
                                                                                return res.json(200, {status: 2, error_details: err});
                                                                            }
                                                                            else
                                                                            {
                                                                                return res.json(200, {status: 1, message: "success", data: result});
                                                                            }
                                                           });
                                            break;
                                    }


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


    getAdUserDetails : function(req, res) {

        var request  = req.body.request;
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
                                /*Aduser.findOne({id: request.userAdId}).exec(function findCB(err, result) {
                                    if(err)
                                    {
                                        return res.json(200, {status: 2, error_details: err});
                                    }
                                    else
                                    {

                                        console.log(result);
                                        return res.json(200, {status: 1, data: result});


                                    }

                                });*/
                                Aduser.findOne({id: request.userAdId}).exec(function findCB(err, result) {
                                    if(err)
                                    {
                                        return res.json(200, {status: 2, error_details: err});
                                    }
                                    else
                                    {

console.log(result.userId);
                                      query = "SELECT ausr.id, ausr.banner, ausr.bannerType, ausr.status, ausr.totalCost,"+
                                                " ausr.adStartDate, ausr.adEndDate, CONCAT( usr.firstname,' ',usr.lastname ) userName,"+
                                                " apg.name adPageName, apo.name adPositionName,"+
                                                " CAST( ausr.adEndDate AS DATE ) adExpDate,"+
                                                " CAST( ausr.adEndDate AS TIME ) adExpTime,"+
                                                " MONTHNAME( ausr.adEndDate ) adExpMonth,"+
                                                " DAY( ausr.adEndDate ) adExpDay,"+
                                                " YEAR( ausr.adEndDate ) adExpYear"+
                                                " FROM aduser ausr"+
                                                " INNER JOIN user usr ON ausr.userId = "+result.userId+" AND ausr.id = "+request.userAdId+" AND usr.id = "+request.userAdId+
                                                " INNER JOIN adpage apg ON ausr.adPageId = apg.id"+
                                                " INNER JOIN adposition apo ON ausr.adPositionId = apo.id"+
                                                " ORDER BY ausr.createdAt DESC";
                                       Aduser.query(query, function(err, adDetails) {
                                                        if(err)
                                                        {
                                                            return res.json(200, {status: 2, error_details: err});
                                                        }
                                                        else
                                                        {
                                                            console.log(query);
                                                            console.log(adDetails);
                                                            return res.json(200, {status: 1, message: "success", data: adDetails});
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


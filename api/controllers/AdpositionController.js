/**
 * AdpositionController
 *
 * @description :: Server-side logic for managing adpositions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

/*===================================================================================================================================
                                                   Create an AdPosition
 ====================================================================================================================================*/


    createAdPosition : function(req, res) {

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
                                                name                  :       req.body.name,
                                                description           :       req.body.description,
                                                cost                  :       req.body.cost,
                                              };
                                 Adposition.create(values).exec(function(err, result){
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
                                                      Edit AdPosition
 ====================================================================================================================================*/


    updateAdPositionDetails : function(req, res) {


          AdmintokenService.checkToken(req.body.token, function(err, tokenCheck) {
                        //Assigning value to authorId
                    if(err)
                    {
                         return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
                    }
                    else
                    {
                         if(tokenCheck.status == 1)
                            {

                                Adposition.findOne({id: req.body.id}).exec(function findCB(err, result) {
                                    if(err)
                                    {
                                        return res.json(200, {status: 2, error_details: err});
                                    }
                                    else
                                    {
                                        console.log(result);
                                        var values = {
                                                       name                 :       req.body.name,
                                                       description          :       req.body.description,
                                                       cost                 :       req.body.cost,
                                                      };
                                        //return res.json(200, {status: 1, message: 'success'});
                                        var criteria = {id: result.id};
                                        Adposition.update(criteria, values).exec(function(err, updatedAdPosition) {
                                            if(err)
                                            {
                                                return res.json(200, {status: 2, error_details: err});
                                            }
                                            else
                                            {
                                                return res.json(200, {status: 1, data: updatedAdPosition});
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
                                                        Get all AdPositions
 ====================================================================================================================================*/

    getAdPositionList : function(req, res) {


        AdmintokenService.checkToken(req.body.token, function(err, tokenCheck) {

                    if(err)
                    {
                         return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
                    }
                    else
                    {
                        if(tokenCheck.status == 1)
                            {
                                    var query ="SELECT * FROM adposition ORDER BY createdAt DESC";
                                    Adposition.query(query, function(err, result) {
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
                        else
                            {
                                return res.json(200, {status: 3, message: 'token expired'});
                            }
                    }
        });
    },

/*===================================================================================================================================
                                                        Get AdPositions in Detail[By both admin & user]
 ====================================================================================================================================*/

 getAdPositionDetails : function(req, res) {

        var request         = req.body.request;
        var userRole        = req.body.userRole;
        var tokenService    = tokenService || {};
console.log(userRole);
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

                                Adposition.findOne({id: request.adPositionId}).exec(function findCB(err, result) {
                                    if(err)
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
    AdPositionStatus update
    ====================================================================================================================================*/


    updateAdPositionStatus: function (req, res) {


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
                    Adposition.findOne({id: request.returnedData.id}).exec(function findCB(err, result) {
                        if (err)
                        {
                            return res.json(200, {status: 2, error_details: err});
                        }
                        else
                        {
                            var values = {
                                 status: request.adPositionStatus
                            };
                            var criteria = {
                                              id          : result.id
                                            };

                            Adposition.update(criteria, values).exec(function (err, updateStatus) {
                                if (err)
                                {
                                    return res.json(200, {status: 2, error_details: err});
                                }
                                else
                                {

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
                                                   Delete an AdPosition
 ====================================================================================================================================*/

 deleteAdPosition : function(req, res) {


          AdmintokenService.checkToken(req.body.token, function(err, tokenCheck) {

                    if(err)
                    {
                         return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
                    }
                    else
                    {
                        if(tokenCheck.status == 1)
                            {
                                Adposition.destroy({id: req.body.adPositionId}).exec(function deleteCB(err){
                                    if(err)
                                    {
                                        console.log("error");
                                        return res.json(200, {status: 2, error_details: err});
                                    }
                                    else
                                    {
                                         console.log("Succes");
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
Get Ads in this Position
 ====================================================================================================================================*/
     getAdInPosition : function(req, res) {

var request = req.body.request;
console.log("Ad In Position");
console.log(request);
        AdmintokenService.checkToken(req.body.token, function(err, tokenCheck) {

                    if(err)
                    {
                         return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
                    }
                    else
                    {
                        if(tokenCheck.status == 1)
                            {
                                    var switchKey = req.body.userRole;
                                    switch (switchKey){

                                                 case 'user':

                                                 break;

                                                 case 'admin':

                                                    var query = "SELECT"+
                                                                " ausr.id, ausr.banner, ausr.bannerType, ausr.status,ausr.totalCost,"+
                                                                " MONTHNAME( ausr.adEndDate ) adExpMonth,"+
                                                                " DAY( ausr.adEndDate ) adExpDay,"+
                                                                " YEAR( ausr.adEndDate ) adExpYear"+
                                                                " FROM aduser ausr"+
                                                                " WHERE"+
                                                                " ausr.adPositionId = "+request.adPositionId+
                                                                " ORDER BY ausr.createdAt DESC";

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






};


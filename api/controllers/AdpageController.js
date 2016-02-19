/**
 * AdpageController
 *
 * @description :: Server-side logic for managing adpages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {



/*===================================================================================================================================
                                                   Create/Add an AdPage
 ====================================================================================================================================*/


    createAdPage : function(req, res) {

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
                                 Adpage.create(values).exec(function(err, result){
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
                                                      Edit AdPage
 ====================================================================================================================================*/


    updateAdPageDetails : function(req, res) {


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

                                Adpage.findOne({id: req.body.id}).exec(function findCB(err, result) {
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
                                        Adpage.update(criteria, values).exec(function(err, updatedAdPage) {
                                            if(err)
                                            {
                                                return res.json(200, {status: 2, error_details: err});
                                            }
                                            else
                                            {
                                                return res.json(200, {status: 1, data: updatedAdPage});
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
                                                        Get all AdPages
 ====================================================================================================================================*/

    getAdPageList : function(req, res) {

        console.log("getAdPageList-------------------------");

        AdmintokenService.checkToken(req.body.token, function(err, tokenCheck) {

                    if(err)
                    {
                         return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
                    }
                    else
                    {
                        if(tokenCheck.status == 1)
                            {
                                    var query ="SELECT * FROM adpage ORDER BY createdAt DESC";
                                    Adpage.query(query, function(err, result) {
                                        if(err)
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
                                                        Get AdPages in Detail[By both admin & user]
 ====================================================================================================================================*/

 getAdPageDetails : function(req, res) {

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

                                Adpage.findOne({id: request.adPageId}).exec(function findCB(err, result) {
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
    AdPageStatus update
    ====================================================================================================================================*/


    updateAdPageStatus: function (req, res) {

console.log("updateAdPageStatus <<<<<<<<<<<<>>>>>>>>>>>>>>>>>");

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
                    Adpage.findOne({id: request.returnedData.id}).exec(function findCB(err, result) {
                        if (err)
                        {
                            return res.json(200, {status: 2, error_details: err});
                        }
                        else
                        {
                            var values = {
                                 status: request.adPageStatus
                            };
                            var criteria = {
                                              id          : result.id
                                            };

                            Adpage.update(criteria, values).exec(function (err, updateStatus) {
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
                                                   Delete an AdPage
 ====================================================================================================================================*/

 deleteAdPage : function(req, res) {

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
                                Adpage.destroy({id: request.adPageId}).exec(function deleteCB(err){
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
Get Ads in this Page
 ====================================================================================================================================*/
     getAdInPage : function(req, res) {

var request = req.body.request;
console.log("Ad In Pge");
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
                                                                    " ausr.adPageId = "+request.adPageId+
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


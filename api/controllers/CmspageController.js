/**
 * CmspageController
 *
 * @description :: Server-side logic for managing cmspages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

/*===================================================================================================================================
                                                   Create a cms Page
 ====================================================================================================================================*/

addCmsPage : function(req, res) {

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
                                                pageName                  :       req.body.pageName,
                                                content                   :       req.body.content,
                                              };
                                 Cmspage.create(values).exec(function(err, result){
                                        if (err)
                                        {
                                            return res.json(200, {status: 2, message: 'Some error occured', errorDetails: err});
                                        } else
                                        {
                                            //console.log(result);
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
                                                      Edit CmsPage
 ====================================================================================================================================*/


    updateCmsPageDetails : function(req, res) {


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

                                Cmspage.findOne({id: req.body.id}).exec(function findCB(err, result) {
                                    if(err)
                                    {
                                        return res.json(200, {status: 2, error_details: err});
                                    }
                                    else
                                    {
                                        if(typeof result != "undefined")
                                        {
                                                var values = {
                                                               pageName                 :       req.body.pageName,
                                                               content                  :       req.body.content,
                                                              };
                                                //return res.json(200, {status: 1, message: 'success'});
                                                var criteria = {id: result.id};
                                                Cmspage.update(criteria, values).exec(function(err, updatedCmsPage) {
                                                    if(err)
                                                    {
                                                        return res.json(200, {status: 2, error_details: err});
                                                    }
                                                    else
                                                    {
                                                        return res.json(200, {status: 1, data: updatedCmsPage});
                                                    }

                                                });
                                        }
                                        else{
                                                  return res.json(200, {status: 1, result: "No Page Found"});
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
                                                        Get all cmsPages
 ====================================================================================================================================*/

    getCmsPageList : function(req, res) {

console.log("getCmsPageList-------------------------");
        AdmintokenService.checkToken(req.body.token, function(err, tokenCheck) {

                    if(err)
                    {
                         return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
                    }
                    else
                    {
                        if(tokenCheck.status == 1)
                            {
                                    var query ="SELECT * FROM cmspage ORDER BY createdAt DESC";
                                    Cmspage.query(query, function(err, result) {
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
                                                        Get cmsPages in Detail[By both admin & user]
 ====================================================================================================================================*/

 getCmsPageDetails : function(req, res) {

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

                                Cmspage.findOne({id: request.cmsPageId}).exec(function findCB(err, result) {
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
                                                   Delete[Permanent] cms Page
 ====================================================================================================================================*/
deleteCmsPage : function(req, res) {

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
                                 Cmspage.destroy({id: request.cmsPageId}, function(err, result){
                                        if (err)
                                        {
                                            return res.json(200, {status: 2, message: 'Some error occured', errorDetails: err});
                                        } else
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


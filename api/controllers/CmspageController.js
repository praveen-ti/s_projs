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

createCmsPage : function(req, res) {

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
                                                title                     :       req.body.title,
                                                content                   :       req.body.content,
                                              };
                                 Cmspage.create(values).exec(function(err, result){
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
                                                      Edit CmsPage
 ====================================================================================================================================*/


    updateCmsPage : function(req, res) {


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

                var cmsPageDetails = '{"cmsPageDetails" :'+
                                       ' {'+
                                            ' "id":'+req.body.cmsPageId+','+
                                            ' "pageName": "'+req.body.pageName+'",'+
                                            ' "title": "'+req.body.title+'",'+
                                            ' "content": "'+req.body.content+'"'+
                                            ' "status": "'+req.body.status+'"'+
                                        ' }'+
                                       ' }';
                 console.log(cmsPageDetails);
                var jsonCmsPageDetails = JSON.parse(cmsPageDetails);

                                Cmspage.findOne({id: jsonCmsPageDetails.cmsPageDetails.id}).exec(function findCB(err, result) {
                                    if(err)
                                    {
                                        return res.json(200, {status: 2, error_details: err});
                                    }
                                    else
                                    {
                                        if(typeof result != "undefined")
                                        {
                                                var values = {
                                                               pageName                 :       jsonCmsPageDetails.cmsPageDetails.pageName,
                                                               title                    :       jsonCmsPageDetails.cmsPageDetails.title,
                                                               content                  :       jsonCmsPageDetails.cmsPageDetails.content,
                                                               status                   :       jsonCmsPageDetails.cmsPageDetails.status,
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
                                                        return res.json(200, {status: 1, updatedCmsPage: updatedCmsPage});
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
                                                        Get cmsPages in Detail[By both admin & user]
 ====================================================================================================================================*/

 getCmsPageDetails : function(req, res) {

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

                                 var cmsPageDetails = '{"cmsPageDetails" :'+
                                       ' {'+
                                            ' "id":'+req.body.cmsPageId+
                                        ' }'+
                                       ' }';
                                console.log(cmsPageDetails);
                                var jsonCmsPageDetails = JSON.parse(cmsPageDetails);

                                Cmspage.findOne({id: jsonCmsPageDetails.cmsPageDetails.id}).exec(function findCB(err, result) {
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

         AdmintokenService.checkToken(req.body.token, function(err, tokenCheck) {

                    if(err)
                    {
                         return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
                    }
                    else
                    {
                        if(tokenCheck.status == 1)
                            {
                                 Cmspage.destroy({id: req.body.cmsPageId}, function(err, result){
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


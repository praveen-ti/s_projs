/**
 * BlogController
 *
 * @description :: Server-side logic for managing blogs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var blogConstants = sails.config.constants.blog;

module.exports = {

/*===================================================================================================================================
                                                   Create a Blog
 ====================================================================================================================================*/


    addBlog : function(req, res) {

console.log("Entered Add Blog -----------------------------");
        var userRole = req.body.userRole;
        var tokenService = tokenService || {};
        var authorId = "";
        var approvalStatus = "";

        if (userRole == 'user') {
            tokenService = UsertokenService;

        } else if (userRole == 'admin') {
            tokenService = AdmintokenService;
        }

         tokenService.checkToken(req.body.token, function(err, tokenCheck) {

                                    //Assigning value to authorId
                                    if (userRole == 'user') {
                                        authorId = tokenCheck.tokenDetails.userId;
                                        approvalStatus = "pending";

                                    } else if (userRole == 'admin') {
                                        authorId = tokenCheck.tokenDetails.adminId;
                                        approvalStatus = "approved";
                                    }
                    if(err)
                    {
                         return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
                    }
                    else
                    {
                        if(tokenCheck.status == 1)
                            {

                                 var values = {
                                                authorId             :       authorId,
                                                authorType           :       userRole,
                                                title                :       req.body.title,
                                                description          :       req.body.description,
                                                approvalStatus       :       approvalStatus,
                                              };

                                 Blog.create(values).exec(function(err, result){
                                        if (err)
                                        {
                                            console.log(err);
                                            return res.json(200, {status: 2, message: 'Some error occured', errorDetails: err});
                                        } else
                                        {
                                            console.log("esult                ");
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
  Get Blog details
 ====================================================================================================================================*/


    getBlogDetails : function(req, res) {

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
                                Blog.findOne({id: request.blogId}).exec(function findCB(err, result) {
                                    if(err)
                                    {
                                        return res.json(200, {status: 2, error_details: err});
                                    }
                                    else
                                    {

                                        var switchKey = result.authorType;
                                        switch (switchKey)
                                            {
                                             case 'user' :

                                                        query = "SELECT blg.id,blg.authorType, blg.title, blg.description,"+
                                                                    " blg.blogStatus, blg.approvalStatus,"+
                                                                    " CONCAT( usr.firstname, ' ', usr.lastname ) username"+
                                                                    " FROM blog blg"+
                                                                    " INNER JOIN user usr ON blg.authorId = usr.id"+
                                                                    " WHERE blg.id = "+result.id;
                                             break;

                                             case 'admin' :

                                                      query = "SELECT blg.id,blg.authorType, blg.title, blg.description,"+
                                                                " blg.blogStatus, blg.approvalStatus,"+
                                                                " CONCAT( adm.firstname, ' ', adm.lastname ) username"+
                                                                " FROM blog blg"+
                                                                " INNER JOIN admin adm ON blg.authorId = adm.id"+
                                                                " WHERE blg.id = "+result.id;

                                              break;
                                            }

                                          Blog.query(query, function(err, blogDetails) {
                                                if(err)
                                                {
                                                    return res.json(200, {status: 2, error_details: err});
                                                }
                                                else
                                                {

                                                    return res.json(200, {status: 1, message: "success", data: blogDetails[0]});
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
   Update Blog Details
 ====================================================================================================================================*/


    updateBlogDetails : function(req, res) {


          AdmintokenService.checkToken(req.body.token, function(err, tokenCheck) {

                    if(err)
                    {
                         return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
                    }
                    else
                    {
                         if(tokenCheck.status == 1)
                            {
                                Blog.findOne({id: req.body.id}).exec(function findCB(err, result) {
                                    if(err)
                                    {
                                        return res.json(200, {status: 2, error_details: err});
                                    }
                                    else
                                    {
                                        var values = {
                                                       title                :       req.body.title,
                                                       description          :       req.body.description,
                                                      };
                                        //return res.json(200, {status: 1, message: 'success'});
                                        var criteria = {id: result.id};
                                        Blog.update(criteria, values).exec(function(err, updatedBlog) {
                                            if(err)
                                            {
                                                return res.json(200, {status: 2, error_details: err});
                                            }
                                            else
                                            {
                                                console.log(updatedBlog);
                                                return res.json(200, {status: 1, data: updatedBlog});
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
                                                      Delete a Blog
 ====================================================================================================================================*/
    deleteBlog : function(req, res) {


          AdmintokenService.checkToken(req.body.token, function(err, tokenCheck) {

                    if(err)
                    {
                         return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
                    }
                    else
                    {
                        if(tokenCheck.status == 1)
                            {
                                Blog.destroy({id: req.body.blogId}).exec(function deleteCB(err){
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
                                                        Get all Blog
 ====================================================================================================================================*/

    getBlogList : function(req, res) {

        var userRole        = req.body.userRole;
        var tokenService    = tokenService || {};
        var authorId        = "";
        var switchKey       = req.body.userRole;

        if (userRole == 'user') {
            tokenService = UsertokenService;

        } else if (userRole == 'admin') {
            tokenService = AdmintokenService;
        }

         tokenService.checkToken(req.body.token, function(err, tokenCheck) {

                                  /*  //Assigning value to authorId
                                    if (userRole == 'user') {
                                        authorId = tokenCheck.tokenDetails.userId;

                                    } else if (userRole == 'admin') {
                                        authorId = tokenCheck.tokenDetails.adminId;
                                    }*/

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
                                     case 'user' :

                                     break;

                                     case 'admin' :


                                //Query to get name of author from user table or admin table
                                query =    " SELECT blg.id,blg.authorType, blg.title, blg.description,"+
                                            " blg.blogStatus, blg.approvalStatus,"+
                                            " CONCAT( usr.firstname, ' ', usr.lastname ) authorname"+
                                            " FROM blog blg"+
                                            " INNER JOIN user usr ON blg.authorId = usr.id"+
                                            " WHERE blg.authorType = 'user'"+
                                            " UNION"+
                                            " SELECT blg.id,blg.authorType, blg.title, blg.description,"+
                                            " blg.blogStatus, blg.approvalStatus,"+
                                            " CONCAT( adm.firstname, ' ', adm.lastname ) authorname"+
                                            " FROM blog blg"+
                                            " INNER JOIN admin adm ON blg.authorId = adm.id"+
                                            " WHERE blg.authorType = 'admin'"+
                                            " ORDER BY id";


                                               // var query ="SELECT * FROM  blog ORDER BY createdAt DESC";
                                                console.log(query);
                                                Blog.query(query, function(err, result) {
                                                    if(err)
                                                    {
                                                        return res.json(200, {status: 2, error_details: err});
                                                    }
                                                    else
                                                    {
                                                        //console.log(result);
                                                        return res.json(200, {status: 1, message: "success", data: result});
                                                    }
                                                });

                                     break;
                                    }

                                //console.log(userRole);
                                /*var query ="SELECT * FROM  blog WHERE"+
                                            " authorType =  '"+userRole+"' AND"+
                                            " authorId =  "+authorId+
                                            " ORDER BY createdAt DESC";*/
                              /*     var query ="SELECT * FROM  blog"+
                                                "WHERE blogStatus = "+blogConstants.BLOG_STATUS_ACTIVE+
                                                "approvalStatus != "+blogConstants.APPROVAL_STATUS_REJECTED+
                                                "ORDER BY createdAt DESC";
                                   console.log(query);
                                Blog.query(query, function(err, result) {
                                    if(err)
                                    {
                                        return res.json(200, {status: 2, error_details: err});
                                    }
                                    else
                                    {
                                        console.log(result);
                                        return res.json(200, {status: 1, message: "success", result: result});
                                    }
                                }); */
                            }
                            else
                            {
                                return res.json(200, {status: 3, message: 'token expired'});
                            }
                    }
        });
    },

/*===================================================================================================================================
   Update blogStatus
 ====================================================================================================================================*/
    updateBlogStatus: function(req, res) {
console.log("updateBlogStatus ????????>>>>>><<<<<<<<    ");
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
                    Blog.findOne({id: request.returnedData.id}).exec(function findCB(err, result) {
                        if (err)
                        {
                            return res.json(200, {status: 2, error_details: err});
                        }
                        else
                        {
                            var values = {
                                        blogStatus          :    request.blogStatus
                            };
                            var criteria = {
                                              id          : result.id
                                            };

                            Blog.update(criteria, values).exec(function (err, updateBlogStatus) {
                                if (err)
                                {
                                    return res.json(200, {status: 2, error_details: err});
                                }
                                else
                                {
                                    return res.json(200, {status: 1, data: updateBlogStatus});
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
  Update approvalStatus
 ====================================================================================================================================*/

  updateApprovalStatus: function(req, res) {

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
                    Blog.findOne({id: request.returnedData.id}).exec(function findCB(err, result) {
                        if (err)
                        {
                            return res.json(200, {status: 2, error_details: err});
                        }
                        else
                        {
                            var values = {
                                        approvalStatus          :    request.approvalStatus
                            };
                            var criteria = {
                                              id          : result.id
                                            };
console.log(values);
console.log(criteria);
                            Blog.update(criteria, values).exec(function (err, updateApprovalStatus) {
                                if (err)
                                {
                                    return res.json(200, {status: 2, error_details: err});
                                }
                                else
                                {
                                    return res.json(200, {status: 1, data: updateApprovalStatus});
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
     Create a Comment for A Blog
 ====================================================================================================================================*/
    addBlogComment : function(req, res) {


        //var userRole = req.body.userRole;
        //var tokenService = tokenService || {};
        //var authorId = "";
       // var approvalStatus = "";

        //if (userRole == 'user') {
        //    tokenService = UsertokenService;

        //} else if (userRole == 'admin') {
        //    tokenService = AdmintokenService;
        //}

         UsertokenService.checkToken(req.body.token, function(err, tokenCheck) {

                                    //Assigning value to authorId
                                    /*if (userRole == 'user') {
                                        authorId = tokenCheck.tokenDetails.userId;
                                        approvalStatus = "pending";

                                    } else if (userRole == 'admin') {
                                        authorId = tokenCheck.tokenDetails.adminId;
                                        approvalStatus = "accept";
                                    }*/
                    if(err)
                    {
                         return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
                    }
                    else
                    {
                        if(tokenCheck.status == 1)
                            {

                                 var values = {
                                                blogId               :       req.body.blogId,
                                                comment              :       req.body.comment,
                                                userId               :       tokenCheck.tokenDetails.userId,
                                                approvalStatus       :       req.body.approvalStatus,
                                              };
                                 Blog_comment.create(values).exec(function(err, result){
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
                                                      Delete Blog Comments
 ====================================================================================================================================*/
    deleteBlogComments : function(req, res) {


          AdmintokenService.checkToken(req.body.token, function(err, tokenCheck) {

                    if(err)
                    {
                         return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
                    }
                    else
                    {
                        if(tokenCheck.status == 1)
                            {
                                Blog_comment.destroy({id: req.body.blogCommentId}).exec(function deleteCB(err){
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
                                                   Get all Blog Comments
 ====================================================================================================================================*/
getBlogcommentList : function(req, res) {

        var request      = req.body.request;
        var userRole = req.body.userRole;
        var tokenService = tokenService || {};
        var authorId = "";

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

                               var query = "SELECT CONCAT( usr.firstname,  ' ', usr.lastname ) username,"+
                                           " usr.profilePic,blgcmt.id, blgcmt.comment, blgcmt.approvalStatus"+
                                           " FROM blog_comment blgcmt"+
                                           " INNER JOIN user usr ON blgcmt.userId = usr.id"+
                                           " ORDER BY blgcmt.createdAt DESC ";

                                Blog_comment.query(query, function(err, result) {
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
  Update Blog Comment ApprovalStatus
 ====================================================================================================================================*/

  updateBlogCommentApprovalStatus: function(req, res) {

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
                    Blog_comment.findOne({id: request.blogCommentId}).exec(function findCB(err, result) {
                        if (err)
                        {
                            return res.json(200, {status: 2, error_details: err});
                        }
                        else
                        {
                            var values = {
                                        approvalStatus          :    request.approvalStatus
                            };
                            var criteria = {
                                              id          : result.id
                                            };

                            Blog_comment.update(criteria, values).exec(function (err, updateApprovalStatus) {
                                if (err)
                                {
                                    return res.json(200, {status: 2, error_details: err});
                                }
                                else
                                {
                                    return res.json(200, {status: 1, data: updateApprovalStatus});
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


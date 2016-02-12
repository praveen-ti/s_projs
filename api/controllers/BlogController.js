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
                                        approvalStatus = "accept";
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
                                                      Edit Blog
 ====================================================================================================================================*/


    updateBlog : function(req, res) {


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

                var blogDetails = '{"blogDetails" : {"id":'+req.body.blogId+', "title": "'+req.body.title+'", "description": "'+req.body.description+'", "approvalStatus": "'+req.body.approvalStatus+'"}}';
                var jsonBlogDetails = JSON.parse(blogDetails);
                console.log(jsonBlogDetails);
                console.log(tokenCheck.tokenDetails.adminId);

                                Blog.findOne({id: jsonBlogDetails.blogDetails.id}).exec(function findCB(err, result) {
                                    if(err)
                                    {
                                        return res.json(200, {status: 2, error_details: err});
                                    }
                                    else
                                    {
                                        console.log(result);
                                        var values = {
                                                       title                :       jsonBlogDetails.blogDetails.title,
                                                       description          :       jsonBlogDetails.blogDetails.description,
                                                       approvalStatus       :       jsonBlogDetails.blogDetails.approvalStatus,
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
                                                return res.json(200, {status: 1, updatedBlog: updatedBlog});
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

                                     console.log("admin >>>>>>> Switch");
                                                var query ="SELECT * FROM  blog ORDER BY createdAt DESC";
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
                                       query = "SELECT * FROM  blog WHERE id="+request.blogId+" ORDER BY createdAt DESC";
                                       Blog.query(query, function(err, blogDetails) {
                                                if(err)
                                                {
                                                    return res.json(200, {status: 2, error_details: err});
                                                }
                                                else
                                                {
                                                    return res.json(200, {status: 1, message: "success", data: blogDetails});
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

                                //var query ="SELECT * FROM Blog_comment ORDER BY createdAt DESC";
                                var query ="SELECT * FROM blog_comment WHERE blogId= "+req.body.blogId+
                                            "AND approvalStatus != "+blogConstants.APPROVAL_STATUS_REJECTED+
                                            " ORDER BY createdAt DESC";
                                Blog_comment.query(query, function(err, result) {
                                    if(err)
                                    {
                                        return res.json(200, {status: 2, error_details: err});
                                    }
                                    else
                                    {
                                        console.log("Blog Comment =====>   result");
                                        console.log(result);
                                        if(result.length!=0){
                                            return res.json(200, {status: 1, message: "success", result: result});
                                        }
                                        else{
                                            return res.json(200, {status: 3, message: "success", result: "No result Found"});
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






};


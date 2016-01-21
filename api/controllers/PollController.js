/**
 * PollController
 *
 * @description :: Server-side logic for managing polls
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


/*===================================================================================================================================
                                                   Create a Poll
 ====================================================================================================================================*/


    addPoll : function(req, res) {


        var userRole            = req.body.userRole;
        var tokenService        = tokenService || {};
        var authorId            = "";
        var approvalStatus      = "";
        var commentStatus       = "";

        if (userRole == 'user') {
            tokenService = UsertokenService;

        } else if (userRole == 'admin') {
            tokenService = AdmintokenService;
        }

         tokenService.checkToken(req.body.token, function(err, tokenCheck) {

                                    //Assigning value to authorId
                                    if (userRole == 'user') {
                                        authorId        = tokenCheck.tokenDetails.userId;
                                        approvalStatus  = "pending";
                                        commentStatus   = req.body.commentStatus;

                                    } else if (userRole == 'admin') {
                                        authorId        = tokenCheck.tokenDetails.adminId;
                                        approvalStatus  = "accept";
                                        commentStatus   = "show";
                                    }
                    if(err)
                    {
                         return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
                    }
                    else
                    {
                        if(tokenCheck.status == 1)
                            {
var pollDetails = '{"pollDetails" : {"title": "'+req.body.title+
                '", "question": "'+req.body.question+
                '", "authorId": "'+authorId+
                '", "userRole": "'+userRole+
                '", "commentStatus": "'+req.body.commentStatus+
                '", "approvalStatus": "'+approvalStatus+'"}}';

var jsonPollDetails = JSON.parse(pollDetails);

                                 var values = {
                                                title                :       req.body.title,
                                                question             :       req.body.question,
                                                authorId             :       authorId,
                                                authorType           :       userRole,
                                                commentStatus        :       commentStatus,
                                                approvalStatus       :       approvalStatus,
                                             };

                                 Poll.create(values).exec(function(err, result){
                                        if (err)
                                        {
                                            return res.json(200, {status: 2, message: 'Some error occured', errorDetails: err});
                                        } else
                                        {
                                            console.log("Poll=================result");
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
                                                      Edit Poll
 ====================================================================================================================================*/


    updatePoll : function(req, res) {


          AdmintokenService.checkToken(req.body.token, function(err, tokenCheck) {

                    if(err)
                    {
                         return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
                    }
                    else
                    {
                         if(tokenCheck.status == 1)
                            {

                var pollDetails = '{"pollDetails" : {"id":'+req.body.pollId+
                                    ', "title": "'+req.body.title+
                                    '", "question": "'+req.body.question+
                                    '", "approvalStatus": "'+req.body.approvalStatus+
                                    '", "commentStatus": "'+req.body.commentStatus+
                                    '", "answerType": "'+req.body.answerType+
                                    '", "pollStatus": "'+req.body.pollStatus+'"}}';
                var jsonPollDetails = JSON.parse(pollDetails);


                                Poll.findOne({id: jsonPollDetails.pollDetails.id}).exec(function findCB(err, result) {
                                    if(err)
                                    {
                                        return res.json(200, {status: 2, error_details: err});
                                    }
                                    else
                                    {
                                        console.log(result);
                                        var values = {
                                                       title                :       jsonPollDetails.pollDetails.title,
                                                       question             :       jsonPollDetails.pollDetails.question,
                                                       commentStatus        :       jsonPollDetails.pollDetails.commentStatus,
                                                       approvalStatus       :       jsonPollDetails.pollDetails.approvalStatus,
                                                       answerType           :       jsonPollDetails.pollDetails.answerType,
                                                       pollStatus           :       jsonPollDetails.pollDetails.pollStatus,
                                                      };
                                        //return res.json(200, {status: 1, message: 'success'});
                                        var criteria = {id: result.id};
                                        Poll.update(criteria, values).exec(function(err, updatedPoll) {
                                            if(err)
                                            {
                                                return res.json(200, {status: 2, error_details: err});
                                            }
                                            else
                                            {
                                                return res.json(200, {status: 1, updatedPoll: updatedPoll});
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
                                                      Delete a Poll
 ====================================================================================================================================*/
    deletePoll : function(req, res) {


          AdmintokenService.checkToken(req.body.token, function(err, tokenCheck) {

                    if(err)
                    {
                         return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
                    }
                    else
                    {
                        if(tokenCheck.status == 1)
                            {
                                Poll.destroy({id: req.body.pollId}).exec(function deleteCB(err){
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
                                                        Get all Poll
 ====================================================================================================================================*/

    getPollList : function(req, res) {

        var userRole = req.body.userRole;
        var tokenService = tokenService || {};
        var authorId = "";

        if (userRole == 'user') {
            tokenService = UsertokenService;

        } else if (userRole == 'admin') {
            tokenService = AdmintokenService;
        }

         tokenService.checkToken(req.body.token, function(err, tokenCheck) {

                                    //Assigning value to authorId
                                    if (userRole == 'user') {
                                        authorId = tokenCheck.tokenDetails.userId;

                                    } else if (userRole == 'admin') {
                                        authorId = tokenCheck.tokenDetails.adminId;
                                    }

                    if(err)
                    {
                         return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
                    }
                    else
                    {
                        if(tokenCheck.status == 1)
                            {
                                console.log(userRole);
                                /*var query ="SELECT * FROM  blog WHERE"+
                                            " authorType =  '"+userRole+"' AND"+
                                            " authorId =  "+authorId+
                                            " ORDER BY createdAt DESC";*/
                                   var query ="SELECT * FROM  poll"+
                                                " WHERE pollStatus = 'active' "+
                                                " AND approvalStatus != 'rejected'"+
                                                " ORDER BY createdAt DESC";
                                   console.log(query);
                                Poll.query(query, function(err, result) {
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
                                                   Create Details for Poll
 ====================================================================================================================================*/
    addPollDetails : function(req, res) {

         UsertokenService.checkToken(req.body.token, function(err, tokenCheck) {

                    if(err)
                    {
                         return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
                    }
                    else
                    {
                        if(tokenCheck.status == 1)
                            {
var pollDetails = '{"pollDetails" : {"pollsId":'+req.body.pollsId+
                            ', "pollAnswer": "'+req.body.pollAnswer+
                            '", "pollComment": "'+req.body.pollComment+
                            '", "approvalStatus": "'+req.body.approvalStatus+'"}}';

         console.log(pollDetails);

var jsonPollDetails = JSON.parse(pollDetails);
                                 var values = {
                                                pollsId                :       jsonPollDetails.pollDetails.pollsId,
                                                pollAnswer             :       jsonPollDetails.pollDetails.pollAnswer,
                                                pollComment            :       jsonPollDetails.pollDetails.pollComment,
                                                userId                 :       tokenCheck.tokenDetails.userId,
                                                approvalStatus         :       jsonPollDetails.pollDetails.approvalStatus,
                                              };
          console.log(values);
                                 Poll_details.create(values).exec(function(err, result){
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
                                                   approvalStatus for a PollComment By admin
 ====================================================================================================================================*/
    approvalStatusUpdate: function(req, res) {


         AdmintokenService.checkToken(req.body.token, function(err, tokenCheck) {

                    if(err)
                    {
                         return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
                    }
                    else
                    {
                        if(tokenCheck.status == 1)
                            {

                               Poll_details.findOne({id: req.body.commentId}).exec(function findCB(err, result) {
                                    if(err)
                                    {
                                        return res.json(200, {status: 2, error_details: err});
                                    }
                                    else
                                    {
                                        console.log(result);
                                            var values = {
                                                    approvalStatus       :   req.body.approvalStatus,
                                                  };

                                            var criteria = {id: result.id};
                                            Poll_details.update(criteria, values).exec(function(err, updatedPollComment) {
                                                if(err)
                                                {
                                                    return res.json(200, {status: 2, error_details: err});
                                                }
                                                else
                                                {
                                                    return res.json(200, {status: 1, updatedBlogComment: updatedPollComment});
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
                                                      Delete Poll Details
 ====================================================================================================================================*/
    deletePollDetails : function(req, res) {


          AdmintokenService.checkToken(req.body.token, function(err, tokenCheck) {

                    if(err)
                    {
                         return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
                    }
                    else
                    {
                        if(tokenCheck.status == 1)
                            {
                                Poll_details.destroy({id: req.body.pollDetailsId}).exec(function deleteCB(err){
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
                                                   Get all poll Details
 ====================================================================================================================================*/
getPollDeatilsList : function(req, res) {

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
                                var query ="SELECT * FROM poll_details WHERE pollsId= "+req.body.pollsId+
                                            "AND approvalStatus = 'approved'"+
                                            " ORDER BY createdAt DESC";

                                Poll_details.query(query, function(err, result) {
                                    if(err)
                                    {
                                        return res.json(200, {status: 2, error_details: err});
                                    }
                                    else
                                    {
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


/**
 * PollController
 *
 * @description :: Server-side logic for managing polls
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var pollConstants = sails.config.constants.poll;
var pollDetailsConstants = sails.config.constants.pollDetails;

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
                                        //approvalStatus  = "pending";
                                        //commentStatus   = req.body.commentStatus;

                                    } else if (userRole == 'admin') {
                                        authorId        = tokenCheck.tokenDetails.adminId;
                                        approvalStatus  = pollConstants.APPROVAL_STATUS_APPROVED;
                                        commentStatus   = pollConstants.COMMENT_STATUS_SHOW;
                                        pollStatus      = pollConstants.POLL_STATUS_ACTIVE;
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
                                                title                :       req.body.title,
                                                question             :       req.body.question,
                                                answerOptions        :       req.body.answerOptions,
                                                ansOptionType        :       req.body.ansOptionType,
                                                authorId             :       authorId,
                                                authorType           :       userRole,
                                                pollStatus           :       pollStatus,
                                                commentStatus        :       commentStatus,
                                                approvalStatus       :       approvalStatus,
                                             };

                                 Poll.create(values).exec(function(err, result){
                                        if (err)
                                        {
                                            return res.json(200, {status: 2, message: 'Some error occured', errorDetails: err});
                                        } else
                                        {
                                            console.log(result);
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
Edit Poll
 ====================================================================================================================================*/


   /* updatePollDetails : function(req, res) {


          AdmintokenService.checkToken(req.body.token, function(err, tokenCheck) {

                    if(err)
                    {
                         return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
                    }
                    else
                    {
                         if(tokenCheck.status == 1)
                            {

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
*/

updatePollDetails : function(req, res) {


          AdmintokenService.checkToken(req.body.token, function(err, tokenCheck) {

                    if(err)
                    {
                         return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
                    }
                    else
                    {
                         if(tokenCheck.status == 1)
                            {
console.log("updatePollDetails");
                                Poll.findOne({id: req.body.id}).exec(function findCB(err, result) {
                                    if(err)
                                    {
                                        return res.json(200, {status: 2, error_details: err});
                                    }
                                    else
                                    {
                                        var values = {
                                                       title                :       req.body.title,
                                                       question             :       req.body.question,
                                                       ansOptionType        :       req.body.ansOptionType,
                                                       answerOptions        :       req.body.answerOptions
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
                                                console.log(updatedPoll);
                                                return res.json(200, {status: 1, data: updatedPoll});
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

        var userRole            =   req.body.userRole;
        var tokenService        =   tokenService || {};
        var authorId            =   "";
        var switchKey           =   req.body.userRole;

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

                                 switch (switchKey)
                                    {
                                     case 'user' :

                                     break;

                                     case 'admin' :

                                            console.log(userRole);
                                            /*var query ="SELECT * FROM  blog WHERE"+
                                                        " authorType =  '"+userRole+"' AND"+
                                                        " authorId =  "+authorId+
                                                        " ORDER BY createdAt DESC";*/
                                              /* var query ="SELECT * FROM  poll"+
                                                            " WHERE pollStatus = "+pollConstants.POLL_STATUS_ACTIVE+
                                                            " AND approvalStatus != "+pollConstants.APPROVAL_STATUS_REJECTED+
                                                            " ORDER BY createdAt DESC";*/

                                            //query = "SELECT * FROM  poll ORDER BY createdAt DESC";
                                             query =    " SELECT pl.id,pl.authorType, pl.title, pl.question, pl.answerOptions,"+
                                                        " pl.pollStatus, pl.approvalStatus, pl.commentStatus, pl.ansOptionType,"+
                                                        " CONCAT( usr.firstname, ' ', usr.lastname ) authorname"+
                                                        " FROM poll pl"+
                                                        " INNER JOIN user usr ON pl.authorId = usr.id"+
                                                        " WHERE pl.authorType = 'user'"+
                                                        " UNION"+
                                                        " SELECT pl.id,pl.authorType, pl.title, pl.question, pl.answerOptions,"+
                                                        " pl.pollStatus, pl.approvalStatus, pl.commentStatus, pl.ansOptionType,"+
                                                        " CONCAT( adm.firstname, ' ', adm.lastname ) authorname"+
                                                        " FROM poll pl"+
                                                        " INNER JOIN admin adm ON pl.authorId = adm.id"+
                                                        " WHERE pl.authorType = 'admin'"+
                                                        " ORDER BY id";
console.log(query);
                                            Poll.query(query, function(err, result) {
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
   Update pollStatus
 ====================================================================================================================================*/
    updatePollStatus: function(req, res) {

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
                    Poll.findOne({id: request.returnedData.id}).exec(function findCB(err, result) {
                        if (err)
                        {
                            return res.json(200, {status: 2, error_details: err});
                        }
                        else
                        {
                            var values = {
                                        pollStatus          :    request.pollStatus
                            };
                            var criteria = {
                                              id          : result.id
                                            };

                            Poll.update(criteria, values).exec(function (err, updatePollStatus) {
                                if (err)
                                {
                                    return res.json(200, {status: 2, error_details: err});
                                }
                                else
                                {
                                    return res.json(200, {status: 1, data: updatePollStatus});
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
                    Poll.findOne({id: request.returnedData.id}).exec(function findCB(err, result) {
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
                            Poll.update(criteria, values).exec(function (err, updateApprovalStatus) {
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

updatePollCommentApprovalStatus: function(req, res) {

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
                    Poll_details.findOne({id: request.pollCommentId}).exec(function findCB(err, result) {
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

                            Poll_details.update(criteria, values).exec(function (err, updateApprovalStatus) {
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
getPollDetails : function(req, res) {

        var request = req.body.request;
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

                             /*
                                //var query ="SELECT * FROM Blog_comment ORDER BY createdAt DESC";
                                var query ="SELECT * FROM poll_details WHERE pollsId= "+req.body.pollsId+
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
                             */

                             Poll.findOne({id: request.pollId}).exec(function findCB(err, result) {
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

                                                        query = "SELECT pl.id,pl.authorType, pl.title, pl.question, pl.answerOptions,"+
                                                                    " pl.pollStatus, pl.approvalStatus, pl.ansOptionType,"+
                                                                    " CONCAT( usr.firstname, ' ', usr.lastname ) username"+
                                                                    " FROM poll pl"+
                                                                    " INNER JOIN user usr ON pl.authorId = usr.id"+
                                                                    " WHERE pl.id = "+result.id;
                                             break;

                                             case 'admin' :

                                                      query = "SELECT pl.id,pl.authorType, pl.title, pl.question, pl.answerOptions,"+
                                                                " pl.pollStatus, pl.approvalStatus, pl.ansOptionType,"+
                                                                " CONCAT( adm.firstname, ' ', adm.lastname ) username"+
                                                                " FROM poll pl"+
                                                                " INNER JOIN admin adm ON pl.authorId = adm.id"+
                                                                " WHERE pl.id = "+result.id;


                                              break;
                                            }

                                          Poll.query(query, function(err, pollDetails) {
                                                if(err)
                                                {
                                                    return res.json(200, {status: 2, error_details: err});
                                                }
                                                else
                                                {

                                                    return res.json(200, {status: 1, message: "success", data: pollDetails[0]});
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
 Get all Poll Comments
 ====================================================================================================================================*/
getPollcommentList : function(req, res) {

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
console.log("kkkkkkkkkkk");
                               var query = "SELECT CONCAT( usr.firstname,  ' ', usr.lastname ) name, usr.username,"+
                                           " usr.profilePic,pldtl.id, pldtl.pollComment, pldtl.approvalStatus"+
                                           " FROM poll_details pldtl"+
                                           " INNER JOIN user usr ON pldtl.userId = usr.id"+
                                           " ORDER BY pldtl.createdAt DESC ";

                                Poll_details.query(query, function(err, result) {
                                    if(err)
                                    {
                                        return res.json(200, {status: 2, error_details: err});
                                    }
                                    else
                                    {
console.log(">>>>>>>>getPollcommentList");
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



};


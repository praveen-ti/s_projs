/**
 * ChatController
 *
 * @description :: Server-side logic for managing chats
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

/*===================================================================================================================================
                                                   Save Chat
 ====================================================================================================================================*/


    saveChat : function(req, res) {

         UsertokenService.checkToken(req.body.token, function(err, tokenCheck) {

                    if(err)
                    {
                         return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
                    }
                    else
                    {
                        if(tokenCheck.status == 1)
                            {

var chat = '{"chat" : {"message": "'+req.body.message+
                       '", "senderId" : '+tokenCheck.tokenDetails.userId+
                       ', "receiverId" : '+req.body.receiverId+
                       ', "viewStatus" : "'+req.body.viewStatus+
                       ', "requestStatus" : "'+req.body.requestStatus+
                    '"}'+
           '}';
           console.log(chat);
var jsonChat = JSON.parse(chat);
 console.log(jsonChat);

                                var query = "SELECT id"+
                                            " FROM conversation"+
                                            " WHERE subjectId = "+tokenCheck.tokenDetails.userId+" AND objectId = "+req.body.receiverId+""+
                                            " OR"+
                                            " subjectId = "+req.body.receiverId+" AND objectId = "+tokenCheck.tokenDetails.userId;

                                Conversation.query(query, function(err, result) {
                                       if(err)
                                        {
                                            return res.json(200, {status: 2, error_details: err});
                                        }
                                        else
                                        {


                                             if(result == ""){

                                                   /*#######################
                                                      For new conversation
                                                    ########################*/

                                                     var cnvrValues = {
                                                            subjectId            :    jsonChat.chat.senderId,
                                                            objectId             :    jsonChat.chat.receiverId,
                                                            requestStatus        :    req.body.requestStatus
                                                           };
                                                console.log(result);
                                                     //Save to Conversation table
                                                        Conversation.create(cnvrValues).exec(function(err, saveChat){
                                                            if (err)
                                                            {
                                                                return res.json(200, {status: 2, message: 'Some error occured', errorDetails: err});
                                                            } else
                                                            {

                                                             console.log("For New Conversation");
                                                              var chatValues = {
                                                                    message             :    jsonChat.chat.message,
                                                                    conversationId      :    saveChat.id,
                                                                    senderId            :    jsonChat.chat.senderId,
                                                                    receiverId          :    jsonChat.chat.receiverId,
                                                                    viewStatus          :    jsonChat.chat.viewStatus
                                                                   };
                                                                  // console.log();
                                                                //Save Chat messages to Chat table
                                                                 Chat.create(chatValues).exec(function(err, saveChat){
                                                                        if (err)
                                                                        {
                                                                            return res.json(200, {status: 2, message: 'Some error occured', errorDetails: err});
                                                                        } else
                                                                        {
                                                                            console.log("Success >>>>> Chat");
                                                                            return res.json(200, {status: 1, message: 'success', result: saveChat});
                                                                        }
                                                                 });
                                                            }
                                                         });



                                             }
                                             else{
                                                     /*#######################
                                                      For Existed conversation
                                                    ########################*/
                                                     console.log(" For Existed conversation");
                                                     //Save Chat messages to Chat table
                                                     var chatValues = {
                                                            message             :    jsonChat.chat.message,
                                                            conversationId      :    result[0].id,
                                                            senderId            :    jsonChat.chat.senderId,
                                                            receiverId          :    jsonChat.chat.receiverId,
                                                            viewStatus          :    jsonChat.chat.viewStatus
                                                           };
                                                          //console.log(result);
                                                          //console.log(result[0].id);
                                                        //Save Chat messages to Chat table
                                                         Chat.create(chatValues).exec(function(err, saveChat){
                                                                if (err)
                                                                {
                                                                    return res.json(200, {status: 2, message: 'Some error occured', errorDetails: err});
                                                                } else
                                                                {
                                                                    console.log("Success >>>>> Chat");
                                                                    return res.json(200, {status: 1, message: 'success', result: saveChat});
                                                                }
                                                         });
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
                                                   List Chat Conversation [Receiver id getting from Online members]
 ====================================================================================================================================*/
getChatList : function(req, res) {

         UsertokenService.checkToken(req.body.token, function(err, tokenCheck) {

                    if(err)
                    {
                         return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
                    }
                    else
                    {
                        if(tokenCheck.status == 1)
                            {

                               var query = "SELECT *"+
                                        " FROM chat cht"+
                                        " WHERE conversationId"+
                                        " IN ("+
                                        " SELECT cnvr.id"+
                                        " FROM conversation cnvr"+
                                        " WHERE cnvr.subjectId ="+tokenCheck.tokenDetails.userId+
                                        " AND cnvr.objectId ="+req.body.receiverId+
                                        " OR cnvr.subjectId ="+req.body.receiverId+
                                        " AND cnvr.objectId ="+tokenCheck.tokenDetails.userId+
                                        " )"+
                                        "ORDER BY createdAt DESC ";

                                queryUser = "SELECT * FROM  user WHERE ";
                                Chat.query(query, function(err, result) {
                                               if(err)
                                                {
                                                    return res.json(200, {status: 2, error_details: err});
                                                }
                                                else
                                                {
                                                    if(result != ""){
                                                            if(tokenCheck.tokenDetails.userId == result[0].senderId){
                                                                queryUser+= "id = "+result[0].receiverId;
                                                            }
                                                            else{
                                                                 queryUser+= "id = "+result[0].senderId;
                                                             }
                                                                 //To get user's details
                                                                 User.query(queryUser, function(err, resultUser) {
                                                                          if(err)
                                                                            {
                                                                                return res.json(200, {status: 2, error_details: err});
                                                                            }
                                                                            else
                                                                            {
                                                                                return res.json(200, {status: 1, result: result[0], resultUser: resultUser });
                                                                            }
                                                                 });

                                                    }else{

                                                           return res.json(200, {status: 3, result: "No result found"});
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
                                      Update Request Status in Conversation table
 ====================================================================================================================================*/
chatRequest : function(req, res) {

         UsertokenService.checkToken(req.body.token, function(err, tokenCheck) {

                    if(err)
                    {
                         return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
                    }
                    else
                    {
                        if(tokenCheck.status == 1)
                            {

                            Conversation.findOne({id: req.body.id}).exec(function findCB(err, result) {
                                    if(err)
                                    {
                                        return res.json(200, {status: 2, error_details: err});
                                    }
                                    else
                                    {
                                        var criteria = {id: result.id};

                                        Conversation.update(criteria, {requestStatus: req.body.reqStatus}).exec(function(err, updatedReqStatus) {
                                            if(err)
                                            {
                                                console.log(err);
                                                return res.json(200, {status: 2, error_details: err});
                                            }
                                            else
                                            {
                                                return res.json(200, {status: 1, updatedReqStatus: updatedReqStatus});
                                            }

                                        });
                                    }

                               });


                            }
                    }
        });

    },


/*===================================================================================================================================
                                  Clear full Conversation[By changing senderstatus and receiver status by clear]
 ====================================================================================================================================*/


clearChat : function(req, res) {

         UsertokenService.checkToken(req.body.token, function(err, tokenCheck) {
var currentDate = new Date();
                    if(err)
                    {
                         return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
                    }
                    else
                    {
                        if(tokenCheck.status == 1)
                            {

                              var findValues = {
                                                clearUserId     : tokenCheck.tokenDetails.userId,
                                                conversationId  : req.body.cnvrId
                                                };

                            Clearchat.findOne(findValues).exec(function findCB(err, result) {
                                var clearStatus = req.body.clearStatus;
                                    if(err)
                                    {
                                        return res.json(200, {status: 2, error_details: err});
                                    }
                                    else
                                    {
                                        console.log(result);
                                        //Clear a chat conversation first time
                                        if(typeof result == "undefined" || result == ""){

                                             var values = {
                                                conversationId            :       req.body.cnvrId,
                                                clearUserId               :       tokenCheck.tokenDetails.userId,
                                                clearStatus               :       clearStatus,
                                              };
                                                Clearchat.create(values).exec(function(err, addClearChat){
                                                        if (err)
                                                        {
                                                            return res.json(200, {status: 2, message: 'Some error occured', errorDetails: err});
                                                        } else
                                                        {
                                                            console.log("Create Values");
                                                            return res.json(200, {status: 1, message: 'success', addClearChat: addClearChat});
                                                        }
                                                    });
                                        }
                                        //Clear a chat conversation more than 1
                                        else{

                                             var criteria = {id: result.id};



                                                Clearchat.update(criteria, {lastClearDate: currentDate}).exec(function(err, updatedDate) {
                                                    if(err)
                                                    {
                                                        return res.json(200, {status: 2, error_details: err});
                                                    }
                                                    else
                                                    {
                                                        console.log("success update");
                                                        console.log(updatedDate);

                                                        return res.json(200, {status: 1, updatedDate: updatedDate});
                                                    }
                                               });
                                                //return res.json(200, {status: 1, result: result});
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
                                                   Get Conversation in Detail[which are not cleared one]
 ====================================================================================================================================*/


 getDetailChat : function(req, res) {

         UsertokenService.checkToken(req.body.token, function(err, tokenCheck) {

                    if(err)
                    {
                         return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
                    }
                    else
                    {
                        if(tokenCheck.status == 1)
                            {

var queryGetCnvr = "SELECT id "+
                    " FROM  conversation"+
                    " WHERE ("+
                    " subjectId = "+tokenCheck.tokenDetails.userId+
                    " AND  objectId = "+req.body.receiverId+
                    " )"+
                    " OR ("+
                    " subjectId = "+req.body.receiverId+
                    " AND  objectId = "+tokenCheck.tokenDetails.userId+
                    " )";

                        //Checking conversation is there or not
                        Conversation.query(queryGetCnvr, function(err, result) {
                                       if(err)
                                        {
                                            return res.json(200, {status: 2, error_details: err});
                                        }
                                        else
                                        {

                                             if(result.length > 0){

                                                    console.log(result);
                                                   // console.log(result[0].id);
                                                    var findValues = {
                                                            clearUserId     : tokenCheck.tokenDetails.userId,
                                                            conversationId  : result[0].id,
                                                    };

                                                    //Checking Clearchat entry is there or not
                                                    Clearchat.findOne(findValues).exec(function findCB(err, clearResult) {
                                                            if(err)
                                                            {
                                                                return res.json(200, {status: 2, error_details: err});
                                                            }
                                                            else
                                                            {
                                                                console.log(tokenCheck.tokenDetails.userId);
                                                                console.log(result[0].id);
                                                                console.log(clearResult);
                                                                       //Checking the entry in clearchat table or not
                                                                      if(typeof clearResult != "undefined"){
                                                                          var clearDate       = clearResult.lastClearDate.toISOString();
                                                                          var splitdate       = clearDate.split("T1");
                                                                          var splitTime       = splitdate[1].split(".");
                                                                          var splitDateTime  = splitdate[0]+" "+splitTime[0];

                                                                          var queryChat = "SELECT *"+
                                                                                            " FROM chat"+
                                                                                            " WHERE conversationId ="+result[0].id+
                                                                                            " AND ("+
                                                                                            " senderId = "+tokenCheck.tokenDetails.userId+
                                                                                            " OR receiverId = "+req.body.receiverId+
                                                                                            " )"+
                                                                                            " AND createdAt >'"+splitDateTime+
                                                                                            "' ORDER BY createdAt DESC";
                                                                        }
                                                                        else{
                                                                            console.log("No clear chat entry");
                                                                            var queryChat = "SELECT *"+
                                                                                            " FROM chat"+
                                                                                            " WHERE conversationId ="+result[0].id+
                                                                                            " AND ("+
                                                                                            " senderId = "+tokenCheck.tokenDetails.userId+
                                                                                            " OR receiverId = "+req.body.receiverId+
                                                                                            " )"+
                                                                                            " ORDER BY createdAt DESC";

                                                                            }
                                                        console.log("queryChat??????????????");
                                                       console.log(queryChat);

                                                                 //get detail chat
                                                                Chat.query(queryChat, function(err, chatResult) {
                                                                           if(err)
                                                                            {
                                                                                return res.json(200, {status: 2, error_details: err});
                                                                            }
                                                                            else
                                                                            {
                                                                                return res.json(200, {status: 1, message: 'success', chatResult: chatResult});
                                                                            }
                                                                      });
                                                            }
                                                     });

                                               }
                                               else{
                                                    return res.json(200, {status: 3, result: "No conversation Found"});
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


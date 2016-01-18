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
                                                   List Conversation
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
                                console.log(query);
                                queryUser = "SELECT * FROM  user WHERE ";
                                Chat.query(query, function(err, result) {
                                               if(err)
                                                {
                                                    return res.json(200, {status: 2, error_details: err});
                                                }
                                                else
                                                {
                                                    console.log("Success Chat");
                                                    console.log(result);
                                                    console.log(result[0].senderId);
                                                    console.log(result[0].receiverId);
                                                    //return res.json(200, {status: 1, result: result});
                                                    //var senderDetails = "";
                                                    //var receiverDetails = "";

                                                    if(result != ""){
                                                            if(tokenCheck.tokenDetails.userId == result[0].senderId){
                                                                console.log("Sender");
                                                                queryUser+= "id = "+result[0].senderId;
                                                            }
                                                            else{
                                                                console.log("Receiver");
                                                                 queryUser+= "id = "+result[0].receiverId;
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
                                                   Get Conversation in Detail
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
                                   var viewStatus = "true";
                                   var query =  "SELECT *"+
                                                " FROM  chat"+
                                                " WHERE  conversationId ="+ req.body.cnvrId+
                                                " ORDER BY createdAt DESC";
                                    console.log(query);
                                    //Update view status
                                    var queryStatus="UPDATE chat SET viewStatus = '"+viewStatus+"' WHERE conversationId ="+ req.body.cnvrId;
                                    console.log(queryStatus);
                                    Chat.query(query, function(err, result) {
                                               if(err)
                                                {
                                                    return res.json(200, {status: 2, error_details: err});
                                                }
                                                else
                                                {
                                                    Conversation.query(queryStatus, function(err, resultStatus) {
                                                            if(err)
                                                            {
                                                                return res.json(200, {status: 2, error_details: err});
                                                            }
                                                            else
                                                            {
                                                                console.log(result);
                                                                return res.json(200, {status: 1, message: 'success', result: resultStatus});
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
                                                console.log("update");
                                                console.log(result);
                                                console.log(updatedReqStatus);

                                                return res.json(200, {status: 1, updatedReqStatus: updatedReqStatus});
                                            }

                                        });
                                    }

                               });


                            }
                    }
        });

    },





};


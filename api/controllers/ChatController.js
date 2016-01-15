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
                                                            requestStatus        :    "accept"
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

};


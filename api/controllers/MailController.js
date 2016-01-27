/**
 * EmailController
 *
 * @description :: Server-side logic for managing emails
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var _ = require("underscore");

module.exports = {



/*===================================================================================================================================
                                                   Save Mail
 ====================================================================================================================================*/


    saveMail : function(req, res) {

         UsertokenService.checkToken(req.body.token, function(err, tokenCheck) {

                    if(err)
                    {
                         return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
                    }
                    else
                    {
                        if(tokenCheck.status == 1)
                            {

var mail = '{"mail" : {"message": "'+req.body.message+
                       '", "senderId" : '+tokenCheck.tokenDetails.userId+
                       ', "receiverId" : '+req.body.receiverId+
                       ', "viewStatus" : "'+req.body.viewStatus+
                    '"}'+
           '}';
console.log("mail------------------");
           console.log(mail);
var jsonMail = JSON.parse(mail);
 console.log(jsonMail);

                                var query = "SELECT id"+
                                            " FROM mail_conversation"+
                                            " WHERE subjectId = "+tokenCheck.tokenDetails.userId+" AND objectId = "+req.body.receiverId+""+
                                            " OR"+
                                            " subjectId = "+req.body.receiverId+" AND objectId = "+tokenCheck.tokenDetails.userId;

                                Mail_conversation.query(query, function(err, result) {
                                       if(err)
                                        {
                                            return res.json(200, {status: 2, error_details: err});
                                        }
                                        else
                                        {


                                             if(result == ""){

                                                   /*#######################
                                                      For new Mail conversation
                                                    ########################*/

                                                     var cnvrValues = {
                                                            subjectId            :    jsonMail.mail.senderId,
                                                            objectId             :    jsonMail.mail.receiverId,
                                                            requestStatus        :    req.body.requestStatus
                                                           };
                                                console.log(result);
                                                     //Save to Mail Conversation table
                                                        Mail_conversation.create(cnvrValues).exec(function(err, saveMailConversation){
                                                            if (err)
                                                            {
                                                                return res.json(200, {status: 2, message: 'Some error occured', errorDetails: err});
                                                            } else
                                                            {

                                                             console.log("For New Conversation");
                                                              var mailValues = {
                                                                    message             :    jsonMail.mail.message,
                                                                    conversationId      :    saveMailConversation.id,
                                                                    senderId            :    jsonMail.mail.senderId,
                                                                    receiverId          :    jsonMail.mail.receiverId,
                                                                    viewStatus          :    jsonMail.mail.viewStatus
                                                                   };
                                                                  // console.log();
                                                                //Save Mail  to Mail table
                                                                 Mail.create(mailValues).exec(function(err, saveMail){
                                                                        if (err)
                                                                        {
                                                                            return res.json(200, {status: 2, message: 'Some error occured', errorDetails: err});
                                                                        } else
                                                                        {
                                                                            console.log("Success >>>>> Mail");
                                                                            return res.json(200, {status: 1, message: 'success', result: saveMail});
                                                                        }
                                                                 });
                                                            }
                                                         });



                                             }
                                             else{
                                                     /*#######################
                                                      For Existed Mail conversation
                                                    ########################*/
                                                     console.log(" For Existed Mail conversation");
                                                     //Save Mail  to Mail table
                                                     var  mailValues = {
                                                            message             :    jsonMail.mail.message,
                                                            conversationId      :    result[0].id,
                                                            senderId            :    jsonMail.mail.senderId,
                                                            receiverId          :    jsonMail.mail.receiverId,
                                                            viewStatus          :    jsonMail.mail.viewStatus
                                                           };
                                                          //console.log(result);
                                                          //console.log(result[0].id);
                                                        //Save Mail messages to Mail table
                                                         Mail.create(mailValues).exec(function(err, saveMail){
                                                                if (err)
                                                                {
                                                                    return res.json(200, {status: 2, message: 'Some error occured', errorDetails: err});
                                                                } else
                                                                {
                                                                    console.log("Success >>>>> Mail =======");
                                                                    return res.json(200, {status: 1, message: 'success', result: saveMail});
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
                                                   Get Mailbox
 ====================================================================================================================================*/
mailbox : function(req, res) {

        UsertokenService.checkToken(req.body.token, function(err, tokenCheck) {

                    if(err)
                    {
                         return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
                    }
                    else
                    {
                        if(tokenCheck.status == 1)
                            {

                               var switchKey = req.param('box');

//console.log(switchKey);
                               var query = "SELECT * FROM  mail WHERE ";
                                       switch (switchKey)
                                            {

                                                   case 'inbox':
                                                       query +=  "receiverId = "+tokenCheck.tokenDetails.userId+" AND  receiverStatus =  '"+switchKey+"' ";
                                                   break;

                                                   case 'sent':
                                                        query +=  "senderId = "+tokenCheck.tokenDetails.userId+" AND  senderStatus =  '"+switchKey+"' ";
                                                   break;

                                                   case 'trash':
                                                        query +=  "(receiverId = "+tokenCheck.tokenDetails.userId+" AND  receiverStatus =  '"+switchKey+"') OR (senderId = "+tokenCheck.tokenDetails.userId+" AND  senderStatus =  '"+switchKey+"') ";
                                                   break;

                                                   case 'folder':
                                                        query +=  "(receiverId = "+tokenCheck.tokenDetails.userId+" AND  receiverStatus =  '"+switchKey+"') OR (senderId = "+tokenCheck.tokenDetails.userId+" AND  senderStatus =  '"+switchKey+"') ";
                                                   break;

                                                   default:
                                                       query +=  "receiverId = "+tokenCheck.tokenDetails.userId+" AND  receiverStatus =  '"+switchKey+"' ";

                                             }
                           query += "ORDER BY createdAt DESC";

                                            Mail.query(query, function(err, result) {
                                                if(err)
                                                {
                                                    return res.json(200, {status: 2, error_details: err});
                                                }
                                                else
                                                {
                                                    console.log(tokenCheck.tokenDetails.userId);
                                                    console.log(switchKey);
                                                    console.log(query);
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
                                                   Update Mailbox
 ====================================================================================================================================*/
updateMailStatus : function(req, res) {

        UsertokenService.checkToken(req.body.token, function(err, tokenCheck) {

                    if(err)
                    {
                         return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
                    }
                    else
                    {
                        if(tokenCheck.status == 1)
                            {

                               var switchKey   = req.param('update');
                               console.log(switchKey);
                               //var msgid       = req.param('id');
                               //var senderid    = req.param('senderid');
                               //var receiverid  = req.param('receiverid');

var folderId = '{"folderId" : {"id":'+req.body.folderId+'}}';
var jsonFolderId = JSON.parse(folderId);
//console.log("=====jsonFolderId==========");
//console.log(jsonFolderId.folderId.id);


var messages = '{"messages" : [{'+
                              '"id":'+req.body.msgId+',"senderId":'+req.body.senderId+',"receiverId":'+req.body.receiverId+'},'+
                              '{"id":2,"senderId":"2","receiverId":"3"}'+
                              ']}';
var jsonData = JSON.parse(messages);
messageArray = [];
for (var i = 0; i < jsonData.messages.length; i++) {
     var message = jsonData.messages[i];
     messageArray.push(message.id);
    console.log(message.id);
}

var msgid = messageArray;


                               var query = "UPDATE mail SET ";

                               switch (switchKey)
                                    {

                                           case 'draft':

                                               query += "senderStatus = '"+switchKey+"' ";

                                           break;

                                           case 'sent':

                                               query += "senderStatus = '"+switchKey+"' ";

                                           break;

                                           case 'trash':

                                                    if(req.body.senderId == tokenCheck.tokenDetails.userId){
                                                        query += "senderStatus = '"+switchKey+"' ";
                                                    }
                                                    else
                                                    {
                                                        query += "receiverStatus = '"+switchKey+"' ";
                                                    }

                                           break;

                                           case 'delete':

                                                   if(req.body.senderId == tokenCheck.tokenDetails.userId){
                                                        query += "senderStatus = '"+switchKey+"' ";
                                                    }
                                                    else
                                                    {
                                                        query += "receiverStatus = '"+switchKey+"' ";
                                                    }

                                           break;

                                           case 'folder':

                                                    if(req.body.senderId == tokenCheck.tokenDetails.userId){
                                                         query += "senderStatus = '"+switchKey+"' senderFolderId = "+jsonFolderId.folderId.id;
                                                    }
                                                    else
                                                    {
                                                        query += "receiverStatus = '"+switchKey+"', receiverFolderId = "+jsonFolderId.folderId.id;
                                                    }

                                           break;

                                           case 'viewstatus':
                                               var viewStatus = "true";
                                               query += "viewStatus = '"+viewStatus+"' ";

                                           break;

                                     }

                                    query += "WHERE id IN ("+msgid+")";

                                    Mail.query(query, function(err, result) {
                                        if(err)
                                        {
                                            return res.json(200, {status: 2, error_details: err});
                                        }
                                        else
                                        {
                                            console.log(tokenCheck.tokenDetails.userId);
                                            console.log(switchKey);
                                            console.log("update   ===query");
                                            console.log(query);
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
                                                      Get Mail details
 ====================================================================================================================================*/


    getMail : function(req, res) {

       UsertokenService.checkToken(req.body.token, function(err, tokenCheck) {
                    if(err)
                    {
                         return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});

                    }
                    else
                    {
                        if(tokenCheck.status == 1)
                            {
                                Mail.findOne({id: req.body.msgid}).exec(function findCB(err, result) {
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
                                                     Update Mail(Only in draft time)
 ====================================================================================================================================*/


    updateMail : function(req, res) {

       UsertokenService.checkToken(req.body.token, function(err, tokenCheck) {
                    if(err)
                    {
                         return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});

                    }
                    else
                    {
                        if(tokenCheck.status == 1)
                            {

var mail = '{"mail" : {"id":'+req.bod.id+', "subject": "'+req.body.subject+'", "message": "'+req.body.message+'"}}';

var jsonMail = JSON.parse(mail);
                                Mail.findOne({id: jsonMail.mail.id}).exec(function findCB(err, result) {
                                    if(err)
                                    {
                                        return res.json(200, {status: 2, error_details: err});
                                    }
                                    else
                                    {

                                            var values = {
                                                        subject          :        jsonMail.mail.subject,
                                                        message          :        jsonMail.mail.message,
                                                      };
                                        //return res.json(200, {status: 1, message: 'success'});
                                        var criteria = {id: result.id};
                                        Mail.update(criteria, values).exec(function(err, updatedMail) {
                                            if(err)
                                            {
                                                return res.json(200, {status: 2, error_details: err});
                                            }
                                            else
                                            {
                                                return res.json(200, {status: 1, data: updatedMail});
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
                                                   Create a New Folder
 ====================================================================================================================================*/


    createFolder : function(req, res) {

         UsertokenService.checkToken(req.body.token, function(err, tokenCheck) {

                    if(err)
                    {
                         return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
                    }
                    else
                    {
                        if(tokenCheck.status == 1)
                            {
                                //console.log(tokenCheck.tokenDetails.userId);
                                 var values = {
                                                name                :    req.body.name,
                                                userId              :    req.body.userId,
                                               };
                                 Folder.create(values).exec(function(err, result){
                                        if (err)
                                        {
                                            return res.json(200, {status: 2, message: 'Some error occured', errorDetails: err});
                                        } else
                                        {
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
                                                   Get user's Folder
 ====================================================================================================================================*/


    getUserFolders : function(req, res) {

         UsertokenService.checkToken(req.body.token, function(err, tokenCheck) {

                    if(err)
                    {
                         return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
                    }
                    else
                    {
                        if(tokenCheck.status == 1)
                            {
                                //console.log(tokenCheck.tokenDetails.userId);
                                 var query = "SELECT fl.name FROM  folder fl WHERE  userId = "+tokenCheck.tokenDetails.userId;

                                 Folder.query(query, function(err, result){
                                        if (err)
                                        {
                                            return res.json(200, {status: 2, message: 'Some error occured', errorDetails: err});
                                        } else
                                        {
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
                                                   Delete user's Folder
 ====================================================================================================================================*/
deleteUserFolders : function(req, res) {

         UsertokenService.checkToken(req.body.token, function(err, tokenCheck) {

                    if(err)
                    {
                         return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
                    }
                    else
                    {
                        if(tokenCheck.status == 1)
                            {
                                 Folder.destroy({id: req.body.id, userId: req.body.userId}, function(err, result){
                                        if (err)
                                        {
                                            return res.json(200, {status: 2, message: 'Some error occured', errorDetails: err});
                                        } else
                                        {
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
                                                   update user's Folder
 ====================================================================================================================================*/
updateUserFolders : function(req, res) {

         UsertokenService.checkToken(req.body.token, function(err, tokenCheck) {

                    if(err)
                    {
                         return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
                    }
                    else
                    {
                        if(tokenCheck.status == 1)
                            {
var folderDetails = '{"folderDetails" : {"id": '+req.body.id+',"name": "'+req.body.name+'"}}';
var jsonFolderDetails = JSON.parse(folderDetails);
                                 Folder.findOne({id: jsonFolderDetails.folderDetails.id}).exec(function findCB(err, result) {
                                    if(err)
                                    {
                                        return res.json(200, {status: 2, error_details: err});
                                    }
                                    else
                                    {
                                        var values = {
                                                        name : jsonFolderDetails.folderDetails.name
                                                     };

                                        var criteria = {id: result.id};

                                        Folder.update(criteria, values).exec(function(err, updatedFolder) {
                                            if(err)
                                            {
                                                return res.json(200, {status: 2, error_details: err});
                                            }
                                            else
                                            {

                                                return res.json(200, {status: 1, data: updatedFolder});
                                            }

                                        });
                                        //console.log(result);
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
                                                   List Mail Conversation(Sent & Inbox)
 ====================================================================================================================================*/

getMailList : function(req, res) {

         UsertokenService.checkToken(req.body.token, function(err, tokenCheck) {

                    if(err)
                    {
                         return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
                    }
                    else
                    {
                        if(tokenCheck.status == 1)
                            {

var query = "SELECT group1. * , usr. *"+
" FROM ("+
" SELECT *"+
" FROM ("+
" SELECT *"+
" FROM mail ml"+
" WHERE conversationId"+
" IN ("+
" SELECT cnvr.id"+
" FROM mail_conversation cnvr"+
" WHERE cnvr.subjectId = "+tokenCheck.tokenDetails.userId+
" OR cnvr.objectId = "+tokenCheck.tokenDetails.userId+
" )"+
" AND ("+
" (ml.senderStatus =  'sent' AND ml.senderId = "+tokenCheck.tokenDetails.userId+")"+
" OR (ml.receiverStatus =  'inbox' AND ml.receiverId = "+tokenCheck.tokenDetails.userId+")"+
" )"+
" ORDER BY createdAt DESC"+
" ) AS mlgrp"+
" GROUP BY mlgrp.conversationId"+
" ) AS group1"+
" INNER JOIN user usr ON group1.senderId = usr.id"+
" AND group1.receiverId =1"+
" OR group1.receiverId = usr.id"+
" AND group1.senderId =1"+
" ORDER BY CONCAT( usr.firstname, usr.lastname )";

                                console.log(query);
                                        Mail.query(query, function(err, result) {
                                                       if(err)
                                                        {
                                                            return res.json(200, {status: 2, error_details: err});
                                                        }
                                                        else
                                                        {

                                                            if(result != ""){
                                                                    return res.json(200, {status: 1, result: result});
                                                            }
                                                            else{
                                                                    return res.json(200, {status: 3, result: "No result Found"});
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
                                   GET mail Conversation(get sent and inbox messages)
 ====================================================================================================================================*/
GetMailConversation : function(req, res) {

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
            " FROM mail ml"+
            " WHERE conversationId = "+req.body.cnvrId+
            " AND ("+
            " ("+
            " senderStatus =  'sent'"+
            " AND ml.senderId = "+tokenCheck.tokenDetails.userId+
            " OR ("+
            " receiverStatus =  'inbox'"+
            " AND ml.receiverId = "+tokenCheck.tokenDetails.userId+
            " )"+
            " )"+
            " )"+
            " ORDER BY createdAt DESC ";
                                console.log(">>>>>>>>>>GET MAIL CONVER>>>>>>>>>");
                                console.log(query);

                                    Mail.query(query, function(err, result) {
                                                   if(err)
                                                    {
                                                        return res.json(200, {status: 2, error_details: err});
                                                    }
                                                    else
                                                    {
                                                        if(result != ""){
                                                            return res.json(200, {status: 1, result: result});
                                                        }
                                                        else{
                                                             return res.json(200, {status: 3, result: "No result Found"});
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


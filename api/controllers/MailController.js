/**
 * EmailController
 *
 * @description :: Server-side logic for managing emails
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var _ = require("underscore");

module.exports = {


/*===================================================================================================================================
                                                   Send mail(only when click send)
 ====================================================================================================================================*/


    sendMail : function(req, res) {

         UsertokenService.checkToken(req.body.token, function(err, tokenCheck) {

                    if(err)
                    {
                         return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
                    }
                    else
                    {
                        if(tokenCheck.status == 1)
                            {
//var mail = '{"mail" : {"subject": "SSSSSUBJECT", "message": "messagevvvvvvvvvvvvvvvvv", "file" : "",}}';
//var jsonMail = JSON.parse(mail);
                                //console.log(tokenCheck.tokenDetails.userId);
                                 var values = {
                                                subject             :    req.body.subject,
                                                message             :    req.body.message,
                                                file                :    req.body.file,
                                                senderId            :    tokenCheck.tokenDetails.userId,
                                                receiverId          :    req.body.receiverId,
                                                senderFolderId      :    req.body.senderFolderId,
                                                receiverFolderId    :    req.body.receiverFolderId,
                                                senderStatus        :    req.body.senderStatus,
                                                receiverStatus      :    req.body.receiverStatus,
                                                viewStatus          :    req.body.viewStatus
                                               };
                                 Mail.create(values).exec(function(err, result){
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
                                                       query +=  "receiverId = "+tokenCheck.tokenDetails.userId+" AND  receiverStatus =  'inbox' ";
                                                   break;

                                                   case 'sent':
                                                        query +=  "senderId = "+tokenCheck.tokenDetails.userId+" AND  senderStatus =  'sent' ";
                                                   break;

                                                   case 'trash':
                                                        query +=  "(receiverId = "+tokenCheck.tokenDetails.userId+" AND  receiverStatus =  'trash') OR (senderId = "+tokenCheck.tokenDetails.userId+" AND  senderStatus =  'trash') ";
                                                   break;

                                                   case 'folder':
                                                        query +=  "(receiverId = "+tokenCheck.tokenDetails.userId+" AND  receiverStatus =  'folder') OR (senderId = "+tokenCheck.tokenDetails.userId+" AND  senderStatus =  'folder') ";
                                                   break;

                                                   default:
                                                       query +=  "receiverId = "+tokenCheck.tokenDetails.userId+" AND  receiverStatus =  'inbox' ";

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
                               //var msgid       = req.param('id');
                               //var senderid    = req.param('senderid');
                               //var receiverid  = req.param('receiverid');

var folderId = '{"folderId" : {"id":'+req.body.folderId+'}}';
var jsonFolderId = JSON.parse(folderId);
//console.log("=====jsonFolderId==========");
//console.log(jsonFolderId.folderId.id);


var messages = '{"messages" : [{"id":'+req.body.msgId+'},{"id":2}]}';
var jsonData = JSON.parse(messages);
messageArray = [];
for (var i = 0; i < jsonData.messages.length; i++) {
     var message = jsonData.messages[i];
     messageArray.push(message.id);
    //console.log(message.id);
}

var msgid = messageArray;


                               var query = "UPDATE mail SET ";

                               switch (switchKey)
                                    {
                                           case 'sendertrash':
                                               query += "senderStatus = 'trash' ";
                                           break;

                                           case 'senderdraft':
                                               query += "senderStatus = 'draft' ";
                                           break;

                                           case 'sendersent':
                                               query += "senderStatus = 'sent' ";
                                           break;

                                           case 'senderdelete':
                                               query += "senderStatus = 'delete' ";
                                           break;

                                           case 'senderfolder':
                                               query += "senderStatus = 'folder' senderFolderId = "+jsonFolderId.folderId.id;
                                           break;

                                           case 'receivertrash':
                                               query += "receiverStatus = 'trash' ";
                                           break;

                                           case 'receiverdelete':
                                               query += "receiverStatus = 'delete' ";
                                           break;

                                           case 'receiverfolder':
                                               query += "receiverStatus = 'folder', receiverFolderId = "+jsonFolderId.folderId.id;
                                           break;

                                           case 'viewstatus':
                                               query += "viewStatus = 'true' ";
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
                                                   update user's Mail Settings
 ====================================================================================================================================*/
updateUserMailSettings : function(req, res) {

         UsertokenService.checkToken(req.body.token, function(err, tokenCheck) {

                    if(err)
                    {
                         return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
                    }
                    else
                    {
                        if(tokenCheck.status == 1)

                            {

//var settingsDetails = '{"settingsDetails" : {"mailNotificationPeriod": "'+req.body.mailNotificationPeriod+'","newMailNotify": "'+req.body.newMailNotify+'" }}';
//var jsonSettingsDetails = JSON.parse(settingsDetails);
//console.log(jsonSettingsDetails);

                                 User.findOne({id: tokenCheck.tokenDetails.userId}).exec(function findCB(err, result) {
                                    if(err)
                                    {
                                        return res.json(200, {status: 2, error_details: err});
                                    }
                                    else
                                    {
                                        var values = {
                                                        firstname : req.body.name
                                                     };

                                        var criteria = {id: result.id};

                                        User.update(criteria, values).exec(function(err, updatedSettings) {
                                            if(err)
                                            {
                                                return res.json(200, {status: 2, error_details: err});
                                            }
                                            else
                                            {

                                                return res.json(200, {status: 1, data: updatedSettings});
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
                                                   Get user's Mail Preferences
 ====================================================================================================================================*/




};


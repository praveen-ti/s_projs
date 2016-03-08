/**
 * EmailController
 *
 * @description :: Server-side logic for managing emails
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var _ = require("underscore");
var mailConstants = sails.config.constants.mail;

module.exports = {



/*===================================================================================================================================
Save Mail
 ====================================================================================================================================*/


 saveMail : function(req, res) {
console.log("<<<<<<<<<<<<<<<, SAVE MAIL");
/*console.log(req.body.composeTo);
console.log(req.body.composeSubject);
console.log(req.body.composeMessage);
console.log(req.body.receiverId);
console.log(req.body.senderId);
console.log(req.body.token);
console.log(req.body.mailType);*/
console.log("req.body.entryId");
console.log(req.body.token);
console.log(req.body.entryId);


         UsertokenService.checkToken(req.body.token, function(err, tokenCheck) {

                    if(err)
                    {

                         return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
                    }
                    else
                    {

                        if(tokenCheck.status == 1)
                            {




                                if(req.body.receiverId == 'undefined'){
                                    req.body.receiverId = 0;
                                }

                                var query = "SELECT id"+
                                            " FROM mail_conversation"+
                                            " WHERE subjectId = "+tokenCheck.tokenDetails.userId+" AND objectId = "+req.body.receiverId+
                                            " OR"+
                                            " subjectId = "+req.body.receiverId+" AND objectId = "+tokenCheck.tokenDetails.userId;

                                Mail_conversation.query(query, function(err, result) {
                                       if(err)
                                        {
                                            console.log(err);
                                            return res.json(200, {status: 2, error_details: err});
                                        }
                                        else
                                        {

                                     if(result == ""){

                                                   /*#######################
                                                      For new Mail conversation
                                                    ########################*/
                                    console.log("For New Mail conversation");
                                                    var cnvrValues = {
                                                            subjectId            :    req.body.senderId,
                                                            objectId             :    req.body.receiverId,
                                                           };
                                                     //Save to Mail Conversation table
                                                        Mail_conversation.create(cnvrValues).exec(function(err, saveMailConversation){
                                                            if (err)
                                                            {
                                                                return res.json(200, {status: 2, message: 'Some error occured', errorDetails: err});
                                                            } else
                                                            {

                                                                req.file('attachments').upload({dirname: '../../assets/images/attachments'},function (err, files) {
                                                                        if (err)
                                                                        {
                                                                            console.log("files--------ERROR -----------");
                                                                            return res.json(200, {status: 2, message: 'some error occured', error_details: err});
                                                                        }
                                                                        else
                                                                        {
                                                                            fileNameArray = [];
                                                                            console.log(files);
                                                                            for( var i=0;i<files.length;i++){
                                                                                var filename = files[i].fd;
                                                                                filename = filename.split('/');
                                                                                fileNameArray.push(filename[filename.length-1]);
                                                                            }
                                                                            console.log("fileNameArray >>>>>>>>>>");
                                                                            console.log(fileNameArray);
                                                                            console.log("fileNameArray >>>>>>>>");


                                                                             var mailValues = {
                                                                                        subject             :    req.body.composeSubject,
                                                                                        message             :    req.body.composeMessage,
                                                                                        file                :    fileNameArray,
                                                                                        conversationId      :    saveMailConversation.id,
                                                                                        senderId            :    tokenCheck.tokenDetails.userId,
                                                                                        receiverId          :    req.body.receiverId,
                                                                                        senderStatus        :    mailConstants.SENDER_STATUS_DRAFT,
                                                                                        viewStatus          :    mailConstants.VIEW_STATUS_UNREAD
                                                                                       };

                                                                            console.log("files--------UPLOADED ---------");

                                                                            //var filePath = files[0].fd;
                                                                           // filePath     = filePath.split("/assets/");
                                                                           Mail.create(mailValues).exec(function(err, saveMail){
                                                                                    if (err)
                                                                                    {
                                                                                        return res.json(200, {status: 2, message: 'Some error occured', errorDetails: err});
                                                                                    } else
                                                                                    {
                                                                                        return res.json(200, {status: 1, message: 'success', data: saveMail});
                                                                                    }
                                                                             });
                                                                         }
                                                                     });//Img Upload


                                                            }
                                                         });



                                             }
                                             else{//Conversation Already Exists So only insert Mails

                                                     /*#######################
                                                      For Existed Mail conversation
                                                    ########################*/
                                                    console.log("For Existed Mail conversation");
                                                     //Save Mail  to Mail table


                                                        //Save Mail messages to Mail table
                                                                var switchKey = req.body.entryId;
                                                                console.log("switchKey >>>>>>>>>>>>>>>");
                                                                console.log(switchKey);
                                                                console.log("switchKey >>>>>>>>>>>>>>>");
                                                                switch (switchKey)
                                                                {

                                                                       case 'undefined':

                                                                           console.log("nullllllll");

                                                            req.file('attachments').upload({dirname: '../../assets/images/attachments'},function (err, files) {
                                                                if (err)
                                                                {
                                                                    console.log("files--------ERROR -----------");
                                                                    return res.json(200, {status: 2, message: 'some error occured', error_details: err});
                                                                }
                                                                else
                                                                {
                                                                        fileNameArray = [];
                                                                        console.log(files);
                                                                        for( var i=0;i<files.length;i++){
                                                                            var filename = files[i].fd;
                                                                            filename = filename.split('/');
                                                                            fileNameArray.push(filename[filename.length-1]);
                                                                        }
                                                                        console.log("fileNameArray >>>>>>>>>>");
                                                                        console.log(fileNameArray);
                                                                        console.log("fileNameArray >>>>>>>>");

                                                                         var  mailValues = {
                                                                                subject             :    req.body.composeSubject,
                                                                                message             :    req.body.composeMessage,
                                                                                file                :    fileNameArray,
                                                                                conversationId      :    result[0].id,
                                                                                senderId            :    tokenCheck.tokenDetails.userId,
                                                                                receiverId          :    req.body.receiverId,
                                                                                senderStatus        :    mailConstants.SENDER_STATUS_DRAFT,
                                                                                viewStatus          :    mailConstants.VIEW_STATUS_UNREAD
                                                                            };

                                                                           Mail.create(mailValues).exec(function(err, saveMail){
                                                                                if (err)
                                                                                {
                                                                                    return res.json(200, {status: 2, message: 'Some error occured', errorDetails: err});
                                                                                } else
                                                                                {
                                                                                    return res.json(200, {status: 1, message: 'success', data: saveMail});
                                                                                }
                                                                            });
                                                                    }
                                                                });

                                                                       break;

                                                                       default :

                                                                              Mail.findOne({id: req.body.entryId}).exec(function findCB(err, findMail) {
                                                                                    if (err)
                                                                                    {
                                                                                        return res.json(200, {status: 2, error_details: err});
                                                                                    }
                                                                                    else
                                                                                    {
console.log("findMail >>>>>");
console.log(findMail);
console.log("findMail >>>>>>");
                                                                        req.file('attachments').upload({dirname: '../../assets/images/attachments'},function (err, files) {
                                                                                if (err)
                                                                                {
                                                                                    console.log("files--------ERROR -----------");
                                                                                    return res.json(200, {status: 2, message: 'some error occured', error_details: err});
                                                                                }
                                                                                else
                                                                                {
                                                                                        finalArray = [];
                                                                                        fileNameArray = [];
                                                                                        console.log(files);
                                                                                        for( var i=0;i<files.length;i++){
                                                                                            var filename = files[i].fd;
                                                                                            filename = filename.split('/');
                                                                                            fileNameArray.push(filename[filename.length-1]);
                                                                                        }
                                                                                        console.log("fileNameArray >>>>>>>>>>");
                                                                                        console.log(fileNameArray);
                                                                                        console.log("["+findMail.file+"]");
                                                                                        console.log("fileNameArray >>>>>>>>");
                                                                                        //var firstFile = "["+findMail.file+"]";
                                                                                       //var firstFile =  findMail.file ;
                                                                                       // var finalArray = firstFile.join(fileNameArray);

                                                                                        console.log("finalArray +++++++++");
                                                                                           console.log(finalArray);
                                                                                           console.log("finalArray Extra");
                                                                                           //var extra = "'" + finalArray.join("','") + "'";
                                                                                           //console.log(extra);
                                                                                          // var resultw = '\'' + finalArray.split(',').join('\',\'') + '\'';
                                                                                           //console.log(result);
                                                                                        console.log("finalArray +++++++++++");

                                                                                        var values = {
                                                                                            subject             :    req.body.composeSubject,
                                                                                            message             :    req.body.composeMessage,
                                                                                            file                :    fileNameArray,
                                                                                            conversationId      :    result[0].id,
                                                                                            senderId            :    tokenCheck.tokenDetails.userId,
                                                                                            receiverId          :    req.body.receiverId,
                                                                                            senderStatus        :    mailConstants.SENDER_STATUS_DRAFT,
                                                                                            viewStatus          :    mailConstants.VIEW_STATUS_UNREAD
                                                                                        };
                                                                                        //return res.json(200, {status: 1, message: 'success'});
                                                                                        var criteria = {id: findMail.id};
                                                                                        Mail.update(criteria, values).exec(function (err, updatedMail) {
                                                                                            if (err)
                                                                                            {
                                                                                                return res.json(200, {status: 2, error_details: err});
                                                                                            }
                                                                                            else
                                                                                            {

                                                                                                return res.json(200, {status: 1, data: updatedMail});
                                                                                            }

                                                                                        });

                                                                             }
                                                                         });//Img Upload
                                                                                    }
                                                                            });


                                                                       break;
                                                                 }

                                            }
                                        }
                                });


                            }
                            else
                            {
                                console.log("token expired");
                                return res.json(200, {status: 3, message: 'token expired'});
                            }
                   }
         });



    },


/*===================================================================================================================================
Get Mailbox
 ====================================================================================================================================*/
mailbox : function(req, res) {

var request = req.body.request;
console.log(request);
        UsertokenService.checkToken(req.body.token, function(err, tokenCheck) {

                    if(err)
                    {
                         return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
                    }
                    else
                    {
                        if(tokenCheck.status == 1)
                            {
console.log("tokenStatus-1");
                               //var switchKey = req.param('box');
                               var switchKey = request.box;
                               //var query = "SELECT * FROM  mail WHERE ";
                                       switch (switchKey)
                                            {

                                                   case 'inbox':
                                                       query =  " SELECT ml.id, ml.subject, ml.file, ml.receiverStatus ,"+
                                                                " ml.viewStatus, ml.senderId, ml.receiverId,"+
                                                                " LEFT( ml.message, 50 ) limitedMsg,"+
                                                                " CONCAT( usr.firstname,' ', usr.lastname ) sender,"+
                                                                " DATE_FORMAT( ml.createdAt,  '%l:%i %p' ) mailTime,"+
                                                                " CASE"+
                                                                " DATE_FORMAT( ml.createdAt,  '%Y-%m-%d' )"+
                                                                " WHEN"+
                                                                " DATE_FORMAT( NOW() ,'%Y-%m-%d')"+
                                                                " THEN"+
                                                                " CONCAT('TODAY','-',DATE_FORMAT( ml.createdAt,  '%l:%i %p' ))"+
                                                                " ELSE"+
                                                                " CONCAT( MONTHNAME( ml.createdAt ) ,  ' ', DAY( ml.createdAt ) ,  ' ,', YEAR( ml.createdAt ) )"+
                                                                " END AS derivedDateTime"+
                                                                " FROM mail ml"+
                                                                " INNER JOIN user usr ON ml.senderId = usr.id"+
                                                                " WHERE ml.receiverId = "+tokenCheck.tokenDetails.userId+
                                                                " AND ml.receiverStatus =  '"+switchKey+"'"+
                                                                " ORDER BY ml.createdAt DESC ";
                                                   break;

                                                   case 'draft':
                                                       query = " SELECT ml.id, ml.subject, ml.file, ml.senderStatus ,"+
                                                                " ml.viewStatus, ml.senderId, ml.receiverId,"+
                                                                " LEFT( ml.message, 50 ) limitedMsg,"+
                                                                " CONCAT( usr.firstname,' ', usr.lastname ) sender,"+
                                                                " DATE_FORMAT( ml.createdAt,  '%l:%i %p' ) mailTime,"+
                                                                " CASE"+
                                                                " DATE_FORMAT( ml.createdAt,  '%Y-%m-%d' )"+
                                                                " WHEN"+
                                                                " DATE_FORMAT( NOW() ,'%Y-%m-%d')"+
                                                                " THEN"+
                                                                " CONCAT('TODAY','-',DATE_FORMAT( ml.createdAt,  '%l:%i %p' ))"+
                                                                " ELSE"+
                                                                " CONCAT( MONTHNAME( ml.createdAt ) ,  ' ', DAY( ml.createdAt ) ,  ' ,', YEAR( ml.createdAt ) )"+
                                                                " END AS derivedDateTime"+
                                                                " FROM mail ml"+
                                                                " INNER JOIN user usr ON ml.senderId = usr.id"+
                                                                " WHERE ml.senderId = "+tokenCheck.tokenDetails.userId+
                                                                " AND ml.senderStatus =  '"+switchKey+"'"+
                                                                " ORDER BY ml.createdAt DESC ";
                                                   break;

                                                   case 'sent':
                                                        //query +=  "senderId = "+tokenCheck.tokenDetails.userId+" AND  senderStatus =  '"+switchKey+"' ";
                                                        query = " SELECT ml.id, ml.subject, ml.file, ml.senderStatus ,"+
                                                                " ml.viewStatus, ml.senderId, ml.receiverId,"+
                                                                " LEFT( ml.message, 50 ) limitedMsg,"+
                                                                " CONCAT( usr.firstname,' ', usr.lastname ) sender,"+
                                                                " DATE_FORMAT( ml.createdAt,  '%l:%i %p' ) mailTime,"+
                                                                " CASE"+
                                                                " DATE_FORMAT( ml.createdAt,  '%Y-%m-%d' )"+
                                                                " WHEN"+
                                                                " DATE_FORMAT( NOW() ,'%Y-%m-%d')"+
                                                                " THEN"+
                                                                " CONCAT('TODAY','-',DATE_FORMAT( ml.createdAt,  '%l:%i %p' ))"+
                                                                " ELSE"+
                                                                " CONCAT( MONTHNAME( ml.createdAt ) ,  ' ', DAY( ml.createdAt ) ,  ' ,', YEAR( ml.createdAt ) )"+
                                                                " END AS derivedDateTime"+
                                                                " FROM mail ml"+
                                                                " INNER JOIN user usr ON ml.senderId = usr.id"+
                                                                " WHERE ml.senderId = "+tokenCheck.tokenDetails.userId+
                                                                " AND ml.senderStatus =  '"+switchKey+"'"+
                                                                " ORDER BY ml.createdAt DESC ";
                                                   break;

                                                   case 'trash':
                                                        //query +=  "(receiverId = "+tokenCheck.tokenDetails.userId+" AND  receiverStatus =  '"+switchKey+"') OR (senderId = "+tokenCheck.tokenDetails.userId+" AND  senderStatus =  '"+switchKey+"') ";
                                                      query =   " SELECT ml.id, ml.subject, ml.file,"+
                                                                " ml.receiverStatus , ml.senderStatus,"+
                                                                " ml.viewStatus, ml.senderId, ml.receiverId,"+
                                                                " LEFT( ml.message, 50 ) limitedMsg,"+
                                                                " CONCAT( usr.firstname,' ', usr.lastname ) sender,"+
                                                                " DATE_FORMAT( ml.createdAt,  '%l:%i %p' ) mailTime,"+
                                                                " CASE"+
                                                                " DATE_FORMAT( ml.createdAt,  '%Y-%m-%d' )"+
                                                                " WHEN"+
                                                                " DATE_FORMAT( NOW() ,'%Y-%m-%d')"+
                                                                " THEN"+
                                                                " CONCAT('TODAY','-',DATE_FORMAT( ml.createdAt,  '%l:%i %p' ))"+
                                                                " ELSE"+
                                                                " CONCAT( MONTHNAME( ml.createdAt ) ,  ' ', DAY( ml.createdAt ) ,  ' ,', YEAR( ml.createdAt ) )"+
                                                                " END AS derivedDateTime"+
                                                                " FROM mail ml"+
                                                                " INNER JOIN user usr ON ml.senderId = usr.id"+
                                                                " WHERE"+
                                                                " ( ml.receiverId = "+tokenCheck.tokenDetails.userId+" AND ml.receiverStatus =  '"+switchKey+"')"+
                                                                " OR"+
                                                                " ( ml.senderId = "+tokenCheck.tokenDetails.userId+" AND ml.senderStatus =  '"+switchKey+"')"+
                                                                " ORDER BY ml.createdAt DESC";


                                                   break;

                                                   case 'folder':
                                                        //query +=  "(receiverId = "+tokenCheck.tokenDetails.userId+" AND  receiverStatus =  '"+switchKey+"') OR (senderId = "+tokenCheck.tokenDetails.userId+" AND  senderStatus =  '"+switchKey+"') ";
                                                       query  = " SELECT ml.id, ml.subject, ml.file,"+
                                                                " ml.receiverStatus , ml.senderStatus,"+
                                                                " ml.viewStatus, ml.senderId, ml.receiverId, ml.createdAt,"+
                                                                " LEFT( ml.message, 50 ) limitedMsg,"+
                                                                " CONCAT( usr.firstname,' ', usr.lastname ) sender,"+
                                                                " DATE_FORMAT( ml.createdAt,  '%l:%i %p' ) mailTime,"+
                                                                " CASE"+
                                                                " DATE_FORMAT( ml.createdAt,  '%Y-%m-%d' )"+
                                                                " WHEN"+
                                                                " DATE_FORMAT( NOW() ,'%Y-%m-%d')"+
                                                                " THEN"+
                                                                " CONCAT('TODAY','-',DATE_FORMAT( ml.createdAt,  '%l:%i %p' ))"+
                                                                " ELSE"+
                                                                " CONCAT( MONTHNAME( ml.createdAt ) ,  ' ', DAY( ml.createdAt ) ,  ' ,', YEAR( ml.createdAt ) )"+
                                                                " END AS derivedDateTime,"+
                                                                " fld.name folderName, fld.id folderId"+
                                                                " FROM mail ml"+
                                                                " INNER JOIN user usr ON ml.receiverId = usr.id"+
                                                                " INNER JOIN folder fld ON ml.receiverFolderId = fld.id AND ml.receiverId = fld.userId"+
                                                                " WHERE"+
                                                                " ml.receiverId = "+tokenCheck.tokenDetails.userId+" AND ml.receiverStatus = '"+switchKey+"'"+
                                                                " AND fld.name= '"+request.folderName+"'"+
                                                                " UNION"+
                                                                " SELECT ml.id, ml.subject, ml.file,"+
                                                                " ml.receiverStatus , ml.senderStatus,"+
                                                                " ml.viewStatus, ml.senderId, ml.receiverId, ml.createdAt,"+
                                                                " LEFT( ml.message, 50 ) limitedMsg,"+
                                                                " CONCAT( usr.firstname,' ', usr.lastname ) sender,"+
                                                                " DATE_FORMAT( ml.createdAt,  '%l:%i %p' ) mailTime,"+
                                                                " CASE"+
                                                                " DATE_FORMAT( ml.createdAt,  '%Y-%m-%d' )"+
                                                                " WHEN"+
                                                                " DATE_FORMAT( NOW() ,'%Y-%m-%d')"+
                                                                " THEN"+
                                                                " CONCAT('TODAY','-',DATE_FORMAT( ml.createdAt,  '%l:%i %p' ))"+
                                                                " ELSE"+
                                                                " CONCAT( MONTHNAME( ml.createdAt ) ,  ' ', DAY( ml.createdAt ) ,  ' ,', YEAR( ml.createdAt ) )"+
                                                                " END AS derivedDateTime,"+
                                                                " fld.name folderName, fld.id folderId"+
                                                                " FROM mail ml"+
                                                                " INNER JOIN user usr ON ml.senderId = usr.id"+
                                                                " INNER JOIN folder fld ON ml.senderFolderId = fld.id AND ml.senderId = fld.userId"+
                                                                " WHERE"+
                                                                " ml.senderId = "+tokenCheck.tokenDetails.userId+" AND ml.senderStatus = '"+switchKey+"'"+
                                                                " AND fld.name= '"+request.folderName+"'"+
                                                                " ORDER BY createdAt DESC";
                                                   break;

                                                   case 'conversations':

                                                         query =    " SELECT cnvFull.* ,"+
                                                                    " CONCAT( usr.firstname, ' ', usr.lastname ) sender,"+
                                                                    " usr.profilePic"+
                                                                    " FROM ("+
                                                                    " SELECT ml.id, ml.subject, ml.message, ml.file,"+
                                                                    " ml.conversationId, ml.createdAt,"+
                                                                    " LEFT( ml.message, 50 ) limitedMsg,"+
                                                                    " MONTHNAME( ml.createdAt ) crMonth,"+
                                                                    " DAY( ml.createdAt ) crDay,"+
                                                                    " YEAR( ml.createdAt ) crYear,"+
                                                                    " DATE_FORMAT( ml.createdAt,  '%l:%i %p' ) mailTime,"+
                                                                    " CASE"+
                                                                    " DATE_FORMAT( ml.createdAt,  '%Y-%m-%d' )"+
                                                                    " WHEN"+
                                                                    " DATE_FORMAT( NOW() ,'%Y-%m-%d')"+
                                                                    " THEN"+
                                                                    " CONCAT('TODAY','-',DATE_FORMAT( ml.createdAt,  '%l:%i %p' ))"+
                                                                    " ELSE"+
                                                                    " CONCAT( MONTHNAME( ml.createdAt ) ,  ' ', DAY( ml.createdAt ) ,  ' ,', YEAR( ml.createdAt ) )"+
                                                                    " END AS derivedDateTime"+
                                                                    " FROM mail ml"+
                                                                    " WHERE ml.conversationId"+
                                                                    " IN ("+
                                                                    " SELECT mlcn.id"+
                                                                    " FROM mail_conversation mlcn"+
                                                                    " WHERE subjectId = "+tokenCheck.tokenDetails.userId+
                                                                    " OR objectId = "+tokenCheck.tokenDetails.userId+
                                                                    " )"+
                                                                    " ORDER BY ml.createdAt DESC"+
                                                                    " )cnvFull"+
                                                                    " INNER JOIN user usr"+
                                                                    " WHERE usr.id = "+tokenCheck.tokenDetails.userId+
                                                                    " GROUP BY cnvFull.conversationId DESC";
                                                   break;

                                                   default:
                                                       switchKey = "inbox";
                                                       //query +=  "receiverId = "+tokenCheck.tokenDetails.userId+" AND  receiverStatus =  '"+switchKey+"' ";
                                                       query =  " SELECT ml.id, ml.subject, ml.file, ml.receiverStatus ,"+
                                                                " ml.viewStatus, ml.senderId, ml.receiverId,"+
                                                                " LEFT( ml.message, 50 ) limitedMsg,"+
                                                                " CONCAT( usr.firstname,' ', usr.lastname ) sender,"+
                                                                " DATE_FORMAT( ml.createdAt,  '%l:%i %p' ) mailTime,"+
                                                                " CASE"+
                                                                " DATE_FORMAT( ml.createdAt,  '%Y-%m-%d' )"+
                                                                " WHEN"+
                                                                " DATE_FORMAT( NOW() ,'%Y-%m-%d')"+
                                                                " THEN"+
                                                                " CONCAT('TODAY','-',DATE_FORMAT( ml.createdAt,  '%l:%i %p' ))"+
                                                                " ELSE"+
                                                                " CONCAT( MONTHNAME( ml.createdAt ) ,  ' ', DAY( ml.createdAt ) ,  ' ,', YEAR( ml.createdAt ) )"+
                                                                " END AS derivedDateTime"+
                                                                " FROM mail ml"+
                                                                " INNER JOIN user usr ON ml.senderId = usr.id"+
                                                                " WHERE ml.receiverId = "+tokenCheck.tokenDetails.userId+
                                                                " AND ml.receiverStatus =  '"+switchKey+"'"+
                                                                " ORDER BY ml.createdAt DESC ";
                                             }
                           //query += "ORDER BY createdAt DESC";
            console.log(query);
                                            Mail.query(query, function(err, result) {
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
Update Mailbox
 ====================================================================================================================================*/
updateMailStatus : function(req, res) {

var request = req.body.request;
console.log("request  >>>> Update Mailbox");
console.log(request);
        UsertokenService.checkToken(req.body.token, function(err, tokenCheck) {

                    if(err)
                    {
                         return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
                    }
                    else
                    {
                        if(tokenCheck.status == 1)
                            {
                                var switchKey     = request.mailStatus;
                                // var switchKey   = req.param('update');
                               console.log("SWITCH KEY======================");

                                if(switchKey == "sent"){

                                    if(!request.receiverId){
                                        return res.json(200, {status: 2, message: "Please select a Receiver"});
                                    }

                                }else{
                                    var chkMailArray   = request.chkMailArray;
                                    console.log("chkMailIdArray/////////////");
                                    console.log(chkMailArray);
                                    if(typeof chkMailArray == "undefined"){
                                        return res.json(200, {status: 2, message: "Please select atleast one message"});
                                    }
                                    var chkMailIdArray = [];
                                    var rsArray = [];
                                    var ssArray = [];
                                }


                               switch (switchKey)
                                    {

                                          /* case 'draft':

                                               query += "senderStatus = '"+switchKey+"' ";

                                           break;
                                           */

                                           case 'sent':

                                               Mail.findOne({id: request.entryId}).exec(function findCB(err, result) {
                                                    if (err)
                                                    {
                                                        return res.json(200, {status: 2, error_details: err});
                                                    }
                                                    else
                                                    {
                                                        var values = {
                                                             receiverId      :   request.receiverId,
                                                             senderStatus    :   switchKey

                                                        };
                                                        var criteria = {
                                                                          id          : result.id
                                                                        };
                                              console.log("values and Criteria");
                                              console.log(values);
                                              console.log(criteria);
                                              Mail.update(criteria, values).exec(function (err, SentMail) {
                                                            if (err)
                                                            {
                                                                console.log(SentMail);
                                                                return res.json(200, {status: 2, error_details: err});
                                                            }
                                                            else
                                                            {

                                                            User.findOne({id: request.receiverId}).exec(function findCB(err, receiverDetails) {
                                                                if (err)
                                                                {
                                                                    return res.json(200, {status: 2, error_details: err});
                                                                }
                                                                else
                                                                {


                                                                    //Email
                                                                    console.log("receiverDetails----->>>>>");
                                                                    console.log(receiverDetails);
                                                                    var email_to        = receiverDetails.email;
                                                                    var email_subject   = 'Zentiera - Sent Message';
                                                                    var email_template  = 'inboxMessage';
                                                                    var email_context   = { category: "sent-Email", email : receiverDetails.email, receiverName: receiverDetails.firstname+" "+receiverDetails.lastname, senderName: request.senderName};
                                                                    UserService.emailSend(email_to,email_subject,email_template,email_context, function(err, sendresult) {
                                                                        if(err)
                                                                        {
                                                                                return res.json(200, {status: 2, message: 'some error occured', error_details: sendresult});
                                                                                sails.log.debug('Some error occured ' + sendresult);

                                                                        }
                                                                       else{

                                                                             console.log("User -> Email for Message sent");
                                                                             //console.log(result);
                                                                             console.log(email_to);
                                                                             console.log(email_subject);
                                                                             console.log(email_template);
                                                                             console.log(email_context);

                                                                             console.log(SentMail);
                                                                             return res.json(200, {status: 1, message: "success", mailStatus: "sent",data: SentMail});
                                                                        }

                                                                });


                                                            }
                                                            });

                                                       }
                                                     });

                                               }
                                             });


                                           break;

                                           case 'trash':


                                                  var ctr = 0;
                                                   //foreach Starts


                                                        chkMailArray.forEach(function(factor, index){
                                                                 ctr ++;
                                                                 if(factor.senderId == tokenCheck.tokenDetails.userId){
                                                                        ssArray.push('('+factor.id+',"'+switchKey+'")');
                                                                 }
                                                                 else if(factor.receiverId == tokenCheck.tokenDetails.userId){
                                                                       rsArray.push('('+factor.id+',"'+switchKey+'")');
                                                                 }
                                                        });

                                                     async.parallel([
                                                         function(callback) {
                                                            if(rsArray.length){

                                                                query1 = "INSERT INTO mail (id,receiverStatus) VALUES"+rsArray+
                                                                                " ON"+
                                                                                " DUPLICATE KEY"+
                                                                                " UPDATE receiverStatus=VALUES(receiverStatus)";

                                                                  console.log(query1);
                                                                  Mail.query(query1, function(err, result1) {

                                                                            if (err) return callback(err);
                                                                            console.log("result1 ===>");
                                                                             console.log("trash ===>");
                                                                            callback();
                                                                            //return res.json(200, {status: 1, message: "success", data1: result1});
                                                                            //return res.json(200, {status: 1, message: "success--1st"});
                                                                    });
                                                            }
                                                        },
                                                        function(callback) {
                                                            //var query2 = "";
                                                            if(ssArray.length){
                                                                query2 = "INSERT INTO mail (id,senderStatus) VALUES"+ssArray+
                                                                                " ON"+
                                                                                " DUPLICATE KEY"+
                                                                                " UPDATE senderStatus=VALUES(senderStatus)";

                                                                console.log(query2);

                                                               Mail.query(query2, function(err, result2) {
                                                                            if (err) return callback(err);
                                                                            console.log("result2 ===>");
                                                                            callback();
                                                                            //return res.json(200, {status: 1, message: "success", data2: result2});
                                                                            //return res.json(200, {status: 1, message: "success --2nd"});
                                                                });

                                                        }
                                                       }


                                                   // return res.json(200, {status: 1, message: "success"});

                                                   ], function(err) { //This function gets called after the two tasks have called their "task callbacks"
                                                                    if (err) return res.json(200, {status: 2, message: "error"}); //If an error occured, we let express/connect handle it by calling the "next" function
                                                                    console.log("??????????????");
                                                                    return res.json(200, {status: 1, message: "success--all"});
                                                     });


                                           break;

                                           case 'delete':

                                                var ctr = 0;
                                                   //foreach Starts


                                                        chkMailArray.forEach(function(factor, index){
                                                                 ctr ++;
                                                                 if(factor.senderId == tokenCheck.tokenDetails.userId){
                                                                        ssArray.push('('+factor.id+',"'+switchKey+'")');
                                                                 }
                                                                 else if(factor.receiverId == tokenCheck.tokenDetails.userId){
                                                                       rsArray.push('('+factor.id+',"'+switchKey+'")');
                                                                 }
                                                        });

                                                     async.parallel([
                                                         function(callback) {
                                                            if(rsArray.length){

                                                                query1 = "INSERT INTO mail (id,receiverStatus) VALUES"+rsArray+
                                                                                " ON"+
                                                                                " DUPLICATE KEY"+
                                                                                " UPDATE receiverStatus=VALUES(receiverStatus)";

                                                                  console.log(query1);
                                                                  Mail.query(query1, function(err, result1) {

                                                                            if (err) return callback(err);
                                                                            console.log("result1 ===>");
                                                                             console.log("trash ===>");
                                                                            callback();
                                                                            //return res.json(200, {status: 1, message: "success", data1: result1});
                                                                            //return res.json(200, {status: 1, message: "success--1st"});
                                                                    });
                                                            }
                                                        },
                                                        function(callback) {
                                                            //var query2 = "";
                                                            if(ssArray.length){
                                                                query2 = "INSERT INTO mail (id,senderStatus) VALUES"+ssArray+
                                                                                " ON"+
                                                                                " DUPLICATE KEY"+
                                                                                " UPDATE senderStatus=VALUES(senderStatus)";

                                                                console.log(query2);

                                                               Mail.query(query2, function(err, result2) {
                                                                            if (err) return callback(err);
                                                                            console.log("result2 ===>");
                                                                            callback();
                                                                            //return res.json(200, {status: 1, message: "success", data2: result2});
                                                                            //return res.json(200, {status: 1, message: "success --2nd"});
                                                                });

                                                        }
                                                       }


                                                   // return res.json(200, {status: 1, message: "success"});

                                                   ], function(err) { //This function gets called after the two tasks have called their "task callbacks"
                                                                    if (err) return res.json(200, {status: 2, message: "error"}); //If an error occured, we let express/connect handle it by calling the "next" function
                                                                    console.log("??????????????");
                                                                    return res.json(200, {status: 1, message: "success--all"});
                                                     });

                                           break;

                                           case 'folder':
console.log("FOLDER======sssssss");
console.log(request.folderId);
console.log("request.folderId");
                                                   /*
                                                    if(req.body.senderId == tokenCheck.tokenDetails.userId){
                                                         query += "senderStatus = '"+switchKey+"' senderFolderId = "+jsonFolderId.folderId.id;
                                                    }
                                                    else
                                                    {
                                                        query += "receiverStatus = '"+switchKey+"', receiverFolderId = "+jsonFolderId.folderId.id;
                                                    }
                                                    */

                                                    var ctr = 0;
                                                   //foreach Starts


                                                        chkMailArray.forEach(function(factor, index){
                                                                 ctr ++;
                                                                 if(factor.senderId == tokenCheck.tokenDetails.userId){
                                                                     //ssArray.push(factor.id);
                                                                     //ssFolderIdArray.push(factor.folderId);
                                                                    /* query1 = "INSERT INTO mail (id,senderStatus,senderFolderId) VALUES"+
                                                                                " ("+factor.id+",'"+switchKey+"',"+factor.folderId+")"+
                                                                                " ON"+
                                                                                " DUPLICATE KEY"+
                                                                                " UPDATE senderStatus=VALUES(senderStatus),"+
                                                                                " senderFolderId=VALUES(senderFolderId)";
                                                                     console.log(query1);*/


                                                                     //ssArray.push('('+factor.id+',"'+switchKey+'",'+request.folderId+',"'+switchKey+'",'+request.folderId+')');
                                                                        ssArray.push('('+factor.id+',"'+switchKey+'",'+request.folderId+')');
                                                                 }
                                                                 else if(factor.receiverId == tokenCheck.tokenDetails.userId){
                                                                     //rsArray.push(factor.id);
                                                                     //rsFolderIdArray.push(factor.folderId);
                                                                    /* query2 = "INSERT INTO mail (id,receiverStatus,receiverFolderId) VALUES"+
                                                                                " ("+factor.id+",'"+switchKey+"', "+factor.folderId+",)"+
                                                                                " ON"+
                                                                                " DUPLICATE KEY"+
                                                                                " UPDATE receiverStatus=VALUES(receiverStatus),"+
                                                                                " receiverFolderId=VALUES(receiverFolderId)";*/
                                                                      //rsArray.push('('+factor.id+',"'+switchKey+'",'+request.folderId+',"'+switchKey+'",'+request.folderId+')');
                                                                       rsArray.push('('+factor.id+',"'+switchKey+'",'+request.folderId+')');
                                                                 }

                                                        });
                                                       /* var finalArray = ssArray.concat(rsArray);
                                                        finalArray     = finalArray.toString();
                                                        console.log(ctr);
                                                        console.log(ssArray);
                                                        console.log(rsArray);
                                                        console.log(finalArray);
                                                        if(ssArray == ""){
                                                                console.log("Empty ====SS");
                                                                query = "INSERT INTO mail (id,receiverStatus,receiverFolderId) VALUES"+rsArray+
                                                                                " ON"+
                                                                                " DUPLICATE KEY"+
                                                                                " UPDATE receiverStatus=VALUES(receiverStatus),"+
                                                                                " receiverFolderId=VALUES(receiverFolderId)";
                                                        }else if(rsArray == ""){
                                                                console.log("Empty ====RS");
                                                                query = "INSERT INTO mail (id,senderStatus,senderFolderId) VALUES"+ssArray+
                                                                                " ON"+
                                                                                " DUPLICATE KEY"+
                                                                                " UPDATE senderStatus=VALUES(senderStatus),"+
                                                                                " senderFolderId=VALUES(senderFolderId)";

                                                        }
                                                        else{
                                                            console.log("Both ====RS && SS");
                                                            query = "INSERT INTO mail (id,receiverStatus,receiverFolderId,senderStatus,senderFolderId) VALUES"+finalArray+
                                                                                " ON"+
                                                                                " DUPLICATE KEY"+
                                                                                " UPDATE senderStatus=VALUES(senderStatus),"+
                                                                                " senderFolderId=VALUES(senderFolderId),"+
                                                                                " receiverStatus=VALUES(receiverStatus),"+
                                                                                " receiverFolderId=VALUES(receiverFolderId)";

                                                        }*/
//async Starts ==========
                                                 async.parallel([
                                                         function(callback) {
                                                            if(rsArray.length){

                                                                query1 = "INSERT INTO mail (id,receiverStatus,receiverFolderId) VALUES"+rsArray+
                                                                                " ON"+
                                                                                " DUPLICATE KEY"+
                                                                                " UPDATE receiverStatus=VALUES(receiverStatus),"+
                                                                                " receiverFolderId=VALUES(receiverFolderId)";
                                                                  console.log(query1);
                                                                  Mail.query(query1, function(err, result1) {

                                                                            if (err) return callback(err);
                                                                            console.log("result1 ===>");
                                                                             console.log("trash ===>");
                                                                            callback();
                                                                            //return res.json(200, {status: 1, message: "success", data1: result1});
                                                                            //return res.json(200, {status: 1, message: "success--1st"});
                                                                    });
                                                            }
                                                        },
                                                        function(callback) {
                                                            //var query2 = "";
                                                            if(ssArray.length){
                                                                query2 = "INSERT INTO mail (id,senderStatus,senderFolderId) VALUES"+ssArray+
                                                                                " ON"+
                                                                                " DUPLICATE KEY"+
                                                                                " UPDATE senderStatus=VALUES(senderStatus),"+
                                                                                " senderFolderId=VALUES(senderFolderId)";
                                                                console.log(query2);

                                                               Mail.query(query2, function(err, result2) {
                                                                            if (err) return callback(err);
                                                                            console.log("result2 ===>");
                                                                            callback();
                                                                            //return res.json(200, {status: 1, message: "success", data2: result2});
                                                                            //return res.json(200, {status: 1, message: "success --2nd"});
                                                                });

                                                        }
                                                       }


                                                   // return res.json(200, {status: 1, message: "success"});

                                                   ], function(err) { //This function gets called after the two tasks have called their "task callbacks"
                                                                    if (err) return res.json(200, {status: 2, message: "error"}); //If an error occured, we let express/connect handle it by calling the "next" function
                                                                    console.log("??????????????");
                                                                    return res.json(200, {status: 1, message: "success--all"});
                                                     });
    //async Ends ==========

                                                        //console.log(query2);

                                                   //foreach Ends
                                                   //To run Multiple queries in one controller simultaneously

                                                   /*async.parallel([
                                                         function(callback) {
                                                            if(rsArray.length){
                                                                query1 = " UPDATE mail SET "+
                                                                         " receiverStatus = '"+switchKey+
                                                                         ", senderFolderId = '"+request.+
                                                                         "' WHERE id IN ("+rsArray+")";
                                                                  console.log(query1);
                                                                  Mail.query(query1, function(err, result1) {

                                                                            if (err) return callback(err);
                                                                            console.log("result1 ===>");
                                                                             console.log("trash ===>");
                                                                            callback();
                                                                            //return res.json(200, {status: 1, message: "success", data1: result1});
                                                                            //return res.json(200, {status: 1, message: "success--1st"});
                                                                    });
                                                            }
                                                        },
                                                        function(callback) {
                                                            //var query2 = "";
                                                            if(ssArray.length){
                                                                query2 = " UPDATE mail SET "+
                                                                         " senderStatus = '"+switchKey+
                                                                         "' WHERE id IN ("+ssArray+")";
console.log(query2);
                                                               Mail.query(query2, function(err, result2) {
                                                                            if (err) return callback(err);
                                                                            console.log("result2 ===>");
                                                                            callback();
                                                                            //return res.json(200, {status: 1, message: "success", data2: result2});
                                                                            //return res.json(200, {status: 1, message: "success --2nd"});
                                                                });

                                                        }
                                                       }


                                                   // return res.json(200, {status: 1, message: "success"});

                                                   ], function(err) { //This function gets called after the two tasks have called their "task callbacks"
                                                                    if (err) return res.json(200, {status: 2, message: "error"}); //If an error occured, we let express/connect handle it by calling the "next" function
                                                                    console.log("??????????????");
                                                                    return res.json(200, {status: 1, message: "success--all"});
                                                        });
                                                  */

                                           break;

                                         /*  case 'viewstatus':
                                               var viewStatus = "true";
                                               query += "viewStatus = '"+viewStatus+"' ";

                                           break;
                                         */

                                     }

                                   // query += "WHERE id IN ("+chkInboxIdArray+")";










/* ############################################## */









                            }
                        else
                            {
                                  return res.json(200, {status: 3, message: 'token expired'});
                            }
                    }
        });

    },

/*===================================================================================================================================
Get Unread Mail count
 ====================================================================================================================================*/


    getUnreadInboxCount : function(req, res) {


       UsertokenService.checkToken(req.body.token, function(err, tokenCheck) {
                    if(err)
                    {
                         return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});

                    }
                    else
                    {
                        if(tokenCheck.status == 1)
                            {

                               var query = " SELECT COUNT(id) urMailCount"+
                                           " FROM  mail"+
                                           " WHERE  viewStatus = '"+mailConstants.VIEW_STATUS_UNREAD+
                                           "' AND  receiverId = "+tokenCheck.tokenDetails.userId+
                                           " AND receiverStatus = '"+mailConstants.RECEIVER_STATUS_INBOX+"'";

                               Mail.query(query, function(err, result) {
                                        if(err)
                                        {
                                            return res.json(200, {status: 2, error_details: err});
                                        }
                                        else
                                        {
                                            return res.json(200, {status: 1, message: "success", data: result[0]});

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

console.log("createFolder  Enterrrrr");
var request = req.body.request;
console.log(request);
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
                                                name                :    request.name,
                                                userId              :    tokenCheck.tokenDetails.userId,
                                               };
                                console.log(values);
                                 Folder.create(values).exec(function(err, result){
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
                                 //var query = "SELECT fl.name FROM  folder fl WHERE  userId = "+tokenCheck.tokenDetails.userId;
                                 var query = "SELECT fl.id, fl.name FROM  folder fl WHERE  userId = "+tokenCheck.tokenDetails.userId+" ORDER BY fl.createdAt DESC";
                                 Folder.query(query, function(err, result){
                                        if (err)
                                        {
                                            return res.json(200, {status: 2, message: 'Some error occured', errorDetails: err});
                                        } else
                                        {
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

var request = req.body.request;
         UsertokenService.checkToken(req.body.token, function(err, tokenCheck) {

                    if(err)
                    {
                         return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
                    }
                    else
                    {
                        if(tokenCheck.status == 1)
                            {
                                 Folder.findOne({id: request.folderId}).exec(function findCB(err, result) {
                                    if(err)
                                    {
                                        return res.json(200, {status: 2, error_details: err});
                                    }
                                    else
                                    {
                                        var values = {
                                                        name : request.folderName
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
                                        console.log(result);
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
" (ml.senderStatus = "+mailConstants.SENDER_STATUS_SENT+" AND ml.senderId = "+tokenCheck.tokenDetails.userId+")"+
" OR (ml.receiverStatus =  "+mailConstants.RECEIVER_STATUS_INBOX+" AND ml.receiverId = "+tokenCheck.tokenDetails.userId+")"+
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
            " senderStatus =  '"+mailConstants.SENDER_STATUS_SENT+"'"+
            " AND ml.senderId = "+tokenCheck.tokenDetails.userId+
            " OR ("+
            " receiverStatus =  '"+mailConstants.RECEIVER_STATUS_INBOX+"'"+
            " AND ml.receiverId = "+tokenCheck.tokenDetails.userId+
            " )"+
            " )"+
            " )"+
            " ORDER BY createdAt DESC ";
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


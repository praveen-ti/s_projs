/**
 * EmailController
 *
 * @description :: Server-side logic for managing emails
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

/*===================================================================================================================================
                                                   Send mail
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




};


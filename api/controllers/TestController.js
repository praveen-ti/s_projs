/**
 * TestController
 *
 * @description :: Server-side logic for managing tests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    index: function (req, res) {
        var email_to = "useremailtestacc@gmail.com";
        var email_subject = 'Zentiera - Email verify';
        var email_template = 'email_verify';
        var email_context = {display_name: "result.name", email: "result.email", link: "result"};
        UserService.emailSend(email_to, email_subject, email_template, email_context, function (err, sendresult) {
            if (err)
            {
                return res.json(200, {status: 2, message: 'some error occured', error_details: sendresult});
                sails.log.debug('Some error occured ' + sendresult);
            }
            else {
                console.log("User -> email send");
                //console.log(result);
                console.log(email_to);
                console.log(email_subject);
                console.log(email_template);
                console.log(email_context);
                return res.json(200, {status: 1, message: 'succes', details: 'details'});
            }
        });
        return res.view("test", {test: 'testing'});
    }



};


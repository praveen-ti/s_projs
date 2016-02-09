/**
 * CronController
 *
 * @description :: Server-side logic for managing tests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    subscriptionRenewalReminder: function (req, res) {

        var today = new Date();
        var year = today.getFullYear();
        var month = ('0' + (today.getMonth() + 1)).slice(-2);
        var day = ('0' + today.getDate()).slice(-2);
        var hours = ('0' + today.getHours()).slice(-2);
        var minutes = ('0' + today.getMinutes()).slice(-2);
        var seconds = ('0' + today.getSeconds()).slice(-2);

        var datestring = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;

        var nDate = new Date(datestring);
        nDate.setDate(today.getDate() + 2);

        var nyear = nDate.getFullYear();
        var nmonth = ('0' + (nDate.getMonth() + 1)).slice(-2);
        var nday = ('0' + nDate.getDate()).slice(-2);
        var nhours = ('0' + nDate.getHours()).slice(-2);
        var nminutes = ('0' + nDate.getMinutes()).slice(-2);
        var nseconds = ('0' + nDate.getSeconds()).slice(-2);

        var ndatestring = nyear + '-' + nmonth + '-' + nday + ' ' + nhours + ':' + nminutes + ':' + nseconds;

        var query = "SELECT u.* FROM user AS u WHERE (u.subscriptionExpiredDate BETWEEN '" + datestring + "' AND '" + ndatestring + "')";

        User.query(query, function (err, result) {
            if (err) {
                return res.json(200, {status: 2, message: "Error in query.", error: err});
            } else {
                if (result.length > 0) {
                    for (var i = 0; i < (result.length); i++) {

                        var email_to = "useremailtestacc@gmail.com";
                        var email_subject = 'Zentiera - Subscription renewal reminder.';
                        var email_template = 'subscription_renewal_reminder';
                        var email_context = {fullname: result[i].firstname + ' ' + result[i].lastname};

                        UserService.emailSend(email_to, email_subject, email_template, email_context, function (err, sendresult) {
                            if (err) {
                                return res.json(200, {status: 2, message: 'Error occured in sending email.', error: sendresult});
                            } else {

                            }
                        });
                    }

                    return res.json(200, {status: 1, message: "success", result: result});

                } else {
                    return res.json(200, {status: 1, message: "No user"});
                }
            }
        });

    }

};


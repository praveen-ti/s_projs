
var userConstants = sails.config.constants.user;

module.exports = {
    emailSend: function (email_to, email_subject, email_template, email_context, callback) {
        console.log("Entered E-mail Service");
        var nodemailer = require('nodemailer');
        var hbs = require('nodemailer-express-handlebars');
        var options = {
            viewEngine: {
                extname: '.hbs',
                layoutsDir: 'views/email/',
                defaultLayout: 'template',
                partialsDir: 'views/partials/'
            },
            viewPath: 'views/email/',
            extName: '.hbs'
        };
        var sgTransport = require('nodemailer-sendgrid-transport');
        //using sendgrid as transport, but can use any transport.
        var transporter = nodemailer.createTransport();
        transporter.use('compile', hbs(options));
        transporter.sendMail({
            from: email_to,
            to: email_to,
            subject: email_subject,
            template: email_template,
            context: email_context
        }, function (error, response) {
            if (error)
            {
                sails.log.debug('Some error occured ' + error);
                transporter.close();
                callback(false, {status: 2, message: 'email not reachable'});
            }
            else
            {
                transporter.close();
                callback(false, {status: 1, message: 'success'});
            }
        });
    },
    checkMarkedAsFavourite: function (userId, favUserId, callback) {

        Favourite.query('SELECT * FROM favourite WHERE userId = ? AND favouriteUserId = ?', [userId, favUserId], function (err, results) {

            if (err) {
                callback(true, err);
            } else {

                if (typeof results[0] != "undefined") {
                    callback(false, {status: 1, message: 'Already marked as favourite user', favourite: true});
                } else {
                    callback(false, {status: 0, message: 'Not marked as favourite', favourite: false});
                }
            }

        });

    },
    checkProfileViewed: function (userId, visitorId, callback) {

        Profilevisitor.query('SELECT * FROM profile_visitor WHERE userId = ? AND visitorId = ?', [userId, visitorId], function (err, results) {

            if (err) {
                callback(true, err);
            } else {

                if (typeof results[0] != "undefined") {
                    callback(false, {status: 1, message: 'User already viewed this profile', viewed: true});
                } else {
                    callback(false, {status: 0, message: 'Not viewed before', viewed: false});
                }
            }

        });

    },
    updateUser: function (criteria, data, callback) {

        User.update(criteria, data).exec(function (err, updatedData) {
            if (err) {

                callback(true, err);

            } else {

                callback(false, updatedData);
            }
        });
    },
    checkVideoLimit: function (userId, accessType, callback) {

        Video.query('SELECT COUNT(*) AS vcount FROM video AS v WHERE v.userId = ? AND v.accessType = ?', [userId, accessType], function (err, results) {

            if (err) {
                callback(true, err);
            } else {

                if ((typeof results[0] != "undefined") && (results[0].vcount >= 5)) {
                    callback(false, {status: 1, message: 'User video limit already exceed.', exceed: true});
                } else {
                    callback(false, {status: 0, message: 'Video limit not exceeded.', exceed: false});
                }
            }

        });

    },
    checkPhotoLimit: function (userId, subscriptionType, accessType, callback) {

        Photos.query('SELECT COUNT(*) AS pcount FROM photos AS p WHERE p.userId = ? AND p.accessType = ?', [userId, accessType], function (err, results) {

            if (err) {
                callback(true, err);
            } else {

                if ((typeof results[0] != "undefined") && (subscriptionType == userConstants.SUBSCRIPTION_FREE) && (results[0].pcount >= 5)) {
                    callback(false, {status: 1, message: 'Free user photo limit exceeded.', exceed: true});
                } else if ((typeof results[0] != "undefined") && (subscriptionType == userConstants.SUBSCRIPTION_PAID) && (results[0].pcount >= 50)) {
                    callback(false, {status: 1, message: 'Paid user photo limit exceeded.', exceed: true});
                } else {
                    callback(false, {status: 0, message: 'photo limit not exceeded.', exceed: false});
                }

            }

        });

    },
    checkPhotoKey: function (userId, objectUserId, key, callback) {

        Photokeymapping.query('SELECT pk.* FROM photo_key_mapping AS pk WHERE pk.userId = ? AND pk.objectUserId = ? AND pk.key = ?', [userId, objectUserId, key], function (err, results) {

            if (err) {
                callback(true, err);
            } else {

                if (typeof results[0] != "undefined") {
                    callback(false, {status: 1, message: 'You can access private photos', valid: true});
                } else {
                    callback(false, {status: 0, message: 'No permission to access private photos', valid: false});
                }
            }

        });

    },
    sendSms: function (to, message, callback) {

        var $ = require('jquery');
        var productToken = "93b46b87-d190-4fd3-bd70-7470e4690d2b";
        var from = "Zentiera";
        var reference = "Zentiera MSG";
        var data = "<MESSAGES><AUTHENTICATION><PRODUCTTOKEN><![CDATA[" + productToken + "]]></PRODUCTTOKEN></AUTHENTICATION><MSG><FROM><![CDATA[" + from + "]]></FROM><DCS><![CDATA[" + 8 + "]]></DCS><TO><![CDATA[" + to + "]]></TO><BODY><![CDATA[" + message + "]]></BODY><REFERENCE><![CDATA[" + reference + "]]></REFERENCE></MSG></MESSAGES>";
        
        var url = "https://sgw01.cm.nl/gateway.ashx?producttoken=" + productToken + "&body=" + message + "&to=" + to + "&from=" + from + "&reference= " + reference;
        
        
        $.ajax({
            method: "GET",
            crossDomain: true,
            url: url
        }).done(function () {
            console.log('success');
            callback(false, {status: 1, message: 'SMS sent successfully.'});
        }).fail(function () {
            console.log('error');
            callback(false, {status: 2, message: 'Error in sending SMS.'});
        });
        
        callback(false, {status: 1, message: 'SMS sent successfully.'});
        
//        $.ajax({
//            method: "POST",
//            contentType: "application/xml",
//            data: data,
//            dataType: "xml",
//            crossDomain: true,
//            url: "https://sgw01.cm.nl/gateway.ashx"
//        }).done(function () {
//            console.log('success');
//            callback(false, {status: 1, message: 'SMS sent successfully.'});
//        }).fail(function () {
//            console.log('error');
//            callback(false, {status: 2, message: 'Error in sending SMS.'});
//        });
    },
    sendSmsTwilio: function (to, text, callback) {

        // Twilio Credentials 
        var accountSid = 'ACa1aa7bba5eaa192ee655d00313b4346f';
        var authToken = '0afcc69ec574a68f2cf6c4dfb152d043';

        //require the Twilio module and create a REST client 
        var client = require('twilio')(accountSid, authToken);

        client.messages.create({
            to: "+919746226499",
            from: "+919746226499",
            body: "Hello Nithin",
        }, function (err, message) {
            console.log('message.sid');
            console.log(message.sid);

            if (!err) {

                // http://www.twilio.com/docs/api/rest/sending-sms#example-1

                console.log(message.from); // outputs "+14506667788"
                console.log(message.body); // outputs "word to your mother."
                callback(false, {status: 1, message: 'SMS sent successfully.'});
            } else {
                callback(false, {status: 2, message: 'Error in sending SMS.'});
            }

        });

    }
};



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

    }




};


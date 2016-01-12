module.exports = {

        emailSend: function(email_to,email_subject,email_template,email_context, callback) {
console.log("Entered E-mail Service");
                                var nodemailer = require('nodemailer');
                                var hbs = require('nodemailer-express-handlebars');
                                var options = {
                                    viewEngine: {
                                        extname: '.hbs',
                                        layoutsDir: 'views/email/',
                                        defaultLayout : 'template',
                                        partialsDir : 'views/partials/'
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
                                    if(error)
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
            }

};


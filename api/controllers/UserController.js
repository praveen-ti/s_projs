/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var crypto = require('crypto');

module.exports = {
    /*===================================================================================================================================
     User Sign up
     ====================================================================================================================================*/
    userSignup: function (req, res) {

        console.log("Signup Entered");
        var password = crypto.createHash('md5').update(req.body.password).digest("hex");
        values = {username: 'userdssggrew',
            firstname: 'fname',
            lastname: 'lname',
            email: req.body.email,
            password: password,
            passwordResetKey: '',
            status: '',
            profilePic: '',
            emailVerificationStatus: '',
            emailVerificationKey: '',
            subscriptionPackageId: 0,
            subscriptionType: '',
            subscriptionExpiredDate: '',
            adPackageId: 0,
            adExpiredDate: '',
            massageFrequency: '',
            referralBenefit: '',
            blacklisted: '',
            createdAt: ''
        };

        //Enter Values to zen_user table
        User.create(values).exec(function (err, result) {

            if (err) {

                sails.log.debug('Some error occured ' + err);
                return res.json(200, {status: 2, message: 'Some error occured', error: err});

            } else {
                sails.log.debug('Result ' + result);
                // Create new access token on signup success
                var userId = result.id;
                console.log(result);
                UsertokenService.createToken(userId, function (err, details) {

                    //return res.json(200, {status:1,message:'Success', result: result});
                    if (err) {
                        console.log("Token Error>>>>>>>>>>>>");
                        return res.json(200, {status: 2, message: 'some error occured', error: details});
                    } else {
                        console.log("Token Success>>>>>>>>>>>>");

                        return res.json(200, {status: 1, message: 'Success', resultlogdetails: details});

                    }
                });
            }
        });
    },
    /*===================================================================================================================================
     User Login
     ====================================================================================================================================*/

    userLogin: function (req, res) {

        var password = crypto.createHash('md5').update(req.body.password).digest("hex");
        var values = {email: req.body.email, password: password};

        // Get user details
        User.findOne(values).exec(function (err, result) {
            if (err) {

                sails.log.debug('Some error occured ' + err);
                return res.json(200, {status: 2, message: 'some error occured', error_details: err});
                //return res.view("login",{error: result});

            } else {
                if (typeof result == "undefined")
                {
                    sails.log.debug({message: 'No user found'});
                    return res.json(200, {status: 2, message: 'No user found', result: result});
                    //req.session.error = "undefined user";
                    //res.cookie('error', 'undefined user', { maxAge: 1, httpOnly: true });
                    //console.log(req.session.error);
                    //res.redirect('login');


                }
                else
                {
                    // Create new access token on login
                    UsertokenService.createToken(result.id, function (err, details) {
                        if (err) {
                            return res.json(200, {status: 2, message: 'some error occured', error_details: details});
                        } else {


                            //Email
                            /* var email_to        = "tittoxp@gmail.com";
                             var email_subject   = 'FitHudl - Email verify';
                             var email_template  = 'email_verify';
                             var email_context   = { display_name : result.name, email : result.email, link : result+"eeeeeeeeeee"};
                             UserService.emailSend(email_to,email_subject,email_template,email_context, function(err, sendresult) {
                             if(err)
                             {
                             return res.json(200, {status: 2, message: 'some error occured', error_details: sendresult});
                             sails.log.debug('Some error occured ' + sendresult);
                             
                             }
                             else{
                             
                             console.log("User -> email send");
                             //console.log(result);
                             console.log(email_to);
                             console.log(email_subject);
                             console.log(email_template);
                             console.log(email_context);
                             
                             return res.json(200, {status: 1, message: 'succes', details: details});
                             }
                             
                             });*/
                            return res.json(200, {status: 1, message: 'succes', details: details});

                            // req.session.authenticated = true;
                            // req.session.success = "registered user";
                            //req.session.token      = details.token.token;
                            //res.redirect('login_home');
                        }
                    });

                }

            }
        });

    },
    /*===================================================================================================================================
     User Logout
     ====================================================================================================================================*/
    userLogout: function (req, res) {

        UsertokenService.deleteToken(req.body.token, function (err, result) {
            if (err) {
                return res.json(200, {status: 2, message: 'some error occured', error_details: result});
            } else {
                //req.session.destroy();
                return res.json(200, {status: 1, message: 'success', result: result});
                //res.redirect('login');
            }
        });

    },
    getAllMembers: function (req, res) {

        var userRole = req.body.userRole;
        var tokenService = tokenService || {};

        if (userRole === 'user') {
            tokenService = UsertokenService;

        } else if (userRole === 'admin') {
            tokenService = AdmintokenService;
        }

        tokenService.checkToken(req.body.token, function (err, tokenCheck) {

            if (err) {
                return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
            } else {

                if (tokenCheck.status == 1)
                {
                    var query = "SELECT * FROM user WHERE 1 ORDER BY id DESC";
                    User.query(query, function (err, result) {
                        if (err) {
                            return res.json(200, {status: 2, error_details: err});
                        } else {
                            return res.json(200, {status: 1, message: "success", result: result});
                        }
                    });
                } else {
                    return res.json(200, {status: 3, message: 'token expired'});
                }
            }
        });
    },
    getUserDetails: function (req, res) {

        var userId = req.body.userId;
        var userRole = req.body.userRole;
        var tokenService = tokenService || {};

        if (userRole === 'user') {
            tokenService = UsertokenService;

        } else if (userRole === 'admin') {
            tokenService = AdmintokenService;
        }

        tokenService.checkToken(req.body.token, function (err, tokenCheck) {

            if (err) {
                return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
            } else {

                if (tokenCheck.status == 1) {
                    User.findOne({id: userId}).exec(function findCB(err, result) {
                        if (err) {
                            return res.json(200, {status: 2, error_details: err});
                        } else {
                            return res.json(200, {status: 1, data: result});
                        }
                    });

                } else {
                    return res.json(200, {status: 3, message: 'token expired'});
                }
            }

        });
    },
    blockAMember: function (req, res) {

        var userId = req.body.userId;
        var tokenService = tokenService || {};

        AdmintokenService.checkToken(req.body.token, function (err, tokenCheck) {

            if (err) {
                return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
            } else {

                if (tokenCheck.status == 1) {
                    
                    User.update({id: userId},{status: 'block'}).exec(function (err, result) {
                        if (err) {
                            return res.json(200, {status: 2, error_details: err});
                        } else {
                            return res.json(200, {status: 1, data: result});
                        }
                    });

                } else {
                    return res.json(200, {status: 3, message: 'token expired'});
                }
            }

        });
    },
    deleteAMember: function (req, res) {

        var userId = req.body.userId;
        var tokenService = tokenService || {};

        AdmintokenService.checkToken(req.body.token, function (err, tokenCheck) {

            if (err) {
                return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
            } else {

                if (tokenCheck.status == 1) {
                    
                    User.update({id: userId},{status: 'delete'}).exec(function (err, result) {
                        if (err) {
                            return res.json(200, {status: 2, error_details: err});
                        } else {
                            return res.json(200, {status: 1, data: result});
                        }
                    });

                } else {
                    return res.json(200, {status: 3, message: 'token expired'});
                }
            }

        });
    }

};


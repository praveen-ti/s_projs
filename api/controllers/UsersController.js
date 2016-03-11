/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var crypto = require('crypto');
var fs = require('fs');
var userConstants = sails.config.constants.user;
var photoConstants = sails.config.constants.photo;
var reviewConstants = sails.config.constants.review;
var reportConstants = sails.config.constants.report;
var settings = sails.config.settings.data;

function getUserById(uid, callback) {
    var condition = {id: uid};
    User.findOne(condition).exec(function (err, user) {
        if (err) {
            callback(true, err);
        } else {
            if (typeof user != "undefined") {
                callback(false, {status: 1, message: 'User data', user: user});
            } else {
                callback(false, {status: 0, message: 'No user data', user: []});
            }
        }

    });
}

module.exports = {
    preSignup: function (req, res) {

        var hashKey = crypto.createHash('md5').update((req.body.email + Math.floor((Math.random() * 1000) + 1))).digest("hex");
        var email = req.body.email;
        //var signupLink = "http://192.168.1.73/zentiera-web/#/signup_one/" + hashKey;
        var signupLink = settings.STATIS_URL + 'signup_one/' + hashKey;

        //Check user exists
        User.findOne({email: email}).exec(function (err, result) {
            if (err) {

                return res.json(200, {status: 2, message: 'Error occured.', error: err});

            } else {

                if (typeof result == "undefined") {

                    //Create new user account here
                    User.create({email: email, emailVerificationKey: hashKey}).exec(function (err, user) {
                        if (err) {
                            return res.json(200, {status: 2, message: 'Error in creating new user account.', error: err});
                        } else {
                            var userId = user.id;

                            //Sent email here.
                            var email_to = email;
                            var email_subject = 'Zentiera - User signup.';
                            var email_template = 'signup';
                            var email_context = {signupLink: signupLink, email: email};
                            UserService.emailSend(email_to, email_subject, email_template, email_context, function (err, sendresult) {

                                if (err) {
                                    return res.json(200, {status: 2, message: 'some error occured', error: sendresult});
                                } else {
                                    return res.json(200, {status: 1, message: 'insert', data: user});
                                }

                            });

                            //return res.json(200, {status: 1, message: 'insert', data: user});
                        }
                    });

                } else {

                    UserService.checkSignupCompleted(email, function (err, signupCompleted) {

                        if (signupCompleted.signup === true) {

                            return res.json(200, {status: 1, message: 'signupcompleted', data: []});

                        } else {

                            //Update user account here.
                            User.update({email: email}, {emailVerificationKey: hashKey}).exec(function (err, user) {
                                if (err) {
                                    return res.json(200, {status: 2, message: 'Error in updating user details.', error: err});
                                } else {

                                    var email_to = email;
                                    var email_subject = 'Zentiera - User signup.';
                                    var email_template = 'signup';
                                    var email_context = {signupLink: signupLink, email: email};
                                    UserService.emailSend(email_to, email_subject, email_template, email_context, function (err, sendresult) {

                                        if (err) {
                                            return res.json(200, {status: 2, message: 'some error occured', error: sendresult});
                                        } else {
                                            return res.json(200, {status: 1, message: 'update', data: user});
                                        }

                                    });

                                }
                            });
                        }

                    });

                }

            }
        });
    },
    /*===================================================================================================================================
     User Sign up
     ====================================================================================================================================*/
    userSignup: function (req, res) {

        var userRole = req.body.userRole;
        var user = req.body.user;
        var userinfo = req.body.userinfo;
        var searchPreference = req.body.searchPreference;

        if (userRole === 'user') {

            var values = {
                username: user.username,
                firstname: 'fname',
                lastname: 'lname',
                //email: user.email,
                password: crypto.createHash('md5').update(user.password).digest("hex"),
                passwordResetKey: '',
                signupStatus: userConstants.SIGNUP_STATUS_COMPLETED,
                status: userConstants.STATUS_ACTIVE,
                emailVerificationStatus: userConstants.EMAIL_VERIFIED,
                emailVerificationKey: '',
                subscriptionType: userConstants.SUBSCRIPTION_FREE
            };

            User.findOne({email: user.email}).exec(function (err, result) {

                if (err) {
                    return res.json(200, {status: 2, message: 'Error occured.', error: err});
                } else {

                    if (typeof result == "undefined") {
                        return res.json(200, {status: 1, message: 'success', data: 'Email id does not exists'});
                    } else {

                        User.update({email: result.email}, values).exec(function (err, userdata) {
                            if (err) {
                                return res.json(200, {status: 2, message: 'Error in updating user details.', error: err});
                            } else {

                                userinfo.userId = result.id;
                                searchPreference.userId = result.id;

                                console.log(JSON.stringify(searchPreference));

                                Userinfo.create(userinfo).exec(function (err, userinfodata) {
                                    if (err) {
                                        return res.json(200, {status: 2, message: 'Some error occured', error: err});
                                    } else {

                                        SearchPreference.create(searchPreference).exec(function (err, searchdata) {
                                            if (err) {
                                                return res.json(200, {status: 2, message: 'Some error occured', error: err});
                                            } else {

                                                UsertokenService.createToken(result.id, function (err, details) {
                                                    if (err) {
                                                        return res.json(200, {status: 2, message: 'some error occured', error: err});
                                                    } else {
                                                        return res.json(200, {status: 1, message: 'Success', data: details});

                                                    }
                                                });

                                            }
                                        });

                                    }
                                });

                                //return res.json(200, {status: 1, message: 'success', data: userdata});

                            }
                        });


                    }

                }
            });

        } else if (userRole === 'admin') {

            AdmintokenService.checkToken(req.body.token, function (err, tokenCheck) {
                if (err) {
                    return res.json(200, {status: 2, message: 'some error occured', error: tokenCheck});
                } else {

                    return res.json(200, {status: 1, message: 'Success', data: 'No action performed.'});

                }
            });

        }
    },
    /*===================================================================================================================================
     User Login
     ====================================================================================================================================*/

    userLogin: function (req, res) {
        console.log("userLogin  .....");
        var password = crypto.createHash('md5').update(req.body.password).digest("hex");
        var values = {email: req.body.email, password: password};

        // Get user details
        User.findOne(values).exec(function (err, result) {
            if (err) {
                console.log(err);
                return res.json(200, {status: 2, message: 'Error occured.', error: err});

            } else {

                if (typeof result == "undefined") {

                    return res.json(200, {status: 2, message: 'No user found', data: result});

                } else {

                    // Create new access token on login
                    UsertokenService.createToken(result.id, function (err, details) {
                        if (err) {
                            console.log(err);
                            return res.json(200, {status: 2, message: 'Error occured in fetching user data.', error: details});
                        } else {
                            console.log(details);
                            return res.json(200, {status: 1, message: 'Success.', data: details});
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
    checkSignupKey: function (req, res) {

        var emailVerificationKey = req.body.emailVerificationKey;

        User.query('SELECT u.* FROM user AS u WHERE u.emailVerificationKey = ? LIMIT 1', [emailVerificationKey], function (err, user) {

            if (err) {
                return res.json(200, {status: 2, message: 'Some error occured', error: err});
            } else {
                if (typeof user[0] != "undefined") {
                    return res.json(200, {status: 1, message: 'Email verification key exists', data: user[0]});
                } else {
                    return res.json(200, {status: 0, message: 'No email verification key exists', data: false});
                }
            }

        });

    },
    checkUsername: function (req, res) {

        var username = req.body.username;

        User.query('SELECT u.* FROM user AS u WHERE u.username = ? LIMIT 1', [username], function (err, user) {

            if (err) {
                return res.json(200, {status: 2, message: 'Some error occured', error: err});
            } else {
                if (typeof user[0] != "undefined") {
                    return res.json(200, {status: 1, message: 'username_exists', data: user[0].username});
                } else {
                    return res.json(200, {status: 1, message: 'no_username', data: ''});
                }
            }

        });

    },
    forgotPassword: function (req, res) {

        var current_date = (new Date()).valueOf().toString();
        var random = Math.random().toString();
        var hashKey = crypto.createHash('md5').update(current_date + random).digest('hex');
        var email = req.body.email;
        var changePasswordLink = settings.STATIS_URL + "changepassword/" + hashKey;

        //Check user exists
        User.findOne({email: email, signupStatus: userConstants.SIGNUP_STATUS_COMPLETED}).exec(function (err, result) {

            if (err) {
                return res.json(200, {status: 2, message: 'Error occured.', error: err});
            } else {

                if (typeof result != "undefined") {
                    User.update({email: email}, {passwordResetKey: hashKey}).exec(function (err, user) {

                        if (err) {
                            return res.json(200, {status: 2, message: 'Error in creating Key.', error: err});
                        } else {
                            var email_to = email;
                            var email_subject = 'Zentiera - Forgot Password.';
                            var email_template = 'forgotPassword';
                            var email_context = {changePasswordLink: changePasswordLink, email: email};

                            UserService.emailSend(email_to, email_subject, email_template, email_context, function (err, sendresult) {

                                if (err) {
                                    return res.json(200, {status: 2, message: 'some error occured', error: sendresult});
                                } else {
                                    return res.json(200, {status: 1, message: 'update', data: user});
                                }

                            });
                        }

                    });

                } else {
                    return res.json(200, {status: 1, message: 'email_notexist', data: email});
                }
            }
        });
    },
    checkPasswordResetKey: function (req, res) {

        var hashkey = req.body.hashKey;

        User.findOne({passwordResetKey: hashkey}).exec(function (err, result) {

            if (err) {
                return res.json(200, {status: 2, message: 'Error in creating Key.', error: err});
            } else {

                if (typeof result != "undefined") {
                    return res.json(200, {status: 1, message: 'Success.'});
                } else {
                    return res.json(200, {status: 3, message: 'Expired.'});
                }
            }
        });
    },
    changeOldPassword: function (req, res) {

        var password = crypto.createHash('md5').update(req.body.password).digest("hex");
        var hashkey = req.body.hashKey;

        User.update({passwordResetKey: hashkey}, {password: password, passwordResetKey: null}).exec(function (err, user) {

            if (err) {
                return res.json(200, {status: 2, message: 'Error in updating password.', error: err});
            } else {

                if (typeof user != "undefined") {
                    return res.json(200, {status: 1, message: 'Password changed successfully.', data: ''});
                } else {
                    return res.json(200, {status: 3, message: 'No password reset key exists.', data: ''});
                }

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
                return res.json(200, {status: 2, message: 'Error occured in token check', error: tokenCheck});
            } else {

                if (tokenCheck.status == 1)
                {
                    var query = "SELECT u.*, ui.levelTypeOne FROM user AS u LEFT JOIN userinfo AS ui ON u.id = ui.userId WHERE u.signupStatus = '" + userConstants.SIGNUP_STATUS_COMPLETED + "' ORDER BY u.id DESC";
                    User.query(query, function (err, result) {
                        if (err) {
                            return res.json(200, {status: 2, message: 'Error', error: err});
                        } else {
                            return res.json(200, {status: 1, message: "success", data: result});
                        }
                    });
                } else {
                    return res.json(200, {status: 3, message: 'token expired'});
                }
            }
        });
    },
    getUserDetails: function (req, res) {
        console.log("Entered");
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
                return res.json(200, {status: 2, message: 'Error occured in token check', error: tokenCheck});
            } else {

                if (tokenCheck.status == 1) {
                    //User.findOne({id: userId}).exec(function findCB(err, result) {
                    //    if (err) {
                    //        return res.json(200, {status: 2, error_details: err});
                    //    } else {
                    //        return res.json(200, {status: 1, data: result});
                    //    }
                    //});

                    var query = "SELECT u.*, u.id AS u_id, ui.*, ui.id AS ui_id, sp.name AS packageName " +
                            "FROM user AS u " +
                            "LEFT JOIN userinfo AS ui ON u.id = ui.userId " +
                            "LEFT JOIN subscription_package AS sp ON u.subscriptionPackageId = sp.id " +
                            "WHERE u.id = " + userId +
                            " LIMIT 1";
                    User.query(query, function (err, user) {
                        if (err) {
                            return res.json(200, {status: 2, message: 'Error', error: err});
                        } else {
                            return res.json(200, {status: 1, message: "success", data: user});
                        }
                    });

                } else {
                    return res.json(200, {status: 3, message: 'token expired'});
                }
            }

        });
    },
    getUserBasicDetails: function (req, res) {

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
                return res.json(200, {status: 2, message: 'Error occured in token check', error: tokenCheck});
            } else {

                if (tokenCheck.status == 1) {

                    var query = "SELECT u.* FROM user AS u WHERE u.id = " + userId + " LIMIT 1";
                    User.query(query, function (err, user) {
                        if (err) {
                            return res.json(200, {status: 2, message: 'Error', error: err});
                        } else {
                            return res.json(200, {status: 1, message: "success", data: user});
                        }
                    });

                } else {
                    return res.json(200, {status: 3, message: 'token expired'});
                }
            }

        });
    },
    updateUserStatus: function (req, res) {

        var userId = req.body.userId;
        var status = req.body.status;

        AdmintokenService.checkToken(req.body.token, function (err, tokenCheck) {

            if (err) {
                return res.json(200, {status: 2, message: 'Error occured in token check', error: tokenCheck});
            } else {

                if (tokenCheck.status == 1) {

                    User.update({id: userId}, {status: status}).exec(function (err, result) {
                        if (err) {
                            return res.json(200, {status: 2, message: 'Error', error: err});
                        } else {
                            return res.json(200, {status: 1, message: 'Success', data: result});
                        }
                    });

                } else {
                    return res.json(200, {status: 3, message: 'token expired'});
                }
            }

        });
    },
    blacklistAMember: function (req, res) {

        var userId = req.body.userId;
        var status = req.body.status;

        AdmintokenService.checkToken(req.body.token, function (err, tokenCheck) {

            if (err) {
                return res.json(200, {status: 2, message: 'Error occured in token check', error: tokenCheck});
            } else {

                if (tokenCheck.status == 1) {

                    User.update({id: userId}, {blacklisted: status}).exec(function (err, result) {
                        if (err) {
                            return res.json(200, {status: 2, message: 'Error', error: err});
                        } else {
                            return res.json(200, {status: 1, message: 'Success', data: result});
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

                    User.update({id: userId}, {status: userConstants.STATUS_INACTIVE}).exec(function (err, result) {
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
        var userRole = req.body.userRole;
        var tokenService = tokenService || {};
        var deletedBy = null;

        if (userRole === 'user') {
            tokenService = UsertokenService;
            deletedBy = userConstants.DELETED_BY_USER;

        } else if (userRole === 'admin') {
            tokenService = AdmintokenService;
            deletedBy = userConstants.DELETED_BY_ADMIN;
        }

        tokenService.checkToken(req.body.token, function (err, tokenCheck) {

            if (err) {
                return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
            } else {

                if (tokenCheck.status == 1) {

                    User.update({id: userId}, {status: userConstants.STATUS_DELETE, deletedBy: deletedBy}).exec(function (err, result) {
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
    markFavourite: function (req, res) {

        var userId = req.body.userId;
        var favUserId = req.body.favUserId;

        UsertokenService.checkToken(req.body.token, function (err, tokenCheck) {

            if (err) {
                return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
            } else {

                if (tokenCheck.status == 1) {

                    UserService.checkMarkedAsFavourite(userId, favUserId, function (err, favCheck) {

                        if (favCheck.favourite === true) {
                            Favourite.destroy({userId: userId, favouriteUserId: favUserId}).exec(function deleteCB(err) {
                                if (err) {
                                    return res.json(200, {status: 2, error_details: err});
                                } else {
                                    return res.json(200, {status: 1, message: 'success'});
                                }
                            });

                        } else {
                            Favourite.create({userId: userId, favouriteUserId: favUserId}).exec(function (err, result) {
                                if (err) {
                                    return res.json(200, {status: 2, error_details: err});
                                } else {
                                    getUserById(userId, function (status, user) {
                                        getUserById(favUserId, function (status, favuser) {
                                            var email_to = "useremailtestacc@gmail.com";
                                            var email_subject = 'Zentiera - Marked you as favourite.';
                                            var email_template = 'favourite';
                                            var email_context = {favuser_name: favuser.user.username, user_name: user.user.username};
                                            UserService.emailSend(email_to, email_subject, email_template, email_context, function (err, sendresult) {
                                                if (err)
                                                {
                                                    return res.json(200, {status: 2, message: 'some error occured', error_details: sendresult});
                                                }
                                                else {
                                                    return res.json(200, {status: 1, message: 'email sent successfully', data: result});
                                                }
                                            });
                                            //return res.json(200, {status: 1, data: result});
                                        });
                                    });
                                }
                            });
                        }

                    });

                } else {
                    return res.json(200, {status: 3, message: 'token expired'});
                }
            }

        });
    },
    getMyFavourites: function (req, res) {

        var userId = req.body.userId;

        UsertokenService.checkToken(req.body.token, function (err, tokenCheck) {

            if (err) {
                return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
            } else {

                if (tokenCheck.status == 1)
                {
                    var query = "SELECT u.* FROM user AS u LEFT JOIN favourite AS f ON  u.id = f.favouriteUserId WHERE f.userId = " + userId + " ORDER BY u.id ASC";
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
    markProfileASViewed: function (req, res) {

        var userId = req.body.userId;
        var visitorId = req.body.visitorId;

        UsertokenService.checkToken(req.body.token, function (err, tokenCheck) {

            if (err) {
                return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
            } else {

                if (tokenCheck.status == 1) {

                    UserService.checkProfileViewed(userId, visitorId, function (err, visitorCheck) {

                        if (visitorCheck.viewed === false) {

                            Profilevisitor.create({userId: userId, visitorId: visitorId}).exec(function (err, result) {
                                if (err) {
                                    return res.json(200, {status: 2, error_details: err});
                                } else {
                                    getUserById(userId, function (status, user) {
                                        getUserById(visitorId, function (status, visituser) {
                                            var email_to = "useremailtestacc@gmail.com";
                                            var email_subject = 'Zentiera - New user visited your profile.';
                                            var email_template = 'profilevisit';
                                            var email_context = {visitor_name: visituser.user.username, user_name: user.user.username};
                                            UserService.emailSend(email_to, email_subject, email_template, email_context, function (err, sendresult) {
                                                if (err)
                                                {
                                                    return res.json(200, {status: 2, message: 'some error occured', error_details: sendresult});
                                                }
                                                else {
                                                    return res.json(200, {status: 1, message: 'email sent successfully', data: result});
                                                }
                                            });
                                            //return res.json(200, {status: 1, data: result});
                                        });
                                    });
                                }
                            });

                        } else {
                            return res.json(200, {status: 1, message: 'User already viewed this profile', viewed: true});
                        }

                    });

                } else {
                    return res.json(200, {status: 3, message: 'token expired'});
                }
            }

        });
    },
    getProfileVisitors: function (req, res) {

        var userId = req.body.userId;

        UsertokenService.checkToken(req.body.token, function (err, tokenCheck) {

            if (err) {
                return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
            } else {

                if (tokenCheck.status == 1)
                {
                    var query = "SELECT u.* FROM user AS u LEFT JOIN profile_visitor AS pv ON u.id = pv.visitorId WHERE pv.userId = " + userId + " ORDER BY u.id ASC";
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
    changePassword: function (req, res) {

        //validate token
        UsertokenService.checkToken(req.body.token, function (err, tokenCheck) {

            if (err) {
                return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
            } else {
                // If it is a valid token
                if (tokenCheck.status == 1) {

                    var currentPassword = crypto.createHash('md5').update(req.body.currentPassword).digest("hex");
                    var newPassword = crypto.createHash('md5').update(req.body.newPassword).digest("hex");

                    var criteria = {id: tokenCheck.tokenDetails.userId, password: currentPassword};
                    var data = {password: newPassword};

                    // Update user with the new password
                    UserService.updateUser(criteria, data, function (err, result) {
                        if (err) {

                            return res.json(200, {status: 2, message: 'some error has occured', error_details: result});
                        } else {
                            if (result.length == 0) {
                                return res.json(200, {status: 2, message: "Current password is incorrect"});
                            } else {
                                return res.json(200, {status: 1, message: "success"});
                            }
                        }
                    });

                } else {
                    return res.json(200, {status: 3, message: 'session expired'});
                }
            }
        });
    },
    addVideo: function (req, res) {

        var userId = req.body.userId;
        var videoUrl = req.body.videoUrl;
        var title = req.body.title;
        var description = req.body.description;
        var accessType = req.body.accessType;

        UsertokenService.checkToken(req.body.token, function (err, tokenCheck) {

            if (err) {
                return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
            } else {

                if (tokenCheck.status == 1) {

                    UserService.checkVideoLimit(userId, accessType, function (err, limitCheck) {

                        if (limitCheck.exceed === false) {

                            Video.create({userId: userId, videoUrl: videoUrl, title: title, description: description, accessType: accessType}).exec(function (err, result) {
                                if (err) {
                                    return res.json(200, {status: 2, error_details: err});
                                } else {
                                    return res.json(200, {status: 1, data: result});
                                }
                            });

                        } else {
                            return res.json(200, {status: 1, message: 'User video limit already exceed.', limitExceed: true});
                        }

                    });

                } else {
                    return res.json(200, {status: 3, message: 'token expired'});
                }
            }

        });
    },
    editVideo: function (req, res) {

        var videoId = req.body.videoId;
        var userId = req.body.userId;
        var videoUrl = req.body.videoUrl;
        var title = req.body.title;
        var description = req.body.description;
        var accessType = req.body.accessType;
        var status = req.body.status;

        UsertokenService.checkToken(req.body.token, function (err, tokenCheck) {

            if (err) {
                return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
            } else {

                if (tokenCheck.status == 1) {

                    UserService.checkVideoLimit(userId, accessType, function (err, limitCheck) {

                        if (limitCheck.exceed === false) {

                            Video.update({id: videoId}, {userId: userId, videoUrl: videoUrl, title: title, description: description, accessType: accessType, status: status}).exec(function (err, result) {
                                if (err) {
                                    return res.json(200, {status: 2, error_details: err});
                                } else {
                                    return res.json(200, {status: 1, data: result});
                                }
                            });

                        } else {
                            return res.json(200, {status: 1, message: 'User video limit already exceed.', limitExceed: true});
                        }

                    });

                } else {
                    return res.json(200, {status: 3, message: 'token expired'});
                }
            }

        });
    },
    getVideoById: function (req, res) {

        var videoId = req.body.videoId;
        var userRole = req.body.userRole;
        var tokenService = tokenService || {};

        if (userRole === 'user') {
            tokenService = UsertokenService;

        } else if (userRole === 'admin') {
            tokenService = AdmintokenService;
        }

        tokenService.checkToken(req.body.token, function (err, tokenCheck) {

            if (err) {
                return res.json(200, {status: 2, message: 'Error token check.', error: tokenCheck});
            } else {

                if (tokenCheck.status == 1)
                {
                    var query = "SELECT v.* FROM video AS v WHERE v.id = " + videoId + " LIMIT 1";
                    Video.query(query, function (err, result) {
                        if (err) {
                            return res.json(200, {status: 2, message: "Error", error: err});
                        } else {
                            return res.json(200, {status: 1, message: "success", data: result});
                        }
                    });
                } else {
                    return res.json(200, {status: 3, message: 'Token expired'});
                }
            }
        });

    },
    deleteVideo: function (req, res) {

        var videoId = req.body.videoId;
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

                    Video.destroy({id: videoId}).exec(function (err, result) {
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
    getVideosByUserId: function (req, res) {

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
                return res.json(200, {status: 2, message: 'Token check.', error: tokenCheck});
            } else {

                if (tokenCheck.status == 1)
                {
                    var query = "SELECT v.* FROM video AS v WHERE v.userId = " + userId + " ORDER BY v.id ASC";
                    Video.query(query, function (err, result) {
                        if (err) {
                            return res.json(200, {status: 2, message: "Error", error: err});
                        } else {
                            return res.json(200, {status: 1, message: "Success", data: result});
                        }
                    });
                } else {
                    return res.json(200, {status: 3, message: 'Token expired'});
                }
            }
        });

    },
    addPhoto: function (req, res) {

        var userId = req.body.userId;
        var title = req.body.title;
        var description = req.body.description;
        var accessType = req.body.accessType;
        var status = req.body.staus;
        var imagePath = '../../assets/images/pics';

        UsertokenService.checkToken(req.body.token, function (err, tokenCheck) {

            if (err) {
                return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
            } else {

                if (tokenCheck.status == 1) {

                    User.findOne({id: userId}).exec(function findCB(err, user) {

                        if (err) {
                            return res.json(200, {status: 2, error_details: err});
                        } else {

                            UserService.checkPhotoLimit(userId, user.subscriptionType, accessType, function (err, limitCheck) {

                                if (limitCheck.exceed === false) {

                                    if (typeof user != 'undefined') {
                                        imagePath = imagePath + '/' + user.username;
                                        //return res.json(200, {status: 2, user: user});
                                        req.file('pics').upload({dirname: imagePath}, function (err, files) {
                                            if (err) {
                                                return res.json(200, {status: 2, message: 'Some error occured in file upload', error_details: err});
                                            } else {

                                                if (files.length != 0) {
                                                    //var d = new Date();
                                                    //var extension = (files[0].filename).substr((files[0].filename).lastIndexOf('.') + 1);
                                                    //var imageName = 'user_' + userId + '_img_' + d.getFullYear() + d.getMonth() + d.getDate() + d.getHours() + d.getMinutes() + d.getSeconds();
                                                    //imageName = imageName + '.' + extension;

                                                    var filePath = files[0].fd;
                                                    filePath = filePath.split("/" + user.username + "/");

                                                    var imageData = {
                                                        userId: userId,
                                                        imageName: filePath[1],
                                                        title: title,
                                                        description: description,
                                                        accessType: accessType,
                                                        status: status
                                                    };

                                                    Photos.create(imageData).exec(function (err, result) {
                                                        if (err) {
                                                            return res.json(200, {status: 2, error_details: err});
                                                        } else {
                                                            return res.json(200, {status: 1, data: result});
                                                        }
                                                    });

                                                } else {
                                                    return res.json(200, {status: 2, message: 'no files selected'});
                                                }

                                            }
                                        });

                                    } else {
                                        return res.json(200, {status: 2, message: 'no user found'});
                                    }

                                } else {
                                    return res.json(200, {status: 1, message: 'Photo limit already exceed.', limitExceed: true});
                                }
                            });

                        }
                    });

                } else {
                    return res.json(200, {status: 3, message: 'token expired'});
                }
            }
        });
    },
    getPhotosByUserId: function (req, res) {

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
                return res.json(200, {status: 2, message: 'Error token check.', error: tokenCheck});
            } else {

                if (tokenCheck.status == 1)
                {
                    var query = "SELECT p.* FROM photos AS p WHERE p.userId = " + userId + " ORDER BY p.id ASC";
                    Photos.query(query, function (err, result) {
                        if (err) {
                            return res.json(200, {status: 2, message: "Error", error: err});
                        } else {
                            return res.json(200, {status: 1, message: "success", data: result});
                        }
                    });
                } else {
                    return res.json(200, {status: 3, message: 'Token expired'});
                }
            }
        });

    },
    getPhotoById: function (req, res) {

        var photoId = req.body.photoId;
        var userRole = req.body.userRole;
        var tokenService = tokenService || {};

        if (userRole === 'user') {
            tokenService = UsertokenService;

        } else if (userRole === 'admin') {
            tokenService = AdmintokenService;
        }

        tokenService.checkToken(req.body.token, function (err, tokenCheck) {

            if (err) {
                return res.json(200, {status: 2, message: 'Error token check.', error: tokenCheck});
            } else {

                if (tokenCheck.status == 1)
                {
                    var query = "SELECT p.* FROM photos AS p WHERE p.id = " + photoId + " LIMIT 1";
                    Photos.query(query, function (err, result) {
                        if (err) {
                            return res.json(200, {status: 2, message: "Error", error: err});
                        } else {
                            return res.json(200, {status: 1, message: "success", data: result});
                        }
                    });
                } else {
                    return res.json(200, {status: 3, message: 'Token expired'});
                }
            }
        });

    },
    updatePhotoStatus: function (req, res) {

        var photoId = req.body.photoId;
        var status = req.body.status;

        AdmintokenService.checkToken(req.body.token, function (err, tokenCheck) {

            if (err) {
                return res.json(200, {status: 2, message: 'Error occured in token check', error: tokenCheck});
            } else {

                if (tokenCheck.status == 1) {

                    Photos.update({id: photoId}, {status: status}).exec(function (err, result) {
                        if (err) {
                            return res.json(200, {status: 2, message: 'Error', error: err});
                        } else {
                            return res.json(200, {status: 1, message: 'Success', data: result});
                        }
                    });

                } else {
                    return res.json(200, {status: 3, message: 'token expired'});
                }
            }

        });
    },
    deletePhoto: function (req, res) {
        var photoId = req.body.photoId;
        var userId = req.body.userId;
        var imagePath = './assets/images/pics';

        UsertokenService.checkToken(req.body.token, function (err, tokenCheck) {

            if (err) {
                return res.json(200, {status: 2, message: 'Error in token check.', error_details: tokenCheck});
            } else {

                if (tokenCheck.status == 1) {

                    var condition = {id: userId};
                    User.findOne(condition).exec(function (err, user) {

                        if (err) {
                            return res.json(200, {status: 2, message: 'Error in fetching user data.', error_details: err});
                        } else {

                            if (typeof user != "undefined") {

                                Photos.findOne({id: photoId}).exec(function (err, photo) {

                                    if (err) {
                                        return res.json(200, {status: 2, error_details: err});
                                    } else {

                                        fs.unlink(imagePath + '/' + user.username + '/' + photo.imageName, function (err) {
                                            if (err) {
                                                return res.json(200, {status: 2, message: 'Error in file deletion', error_details: err});
                                            } else {

                                                Photos.destroy({id: photoId}).exec(function (err, photo) {

                                                    if (err) {
                                                        return res.json(200, {status: 2, error_details: err});
                                                    } else {
                                                        return res.json(200, {status: 1, message: 'File deleted successfully.', photoId: photoId});
                                                    }

                                                });
                                            }
                                        });
                                    }
                                });

                            } else {
                                return res.json(200, {status: 0, message: 'No user exists', user: []});
                            }
                        }

                    });

                } else {
                    return res.json(200, {status: 3, message: 'token expired'});
                }
            }
        });

    },
    generatePhotoKey: function (req, res) {
        var objectUserId = req.body.objectUserId;
        var userId = req.body.userId;
        var d = new Date();
        var hash = userId + d.getFullYear() + d.getMonth() + d.getDate() + d.getHours() + d.getMinutes() + d.getSeconds();
        var key = crypto.createHash('md5').update(hash).digest("hex");

        UsertokenService.checkToken(req.body.token, function (err, tokenCheck) {

            if (err) {
                return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
            } else {

                if (tokenCheck.status == 1) {

                    var photoKeyData = {
                        userId: userId,
                        key: key,
                        objectUserId: objectUserId
                    };

                    Photokeymapping.create(photoKeyData).exec(function (err, result) {
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
    getPrivatePhotos: function (req, res) {
        var objectUserId = req.body.objectUserId;
        var userId = req.body.userId;
        var key = req.body.key;

        UsertokenService.checkToken(req.body.token, function (err, tokenCheck) {

            if (err) {
                return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
            } else {

                if (tokenCheck.status == 1) {
                    UserService.checkPhotoKey(userId, objectUserId, key, function (err, keyCheck) {

                        if (keyCheck.valid === true) {

                            var query = "SELECT p.* FROM photos AS p WHERE p.userId = " + userId + " AND p.accessType = '" + photoConstants.ACCESS_TYPE_PRIVATE + "' ORDER BY p.id ASC";
                            console.log('query');
                            console.log(query);
                            Photos.query(query, function (err, result) {
                                if (err) {
                                    return res.json(200, {status: 2, error_details: err});
                                } else {
                                    return res.json(200, {status: 1, message: "success", photos: result});
                                }
                            });

                        } else {
                            return res.json(200, {status: 1, message: 'No permission to access private photos', valid: false});
                        }

                    });


                } else {
                    return res.json(200, {status: 3, message: 'token expired'});
                }
            }
        });
    },
    markEmailVerified: function (req, res) {

        var emailVerificationKey = req.body.emailVerificationKey;

        User.findOne({emailVerificationKey: emailVerificationKey}).exec(function findCB(err, user) {
            if (err) {
                return res.json(200, {status: 2, error_details: err});
            } else {

                if (typeof user != "undefined") {

                    var criteria = {id: user.id};
                    var data = {emailVerificationStatus: userConstants.EMAIL_VERIFIED, emailVerificationKey: null};

                    UserService.updateUser(criteria, data, function (err, result) {
                        if (err) {
                            return res.json(200, {status: 2, message: 'some error has occured', error_details: result});
                        } else {
                            if (result.length == 0) {
                                return res.json(200, {status: 2, message: "Error in email verification status updation"});
                            } else {
                                return res.json(200, {status: 1, message: "success"});
                            }
                        }
                    });

                } else {
                    return res.json(200, {status: 2, message: 'no user found'});
                }
            }
        });

    },
    addReview: function (req, res) {
        var userId = req.body.userId;
        var reviewerId = req.body.reviewerId;
        var reviewNote = req.body.reviewNote;
        var approvalStatus = reviewConstants.REVIEW_STATUS_NOTAPPROVED;

        UsertokenService.checkToken(req.body.token, function (err, tokenCheck) {

            if (err) {
                return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
            } else {

                if (tokenCheck.status == 1) {

                    var reviewData = {
                        userId: userId,
                        reviewerId: reviewerId,
                        reviewNote: reviewNote,
                        approvalStatus: approvalStatus
                    };

                    Review.create(reviewData).exec(function (err, result) {
                        if (err) {
                            return res.json(200, {status: 2, error_details: err});
                        } else {
                            return res.json(200, {status: 1, message: 'success', data: result});
                        }
                    });

                } else {
                    return res.json(200, {status: 3, message: 'token expired'});
                }
            }
        });
    },
    addReport: function (req, res) {
        var userId = req.body.userId;
        var reporterId = req.body.reporterId;
        var reportNote = req.body.reportNote;
        var approvalStatus = reportConstants.REPORT_STATUS_NOTAPPROVED;

        UsertokenService.checkToken(req.body.token, function (err, tokenCheck) {

            if (err) {
                return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
            } else {

                if (tokenCheck.status == 1) {

                    var reviewData = {
                        userId: userId,
                        reporterId: reporterId,
                        reportNote: reportNote,
                        approvalStatus: approvalStatus
                    };

                    Report.create(reviewData).exec(function (err, result) {
                        if (err) {
                            return res.json(200, {status: 2, error_details: err});
                        } else {
                            return res.json(200, {status: 1, message: 'success', data: result});
                        }
                    });

                } else {
                    return res.json(200, {status: 3, message: 'token expired'});
                }
            }
        });
    },
    blockAUser: function (req, res) {

        var userId = req.body.userId;
        var blockedUserId = req.body.blockedUserId;

        UsertokenService.checkToken(req.body.token, function (err, tokenCheck) {

            if (err) {
                return res.json(200, {status: 2, message: 'Error in token check.', error_details: tokenCheck});
            } else {

                if (tokenCheck.status == 1) {

                    var blockUserData = {
                        userId: userId,
                        blockedUserId: blockedUserId
                    };

                    Blockuser.create(blockUserData).exec(function (err, result) {
                        if (err) {
                            return res.json(200, {status: 2, error_details: err});
                        } else {
                            return res.json(200, {status: 1, message: 'success', data: result});
                        }
                    });

                } else {
                    return res.json(200, {status: 3, message: 'token expired'});
                }
            }

        });
    },
    unblockAUser: function (req, res) {

        var userId = req.body.userId;
        var blockedUserId = req.body.blockedUserId;

        UsertokenService.checkToken(req.body.token, function (err, tokenCheck) {

            if (err) {
                return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
            } else {

                if (tokenCheck.status == 1) {

                    Blockuser.destroy({userId: userId, blockedUserId: blockedUserId}).exec(function deleteCB(err) {
                        if (err) {
                            return res.json(200, {status: 2, error_details: err});
                        } else {
                            return res.json(200, {status: 1, message: 'success'});
                        }
                    });

                } else {
                    return res.json(200, {status: 3, message: 'token expired'});
                }
            }

        });
    },
    referAFriend: function (req, res) {

        var userId = req.body.userId;
        var referredUserId = req.body.referredUserId;

        User.findOne({id: referredUserId}).exec(function (err, user) {
            if (err) {
                return res.json(200, {status: 2, error_details: err});
            } else {
                if (typeof user != "undefined") {
                    //return res.json(200, {status: 1, message: 'User data', user: user});

                    var query = "UPDATE user SET refferedCount  = refferedCount + 1 WHERE id = " + user.id;

                    User.query(query, function (err, result) {
                        if (err) {
                            return res.json(200, {status: 2, error_details: err});
                        } else {

                            var criteria = {id: userId};
                            var data = {referredUserId: referredUserId};

                            UserService.updateUser(criteria, data, function (err, result) {
                                if (err) {
                                    return res.json(200, {status: 2, message: 'some error has occured', error_details: result});
                                } else {
                                    if (result.length == 0) {
                                        return res.json(200, {status: 2, message: "Error in refferal user status updation"});
                                    } else {
                                        return res.json(200, {status: 1, message: "success"});
                                    }
                                }
                            });

                        }
                    });

                } else {
                    return res.json(200, {status: 0, message: 'No user data', user: []});
                }
            }

        });

    },
    getUserReviews: function (req, res) {

        var userRole = req.body.userRole;
        var userId = req.body.userId;
        var tokenService = tokenService || {};

        if (userRole === 'user') {
            tokenService = UsertokenService;

        } else if (userRole === 'admin') {
            tokenService = AdmintokenService;
        }

        tokenService.checkToken(req.body.token, function (err, tokenCheck) {

            if (err) {
                return res.json(200, {status: 2, message: 'Error occured in token check', error: tokenCheck});
            } else {

                if (tokenCheck.status == 1)
                {
                    var query = "SELECT r.*, u.id AS uid, u.username FROM review AS r LEFT JOIN user AS u ON u.id = r.reviewerId WHERE r.userId = " + userId + " ORDER BY r.id DESC";
                    Review.query(query, function (err, result) {
                        if (err) {
                            return res.json(200, {status: 2, message: 'Error', error: err});
                        } else {
                            return res.json(200, {status: 1, message: "success", data: result});
                        }
                    });
                } else {
                    return res.json(200, {status: 3, message: 'token expired'});
                }
            }
        });
    },
    getUserReports: function (req, res) {

        var userRole = req.body.userRole;
        var userId = req.body.userId;
        var tokenService = tokenService || {};

        if (userRole === 'user') {
            tokenService = UsertokenService;

        } else if (userRole === 'admin') {
            tokenService = AdmintokenService;
        }

        tokenService.checkToken(req.body.token, function (err, tokenCheck) {

            if (err) {
                return res.json(200, {status: 2, message: 'Error occured in token check', error: tokenCheck});
            } else {

                if (tokenCheck.status == 1)
                {
                    var query = "SELECT r.*, u.id AS uid, u.username FROM report AS r LEFT JOIN user AS u ON u.id = r.reporterId WHERE r.userId = " + userId + " ORDER BY r.id DESC";
                    Review.query(query, function (err, result) {
                        if (err) {
                            return res.json(200, {status: 2, message: 'Error', error: err});
                        } else {
                            return res.json(200, {status: 1, message: "success", data: result});
                        }
                    });
                } else {
                    return res.json(200, {status: 3, message: 'token expired'});
                }
            }
        });
    },
    getReferredUsers: function (req, res) {

        var userRole = req.body.userRole;
        var userId = req.body.userId;
        var tokenService = tokenService || {};

        if (userRole === 'user') {
            tokenService = UsertokenService;

        } else if (userRole === 'admin') {
            tokenService = AdmintokenService;
        }

        tokenService.checkToken(req.body.token, function (err, tokenCheck) {

            if (err) {
                return res.json(200, {status: 2, message: 'Error occured in token check', error: tokenCheck});
            } else {

                if (tokenCheck.status == 1)
                {
                    var query = "SELECT u.* FROM user AS u WHERE u.referredUserId = " + userId + " ORDER BY u.id ASC";
                    User.query(query, function (err, result) {
                        if (err) {
                            return res.json(200, {status: 2, message: 'Error', error: err});
                        } else {
                            return res.json(200, {status: 1, message: "success", data: result});
                        }
                    });
                } else {
                    return res.json(200, {status: 3, message: 'token expired'});
                }
            }
        });
    },
    smsService: function (req, res) {
        var to = "0091" + req.body.to;
        var message = req.body.message;


        UserService.sendSms(to, message, function (err, checkStatus) {
            console.log('checkStatus');
            console.log(checkStatus);
            if (checkStatus.status === 1) {
                return res.json(200, {status: 1, message: 'SMS send successfully.'});
            } else {
                return res.json(200, {status: 2, message: 'Error in sending SMS.'});
            }
            //return res.json(200, {status: 1, message: 'SMS send successfully.'});
        });


//        var productToken = "93b46b87-d190-4fd3-bd70-7470e4690d2b";
//        var from = "Tech innov.";
//        var to = "00919746226499";
//        var body = "Example message text";
//        var reference = "Example message reference";
//        var data = "<MESSAGES><AUTHENTICATION><PRODUCTTOKEN><![CDATA[" + productToken + "]]></PRODUCTTOKEN></AUTHENTICATION><MSG><FROM><![CDATA[" + from + "]]></FROM><TO><![CDATA[" + to + "]]></TO><BODY><![CDATA[" + message + "]]></BODY><REFERENCE><![CDATA[" + reference + "]]></REFERENCE></MSG></MESSAGES>";
//
//        $.ajax({
//            type: "POST",
//            contentType: "application/xml",
//            data: data,
//            dataType: "xml",
//            crossDomain: true,
//            url: "https://sgw01.cm.nl/gateway.ashx"
//        }).done(function () {
//            // Successful request
//            console.log('SMS send successfully.');
//        }).fail(function () {
//            // Request failed
//            console.log('Error in sending SMS.');
//        });
//
        //return res.json(200, {status: 1, message: "success", data: 'Message sent successfully.'});
    },
    /*===================================================================================================================================
     get Search Users
     ====================================================================================================================================*/
    getSearchUsers: function (req, res) {

        var request = req.body.request;
        var userRole = request.userRole;
        //var userId = req.body.userId;
        var tokenService = tokenService || {};

        if (userRole === 'user') {
            tokenService = UsertokenService;

        } else if (userRole === 'admin') {
            tokenService = AdmintokenService;
        }

        tokenService.checkToken(req.body.token, function (err, tokenCheck) {

            if (err) {
                return res.json(200, {status: 2, message: 'Error occured in token check', error: tokenCheck});
            } else {

                if (tokenCheck.status == 1)
                {
                    var query = "SELECT * FROM user WHERE  username LIKE  '" + request.nameOfUser + "%' AND status = '" + userConstants.STATUS_ACTIVE + "'";
                    User.query(query, function (err, result) {
                        if (err) {
                            return res.json(200, {status: 2, message: 'Error', error: err});
                        } else {
                            return res.json(200, {status: 1, message: "success", data: result});
                        }
                    });
                } else {
                    return res.json(200, {status: 3, message: 'token expired'});
                }
            }
        });
    },
};


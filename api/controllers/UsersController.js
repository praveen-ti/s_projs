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
    /*===================================================================================================================================
     User Sign up
     ====================================================================================================================================*/
    userSignup: function (req, res) {
        console.log("Signup Entered");
        var password = crypto.createHash('md5').update(req.body.password).digest("hex");
        values = {username: 'user' + (Math.random() * 100 | 0) + 1,
            firstname: 'fname',
            lastname: 'lname',
            email: req.body.email,
            password: password,
            passwordResetKey: (req.body.passwordResetKey) ? req.body.passwordResetKey : '',
            status: (req.body.status) ? req.body.status : userConstants.STATUS_ACTIVE,
            profilePic: (req.body.profilePic) ? req.body.profilePic : '',
            emailVerificationStatus: (req.body.emailVerificationStatus) ? req.body.emailVerificationStatus : userConstants.EMAIL_NOTVERIFIED,
            emailVerificationKey: (req.body.emailVerificationKey) ? req.body.emailVerificationKey : '',
            subscriptionPackageId: (req.body.subscriptionPackageId) ? req.body.subscriptionPackageId : 0,
            subscriptionType: (req.body.subscriptionType) ? req.body.subscriptionType : userConstants.SUBSCRIPTION_FREE,
            subscriptionExpiredDate: '',
            adPackageId: (req.body.adPackageId) ? req.body.adPackageId : 0,
            adExpiredDate: '',
            referralBenefit: (req.body.referralBenefit) ? req.body.referralBenefit : userConstants.REFERRAL_UNABLE,
            referredUserId: null,
            refferedCount: 0,
            blacklisted: (req.body.blacklisted) ? req.body.blacklisted : userConstants.BLACKLIST_NO,
            createdAt: ''
        };



        var userRole = req.body.userRole;
        if (userRole === 'user') {

            User.create(values).exec(function (err, result) {
                if (err) {
                    return res.json(200, {status: 2, message: 'Some error occured', error: err});
                } else {

                    var userId = result.id;
                    var userInfo = {
                        userId: userId,
                        dob: '',
                        age: 0,
                        gender: '',
                        telephone: '',
                        zipcode: '',
                        country: '',
                        state: '',
                        city: '',
                        latitude: '',
                        longitude: '',
                        userLevel: '',
                        expYear: '',
                        bodyType: '',
                        height: 0,
                        massageFrequency: '',
                        drinkingHabit: '',
                        smokingHabit: '',
                        trainingHours: '',
                        languages: '',
                        therapeuticStatus: '',
                        therapeuticGender: '',
                        therapeuticDesc: '',
                        sensualStatus: '',
                        sensualGender: '',
                        sensualDesc: '',
                        relationshipTypes: '',
                        preferedMassageTypes: '',
                        serviceType: '',
                        lastLoggedin: '',
                        createdAt: ''
                    };

                    Userinfo.create(userInfo).exec(function (err, result) {
                        if (err) {
                            return res.json(200, {status: 2, message: 'Some error occured', error: err});
                        } else {


                            UsertokenService.createToken(userId, function (err, details) {
                                if (err) {
                                    return res.json(200, {status: 2, message: 'some error occured', error: details});
                                } else {
                                    return res.json(200, {status: 1, message: 'Success', resultlogdetails: details});

                                }
                            });

                        }
                    });

                }
            });

        } else if (userRole === 'admin') {

            AdmintokenService.checkToken(req.body.token, function (err, tokenCheck) {
                if (err) {
                    return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
                } else {

                    User.create(values).exec(function (err, result) {
                        if (err) {
                            return res.json(200, {status: 2, message: 'Some error occured', error: err});
                        } else {

                            var userId = result.id;
                            var userInfo = {
                                userId: userId,
                                dob: '',
                                age: 0,
                                gender: '',
                                telephone: '',
                                zipcode: '',
                                country: '',
                                state: '',
                                city: '',
                                latitude: '',
                                longitude: '',
                                userLevel: '',
                                expYear: '',
                                bodyType: '',
                                height: 0,
                                massageFrequency: '',
                                drinkingHabit: '',
                                smokingHabit: '',
                                trainingHours: '',
                                languages: '',
                                therapeuticStatus: '',
                                therapeuticGender: '',
                                therapeuticDesc: '',
                                sensualStatus: '',
                                sensualGender: '',
                                sensualDesc: '',
                                relationshipTypes: '',
                                preferedMassageTypes: '',
                                serviceType: '',
                                lastLoggedin: '',
                                createdAt: ''
                            };

                            Userinfo.create(userInfo).exec(function (err, result) {
                                if (err) {
                                    return res.json(200, {status: 2, message: 'Some error occured', error: err});
                                } else {

                                    //var userId = result.id;
                                    UsertokenService.createToken(userId, function (err, details) {
                                        if (err) {
                                            return res.json(200, {status: 2, message: 'some error occured', error: details});
                                        } else {
                                            return res.json(200, {status: 1, message: 'Success', resultlogdetails: details});

                                        }
                                    });

                                }
                            });

                        }
                    });

                }
            });

        }
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
                return res.json(200, {status: 2, message: 'Error occured in token check', error: tokenCheck});
            } else {

                if (tokenCheck.status == 1)
                {
                    var query = "SELECT u.* FROM user AS u LEFT JOIN userinfo AS ui ON u.id = ui.userId WHERE 1 ORDER BY u.id DESC";
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

        UsertokenService.checkToken(req.body.token, function (err, tokenCheck) {

            if (err) {
                return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
            } else {

                if (tokenCheck.status == 1) {

                    UserService.checkVideoLimit(userId, accessType, function (err, limitCheck) {

                        if (limitCheck.exceed === false) {

                            Video.update({id: videoId}, {userId: userId, videoUrl: videoUrl, title: title, description: description, accessType: accessType}).exec(function (err, result) {
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
                                                        accessType: accessType
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
                return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
            } else {

                if (tokenCheck.status == 1)
                {
                    var query = "SELECT p.* FROM photos AS p WHERE p.userId = " + userId + " ORDER BY p.id ASC";
                    Photos.query(query, function (err, result) {
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
                    var query = "SELECT r.*, u.id AS uid, u.firstname, u.lastname FROM review AS r LEFT JOIN user AS u ON u.id = r.reviewerId WHERE r.userId = " + userId + " ORDER BY r.id DESC";
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
    }

};


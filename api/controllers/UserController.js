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
    user_signup: function(req, res){

         var password   = crypto.createHash('md5').update(req.body.password).digest("hex");
         values = {name: req.body.name, email: req.body.email, password: password, gender: req.body.gender, profile_pic: "", email_verify_status: 0, email_verify_code: 0, mrship_type: 2, online_status: 0, therapeutic_desc: req.body.therapeutic_desc, sensual_desc: req.body.sensual_desc, latitude: "", longitude: "", location_adress: "", fraud_status: ""};

        //Enter Values to zen_user table
         User.create(values).exec(function(err, result){

                if (err) {

                            sails.log.debug('Some error occured ' + err);
                            return res.json(200, {status: 2, message: 'Some error occured', error: err});

                    } else {

                           // Create new access token on signup success
                            var userId = result.id;
                            TokenService.createToken(userId, function(err, details) {

                                  //return res.json(200, {status:1,message:'Success', result: result});
                              if(err) {

                                             return res.json(200, {status: 2, message: 'some error occured', error: details});
                                    } else {

                                    //Enter Values to zen_membership_package table
                                    memberpackage = {mrship_name: "free", mrship_cost: 0, valid_days: 0};
                                    Memberpackage.create(memberpackage).exec(function(err, resultmemberpack){


                                                 if(err){
                                                     return res.json(200, {status: 2, message: 'some error occured == resultmemberpack', error: err});
                                                  }else{

                                                //Enter Values to zen_user_log_package table
                                                userlogdetails = {user_id: result.id, membership_package_type: resultmemberpack.mrship_name, valid_days: 0, mrship_cost: 200};
                                                Userlogpackage.create(userlogdetails).exec(function(err, resultlogdetails){

                                                           if(err){
                                                              return res.json(200, {status: 2, message: 'some error occured == userlogdetails', error: err});
                                                           }else{
                                                              return res.json(200, {status: 1, message: 'Success',resultlogdetails : resultlogdetails});
                                                          }

                                                     });

                                                      }
                                            });
                                              }
                            });
                    }
           });
    },

/*===================================================================================================================================
                                                        User Login
 ====================================================================================================================================*/

    user_login: function(req, res){

        var password = crypto.createHash('md5').update(req.body.password).digest("hex");
        var values = {email: req.body.email, password: password};

        // Get user details
        User.findOne(values).exec(function(err, result){
            if (err) {

                sails.log.debug('Some error occured ' + err);
                return res.json(200, {status: 2, message: 'some error occured', error_details: err});
                //return res.view("login",{error: result});

            } else {
                if(typeof result == "undefined")
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
                    UsertokenService.createToken(result.id, function(err, details) {
                        if(err) {
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
    user_logout: function(req, res){

        UsertokenService.deleteToken(req.body.token, function(err, result) {
            if(err) {
                 return res.json(200, {status: 2, message: 'some error occured', error_details: result});
            } else {
                 //req.session.destroy();
                 return res.json(200, {status: 1, message: 'success', result: result});
                //res.redirect('login');
            }
        });

    },

};


/**
 * SubscriptionController
 *
 * @description :: Server-side logic for managing subscriptions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var subscriptionConstant = sails.config.constants.subscription;

module.exports = {
    getAllPackages: function (req, res) {

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
                    var query = "SELECT * FROM subscription_package WHERE 1 ORDER BY id DESC";
                    Subscription.query(query, function (err, result) {
                        if (err) {
                            return res.json(200, {status: 2, message: "Error", error: err});
                        } else {
                            return res.json(200, {status: 1, message: "success", data: result});
                        }
                    });
                } else {
                    return res.json(200, {status: 3, message: 'Token expired.'});
                }
            }
        });
    },
    addPackage: function (req, res) {

        var packageDetails = {
            name: req.body.name,
            description: (req.body.description) ? req.body.description : '',
            cost: (req.body.cost) ? req.body.cost : 0,
            validDays: (req.body.validDays) ? req.body.validDays : 0,
            status: (req.body.status) ? req.body.status : subscriptionConstant.STATUS_ACTIVE
        };

        AdmintokenService.checkToken(req.body.token, function (err, tokenCheck) {
            if (err) {
                return res.json(200, {status: 2, message: 'Error occured in token check', error: tokenCheck});
            } else {

                Subscription.create(packageDetails).exec(function (err, result) {
                    if (err) {
                        return res.json(200, {status: 2, message: 'Error', error: err});
                    } else {
                        var subscriptionId = result.id;
                        return res.json(200, {status: 1, message: 'Success', data: subscriptionId});
                    }
                });

            }
        });
    },
    updatePackageStatus: function (req, res) {

        var packageId = req.body.packageId;
        var status = req.body.status;

        AdmintokenService.checkToken(req.body.token, function (err, tokenCheck) {

            if (err) {
                return res.json(200, {status: 2, message: 'Error occured in token check', error: tokenCheck});
            } else {

                if (tokenCheck.status == 1) {

                    Subscription.update({id: packageId}, {status: status}).exec(function (err, result) {
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
    updatePackageDetails: function (req, res) {

        var packageId = req.body.id;

        AdmintokenService.checkToken(req.body.token, function (err, tokenCheck) {

            if (err) {
                return res.json(200, {status: 2, message: 'Error occured in token check', error: tokenCheck});
            } else {
                if (tokenCheck.status == 1) {
                    Subscription.findOne({id: packageId}).exec(function findCB(err, result) {
                        if (err) {
                            return res.json(200, {status: 2, error_details: err});
                        } else {
                            var packageDetails = {name: req.body.name,
                                description: (req.body.description) ? req.body.description : '',
                                cost: (req.body.cost) ? req.body.cost : 0,
                                validDays: (req.body.validDays) ? req.body.validDays : 0,
                                status: (req.body.status) ? req.body.status : subscriptionConstant.STATUS_ACTIVE
                            };

                            var criteria = {id: result.id};
                            Subscription.update(criteria, packageDetails).exec(function (err, updated) {
                                if (err) {
                                    return res.json(200, {status: 2, message: 'Error', error: err});
                                } else {
                                    return res.json(200, {status: 1, message: 'Success', data: updated});
                                }

                            });
                        }
                    });
                } else {
                    return res.json(200, {status: 3, message: 'Token expired.'});
                }

            }
        });
    },
    getPackageById: function (req, res) {

        var packageId = req.body.packageId;
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
                    Subscription.findOne({id: packageId}).exec(function findCB(err, result) {
                        if (err) {
                            return res.json(200, {status: 2, message: 'Error', error: err});
                        } else {
                            return res.json(200, {status: 1, message: 'Success', data: result});
                        }
                    });
                } else {
                    return res.json(200, {status: 3, message: 'Token expired.'});
                }
            }
            
        });

    },
    getUserSubscriptions: function (req, res) {

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
                    var query = "SELECT sp.*,spl.subscribedDate FROM subscription_package_log AS spl LEFT JOIN subscription_package AS sp ON spl.subscriptionPackageId = sp.id WHERE spl.userId = " + userId + " ORDER BY spl.id DESC";
                    SubscriptionLog.query(query, function (err, result) {
                        if (err) {
                            return res.json(200, {status: 2, message: "Error", error: err});
                        } else {
                            return res.json(200, {status: 1, message: "success", data: result});
                        }
                    });
                } else {
                    return res.json(200, {status: 3, message: 'Token expired.'});
                }
            }
        });
    }

};


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
                return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
            } else {

                if (tokenCheck.status == 1)
                {
                    var query = "SELECT * FROM subscription_package WHERE 1 ORDER BY id DESC";
                    Subscription.query(query, function (err, result) {
                        if (err) {
                            return res.json(200, {status: 2, message: "Error", error_details: err});
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

        var packageDetails = {name: req.body.name,
            description: (req.body.description) ? req.body.description : '',
            cost: (req.body.cost) ? req.body.cost : 0,
            validDays: (req.body.validDays) ? req.body.validDays : 0,
            status: subscriptionConstant.STATUS_ACTIVE,
            createdAt: ''
        };

        AdmintokenService.checkToken(req.body.token, function (err, tokenCheck) {
            if (err) {
                return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
            } else {

                Subscription.create(packageDetails).exec(function (err, result) {
                    if (err) {
                        return res.json(200, {status: 2, message: 'Some error occured', error: err});
                    } else {
                        var subscriptionId = result.id;
                        return res.json(200, {status: 1, message: 'Success', subscriptionId: subscriptionId});
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
                return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
            } else {

                if (tokenCheck.status == 1) {

                    Subscription.update({id: packageId}, {status: status}).exec(function (err, result) {
                        if (err) {
                            return res.json(200, {status: 2, error_details: err});
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

        var packageId = req.body.packageId;

        AdmintokenService.checkToken(req.body.token, function (err, tokenCheck) {

            if (err) {
                return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
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
                                status: (req.body.status) ? req.body.status : subscriptionConstant.STATUS_ACTIVE,
                                createdAt: ''
                            };

                            var criteria = {id: result.id};
                            Subscription.update(criteria, packageDetails).exec(function (err, updated) {
                                if (err) {
                                    return res.json(200, {status: 2, error_details: err});
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
    }

};


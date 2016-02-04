/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var userConstants = sails.config.constants.user;

module.exports = {

  attributes: {

        id: {
            type: 'integer',
            primaryKey: true,
            autoIncrement: true
        },

        username: {
            type: 'string'
        },

        firstname: {
            type: 'string'
        },

        lastname: {
            type: 'string'
        },

        email: {
            type: 'email',
            required: true,
            unique: true
        },

        password: {
            type: 'string'
        },

        passwordResetKey: {
            type: 'string'
        },

        status: {
            type: 'string',
            enum : [userConstants.STATUS_ACTIVE, userConstants.STATUS_INACTIVE, userConstants.STATUS_DELETE],
            defaultsTo: userConstants.STATUS_ACTIVE
        },
        
        deletedBy: {
            type: 'string',
            enum : [userConstants.DELETED_BY_USER, userConstants.DELETED_BY_ADMIN]
        },

        profilePic: {
            type: 'string'
            //defaultsTo: 'images/photo.jpg',
        },

        emailVerificationStatus: {
            type: 'string',
            enum : [userConstants.EMAIL_VERIFIED, userConstants.EMAIL_NOTVERIFIED],
            defaultsTo: userConstants.EMAIL_NOTVERIFIED
        },

        emailVerificationKey: {
            type: 'string'
        },

        subscriptionPackageId: {
            type: 'integer'
        },

        subscriptionType: {
            type: 'string',
            enum : [userConstants.SUBSCRIPTION_FREE, userConstants.SUBSCRIPTION_PAID],
            defaultsTo: userConstants.SUBSCRIPTION_FREE
        },

        subscriptionExpiredDate: {
            type: 'datetime'
        },

        adPackageId: {
            type: 'integer'
        },

        adExpiredDate: {
            type: 'datetime'
        },

        referralBenefit: {
            type: 'string',
            enum: [userConstants.REFERRAL_UNABLE, userConstants.REFERRAL_CLAIMABLE, userConstants.REFERRAL_CLAIMED],
            defaultsTo: userConstants.REFERRAL_UNABLE
        },
        
        referredUserId: {
            type: 'integer'
        },
        
        refferedCount: {
            type: 'integer'
        },

        blacklisted: {
            type: 'string',
            enum: [userConstants.BLACKLIST_NO, userConstants.BLACKLIST_YES],
            defaultsTo: userConstants.BLACKLIST_NO
        },

        createdAt: {
            type: 'datetime'
        }
  }
};


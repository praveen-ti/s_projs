/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

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
            enum : ['active', 'inactive', 'block', 'delete'],
            defaultsTo: 'active'
        },

        profilePic: {
            type: 'string'
            //defaultsTo: 'images/photo.jpg',
        },

        emailVerificationStatus: {
            type: 'string',
            enum : ['verified', 'notverified'],
            defaultsTo: 'verified'
        },

        emailVerificationKey: {
            type: 'string'
        },

        subscriptionPackageId: {
            type: 'integer'
        },

        subscriptionType: {
            type: 'string',
            enum : ['free', 'paid'],
            defaultsTo: 'free'
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

        massageFrequency: {
            type: 'string',
            enum: ['daily', 'weekly', 'monthly'],
            defaultsTo: 'weekly'
        },

        referralBenefit: {
            type: 'string',
            enum: ['claimable', 'claimed'],
            defaultsTo: 'claimable'
        },

         blacklisted: {
            type: 'string',
            enum: ['no', 'yes'],
            defaultsTo: 'no'
        },

        createdAt: {
            type: 'datetime'
        }
  }
};


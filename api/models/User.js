/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  //tableName : 'zen_user',
  //autoCreatedAt: false,
  //autoUpdatedAt: false,

  attributes: {

        id: {
            type: 'integer',
            primaryKey: true,
            autoIncrement: true
        },

        username: {
            type: 'string',
            required: true,
        },

        firstname: {
            type: 'string',
            required: true,
        },

        lastname: {
            type: 'string',
            required: true,
        },

         email: {
            type: 'email',
            required: true,
            unique: true
        },

        password: {
            type: 'string',
            required: true,
        },

        passwordResetKey: {
            type: 'string',
            required: true,
        },

        status: {
            type: 'string',
            required: true,
        },

         profilePic: {
            type: 'string',
            //defaultsTo: 'images/photo.jpg',
        },

        emailVerificationStatus: {
            type: 'string',

        },

        emailVerificationKey: {
            type: 'string',
        },

        subscriptionPackageId: {
            type: 'integer',
            required: true,
        },

        subscriptionExpiredDate: {
            type: 'datetime',
            required: true,
        },

        subscriptionPackageId: {
            type: 'integer',
            required: true,
        },

        adExpiredDate: {
            type: 'datetime',
            required: true,
        },

        massageFrequency: {
            type: 'string',

        },

         referralBenefit: {
            type: 'string',

        },

         blacklisted: {
            type: 'string',

        },
  }
};


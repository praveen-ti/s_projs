/**
* Subscription.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var subscriptionConstant = sails.config.constants.subscription;
//tableName = "subscription_package";

module.exports = {
   
  tableName: "subscription_package",
  autoCreatedAt: false,
  autoUpdatedAt: false,
  
  attributes: {
      
      id: {
            type: 'integer',
            primaryKey: true,
            autoIncrement: true
        },

        name: {
            type: 'string'
        },

        description: {
            type: 'text'
        },

        cost: {
            type: 'float'
        },

        validDays: {
            type: 'integer'
        },

        status: {
            type: 'string',
            enum : [subscriptionConstant.STATUS_ACTIVE, subscriptionConstant.STATUS_INACTIVE, subscriptionConstant.STATUS_DELETE],
            defaultsTo: subscriptionConstant.STATUS_ACTIVE
        },

        createdAt: {
            type: 'datetime'
        }
  }
};


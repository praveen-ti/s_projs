/**
* SubscriptionLog.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/


module.exports = {
   
  tableName: "subscription_package_log",
  autoCreatedAt: false,
  autoUpdatedAt: false,
  
  attributes: {
      
        id: {
            type: 'integer',
            primaryKey: true,
            autoIncrement: true
        },

        userId: {
            type: 'integer'
        },

        subscriptionPackageId: {
            type: 'integer'
        },

        subscribedDate: {
            type: 'datetime'
        }
  }
};


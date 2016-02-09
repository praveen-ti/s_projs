/**
* Adpage.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var adPageConstants = sails.config.constants.adPage;

module.exports = {

  attributes: {

         id: {
              type: 'integer',
              primaryKey: true,
              autoIncrement: true
          },

        name: {
                type: 'string',
           },

          description: {
                type: 'string',
           },

           cost: {
                type: 'integer',
           },

            //active or inactive . Admin can block an Adpage for a particular time interval
            status: {
                type                : 'string',
                enum                : [adPageConstants.STATUS_ACTIVE, adPageConstants.STATUS_INACTIVE],
                defaultsTo          : adPageConstants.STATUS_ACTIVE,
           },
  }
};


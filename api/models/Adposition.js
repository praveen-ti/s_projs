/**
* Adposition.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var adPositionConstants = sails.config.constants.adPosition;

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
                enum                : [adPositionConstants.STATUS_ACTIVE, adPositionConstants.STATUS_INACTIVE],
                defaultsTo          : adPositionConstants.STATUS_ACTIVE,
           },
  }
};


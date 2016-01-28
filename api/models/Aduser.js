/**
* Aduser.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var adUserConstants = sails.config.constants.adUser;

module.exports = {

  attributes: {

        id: {
              type: 'integer',
              primaryKey: true,
              autoIncrement: true
          },

         //Banner image of ad
         banner: {
                type: 'string',
           },

         //Bannertype to Ban By admin
         bannerType: {
                type        : 'string',
                enum        : [adUserConstants.BANNER_TYPE_THERAPEUTIC, adUserConstants.BANNER_TYPE_SENSUAL],
                defaultsTo  : adUserConstants.BANNER_TYPE_THERAPEUTIC,
           },

        //Advertisement ,currently active or not
         status: {
                type        : 'string',
                enum        : [adUserConstants.ADUSER_STATUS_ACTIVE, adUserConstants.ADUSER_STATUS_INACTIVE, adUserConstants.ADUSER_STATUS_DELETE],
                defaultsTo  : adUserConstants.ADUSER_STATUS_ACTIVE,
           },

        adPageId: {
                type: 'integer',
           },

        adPositionId: {
                type: 'integer',
           },

           userId: {
                type: 'integer',
           },

          totalCost: {
                type: 'integer',
           },

         adStartDate: {
                type: 'datetime',
           },

         adEndDate: {
                type: 'datetime',
           },
  }
};


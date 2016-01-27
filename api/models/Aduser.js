/**
* Aduser.js
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

         //Banner image of ad
         banner: {
                type: 'string',
           },

         //Bannertype to Ban By admin
         bannerType: {
                type: 'string',
                enum: ['therapeutic','sensual'],
                defaultsTo: 'therapeutic',
           },

        //Advertisement ,currently active or not
         status: {
                type: 'string',
                enum: ['active','inactive','delete'],
                defaultsTo: 'active',
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


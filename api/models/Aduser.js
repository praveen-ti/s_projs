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

        adPageId: {
                type: 'integer',
           },

        adPositionId: {
                type: 'integer',
           },

           userId: {
                type: 'integer',
           },

          //Advertisement ,currently active or not
         adStatus: {
                type: 'string',
                enum: ['active','inactive'],
                defaultsTo: 'active',
           },

        //Banner image of ad
         adImage: {
                type: 'string',
           },

         //Banner image of ad
         adStartDate: {
                type: 'datetime',
           },

         //Banner image of ad
         adEndDate: {
                type: 'datetime',
           },
  }
};


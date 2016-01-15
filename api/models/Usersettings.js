/**
* Usersettings.js
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

          userId: {
                type: 'integer',
                required: true,
            },

           /* Exclude user's profile from search by others */
           searchProfileStatus: {
                type: 'string',
                enum: ['enable','disable'],
                defaultsTo: 'disable',
                required: true,

            },

            /* Viewing sensual ads or not*/
           sensualAdStatus: {
                type: 'string',
                enum: ['enable','disable'],
                defaultsTo: 'enable',
                required: true,

            },

            autoLogin: {
                type: 'string',
                enum: ['enable','disable'],
                defaultsTo: 'enable',
                required: true,
            },

            setOffLine: {
                type: 'string',
                enum: ['enable','disable'],
                defaultsTo: 'enable',
                required: true,
            },

             /* Mail & Message to user, when others set as favourite*/
            favouriteMailStatus: {
                type: 'string',
                enum: ['true','false'],
                defaultsTo: 'true',
                required: true,

            },

            /* Mail & Message to user, when others visit his profile*/
            provisitMailStatus: {
                type: 'string',
                enum: ['true','false'],
                defaultsTo: 'true',
                required: true,

            },

            /* Mail & Message to user, when messages get from other*/
            newMailStatus: {
                type: 'string',
                enum: ['true','false'],
                defaultsTo: 'true',
                required: true,

            },

            /* Mail & Message to user, when admin add a new poll*/
            pollMailStatus: {
                type: 'string',
                enum: ['true','false'],
                defaultsTo: 'true',
                required: true,
            },



  }
};


/**
* Cmspage.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var cmsPageConstants = sails.config.constants.cmsPage;

module.exports = {

  attributes: {

       id: {
              type: 'integer',
              primaryKey: true,
              autoIncrement: true
      },

      pageName: {
            type: 'string',
        },

       content: {
            type: 'string',
        },

      //status of cmsPage, Admin can block a cms page for an interval
         status: {
            type                : 'string',
            enum                : [cmsPageConstants.STATUS_ACTIVE, cmsPageConstants.STATUS_INACTIVE],
            defaultsTo          : cmsPageConstants.STATUS_ACTIVE,
        },

  }
};


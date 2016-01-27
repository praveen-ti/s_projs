/**
* Cmspage.js
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

      pageName: {
            type: 'string',
        },

       title: {
            type: 'string',
        },

       content: {
            type: 'string',
        },

        status: {
                type: 'string',
                enum: ['active','inactive'],
                defaultsTo: 'active',
          },

  }
};


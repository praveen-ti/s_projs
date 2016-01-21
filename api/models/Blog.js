/**
* Blog.js
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

          authorId: {
                type: 'integer',
            },

           authorType : {
                type: 'string',
                enum: ['super_admin', 'sub_admin', 'user'],
                defaultsTo: 'super_admin',
            },

           title : {
                type: 'string',
            },

            description : {
                type: 'string',
            },

            approvalStatus : {
                type: 'string',
                enum: ['pending','approved','rejected'],
                defaultsTo: 'pending',
            },


  }
};


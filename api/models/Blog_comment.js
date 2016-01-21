/**
* Blog_comment.js
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

          blogId: {
                type: 'integer',
            },

           comment : {
                type: 'string',
            },

            userId: {
                type: 'integer',
            },

           //Comment approval normally approved ,Rejected if necessary
           approvalStatus : {
                type: 'string',
                enum: ['approved','rejected'],
                defaultsTo: 'approved',
            },
  }
};


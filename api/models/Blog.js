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
          //May be admin_id or user_id
          authorId: {
                type: 'integer',
            },
           //To check admin or not
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
            //Admin can block a blog for a particular time
            blogStatus : {
                type: 'string',
                enum: ['active','inactive'],
                defaultsTo: 'active',
            },
            //Admin can block a user's blog
            approvalStatus : {
                type: 'string',
                enum: ['pending','approved','rejected'],
                defaultsTo: 'pending',
            },


  }
};


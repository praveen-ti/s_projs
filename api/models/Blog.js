/**
* Blog.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var blogConstants = sails.config.constants.blog;

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
                type            : 'string',
                enum            : [blogConstants.AUTHOR_TYPE_SUPERADMIN, blogConstants.AUTHOR_TYPE_SUBADMIN, blogConstants.AUTHOR_TYPE_USER],
                defaultsTo      : blogConstants.AUTHOR_TYPE_SUPERADMIN,
            },

           title : {
                type: 'string',
            },

            description : {
                type: 'string',
            },
            //Admin can block a blog for a particular time
            blogStatus : {
                type            : 'string',
                enum            : [blogConstants.BLOG_STATUS_ACTIVE, blogConstants.BLOG_STATUS_INACTIVE, blogConstants.BLOG_STATUS_DELETE],
                defaultsTo      :  blogConstants.BLOG_STATUS_ACTIVE,
            },
            //Admin can block a user's blog
            approvalStatus : {
                type            : 'string',
                enum            : [blogConstants.APPROVAL_STATUS_PENDING, blogConstants.APPROVAL_STATUS_APPROVED, blogConstants.APPROVAL_STATUS_REJECTED],
                defaultsTo      :  blogConstants.APPROVAL_STATUS_PENDING,
            },


  }
};


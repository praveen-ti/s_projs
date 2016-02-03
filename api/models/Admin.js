/**
* Admin.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var adminConstants = sails.config.constants.admin;
module.exports = {


  //tableName : 'admin',
  attributes: {

     id: {
            type: 'integer',
            primaryKey: true,
            autoIncrement: true
        },
      //Username of an admin
      username: {
            type: 'string',
            //required: true,
            unique: true,
        },

       firstname: {
            type: 'string',
        },

        lastname: {
            type: 'string',
        },

        password: {
            type: 'string',
            //required: true,
        },
        //To know admin is a super_admin or sub_admin
        adminType: {
            type                : 'string',
            //required: true,
            enum                : [adminConstants.ADMIN_TYPE_SUPERADMIN, adminConstants.ADMIN_TYPE_SUBADMIN],
            defaultsTo          : adminConstants.ADMIN_TYPE_SUBADMIN,
        },

         //To block a subadmin
         blockStatus: {
            type                : 'string',
            enum                : [adminConstants.BLOCK_STATUS_ACTIVE, adminConstants.BLOCK_STATUS_BLOCK, adminConstants.BLOCK_STATUS_DELETE],
            defaultsTo          : adminConstants.BLOCK_STATUS_ACTIVE,
        },

  }
};


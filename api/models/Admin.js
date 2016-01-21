/**
* Admin.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/


module.exports = {


  //tableName : 'admin',
  attributes: {

     id: {
            type: 'integer',
            primaryKey: true,
            autoIncrement: true
        },

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

        adminType: {
            type: 'string',
            //required: true,
            enum: ['super_admin', 'sub_admin'],
            defaultsTo: 'sub',
        },

         //To block a subadmin
         blockStatus: {
            type: 'string',
            enum: ['block', 'unblock'],
            defaultsTo: 'unblock',
        },

  }
};


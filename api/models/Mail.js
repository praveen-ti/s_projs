/**
* Email.js
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

      subject: {
            type: 'string',
        },

       message: {
            type: 'string',
            required: true,
        },

       file: {
            type: 'string',
        },

       senderId: {
            type: 'integer',
            required: true,
        },

       receiverId: {
            type: 'integer',
            required: true,
        },

        senderFolderId: {
            type: 'integer',
            defaultsTo: 0,
        },

       receiverFolderId: {
            type: 'integer',
            defaultsTo: 0,
        },

        senderStatus: {
            type: 'string',
            enum: ['inbox', 'sent', 'drafts', 'deleted'],
            defaultsTo: 'sent',
        },

        receiverStatus: {
            type: 'string',
            enum: ['inbox', 'sent', 'drafts', 'deleted'],
            defaultsTo: 'inbox',
        },

       viewStatus: {
            type: 'string',
            enum: ['true', 'false'],
            defaultsTo: 'false',
        },



  }

};


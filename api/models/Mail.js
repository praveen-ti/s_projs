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
        },

       receiverFolderId: {
            type: 'integer',
        },

        senderStatus: {
            type: 'string',
            enum: ['sent', 'draft', 'trash', 'folder','delete'],
            defaultsTo: 'sent',
        },

        receiverStatus: {
            type: 'string',
            enum: ['inbox', 'trash', 'folder','delete'],
            defaultsTo: 'inbox',
        },

       viewStatus: {
            type: 'string',
            enum: ['true', 'false'],
            defaultsTo: 'false',
        },



  }

};


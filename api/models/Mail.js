/**
* Email.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var mailConstants = sails.config.constants.mail;

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
            type        : 'string',
            enum        : [mailConstants.SENDER_STATUS_SENT, mailConstants.SENDER_STATUS_DRAFT, mailConstants.SENDER_STATUS_TRASH, mailConstants.SENDER_STATUS_FOLDER,mailConstants.SENDER_STATUS_DELETE],
            defaultsTo  : mailConstants.SENDER_STATUS_DRAFT,
        },

        receiverStatus: {
            type        : 'string',
            enum        : [mailConstants.RECEIVER_STATUS_INBOX, mailConstants.RECEIVER_STATUS_TRASH, mailConstants.RECEIVER_STATUS_FOLDER,mailConstants.RECEIVER_STATUS_DELETE],
            defaultsTo  : mailConstants.RECEIVER_STATUS_INBOX,
        },

        conversationId: {
            type: 'integer',
        },

       viewStatus: {
            type: 'string',
            enum: [mailConstants.VIEW_STATUS_READ, mailConstants.VIEW_STATUS_UNREAD],
            defaultsTo: mailConstants.VIEW_STATUS_UNREAD,
        },



  }

};


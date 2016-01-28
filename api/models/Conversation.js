/**
* Conversation.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var conversationConstants = sails.config.constants.conversation;
module.exports = {

  attributes: {

         id: {
              type: 'integer',
              primaryKey: true,
              autoIncrement: true
          },

           /*senderid or receiverid in the conversation*/
          subjectId: {
                type: 'integer',
            },

           /*senderid or receiverid in the conversation*/
           objectId: {
                type: 'integer',
            },

            /*accept,decline,block when a new conversation starts*/
             requestStatus: {
                type            : 'string',
                enum            : [conversationConstants.REQUEST_STATUS_ACCEPT, conversationConstants.REQUEST_STATUS_DECLINE, conversationConstants.REQUEST_STATUS_BLOCK],
                defaultsTo      : conversationConstants.REQUEST_STATUS_ACCEPT,
            },
  }
};


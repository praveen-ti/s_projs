/**
* Conversation.js
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
                type: 'string',
                enum: ['accept', 'decline', 'block'],
                defaultsTo: 'accept',
            },
  }
};


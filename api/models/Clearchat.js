/**
* Clearchat.js
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

        conversationId: {
            type: 'integer'
        },

        clearUserId: {
            type: 'integer'
        },

        clearStatus: {
            type: 'string',
            enum: ['active','delete'],
        },

        lastClearDate: {
            type: 'datetime',
        },

    }
};



/**
* Blockuser.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
    
  autoCreatedAt: false,
  autoUpdatedAt: false,  
  attributes: {
      
      id: {
            type: 'integer',
            primaryKey: true,
            autoIncrement: true
      },
      
      userId: {
          type: 'integer',
          required: true
      },
      
      blockedUserId: {
          type: 'integer',
          required: true
      }
      
  }
};


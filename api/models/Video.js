/**
* Video.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

videoConstants = sails.config.constants.video;

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
      
      videoUrl: {
          type: 'string',
          required: true
      },
      
      title: {
          type: 'string',
          required: true
      },
      
      description: {
          type: 'text',
          required: false
      },
      
      accessType: {
          type: 'string',
          enum : [videoConstants.ACCESS_TYPE_PRIVATE, videoConstants.ACCESS_TYPE_PUBLIC],
          defaultsTo: videoConstants.ACCESS_TYPE_PUBLIC
      },
      
      status: {
          type: 'string',
          enum : [videoConstants.STATUS_ACTIVE, videoConstants.STATUS_INACTIVE, videoConstants.STATUS_DELETE],
          defaultsTo: videoConstants.STATUS_ACTIVE
      },
      
      createdDatetime: {
          type: 'datetime'
      }
  }
};


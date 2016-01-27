/**
* Photos.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
photoConstants = sails.config.constants.photo;

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
      
      imageName: {
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
          enum : [photoConstants.ACCESS_TYPE_PRIVATE, photoConstants.ACCESS_TYPE_PUBLIC],
          defaultsTo: photoConstants.ACCESS_TYPE_PUBLIC
      }
      

  }
};


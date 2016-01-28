/**
* Review.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var reviewConstants = sails.config.constants.review;
module.exports = {

  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
      
      id: {
            type: 'integer',
            primaryKey: true,
            autoIncrement: true
      },
      
      reviewNote: {
          type: 'text',
          required: true
      },
      
      userId: {
          type: 'integer',
          required: true
      },
      
      reviewerId: {
          type: 'integer',
          required: true
      },
      
      approvalStatus: {
          type: 'string',
          enum : [reviewConstants.REVIEW_STATUS_APPROVED, reviewConstants.REVIEW_STATUS_NOTAPPROVED],
          defaultsTo: reviewConstants.REVIEW_STATUS_NOTAPPROVED
      }

  }
};


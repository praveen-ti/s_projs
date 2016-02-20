/**
* Report.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var reportConstants = sails.config.constants.report;
module.exports = {

  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
      
      id: {
            type: 'integer',
            primaryKey: true,
            autoIncrement: true
      },
      
      reportNote: {
          type: 'text',
          required: true
      },
      
      userId: {
          type: 'integer',
          required: true
      },
      
      reporterId: {
          type: 'integer',
          required: true
      },
      
      approvalStatus: {
          type: 'string',
          enum : [reportConstants.REPORT_STATUS_APPROVED, reportConstants.REPORT_STATUS_NOTAPPROVED],
          defaultsTo: reportConstants.REPORT_STATUS_NOTAPPROVED
      }

  }
};


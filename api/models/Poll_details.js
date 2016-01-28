/**
* Poll_comment.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var pollDetailsConstants = sails.config.constants.pollDetails;

module.exports = {

  attributes: {

      id: {
              type: 'integer',
              primaryKey: true,
              autoIncrement: true
          },

          pollsId: {
                type: 'integer',
           },
            //One answer against a question
           pollAnswer : {
                type: 'string',
            },
            //One comment against a question
            pollComment : {
                type: 'string',
            },

            userId: {
                type: 'integer',
            },

           //Comment approval normally approved ,Rejected if necessary
           approvalStatus : {
                type        : 'string',
                enum        : [pollDetailsConstants.APPROVAL_STATUS_APPROVED, pollDetailsConstants.APPROVAL_STATUS_REJECTED],
                defaultsTo  : pollDetailsConstants.APPROVAL_STATUS_APPROVED,
            },

  }
};


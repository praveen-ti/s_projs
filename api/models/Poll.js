/**
* Poll.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var pollConstants = sails.config.constants.poll;

module.exports = {

  attributes: {

      id: {
              type: 'integer',
              primaryKey: true,
              autoIncrement: true
      },

      title: {
            type: 'string',
        },

      question: {
            type: 'string',
        },

       //userId or adminId
      authorId: {
            type: 'integer',
        },
        //user or admin
      authorType: {
            type        : 'string',
            enum        : [pollConstants.AUTHOR_TYPE_SUPERADMIN, pollConstants.AUTHOR_TYPE_SUBADMIN, pollConstants.AUTHOR_TYPE_USER],
            defaultsTo  : pollConstants.AUTHOR_TYPE_SUPERADMIN,
        },

         //Admin can hide the poll for a period
      pollStatus: {
            type        : 'string',
            enum        : [pollConstants.POLL_STATUS_ACTIVE,pollConstants.POLL_STATUS_INACTIVE],
            defaultsTo  : pollConstants.POLL_STATUS_ACTIVE,
        },

        //User can set whether comments needed for his poll
      commentStatus: {
            type        : 'string',
            enum        : [pollConstants.COMMENT_STATUS_SHOW, pollConstants.COMMENT_STATUS_HIDE],
            defaultsTo  : pollConstants.COMMENT_STATUS_HIDE,
        },

        //Suggest poll by user
      approvalStatus: {
            type        : 'string',
            enum        : [pollConstants.APPROVAL_STATUS_PENDING,pollConstants.APPROVAL_STATUS_APPROVED,pollConstants.APPROVAL_STATUS_REJECTED],
            defaultsTo  : pollConstants.APPROVAL_STATUS_PENDING,
        },
         //Single(Radio Button) or Multiple (Check Box)
      answerType: {
            type        : 'string',
            enum        : [pollConstants.ANSWER_TYPE_RADIOBUTTON, pollConstants.ANSWER_TYPE_CHECKBOX],
            defaultsTo  : pollConstants.ANSWER_TYPE_CHECKBOX,
        },

  }
};


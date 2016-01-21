/**
* Poll.js
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
            type: 'string',
            enum: ['super_admin', 'sub_admin', 'user'],
            defaultsTo: 'super_admin',
        },

         //Admin can hide the poll for a period
      pollStatus: {
            type: 'string',
            enum: ['active','inactive'],
            defaultsTo: 'active',
        },

        //User can set whether comments needed for his poll
      commentStatus: {
            type: 'string',
            enum: ['show','hide'],
            defaultsTo: 'hide',
        },

        //Suggest poll by user
      approvalStatus: {
            type: 'string',
            enum: ['pending','approved','rejected'],
            defaultsTo: 'pending',
        },
         //Single(Radio Button) or Multiple (Check Box)
      answerType: {
            type: 'string',
            enum: ['radio','checkbox'],
            defaultsTo: 'checkbox',
        },

  }
};


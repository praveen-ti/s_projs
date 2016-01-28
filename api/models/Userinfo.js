/**
* Userinfo.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var userinfoConstants = sails.config.constants.userinfo;

module.exports = {

  attributes: {
      
      id: {
            type: 'integer',
            primaryKey: true,
            autoIncrement: true
      },
      
      userId: {
          type: 'integer'
      },
      
      dob: {
          type: 'datetime'
      },
      
      age: {
          type: 'integer'
      },
      
      gender: {
          type: 'string',
          enum : [userinfoConstants.GENDER_MALE, userinfoConstants.GENDER_FEMALE, userinfoConstants.GENDER_MALE_FEMALE_COUPLE, userinfoConstants.GENDER_GAY_COUPLE, userinfoConstants.GENDER_LESBIAN_COUPLE]
      },
      
      telephone: {
          type: 'string'
      },
      
      zipcode: {
          type: 'string'
      },
      
      country: {
          type: 'string'
      },
      
      state: {
          type: 'string'
      },
      
      city: {
          type: 'string'
      },
      
      latitude: {
          type: 'string'
      },
      
      longitude: {
          type: 'string'
      },
      
      userLevel: {
          type: 'string',
          enum : [userinfoConstants.USER_LEVEL_PROFESSIONAL_CMT, userinfoConstants.USER_LEVEL_STUDENT, userinfoConstants.USER_LEVEL_AFICIONADO]
      },
      
      expYear: {
          type: 'string',
          enum : [userinfoConstants.EXPERIENCE_NONE, userinfoConstants.EXPERIENCE_0_TO_1, userinfoConstants.EXPERIENCE_1_TO_2, userinfoConstants.EXPERIENCE_2_TO_5, userinfoConstants.EXPERIENCE_5_TO_10, userinfoConstants.EXPERIENCE_10_TO_20, userinfoConstants.EXPERIENCE_MORE_THAN_20]
      },
      
      bodyType: {
          type: 'string',
          enum : [userinfoConstants.BODYTYPE_MUSCULAR, userinfoConstants.BODYTYPE_GYMFIT, userinfoConstants.BODYTYPE_AVERAGE, userinfoConstants.BODYTYPE_SLENDER, userinfoConstants.BODYTYPE_EXTRA_POUNDS, userinfoConstants.BODYTYPE_QUESTION_NOT_IMPORTANT]
      },
      
      height: {
          type: 'integer'
      },
      
      massageFrequency: {
          type: 'string',
          enum : [userinfoConstants.MASSAGE_FREQUENCY_DAILY, userinfoConstants.MASSAGE_FREQUENCY_ONCE_A_WEEK, userinfoConstants.MASSAGE_FREQUENCY_EVERY_WEEK, userinfoConstants.MASSAGE_FREQUENCY_ONCE_A_MONTH, userinfoConstants.MASSAGE_FREQUENCY_EVERY_MONTH, userinfoConstants.MASSAGE_FREQUENCY_EVERY_SIX_MONTH, userinfoConstants.MASSAGE_FREQUENCY_ONCE_A_YEAR]
      },
      
      drinkingHabit: {
          type: 'string',
          enum : [userinfoConstants.DRINKING_GAVE_IT_UP, userinfoConstants.DRINKING_SOCIALLY, userinfoConstants.DRINKING_REGULARLY, userinfoConstants.DRINKING_NON_ALCOHOLIC]
      },
      
      smokingHabit: {
          type: 'string',
          enum : [userinfoConstants.SMOKING_NEVER, userinfoConstants.SMOKING_EX_SMOKER, userinfoConstants.SMOKING_OCCASIONALLY, userinfoConstants.SMOKING_DAILY, userinfoConstants.SMOKING_SOCIALLY, userinfoConstants.SMOKING_TELL_YOU_LATER]
      },
      
      trainingHours: {
          type: 'string',
          enum : [userinfoConstants.TRAINING_HOURS_FORMAL, userinfoConstants.TRAINING_HOURS_UNDER_100, userinfoConstants.TRAINING_HOURS_101_TO_200, userinfoConstants.TRAINING_HOURS_201_TO_300, userinfoConstants.TRAINING_HOURS_301_TO_500, userinfoConstants.TRAINING_HOURS_501_TO_1000, userinfoConstants.TRAINING_HOURS_MORE_THAN_1000]
      },
      
      languages: {
          type: 'string'
      },
      
      therapeuticStatus: {
          type: 'string',
          enum : [userinfoConstants.THERAPEUTIC_YES, userinfoConstants.THERAPEUTIC_NO]
      },
      
      therapeuticGender: {
          type: 'string'
      },
      
      therapeuticDesc: {
          type: 'text'
      },
      
      sensualStatus: {
          type: 'string',
          enum : [userinfoConstants.SENSUAL_YES, userinfoConstants.SENSUAL_NO]
      },
      
      sensualGender: {
          type: 'string'
      },
      
      sensualDesc: {
          type: 'text'
      },
      
      relationshipTypes: {
          type: 'text'
      },
      
      preferedMassageTypes: {
          type: 'text'
      },
      
      serviceType: {
          type: 'text'
      },
      
      lastLoggedin: {
          type: 'datetime'
      },
      
      createdAt: {
            type: 'datetime'
      }
      
      

  }
};


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
      
      therapeuticMassageOne: {
          type: 'string',
          enum : [userinfoConstants.THERAPEUTIC, ""]
      },
      
      therapeuticMassageOneDesc: {
          type: 'string'
      },
      
      sensualMassageOne: {
          type: 'string',
          enum : [userinfoConstants.SENSUAL, ""]
      },
      
      sensualMassageOneDesc: {
          type: 'string'
      },
      
      dobOne: {
          type: 'datetime'
      },
      
      ageOne: {
          type: 'integer'
      },
      
      languageOne: {
          type: 'string'
      },
      
      bodyTypeOne: {
          type: 'string',
          enum : [userinfoConstants.BODYTYPE_SLIM_PALETTE, userinfoConstants.BODYTYPE_AVERAGE, userinfoConstants.BODYTYPE_GYM_FIT, userinfoConstants.BODYTYPE_MUSCULAR, userinfoConstants.BODYTYPE_FEW_POUND_AVERAGE, userinfoConstants.BODYTYPE_LARGE]
      },
      
      heightOne: {
          type: 'integer'
      },
      
      drinkingHabitOne: {
          type: 'string',
          enum : [userinfoConstants.DRINKING_FREQUENTLY, userinfoConstants.DRINKING_OCCASIONALLY_SOCIALLY, userinfoConstants.DRINKING_NEVER, userinfoConstants.DRINKING_STOPPED_DRINKING]
      },
      
      smokingHabitOne: {
          type: 'string',
          enum : [userinfoConstants.SMOKING_OCCASIONALLY_SOCIALLY, userinfoConstants.SMOKING_FREQUENTLY, userinfoConstants.SMOKING_NEVER, userinfoConstants.SMOKING_STOPPED_SMOKING]
      },
      
      massageFrequencyOne: {
          type: 'string',
          enum : [userinfoConstants.MASSAGE_FREQUENCY_DAILY, userinfoConstants.MASSAGE_FREQUENCY_EVERY_WEEK, userinfoConstants.MASSAGE_FREQUENCY_EVERY_MONTH, userinfoConstants.MASSAGE_FREQUENCY_EVERY_SIX_MONTH, userinfoConstants.MASSAGE_FREQUENCY_ONCE_A_YEAR, userinfoConstants.MASSAGE_FREQUENCY_NEVER]
      },
      
      levelTypeOne: {
          type: 'string',
          enum : [userinfoConstants.USER_LEVEL_PROFESSIONAL_CMT, userinfoConstants.USER_LEVEL_STUDENT, userinfoConstants.USER_LEVEL_AFICIONADO]
      },
      
      levelTypeOneOther: {
          type: 'string'
      },
      
      experienceOne: {
          type: 'string',
          enum : [userinfoConstants.EXPERIENCE_NONE, userinfoConstants.EXPERIENCE_0_TO_1, userinfoConstants.EXPERIENCE_1_TO_2, userinfoConstants.EXPERIENCE_2_TO_5, userinfoConstants.EXPERIENCE_5_TO_10, userinfoConstants.EXPERIENCE_10_TO_20, userinfoConstants.EXPERIENCE_MORE_THAN_20]
      },
      
      massageStylesOne: {
          type: 'string',
          enum : [userinfoConstants.MASSAGE_STYLE_DEEP_TISSUE_STRONG, userinfoConstants.MASSAGE_STYLE_THAI, userinfoConstants.MASSAGE_STYLE_REFLEXOLOGY, userinfoConstants.MASSAGE_STYLE_SWEDISH, userinfoConstants.MASSAGE_STYLE_CHINESE, userinfoConstants.MASSAGE_STYLE_OTHERS]
      },
      
      massageStylesOneOther: {
          type: 'string'
      },
      
      trainingHoursOne: {
          type: 'string',
          enum : [userinfoConstants.TRAINING_HOURS_FORMAL, userinfoConstants.TRAINING_HOURS_UNDER_100, userinfoConstants.TRAINING_HOURS_101_TO_200, userinfoConstants.TRAINING_HOURS_201_TO_300, userinfoConstants.TRAINING_HOURS_301_TO_500, userinfoConstants.TRAINING_HOURS_501_TO_1000, userinfoConstants.TRAINING_HOURS_MORE_THAN_1000]
      },
      
      therapeuticMassageTwo: {
          type: 'string',
          enum : [userinfoConstants.THERAPEUTIC, ""]
      },
      
      therapeuticMassageTwoDesc: {
          type: 'string'
      },
      
      sensualMassageTwo: {
          type: 'string',
          enum : [userinfoConstants.SENSUAL, ""]
      },
      
      sensualMassageTwoDesc: {
          type: 'string'
      },
      
      dobTwo: {
          type: 'datetime'
      },
      
      ageTwo: {
          type: 'integer'
      },
      
      languageTwo: {
          type: 'string'
      },
      
      bodyTypeTwo: {
          type: 'string',
          enum : [userinfoConstants.BODYTYPE_SLIM_PALETTE, userinfoConstants.BODYTYPE_AVERAGE, userinfoConstants.BODYTYPE_GYM_FIT, userinfoConstants.BODYTYPE_MUSCULAR, userinfoConstants.BODYTYPE_FEW_POUND_AVERAGE, userinfoConstants.BODYTYPE_LARGE]
      },
      
      heightTwo: {
          type: 'integer'
      },
      
      drinkingHabitTwo: {
          type: 'string',
          enum : [userinfoConstants.DRINKING_FREQUENTLY, userinfoConstants.DRINKING_OCCASIONALLY_SOCIALLY, userinfoConstants.DRINKING_NEVER, userinfoConstants.DRINKING_STOPPED_DRINKING]
      },
      
      smokingHabitTwo: {
          type: 'string',
          enum : [userinfoConstants.SMOKING_OCCASIONALLY_SOCIALLY, userinfoConstants.SMOKING_FREQUENTLY, userinfoConstants.SMOKING_NEVER, userinfoConstants.SMOKING_STOPPED_SMOKING]
      },
      
      massageFrequencyTwo: {
          type: 'string',
          enum : [userinfoConstants.MASSAGE_FREQUENCY_DAILY, userinfoConstants.MASSAGE_FREQUENCY_EVERY_WEEK, userinfoConstants.MASSAGE_FREQUENCY_EVERY_MONTH, userinfoConstants.MASSAGE_FREQUENCY_EVERY_SIX_MONTH, userinfoConstants.MASSAGE_FREQUENCY_ONCE_A_YEAR, userinfoConstants.MASSAGE_FREQUENCY_NEVER]
      },
      
      levelTypeTwo: {
          type: 'string',
          enum : [userinfoConstants.USER_LEVEL_PROFESSIONAL_CMT, userinfoConstants.USER_LEVEL_STUDENT, userinfoConstants.USER_LEVEL_AFICIONADO]
      },
      
      levelTypeTwoOther: {
          type: 'string'
      },
      
      experienceTwo: {
          type: 'string',
          enum : [userinfoConstants.EXPERIENCE_NONE, userinfoConstants.EXPERIENCE_0_TO_1, userinfoConstants.EXPERIENCE_1_TO_2, userinfoConstants.EXPERIENCE_2_TO_5, userinfoConstants.EXPERIENCE_5_TO_10, userinfoConstants.EXPERIENCE_10_TO_20, userinfoConstants.EXPERIENCE_MORE_THAN_20]
      },
      
      massageStylesTwo: {
          type: 'string',
          enum : [userinfoConstants.MASSAGE_STYLE_DEEP_TISSUE_STRONG, userinfoConstants.MASSAGE_STYLE_THAI, userinfoConstants.MASSAGE_STYLE_REFLEXOLOGY, userinfoConstants.MASSAGE_STYLE_SWEDISH, userinfoConstants.MASSAGE_STYLE_CHINESE, userinfoConstants.MASSAGE_STYLE_OTHERS]
      },
      
      massageStylesTwoOther: {
          type: 'string'
      },
      
      trainingHoursTwo: {
          type: 'string',
          enum : [userinfoConstants.TRAINING_HOURS_FORMAL, userinfoConstants.TRAINING_HOURS_UNDER_100, userinfoConstants.TRAINING_HOURS_101_TO_200, userinfoConstants.TRAINING_HOURS_201_TO_300, userinfoConstants.TRAINING_HOURS_301_TO_500, userinfoConstants.TRAINING_HOURS_501_TO_1000, userinfoConstants.TRAINING_HOURS_MORE_THAN_1000]
      },
      
      lastLoggedin: {
          type: 'datetime'
      },
      
      createdAt: {
            type: 'datetime'
      }

  }
};


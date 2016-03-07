/**
* SearchPreference.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var userinfoConstants = sails.config.constants.userinfo;

module.exports = {
    
  tableName: "search_preference",  
  autoCreatedAt: false,
  autoUpdatedAt: false,

  attributes: {
      
      id: {
            type: 'integer',
            primaryKey: true,
            autoIncrement: true
      },
      
      userId: {
          type: 'integer'
      },
      
      therapeuticMassage: {
          type: 'string',
          enum : [userinfoConstants.THERAPEUTIC, ""]
      },
      
      sensualMassage: {
          type: 'string',
          enum : [userinfoConstants.SENSUAL, ""]
      },
      
      genderMale: {
          type: 'string',
          enum : [userinfoConstants.GENDER_MALE, ""]
      },
      
      genderFemale: {
          type: 'string',
          enum : [userinfoConstants.GENDER_FEMALE, ""]
      },
      
      genderMaleFemaleCouple: {
          type: 'string',
          enum : [userinfoConstants.GENDER_MALE_FEMALE_COUPLE, ""]
      },
      
      genderGayCouple: {
          type: 'string',
          enum : [userinfoConstants.GENDER_GAY_COUPLE, ""]
      },
      
      genderLesbianCouple: {
          type: 'string',
          enum : [userinfoConstants.GENDER_LESBIAN_COUPLE, ""]
      },
      
      minAge: {
          type: 'integer'
      },
      
      maxAge: {
          type: 'integer'
      },
      
      language: {
          type: 'string'
      },
      
      bodyType: {
          type: 'string',
          enum : [userinfoConstants.BODYTYPE_SLIM_PALETTE, userinfoConstants.BODYTYPE_AVERAGE, userinfoConstants.BODYTYPE_GYM_FIT, userinfoConstants.BODYTYPE_MUSCULAR, userinfoConstants.BODYTYPE_FEW_POUND_AVERAGE, userinfoConstants.BODYTYPE_LARGE]
      },
      
      height: {
          type: 'integer'
      },
      
      drinkingHabit: {
          type: 'string',
          enum : [userinfoConstants.DRINKING_FREQUENTLY, userinfoConstants.DRINKING_OCCASIONALLY_SOCIALLY, userinfoConstants.DRINKING_NEVER, userinfoConstants.DRINKING_STOPPED_DRINKING]
      },
      
      smokingHabit: {
          type: 'string',
          enum : [userinfoConstants.SMOKING_OCCASIONALLY_SOCIALLY, userinfoConstants.SMOKING_FREQUENTLY, userinfoConstants.SMOKING_NEVER, userinfoConstants.SMOKING_STOPPED_SMOKING]
      },
      
      levelType: {
          type: 'string',
          enum : [userinfoConstants.USER_LEVEL_PROFESSIONAL_CMT, userinfoConstants.USER_LEVEL_STUDENT, userinfoConstants.USER_LEVEL_AFICIONADO]
      },
      
      levelTypeOther: {
          type: 'string'
      },
      
      massageStyle: {
          type: 'string',
          enum : [userinfoConstants.MASSAGE_STYLE_DEEP_TISSUE_STRONG, userinfoConstants.MASSAGE_STYLE_THAI, userinfoConstants.MASSAGE_STYLE_REFLEXOLOGY, userinfoConstants.MASSAGE_STYLE_SWEDISH, userinfoConstants.MASSAGE_STYLE_CHINESE, userinfoConstants.MASSAGE_STYLE_OTHERS]
      },
      
      massageStyleOther: {
          type: 'string'
      },
      
      serviceReceiveOnly: {
          type: 'string',
          enum: [userinfoConstants.SERVICE_RECEIVE_ONLY, '']
      },
      
      serviceGiveOnly: {
          type: 'string',
          enum: [userinfoConstants.SERVICE_GIVE_ONLY, '']
      },
      
      serviceExchange: {
          type: 'string',
          enum: [userinfoConstants.SERVICE_EXCHANGE, '']
      },
      
      servicePayRightMasseur: {
          type: 'string',
          enum: [userinfoConstants.SERVICE_PAY_RIGHT_MASSEUR, '']
      },
      
      relationshipPartner: {
          type: 'string',
          enum: [userinfoConstants.RELATIONSHIP_PARTNER, '']
      },
      
      relationshipFriendship: {
          type: 'string',
          enum: [userinfoConstants.RELATIONSHIP_FRIENDSHIP, '']
      },
      
      relationshipIntimate: {
          type: 'string',
          enum: [userinfoConstants.RELATIONSHIP_INTIMATE, '']
      },
      
      relationshipRomance: {
          type: 'string',
          enum: [userinfoConstants.RELATIONSHIP_ROMANCE, '']
      },
      
      massageFrequency: {
          type: 'string',
          enum : [userinfoConstants.MASSAGE_FREQUENCY_DAILY, userinfoConstants.MASSAGE_FREQUENCY_EVERY_WEEK, userinfoConstants.MASSAGE_FREQUENCY_EVERY_MONTH, userinfoConstants.MASSAGE_FREQUENCY_EVERY_SIX_MONTH, userinfoConstants.MASSAGE_FREQUENCY_ONCE_A_YEAR, userinfoConstants.MASSAGE_FREQUENCY_NEVER]
      },
      
      updatedAt: {
            type: 'datetime'
      }

  }
};


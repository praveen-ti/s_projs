/**
* Usersettings.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var userSettingsConstants = sails.config.constants.userSettings;

module.exports = {

  attributes: {

          id: {
              type: 'integer',
              primaryKey: true,
              autoIncrement: true
          },

          userId: {
                type: 'integer',
                required: true,
            },

           /* Exclude user's profile from search by others */
           searchProfileStatus: {
                type        : 'string',
                enum        : [userSettingsConstants.SEARCH_PROFILE_STATUS_ENABLE, userSettingsConstants.SEARCH_PROFILE_STATUS_DISABLE],
                defaultsTo  : userSettingsConstants.SEARCH_PROFILE_STATUS_DISABLE,
                required    : true,

            },

            /* Viewing sensual ads or not*/
           sensualAdStatus: {
                type        : 'string',
                enum        : [userSettingsConstants.SENSUAL_ADSTATUS_ENABLE, userSettingsConstants.SENSUAL_ADSTATUS_DISABLE],
                defaultsTo  : userSettingsConstants.SENSUAL_ADSTATUS_ENABLE,
                required    : true,

            },

            autoLogin: {
                type        : 'string',
                enum        : [userSettingsConstants.AUTO_LOGIN_ENABLE, userSettingsConstants.AUTO_LOGIN_DISABLE],
                defaultsTo  : userSettingsConstants.AUTO_LOGIN_ENABLE,
                required    : true,
            },

            setOffLine: {
                type        : 'string',
                enum        : [userSettingsConstants.SET_OFFLINE_ENABLE, userSettingsConstants.SET_OFFLINE_DISABLE],
                defaultsTo  : userSettingsConstants.SET_OFFLINE_ENABLE,
                required    : true,
            },

             /* Mail & Message to user, when others set as favourite*/
            favouriteMailStatus: {
                type        : 'string',
                enum        : [userSettingsConstants.FAVOURITE_MAIL_STATUS_ENABLE, userSettingsConstants.FAVOURITE_MAIL_STATUS_DISABLE],
                defaultsTo  : userSettingsConstants.FAVOURITE_MAIL_STATUS_ENABLE,
                required    : true,

            },

            /* Mail & Message to user, when others visit his profile*/
            provisitMailStatus: {
                type        : 'string',
                enum        : [userSettingsConstants.PROVISIT_MAIL_STATUS_ENABLE, userSettingsConstants.PROVISIT_MAIL_STATUS_DISABLE],
                defaultsTo  : userSettingsConstants.PROVISIT_MAIL_STATUS_ENABLE,
                required    : true,

            },

            /* Mail & Message to user, when messages get from other*/
            newMailStatus: {
                type        : 'string',
                enum        : [userSettingsConstants.NEW_MAIL_STATUS_ENABLE , userSettingsConstants.NEW_MAIL_STATUS_DISABLE],
                defaultsTo  : userSettingsConstants.NEW_MAIL_STATUS_ENABLE,
                required    : true,

            },

            /* Mail & Message to user, when admin add a new poll*/
            pollMailStatus: {
                type        : 'string',
                enum        : [userSettingsConstants.POLL_MAIL_STATUS_ENABLE, userSettingsConstants.POLL_MAIL_STATUS_DISABLE],
                defaultsTo  : userSettingsConstants.POLL_MAIL_STATUS_ENABLE,
                required    : true,
            },



  }
};


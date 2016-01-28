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
                enum        : [userSettings.SEARCH_PROFILE_STATUS_ENABLE, userSettings.SEARCH_PROFILE_STATUS_DISABLE],
                defaultsTo  : userSettings.SEARCH_PROFILE_STATUS_DISABLE,
                required    : true,

            },

            /* Viewing sensual ads or not*/
           sensualAdStatus: {
                type        : 'string',
                enum        : [userSettings.SENSUAL_ADSTATUS_ENABLE, userSettings.SENSUAL_ADSTATUS_DISABLE],
                defaultsTo  : userSettings.SENSUAL_ADSTATUS_ENABLE,
                required    : true,

            },

            autoLogin: {
                type        : 'string',
                enum        : [userSettings.AUTO_LOGIN_ENABLE, userSettings.AUTO_LOGIN_DISABLE],
                defaultsTo  : userSettings.AUTO_LOGIN_ENABLE,
                required    : true,
            },

            setOffLine: {
                type        : 'string',
                enum        : [userSettings.SET_OFFLINE_ENABLE, userSettings.SET_OFFLINE_DISABLE],
                defaultsTo  : userSettings.SET_OFFLINE_ENABLE,
                required    : true,
            },

             /* Mail & Message to user, when others set as favourite*/
            favouriteMailStatus: {
                type        : 'string',
                enum        : [userSettings.FAVOURITE_MAIL_STATUS_ENABLE, userSettings.FAVOURITE_MAIL_STATUS_DISABLE],
                defaultsTo  : userSettings.FAVOURITE_MAIL_STATUS_ENABLE,
                required    : true,

            },

            /* Mail & Message to user, when others visit his profile*/
            provisitMailStatus: {
                type        : 'string',
                enum        : [userSettings.PROVISIT_MAIL_STATUS_ENABLE, userSettings.PROVISIT_MAIL_STATUS_DISABLE],
                defaultsTo  : userSettings.PROVISIT_MAIL_STATUS_ENABLE,
                required    : true,

            },

            /* Mail & Message to user, when messages get from other*/
            newMailStatus: {
                type        : 'string',
                enum        : [userSettings.NEW_MAIL_STATUS_ENABLE , userSettings.NEW_MAIL_STATUS_DISABLE],
                defaultsTo  : userSettings.NEW_MAIL_STATUS_ENABLE,
                required    : true,

            },

            /* Mail & Message to user, when admin add a new poll*/
            pollMailStatus: {
                type        : 'string',
                enum        : [userSettings.POLL_MAIL_STATUS_ENABLE, userSettings.POLL_MAIL_STATUS_DISABLE],
                defaultsTo  : userSettings.POLL_MAIL_STATUS_ENABLE,
                required    : true,
            },



  }
};


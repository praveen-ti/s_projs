/**
* Settings.js
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

        key: {
            type: 'string',
            unique: true,
        },

        value: {
            type: 'string',
        },
  }
};


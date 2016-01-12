/**
* Token.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

    //tableName : 'usertoken',
    attributes: {
        id: {
            type: 'integer',
            primaryKey: true,
            autoIncrement: true
        },

        userId: {
            type: 'integer',
            //required: true,
        },

        token: {
            type: 'string',
            required: true,
            unique: true,
        },

        expiryDate: {
            type: 'datetime',
        },

    }


};


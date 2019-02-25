/**
 * Web App: COMP308-2019-Midterm-300917184
 * File Name: users.js
 * Author: Minseok Choi
 * Student ID: 300917184
 * Date: 02/25/2019
 * Heroku Link: https://comp308-2019midterm-300917184.herokuapp.com/
 */

let mongoose = require('mongoose');

let usersSchema = mongoose.Schema({
    username: {
        type: String,
        default: "",
        trim: true,
        required: "username is required"
    },
    email: {
        type: String,
        default: "",
        trim: true,
        required: "username is required"
    },
    displayName: {
        type: String,
        default: "",
        trim: true,
        required: "username is required"
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    }
},
{
  collection: "users"
});

module.exports = mongoose.model('users', usersSchema);

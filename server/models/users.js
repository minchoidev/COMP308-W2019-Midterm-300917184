/**
 * Web App: COMP308-2019-Midterm-300917184
 * File Name: users.js
 * Author: Minseok Choi
 * Student ID: 300917184
 * Date: 02/25/2019
 * Heroku Link: https://comp308-2019midterm-300917184.herokuapp.com/
 */

let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let userSchema = mongoose.Schema({
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
        required: "email is required"
    },
    displayName: {
        type: String,
        default: "",
        trim: true,
        required: "displayName is required"
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

// configure options for the UserSchema
let options = ({
    missingPasswordError: "The password is wrong or missing"
});

userSchema.plugin(passportLocalMongoose, options); // passportLocalMongoose extends the schema to allow dev to add additional functionalities for authentication reasons

module.exports.User = mongoose.model('users', userSchema);     // create a property allowing access outside the module

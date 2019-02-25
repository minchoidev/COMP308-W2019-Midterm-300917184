/**
 * Web App: COMP308-2019-Midterm-300917184
 * File Name: books.js
 * Author: Minseok Choi
 * Student ID: 300917184
 * Date: 02/25/2019
 */

let mongoose = require('mongoose');

// create a model class
let gamesSchema = mongoose.Schema({
    Title: String,
    Description: String,
    Price: Number,
    Author: String,
    Genre: String
},
{
  collection: "books"
});

module.exports = mongoose.model('books', gamesSchema);

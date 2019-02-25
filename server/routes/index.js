/**
 * Web App: COMP308-2019-Midterm-300917184
 * File Name: index.js
 * Author: Minseok Choi
 * Student ID: 300917184
 * Date: 02/25/2019
 * Heroku Link: https://comp308-2019midterm-300917184.herokuapp.com/
 */

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the game model
let book = require('../models/books');

/* GET home page. wildcard */
router.get('/', (req, res, next) => {
  res.render('content/index', {
    title: 'Home',
    books: ''
   });
});

/* Get - render login page */
router.get('/login', (req, res, next) => {
  res.render('auth/login');
});

/* POST - try login by input information */
router.post('/login', (req, res, next) => {
  res.render('content/index');
});

/* Get - render register page */
router.get('/register', (req, res, next) => {
  res.render('auth/register');
});

/* POST - process the information passed from the form and register new user */
router.post('/register', (req, res, next) => {
  res.render('content/index');
});

/* Get - logout the current user  */
router.get('/logout', (req, res, next) => {
  res.render('content/index');
});

module.exports = router;

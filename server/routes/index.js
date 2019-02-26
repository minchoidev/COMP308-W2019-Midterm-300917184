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
let passport = require('passport');

// define the game model
let book = require('../models/books');
let userModel = require('../models/users');
let User = userModel.User;

/* GET home page. wildcard */
router.get('/', (req, res, next) => {
  res.render('content/index', {
    title: 'Home',
    books: '',
    displayName: req.user ? req.user.displayName : ""
  });
});

/* Get - render login page */
router.get('/login', (req, res, next) => {
  res.render('auth/login', {
    title: 'SignIn',
    message: req.flash("loginMessage"),
    displayName: req.user ? req.user.displayName : ""
  });
});

/* POST - try login by input information */
router.post('/login', (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    // check server error
    if (err) {
      return next(err);
    }
    // check login error?\
    if (!user) {
      req.flash("loginMessage", "Login Fail");
      return res.redirect('/login');
    }
    req.logIn(user, (err) => {
      // server error?
      if (err) {
        return next(err);
      }
      return res.redirect('/');
    });
  })(req, res, next);
});

/* Get - render register page */
router.get('/register', (req, res, next) => {
  res.render('auth/register', {
    title: 'SignUp',
    message: req.flash("registerMessage"),
    displayName: req.user ? req.user.displayName : ""
  });
});

/* POST - process the information passed from the form and register new user */
router.post('/register', (req, res, next) => {
  // define a new user object
  let newUser = new User({
    username: req.body.username,
    email: req.body.email,
    displayName: req.body.displayName
  });

  User.register(newUser, req.body.password, (err) => {
    if (err) {
      console.log("Error: Creating New User");
      if (err.name == "UserExistsError") {
        req.flash(
          "registerMessage",
          "Error: User already exists!"
        );
        console.log("Error: User already exists!");
      }
      return res.render("auth/register", {
        title: "Register",
        message: req.flash("registerMessage"),
        displayName: req.user ? req.user.displayName : ""
      });
    } else {
      // redirect
      return passport.authenticate("local")(req, res, () => {
        res.redirect("/");
      });
    }
  });
});

/* Get - logout the current user  */
router.get('/logout', (req, res, next) => {
  req.logOut();
  res.redirect("/");
});

module.exports = router;

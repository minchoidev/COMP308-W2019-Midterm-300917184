/**
 * Web App: COMP308-2019-Midterm-300917184
 * File Name: books.js
 * Author: Minseok Choi
 * Student ID: 300917184
 * Date: 02/25/2019
 * Heroku Link: https://comp308-2019midterm-300917184.herokuapp.com/
 */

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find((err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {
  res.render('books/details', {
    title: 'Add New Book',
    books: book({   // it won't show any value in input fields
      "Title": "",
      "Description": "",
      "Price": "",
      "Author": "",
      "Genre": ""
    })
  });
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

  // isntanciate a book
  let newBook = book({
    "Title": req.body.title,
    "Description": req.body.description,
    "Price": req.body.price,
    "Author": req.body.author,
    "Genre": req.body.genre
});

// add a book in DB
book.create(newBook, (err, book) => {
    if(err) {
        console.log(err);
        res.end(err);
    }
    else {
        // refresh the books list
        res.redirect('/books');
    }
});

});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {
  let id = req.params.id;

  // find a book in DB and display
  book.findById(id, (err, bookObject) => {
      if(err) {
          console.log(err);
          res.end(err);
      }
      else
      {
          // show the edit page
          res.render('books/details', {
              title: 'Edit Book',
              books: bookObject
          });
      }
  });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {
  let id = req.params.id;

  // update a book in DB by its id
  let updatedBook = book({
      "_id": id,
      "Title": req.body.title,
      "Description": req.body.description,
      "Price": req.body.price,
      "Author": req.body.author,
      "Genre": req.body.genre
  });

  book.update({_id: id}, updatedBook, (err) => {
      if(err) {
          console.log(err);
          res.end(err);
      }
      else {
          // refresh the books list
          res.redirect('/books');
      }
  })
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {
  let id = req.params.id;

  // remove a book in DB by its id
  book.remove({_id: id}, (err) => {
      if(err) {
          console.log(err);
          res.end(err);
      }
      else {
          // refresh the books list
          res.redirect('/books');
      }
  });
});


module.exports = router;

/*
File name: books.js
Author's name: Chun Wai Yim
StudentID: 301242959
Web App name: Favourite Book List
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
  book.find( (err, books) => {
    // If error, redirect the user to the '/' route
    if (err) {
      res.redirect('/');
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
    res.render("books/details",{
      title:'Book Details',
      books: {},
    });
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {
    // Extract values from request body
    const { title, price, author, genre } = req.body;

    book.create({ Title: title, Price: price, Author: author, Genre: genre }, (err) => {
      // If error, redirect the user to the '/' route
      if (err) {
        res.redirect('/');
      }
      res.redirect('/books');
    });
});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {
    book.findById(req.params.id, function(err, book){
      // If error, redirect the user to the '/' route
      if(err){
        res.redirect("/");
      }
      else{
        res.render("books/details", {title:'Edit', books: book});
      }
    }) 
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {
    const id = req.params.id;

    // Create an object with the updated book information from the request body
    const updatedBook = {
      _id: id,
      Title: req.body.title,
      Price: req.body.price,
      Author: req.body.author,
      Genre: req.body.genre
    };

    book.findByIdAndUpdate(id, updatedBook, { new: true }, (err) => {
      // If error, redirect the user to the '/books' route
      if (err) {
        res.redirect('/books');
      }
      res.redirect('/books');
    });
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {
    const bookId = req.params.id;
    book.findByIdAndRemove(bookId, (err, deletedBook) => {
    // If error, redirect the user to the '/' route
    if (err) {
      res.redirect('/');
    }
    res.redirect('/books');
  });
});


module.exports = router;

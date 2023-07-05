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
    /*****************
     * ADD CODE HERE *
     *****************/
    res.render("books/details",{
      title:'Book Details',
      books: {},
    });
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    // Extract values from request body
    const { title, price, author, genre } = req.body;

    book.create({ Title: title, Price: price, Author: author, Genre: genre }, (err) => {
      if (err) {
        console.error(err);
        return res.redirect('/');
      }
      res.redirect('/books');
    });
});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    book.findById(req.params.id, function(err, book){
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

    /*****************
     * ADD CODE HERE *
     *****************/
    const id = req.params.id;

    const updatedBook = {
      _id: id,
      Title: req.body.title,
      Price: req.body.price,
      Author: req.body.author,
      Genre: req.body.genre
    };

    book.findByIdAndUpdate(id, updatedBook, { new: true }, (err) => {
      if (err) {
        console.error(err);
        return res.redirect('/books');
      }
      res.redirect('/books');
    });
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    const bookId = req.params.id;
    book.findByIdAndRemove(bookId, (err, deletedBook) => {
    if (err) {
      return res.redirect('/');
    }
    res.redirect('/books');
  });
});


module.exports = router;

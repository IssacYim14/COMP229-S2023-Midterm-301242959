/*
File name: books.js
Author's name: Chun Wai Yim
StudentID: 301242959
Web App name: Favourite Book List
*/

let mongoose = require('mongoose');

// create a model class
let Book = mongoose.Schema({
    Title: String,
    Description: String,
    Price: Number,
    Author: String,
    Genre: String
},
{
  collection: "Book"
});

module.exports = mongoose.model('Book', Book);

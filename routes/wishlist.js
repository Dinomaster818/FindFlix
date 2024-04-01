const express = require('express');
const { addMovieToWishlist } = require('../db_cotroller');
const { removeMovieFromWishlist } = require('../db_cotroller');
const { addBookToWishlist } = require('../db_cotroller');
const { removeBookFromWishlist } = require('../db_cotroller');
const { getItemsFromWishlist } = require('../db_cotroller');



const router = express.Router();


    // A GET route to render the wishlist page
router.get('/', async (req, res) => {
    res.render('wishlist');
});


// A POST route to render the wishlist page
router.post('/add movie', db-cotroller.js, addMovieToWishlist);

// A PUT route to remove movie from wishlist
router.post('/remove movie', db-cotroller.js, removeMovieFromWishlist);


// A  POST route to add a new book to wishlist
router.post('/add book', db-cotroller.js, addBookToWishlist);

// A PUT route to remove a book from wishlist
router.post('/remove book', db-cotroller.js, removeBookFromWishlist);

// A GET route to fetch wishlist items
router.get('/items', db-cotroller.js, getItemsFromWishlist);



module.exports = router;
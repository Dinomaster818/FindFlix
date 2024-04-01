const express = require('express');
const db_controller = require('../db_cotroller'); // Importing db_controller.js




const router = express.Router();


    // A GET route to render the wishlist page
router.get('/', async (req, res) => {
    res.render('wishlist');
});


// A POST route to render the wishlist page
router.post('/add-movie', db_controller.addMovieToWishlist);

// A PUT route to remove movie from wishlist
router.post('/remove-movie', db_controller.removeMovieFromWishlist);


// A  POST route to add a new book to wishlist
router.post('/add-book', db_controller.addBookToWishlist);

// A PUT route to remove a book from wishlist
router.post('/remove-book', db_controller.removeBookFromWishlist);

// A GET route to fetch wishlist items
// wishlist.js

router.get('/books', async (req, res) => {
    try {
        // Fetch data for books
        const books = await db_controller.getAllBooks();
        res.render('wishlist_books', { books });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/movies', async (req, res) => {
    try {
        // Fetch data for movies
        const movies = await db_controller.getAllMovies();
        res.render('wishlist_movies', { movies });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});




module.exports = router;
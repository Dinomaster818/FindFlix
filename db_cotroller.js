const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('usersdb.db');

function login(username, password, callback) {
    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.get(sql, [username, password], (err, row) => {
        if (err) {
            console.error('Error during login:', err.message);
            return callback(err);
        }
        if (row) {
            console.log('Login successful:', row.username);
            callback(null, row); 
        } else {
            console.log('Invalid username or password.');
            callback(new Error('Invalid username or password.'));
        }
    });
}


function createAccount(username, password, fullName, callback) {
    const sql = 'INSERT INTO users (username, password, full_name) VALUES (?, ?, ?)';
    db.run(sql, [username, password, fullName], function(err) {
        if (err) {
            console.error('Error creating account:', err.message);
            return callback(err);
        }
        console.log('Account created successfully. User ID:', this.lastID);
        callback(null, this.lastID); 
    });
}

function addBookToWishlist(user_id, title, authors, publisher, publishedDate, description, 
    pageCount, printType, mainCategory, averageRating, ratingsCount, 
    smallThumbnail, thumbnail, language, infoLink, canonicalVolumeLink, 
    country, saleability, isEbook, buyLink, callback) {
const sql = `INSERT INTO user_wishlist 
(user_id, title, authors, publisher, publishedDate, description, 
pageCount, printType, mainCategory, averageRating, ratingsCount, 
smallThumbnail, thumbnail, language, infoLink, canonicalVolumeLink, 
country, saleability, isEbook, buyLink) 
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

const values = [user_id, title, authors, publisher, publishedDate, description, 
pageCount, printType, mainCategory, averageRating, ratingsCount, 
smallThumbnail, thumbnail, language, infoLink, canonicalVolumeLink, 
country, saleability, isEbook, buyLink];

db.run(sql, values, function(err) {
if (err) {
console.error('Error adding book to wishlist:', err.message);
return callback(err);
}
console.log('Book added to wishlist successfully. Wishlist ID:', this.lastID);
callback(null, this.lastID); 
});
}

function addMovieToWishlist(user_id, title, year, imdb_id, poster_url, genre, director, 
    plot, runtime, language, country, imdb_rating, imdb_votes, callback) {
const sql = `INSERT INTO user_wishlist 
(user_id, title, year, imdb_id, poster_url, genre, director, 
plot, runtime, language, country, imdb_rating, imdb_votes) 
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

const values = [user_id, title, year, imdb_id, poster_url, genre, director, 
plot, runtime, language, country, imdb_rating, imdb_votes];

db.run(sql, values, function(err) {
if (err) {
console.error('Error adding movie to wishlist:', err.message);
return callback(err);
}
console.log('Movie added to wishlist successfully. Wishlist ID:', this.lastID);
callback(null, this.lastID); 
});
}

function removeBookFromWishlist(book_id, callback) {
    const sql = 'DELETE FROM user_books WHERE id = ?';
    db.run(sql, [book_id], function(err) {
        if (err) {
            console.error('Error removing book from wishlist:', err.message);
            return callback(err);
        }
        console.log('Book removed from wishlist successfully.');
        callback(null);
    });
}

function removeMovieFromWishlist(movie_id, callback) {
    const sql = 'DELETE FROM user_movies WHERE id = ?';
    db.run(sql, [movie_id], function(err) {
        if (err) {
            console.error('Error removing movie from wishlist:', err.message);
            return callback(err);
        }
        console.log('Movie removed from wishlist successfully.');
        callback(null);
    });
}





module.exports = {
    login,
    createAccount,
    addBookToWishlist,
    addMovieToWishlist,
    removeBookFromWishlist,
    removeMovieFromWishlist

};

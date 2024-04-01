const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('usersdb.db');

 function login(email, password, callback) {
    const sql = 'SELECT * FROM user WHERE email = ? AND password = ?';
    db.get(sql, [email, password], (err, row) => {
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


function createAccount(email, password, fullName, callback) {
    const sql = 'INSERT INTO user (email, password, full_name) VALUES (?, ?, ?)';
    db.run(sql, [email, password, fullName], function(err) {
        if (err) {
            console.error('Error creating account:', err.message);
            return callback(err);
        }
        console.log('Account created successfully. User ID:', this.lastID);
        callback(null, this.lastID); 
    });
}

function addBookToWishlist(user_id, title, ratings, pageCount, publishedDate, genre, 
    description, format, author, isbn, publisher, 
    language, cover, buylink, callback) {
const sql = `INSERT INTO user_books 
(user_id, title, ratings, pageCount, publishedDate, genre, 
    description, format, author, isbn, publisher, 
    language, cover, buylink) 
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

const values = [user_id, title, ratings, pageCount, publishedDate, genre, 
    description, format, author, isbn, publisher, 
    language, cover, buylink];

db.run(sql, values, function(err) {
if (err) {
console.error('Error adding book to wishlist:', err.message);
return callback(err);
}
console.log('Book added to wishlist successfully. Wishlist ID:', this.lastID);
callback(null, this.lastID); 
});
}

function addMovieToWishlist(user_id, title, year, ratings, runtime, release, genre, 
    description, actors, director, poster, callback) {
const sql = `INSERT INTO user_movies
(user_id, title, year, ratings, runtime, release, genre, 
    description, actors, director, poster) 
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

const values = [user_id, title, year, ratings, runtime, release, genre, 
    description, actors, director, poster];

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

function getBooksByUserId(user_id, callback) {
    const sql = 'SELECT * FROM user_wishlist WHERE user_id = ?';
    db.all(sql, [user_id], (err, rows) => {
        if (err) {
            console.error('Error retrieving books:', err.message);
            return callback(err);
        }
        console.log('Books retrieved successfully for user:', user_id);
        callback(null, rows);
    });
}

function getMoviesByUserId(user_id, callback) {
    const sql = 'SELECT * FROM user_wishlist WHERE user_id = ?';
    db.all(sql, [user_id], (err, rows) => {
        if (err) {
            console.error('Error retrieving movies:', err.message);
            return callback(err);
        }
        console.log('Movies retrieved successfully for user:', user_id);
        callback(null, rows);
    });
}





module.exports = {
    login,
    createAccount,
    addBookToWishlist,
    addMovieToWishlist,
    removeBookFromWishlist,
    removeMovieFromWishlist,
    getBooksByUserId,
    getMoviesByUserId

};

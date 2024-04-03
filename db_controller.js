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
            console.log('Login successful:', row.email);
            callback(null, row);
        } else {
            console.log('Invalid username or password.');
            callback(new Error('Invalid username or password.'));
        }
    });
}


function createAccount(email, password, fullName, callback) {
    const sql = 'INSERT INTO user (email, password, fullname) VALUES (?, ?, ?)';
    db.run(sql, [email, password, fullName], function (err) {
        if (err) {
            console.error('Error creating account:', err.message);
            return callback(err);
        }
        console.log('Account created successfully. User ID:', this.lastID);
        callback(null, this.lastID);
    });
}

function checkUserExists(email, callback) {
    const sql = 'SELECT * FROM user WHERE email = ?';
    db.get(sql, [email], (err, row) => {
        if (err) {
            console.error('Error checking user:', err.message);
            return callback(err);
        }
        callback(null, row);
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


    db.run(sql, values, function (err) {
        if (err) {
            console.error('Error adding book to wishlist:', err.message);
            return callback(err);
        }
        console.log('Book added to wishlist successfully. Wishlist ID:', this.lastID);
        callback(null, this.lastID);
    });
}

//get user id by email
function getUserIdByEmail(email, callback) {
    const sql = 'SELECT user_id FROM user WHERE email = ?';
    db.get(sql, [email], (err, row) => {
        if (err) {
            console.error('Error fetching user ID by email:', err.message);
            return callback(err);
        }
        if (row) {
            console.log('User ID retrieved successfully:', row.user_id);
            callback(null, row.user_id);
        } else {
            console.log('No user found with the specified email.');
            callback(new Error('No user found.'));
        }
    });
}


// Direct use of userId instead of fetching it by email
function addMovieToWishlist(userId, title, ratings, runtime, release, genre,
    description, actors, director, poster, callback) {
    const sql = `INSERT INTO user_movies
        (user_id, title, ratings, runtime, release, genre, 
        description, actors, director, poster) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [userId, title, ratings, runtime, release, genre,
        description, actors, director, poster];

    db.run(sql, values, function (err) {
        if (err) {
            console.error('Error adding movie to wishlist:', err.message);
            return callback(err);
        }
        console.log('Movie added to wishlist successfully. Wishlist ID:', this.lastID);
        callback(null, this.lastID); // Success
    });
}


function removeBookFromWishlist(book_id, callback) {
    const sql = 'DELETE FROM user_books WHERE id = ?';
    db.run(sql, [book_id], function (err) {
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
    db.run(sql, [movie_id], function (err) {
        if (err) {
            console.error('Error removing movie from wishlist:', err.message);
            return callback(err);
        }
        console.log('Movie removed from wishlist successfully.');
        callback(null);
    });
}



function getMoviesByUserId(userId, callback) {
    const sql = 'SELECT * FROM user_movies WHERE user_id = ?';
    db.all(sql, [userId], (err, movies) => {
        if (err) {
            console.error('Error retrieving movies for user:', err.message);
            return callback(err);
        }
        callback(null, movies);
    });
}


function getBooksByUserId(user_id, callback) {
    const sql = 'SELECT * FROM user_books WHERE user_id = ?';
    db.all(sql, [user_id], (err, rows) => {
        if (err) {
            console.error('Error retrieving books:', err.message);
            return callback(err);
        }
        console.log('Books retrieved successfully for user:', user_id);
        callback(null, rows);
    });
}


function getUserInfoByEmail(email, callback) {
    const sql = 'SELECT email, fullname FROM user WHERE email = ?';
    db.get(sql, [email], (err, row) => {
        if (err) {
            console.error('Error fetching user information:', err.message);
            return callback(err);
        }
        if (row) {
            console.log('User information retrieved successfully:', row);
            callback(null, row);
        } else {
            console.log('No user found with the specified email.');
            callback(new Error('No user found.'));
        }
    });
}

//Delete user account
function deleteAccount(email, callback) {
    const sql = 'DELETE FROM user WHERE email = ?';
    db.run(sql, [email], function (err) {
        if (err) {
            console.error('Error deleting user account:', err.message);
            return callback(err);
        }
        console.log(`User account with email ${email} deleted successfully.`);
        callback(null);
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
    getMoviesByUserId,
    checkUserExists,
    getUserInfoByEmail,
    deleteAccount,
    getUserIdByEmail
};

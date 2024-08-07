var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const sqlite3 = require('sqlite3');
var dbController = require('./db_controller.js');

var app = express();
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// Define the root route to serve the 'index.html' file
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.get('/:page.html', function (req, res) {
  const page = req.params.page;
  res.sendFile(path.join(__dirname, 'views', `${page}.html`));
});

app.listen(3000, () => {
  console.log(`
  ========================================
        *** Server is now running! ***
  ========================================
      Access it at: http://localhost:3000
  ========================================
  `);
});


// POST /login
app.post('/login', function (req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('Email and password are required');
  }
  dbController.login(email, password, (err, user) => {
    if (err) {
      console.error('Error during login:', err.message);
      return res.status(500).json({ error: 'Error during login' });
    }
    if (user) {
      console.log('Login successful:', user.email);
      dbController.getUserInfoByEmail(email, (err, userInfo) => {
        if (err) {
          console.error('Error fetching user information:', err.message);
          return res.status(500).json({ error: 'Error fetching user information' });
        }
        if (userInfo) {
          return res.json({
            message: 'Login successful',
            email: user.email,
            fullname: userInfo.fullname,
          });
        } else {
          console.error('User is authenticated but additional info cannot be retrieved.');
          return res.status(500).json({ error: 'Error retrieving additional user information' });
        }
      });
    } else {
      console.log('Invalid email or password.');
      return res.status(401).json({ error: 'Invalid email or password' });
    }
  });
});


//Post sign up
app.post('/signup', function (req, res, next) {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).send('All fields are required');
  }

  if (!/^[a-zA-Z]+$/.test(firstName)) {
    return res.status(400).send('Please enter a valid first name');
  }

  if (!/^[a-zA-Z]+$/.test(lastName)) {
    return res.status(400).send('Please enter a valid last name');
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).send('Please enter a valid email address');
  }

  if (!/^(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,12}$/.test(password)) {
    return res.status(400).send('Password must be 6-12 characters long and include at least one digit and one special character');
  }

  dbController.createAccount(email, password, `${firstName} ${lastName}`, (err, userId) => {
    if (err) {
      console.error('Error creating account:', err.message);
      return res.status(500).send('Error creating account');
    }
    console.log('Account created successfully. User ID:', userId);
    res.sendStatus(200); // Send success response
  });
});


//Delete account
app.delete('/delete-account', function (req, res) {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send('Email is required');
  }

  dbController.deleteAccount(email, (err, result) => {
    if (err) {
      console.error('Error deleting account:', err.message);
      return res.status(500).json({ error: 'Error deleting account' });
    }
    console.log('Account deleted successfully:', email);
    return res.json({ message: 'Account deleted successfully' });
  });
});

app.delete('/remove-movie/:id', function (req, res) {
  const movieId = req.params.id;

  dbController.removeMovieFromWishlist(movieId, function (err) {
    if (err) {
      console.error('Error removing movie from wishlist:', err.message);
      return res.status(500).json({ error: 'Error removing movie from wishlist' });
    }
    // Movie removed successfully
    return res.status(200).json({ message: 'Movie removed from wishlist successfully' });
  });
});

// Route to remove a book from the wishlist
app.delete('/remove-book/:id', function (req, res) {
  const bookId = req.params.id;


  dbController.removeBookFromWishlist(bookId, function (err) {
    if (err) {
      console.error('Error removing book from wishlist:', err.message);
      return res.status(500).json({ error: 'Error removing book from wishlist' });
    }

    return res.status(200).json({ message: 'Book removed from wishlist successfully' });
  });
});






// Wishlist routes
app.post('/add-movie', (req, res) => {
  const userEmail = req.body.email;
  const { title, ratings, runtime, release, tags, description, actors, director, poster } = req.body;

  dbController.getUserIdByEmail(userEmail, (err, userId) => {
    if (err || userId === undefined) {
      console.error('Error fetching user ID:', err);
      return res.status(500).json({ error: 'Error fetching user ID or user not found' });
    }
    dbController.addMovieToWishlist(userId, title, ratings, runtime, release, tags, description, actors, director, poster, (err, wishlistId) => {
      if (err) {
        console.error('Error adding movie to wishlist:', err);
        return res.status(500).json({ error: 'Error adding movie to wishlist' });
      }
      res.status(200).json({ message: 'Movie added to wishlist successfully', tags });
    });
  });
});


// Route to add a book to the wishlist
app.post('/add-book', (req, res) => {
  const userEmail = req.body.email;
  const { title, ratings, pageCount, release, genre, description, format, author, isbn, publisher, language, cover } = req.body;


  dbController.getUserIdByEmail(userEmail, (err, userId) => {
    if (err || userId === undefined) {
      console.error('Error fetching user ID:', err);
      return res.status(500).json({ error: 'Error fetching user ID or user not found' });
    }

    dbController.addBookToWishlist(userId, title, ratings, pageCount, release, genre, description, format, author, isbn, publisher, language, cover, (err, wishlistId) => {
      if (err) {
        console.error('Error adding book to wishlist:', err);
        return res.status(500).json({ error: 'Error adding book to wishlist' });
      }
      res.status(200).json({ message: 'Book added to wishlist successfully' });
    });
  });
});




app.get('/user-movies', (req, res) => {
  const userEmail = req.query.email;
  if (!userEmail) {
    return res.status(400).json({ error: 'User email is required' });
  }

  dbController.getUserIdByEmail(userEmail, (err, userId) => {
    if (err || userId === undefined) {
      console.error('Error fetching user ID:', err);
      return res.status(500).json({ error: 'Error fetching user ID or user not found' });
    }

    dbController.getMoviesByUserId(userId, (err, movies) => {
      if (err) {
        console.error('Error retrieving movies:', err);
        return res.status(500).json({ error: 'Error retrieving movies' });
      }
      res.status(200).json(movies);
    });
  });
});



app.get('/user-books', (req, res) => {
  const userEmail = req.query.email;
  if (!userEmail) {
    return res.status(400).json({ error: 'User email is required' });
  }

  dbController.getUserIdByEmail(userEmail, (err, userId) => {
    if (err || userId === undefined) {
      console.error('Error fetching user ID:', err);
      return res.status(500).json({ error: 'Error fetching user ID or user not found' });
    }

    dbController.getBooksByUserId(userId, (err, books) => {
      if (err) {
        console.error('Error retrieving books:', err);
        return res.status(500).json({ error: 'Error retrieving books' });
      }
      res.status(200).json(books);
    });
  });
});







// Routes
app.use(express.static('views'));

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Send the error page
  res.status(err.status || 500);
  res.sendFile(path.join(__dirname, 'views/error.html'));
});

module.exports = app;

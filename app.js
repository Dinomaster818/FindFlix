var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var imdbRouter = require('./routes/wishlist');

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

// Serve movie.html from the 'views' directory
app.get('/movie.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'views/movie.html'));
});

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(express.static('views'));
app.use('/imdb', imdbRouter);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Send the error page
  res.status(err.status || 500);
  res.sendFile(path.join(__dirname, 'views/error.html'));
});

module.exports = app;

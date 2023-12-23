// app.js (or your main server file)
const express = require('express');
const path = require('path');
const searchRouter = require('./routes/search'); // Adjust the path accordingly

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


// Include the searchRouter for the /search path
app.use('/', searchRouter);

// Serve HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.error('Error',err);

  // send a plain text error response
  res.status(err.status || 500).send('Internal Server Error');
});


module.exports = app;

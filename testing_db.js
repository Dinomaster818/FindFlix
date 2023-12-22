const sqlite3 = require('sqlite3').verbose();
const path = require('path');


const dbPath = path.join(__dirname, 'usersdb.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the database');
    
    db.all('SELECT * FROM users', (selectErr, rows) => {
      if (selectErr) {
        console.error('Error selecting from users table:', selectErr.message);
      } else {
        console.log('Selected rows from users table:');
        console.log(rows);
      }

      db.close((closeErr) => {
        if (closeErr) {
          console.error('Error closing database:', closeErr.message);
        } else {
          console.log('Closed the database connection');
        }
      });
    });
  }
});
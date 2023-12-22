const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'usersdb.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the database');

    // Fetch all users
    getAllUsers((selectErr, rows) => {
      if (selectErr) {
        console.error('Error selecting from users table:', selectErr.message);
      } else {
        console.log('Selected rows from users table:');
        console.log(rows);
      }

      // Insert a new user
      const newUser = {
        full_name: 'New User',
        email: 'newuser@example.com',
        password: 'newpassword'
      };

      insertUser(newUser, (insertErr, result) => {
        if (insertErr) {
          console.error('Error inserting user:', insertErr.message);
        } else {
          console.log('New user inserted with ID:', result.lastInsertId);
        }

        // Update a user
        const updatedUser = {
          user_id: 1,
          full_name: 'Updated User',
          email: 'updateduser@example.com',
          password: 'updatedpassword'
        };

        updateUser(updatedUser, (updateErr) => {
          if (updateErr) {
            console.error('Error updating user:', updateErr.message);
          } else {
            console.log('User updated successfully');
          }

          // Fetch all users again after insert and update
          getAllUsers((selectErr, updatedRows) => {
            if (selectErr) {
              console.error('Error selecting from users table:', selectErr.message);
            } else {
              console.log('Updated rows from users table:');
              console.log(updatedRows);
            }

            // Close the database connection
            db.close((closeErr) => {
              if (closeErr) {
                console.error('Error closing database:', closeErr.message);
              } else {
                console.log('Closed the database connection');
              }
            });
          });
        });
      });
    });
  }
});

function getAllUsers(callback) {
  db.all('SELECT * FROM users', callback);
}

function insertUser(newUser, callback) {
  db.run('INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)',
    [newUser.full_name, newUser.email, newUser.password],
    function (err) {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, { lastInsertId: this.lastID });
    });
}

function updateUser(updatedUser, callback) {
  db.run('UPDATE users SET full_name = ?, email = ?, password = ? WHERE user_id = ?',
    [updatedUser.full_name, updatedUser.email, updatedUser.password, updatedUser.user_id],
    function (err) {
      if (err) {
        callback(err);
        return;
      }
      callback(null);
    });
}

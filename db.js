const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Set the path for the SQLite database file
const dbPath = path.join(__dirname, 'usersdb.db');

// Create a new SQLite database instance
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the database');

    // Fetch all users from the database
    getAllUsers((selectErr, rows) => {
      if (selectErr) {
        console.error('Error selecting from users table:', selectErr.message);
      } else {
        console.log('Selected rows from users table:');
        console.log(rows);
      }

<<<<<<< Updated upstream
      // Insert a new user into the database
=======
      // Insert a new user 
>>>>>>> Stashed changes
      const newUser = {
        full_name: 'New User',
        email: 'newuser@example.com',
        password: 'newpassword'
      };

      addUser(newUser, (insertErr, result) => {
        if (insertErr) {
          console.error('Error adding user:', insertErr.message);
        } else {
          console.log('New user added with ID:', result.lastInsertId);
        }

<<<<<<< Updated upstream
        // Update a user in the database
=======
        // Update a user in the database by email address
>>>>>>> Stashed changes
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

          // Fetch all users again after adding and updating
          getAllUsers((selectErr, updatedRows) => {
            if (selectErr) {
              console.error('Error selecting from users table:', selectErr.message);
            } else {
              console.log('Updated rows from users table:');
              console.log(updatedRows);
            }

            // Check if a user exists in the database
            const userEmailToCheck = 'user@example.com';
            const userPasswordToCheck = 'userpassword';

            userExists(userEmailToCheck, userPasswordToCheck, (existsErr, exists) => {
              if (existsErr) {
                console.error('Error checking if user exists:', existsErr.message);
                return;
              }

              if (exists) {
                console.log('User exists!');
                // You can proceed with the login logic here
              } else {
                console.log('User does not exist or password is incorrect. Display an error or handle accordingly.');
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
    });
  }
});

<<<<<<< Updated upstream
// Function to fetch all users from the database
=======


>>>>>>> Stashed changes
function getAllUsers(callback) {
  db.all('SELECT * FROM users', callback);
}

// Function to add a new user to the database
function addUser(newUser, callback) {
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

// Function to update a user in the database
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

// Function to add an item to the user's wishlist
function addWishlistItem(userId, itemId, itemType, callback) {
  db.run('INSERT INTO wishlist (user_id, item_id, item_type) VALUES (?, ?, ?)',
      [userId, itemId, itemType],
      function (err) {
          if (err) {
              callback(err);
              return;
          }
          callback(null, { lastInsertId: this.lastID });
      });
}

// Function to fetch all wishlist items for a user from the database
function getAllWishlistItemsForUser(userId, callback) {
  db.all('SELECT item_id FROM wishlist WHERE user_id = ?', [userId], callback);
}

// Function to fetch a user by their email from the database
function getUserByEmail(email, callback) {
  db.get('SELECT * FROM users WHERE email = ?', [email], callback);
}

// Function to check if a user exists in the database based on email and password
function userExists(email, password, callback) {
  getUserByEmail(email, (err, user) => {
    if (err) {
      callback(err, null);
      return;
    }

    // If a user with the given email is found and the password matches, return true; otherwise, return false
    if (user && user.password === password) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  });
}

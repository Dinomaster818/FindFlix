const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('usersdb.db');

module.exports = {
  login: function(email, password, callback) {
    const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
    db.get(sql, [email, password], (err, row) => {
      if (err) {
        callback(err);
      } else {
        if (row) {
          
          callback(null, row);
        } else {
          // User not found or password incorrect
          callback(new Error("Invalid email or password"));
        }
      }
    });
  },

  
};

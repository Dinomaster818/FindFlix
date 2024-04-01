const readline = require('readline');
const dbController = require('db_cotroller.js');


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function login() {
  rl.question('Enter your username: ', (username) => {
    rl.question('Enter your password: ', (password) => {
      dbController.login(username, password, (err, user) => {
        if (err) {
          console.error('Login failed:', err.message);
        } else {
          console.log('Login successful. Welcome back,', user.full_name);
          // Here you can implement further logic after successful login
        }
        rl.close();
      });
    });
  });
}

function createAccount() {
  rl.question('Enter your username: ', (username) => {
    rl.question('Enter your password: ', (password) => {
      rl.question('Enter your full name: ', (fullName) => {
        dbController.createAccount(username, password, fullName, (err, userId) => {
          if (err) {
            console.error('Account creation failed:', err.message);
          } else {
            console.log('Account created successfully. Your user ID is:', userId);
            // Here you can implement further logic after successful account creation
          }
          rl.close();
        });
      });
    });
  });
}

function showMenu() {
  console.log('1. Login');
  console.log('2. Create Account');
  console.log('3. Exit');
}

function main() {
  showMenu();
  rl.question('Enter your choice: ', (choice) => {
    switch (choice) {
      case '1':
        login();
        break;
      case '2':
        createAccount();
        break;
      case '3':
        console.log('Exiting...');
        rl.close();
        break;
      default:
        console.log('Invalid choice. Please try again.');
        main();
    }
  });
}

main();

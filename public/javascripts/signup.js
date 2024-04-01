import dbController from './db_controller.js'; // Adjust the path as needed

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('signupForm');
  const firstNameInput = document.getElementById('exampleInputFirstName');
  const lastNameInput = document.getElementById('exampleInputLastName');
  const emailInput = document.getElementById('exampleInputEmail1');
  const passwordInput = document.getElementById('exampleInputPassword1');

  form.addEventListener('submit', async function(event) {
    event.preventDefault();
    console.log("Form submitted.");
    if (!validateFirstName(firstNameInput.value)) {
      alert('Please enter a valid first name.');
      return;
    }
    console.log("First name validated.");
    if (!validateLastName(lastNameInput.value)) {
      alert('Please enter a valid last name.');
      return;
    }
    console.log("Last name validated.");
    if (!validateEmail(emailInput.value)) {
      alert('Please enter a valid email address.');
      return;
    }
    console.log("Email validated.");
    if (!validatePassword(passwordInput.value)) {
      alert('Password must be 8-20 characters long and include at least one digit and one special character.');
      return;
    }
    console.log("Password validated.");
    
    // Create user account
    try {
      const response = await fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: firstNameInput.value,
          lastName: lastNameInput.value,
          email: emailInput.value,
          password: passwordInput.value
        })
      });
      
      if (response.ok) {
        alert('Sign up successful!');
      } else {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error('Error creating account:', error.message);
      alert('Failed to create account. Please try again later.');
    }
  });

  function validateFirstName(firstName) {
    console.log("Validating first name: ", firstName);
    return /^[a-zA-Z]+$/.test(firstName);
  }

  function validateLastName(lastName) {
    console.log("Validating last name: ", lastName);
    return /^[a-zA-Z]+$/.test(lastName);
  }

  function validateEmail(email) {
    console.log("Validating email: ", email);
    return /\S+@\S+\.\S+/.test(email);
  }

  function validatePassword(password) {
    console.log("Validating password: ", password);
    // Password must be 8-20 characters long, contain at least one digit, and one special character
    return /^(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,20}$/.test(password);
  }
});

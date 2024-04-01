import dbController from '.../db_controller.js';

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signupForm');
    const firstNameInput = document.getElementById('exampleInputFirstName');
    const lastNameInput = document.getElementById('exampleInputLastName');
    const emailInput = document.getElementById('exampleInputEmail1');
    const passwordInput = document.getElementById('exampleInputPassword1');
  
    form.addEventListener('submit', function(event) {
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
      alert('Sign up successful!');
      // Here you can submit the form if all inputs are valid
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

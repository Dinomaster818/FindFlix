document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('signupForm');
  const firstNameInput = document.getElementById('exampleInputFirstName');
  const lastNameInput = document.getElementById('exampleInputLastName');
  const emailInput = document.getElementById('exampleInputEmail1');
  const passwordInput = document.getElementById('exampleInputPassword1');

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() === false) {
      form.classList.add('was-validated');
      return;
    }

    if (!validateFirstName(firstNameInput.value)) {
      firstNameInput.classList.add('is-invalid');
      return;
    }
    firstNameInput.classList.remove('is-invalid');

    if (!validateLastName(lastNameInput.value)) {
      lastNameInput.classList.add('is-invalid');
      return;
    }
    lastNameInput.classList.remove('is-invalid');

    if (!validateEmail(emailInput.value)) {
      emailInput.classList.add('is-invalid');
      return;
    }
    emailInput.classList.remove('is-invalid');

    if (!validatePassword(passwordInput.value)) {
      passwordInput.classList.add('is-invalid');
      return;
    }
    passwordInput.classList.remove('is-invalid');

    // Proceed with form submission if all inputs are valid
    fetch('/signup', {
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
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(data => {
      if (data.includes('already exists')) {
        alert(data); 
      } else {
        alert('Sign up successful!');
        form.reset(); 
      }
    })
    .catch(error => {
      console.error('There was an error with the fetch operation:', error);
      alert('Sign up failed. Please try again later.');
      form.reset()
    });
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
    return /^(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,20}$/.test(password);
  }
});

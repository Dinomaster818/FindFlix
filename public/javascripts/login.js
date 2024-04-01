document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('loginForm');
  const emailInput = document.getElementById('exampleInputEmail1');
  const passwordInput = document.getElementById('exampleInputPassword1');

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() === false) {
      form.classList.add('was-validated');
      return;
    }

    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
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
      // Check if data contains error message
      if (data.includes('Invalid')) {
        alert(data); // Display error message
      } else {
        alert('Login successful!');
        
      }
    })
    .catch(error => {
      console.error('There was an error with the fetch operation:', error);
      alert('Login failed. Please try again later.');
      form.reset();
    });
  });
});

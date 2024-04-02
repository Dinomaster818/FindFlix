document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('loginForm');
  const emailInput = document.getElementById('exampleInputEmail1');
  const passwordInput = document.getElementById('exampleInputPassword1');

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    event.stopPropagation();

    if (!form.checkValidity()) {
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
          return response.json().then(errorData => {
            throw new Error(errorData.error || 'Unknown error');
          });
        }
        return response.json();
      })
      .then(data => {
        console.log(data)
        if (data.error) {
          throw new Error(data.error);

        } else {
 
          const redirectUrl = `wishlist.html?email=${encodeURIComponent(data.email)}&fullname=${encodeURIComponent(data.fullname)}`;
          window.location.href = redirectUrl;
        }
      })
      .catch(error => {
        console.error('There was an error with the fetch operation:', error);
        Swal.fire({
          title: "Error",
          text: "Login failed. Please try again later.",
          icon: "error"
        });
        form.reset();
      });
  });
});




document.addEventListener('DOMContentLoaded', function () {
  // Directly target the <a> tag inside the #logoutButton list item for the event listener
  const logoutLink = document.querySelector('#logoutButton a');

  if (logoutLink) {
    logoutLink.addEventListener('click', function (event) {
      event.preventDefault(); // Stop the link from performing its default action

      handleLogout();
    });
  } else {
    console.error('Logout link not found');
  }
});


function handleLogout() {
  // Perform the logout operations
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('authToken'); // Remove the auth token if you're using one

  // Show a SweetAlert2 confirmation message
  Swal.fire({
    title: 'Logged Out',
    text: 'You have been logged out successfully.',
    icon: 'info',
    confirmButtonText: 'OK'
  }).then(() => {
    // Redirect the user to the login page after they acknowledge the alert
    window.location.href = 'login.html'; // Adjust the URL as needed for your login page
  });
}

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
          const movieData = JSON.parse(localStorage.getItem('movieData') || '{}');
          const bookData = JSON.parse(localStorage.getItem('bookData') || '{}');
          
          const redirectUrl = `wishlist.html?email=${encodeURIComponent(data.email)}&fullname=${encodeURIComponent(data.fullname)}&movie-title=${encodeURIComponent(movieData.title)}&ratings=${encodeURIComponent(movieData.ratings)}&runtime=${encodeURIComponent(movieData.runtime)}&release=${encodeURIComponent(movieData.release)}&tags=${encodeURIComponent(movieData.tags)}&description=${encodeURIComponent(movieData.description)}&actors=${encodeURIComponent(movieData.actors)}&director=${encodeURIComponent(movieData.director)}&poster=${encodeURIComponent(movieData.poster)}&book-title=${encodeURIComponent(bookData.title)}&book-ratings=${encodeURIComponent(bookData.ratings)}&book-pages=${encodeURIComponent(bookData.pageCount)}&book-release=${encodeURIComponent(bookData.release)}&book-genre=${encodeURIComponent(bookData.genre)}&book-description=${encodeURIComponent(bookData.description)}&book-format=${encodeURIComponent(bookData.format)}&book-author=${encodeURIComponent(bookData.author)}&book-isbn=${encodeURIComponent(bookData.isbn)}&book-publisher=${encodeURIComponent(bookData.publisher)}&book-language=${encodeURIComponent(bookData.language)}&book-cover=${encodeURIComponent(bookData.cover)}`;

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

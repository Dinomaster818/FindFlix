//EventListener for deleting the account
document.addEventListener('DOMContentLoaded', function () {
    const deleteAccountLink = document.getElementById('delete-account');

    if (deleteAccountLink) {
        deleteAccountLink.addEventListener('click', function (event) {
            event.preventDefault();

            Swal.fire({
                title: 'Are you sure?',
                text: 'Once deleted, you will not be able to recover your account!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel'
            }).then((result) => {
                if (result.isConfirmed) {
                    // If the user confirms, proceed with account deletion
                    deleteAccount();
                }
            });
        });
    } else {
        console.error('Delete account link not found');
    }
});

//Delete account functionality
function deleteAccount() {
    // Send a request
    fetch('/delete-account', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: localStorage.getItem('userEmail')
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete account');
            }
            return response.json();
        })
        .then(data => {
            Swal.fire({
                title: 'Account Deleted',
                text: data.message,
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                window.location.href = 'login.html';
            });
        })
        .catch(error => {
            Swal.fire({
                title: 'Error',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        });
}




//Add movie to wishlist
document.addEventListener('DOMContentLoaded', function () {
    const addMovieToWishlistBtn = document.getElementById('addMovieToWishlist');

    addMovieToWishlistBtn.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent the default action of the link

        if (localStorage.getItem('isLoggedIn') !== 'true') {
            // If not logged in, redirect to the login page
            window.location.href = 'login.html';
        } else {
            // If logged in, gather movie details from the page
            const userEmail = localStorage.getItem('userEmail'); // Retrieve the user's email from localStorage
            const movieData = {
                email: userEmail, // Include the email in the request body
                title: document.getElementById('movie-title').textContent,
                ratings: document.getElementById('ratings').textContent,
                runtime: document.getElementById('runtime').textContent,
                release: document.getElementById('release').textContent,
                tags: document.getElementById('tags').textContent,
                description: document.getElementById('description').textContent,
                actors: document.getElementById('actors').textContent,
                director: document.getElementById('director').textContent,
                poster: document.getElementById('poster').src // Assuming poster is an image src
            };

            // Send a request to the server to add the movie to the wishlist
            fetch('/add-movie', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(movieData)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error adding movie to wishlist');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Movie added to wishlist successfully', data);
                    // Optionally, update the UI here to reflect the addition
                })
                .catch(error => {
                    console.error('Error adding movie to wishlist:', error);
                    // Optionally, inform the user that the addition failed
                });
        }
    });
});



//Display the wishlist
document.addEventListener('DOMContentLoaded', function () {
    // Extract email and fullname from the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const userEmail = urlParams.get('email');
    const userFullname = urlParams.get('fullname');

    // Check if email and fullname are present
    if (userEmail && userFullname) {
        // Proceed with fetching the wishlist
        fetch(`/user-movies?email=${encodeURIComponent(userEmail)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(movies => {
                renderMovies(movies);
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    } else {
        console.error('Email or fullname not found in URL parameters');
    }
});


function renderMovies(movies) {
    const wishlistContainer = document.getElementById('wishlist-container');
    wishlistContainer.innerHTML = '';
    if (movies.length === 0) {
        wishlistContainer.innerHTML = '<p>No movies found in your wishlist.</p>';
    } else {
        movies.forEach(movie => {
            const movieElement = document.createElement('div');
            movieElement.classList.add('movie-item');
            movieElement.innerHTML = `
            <div href="${null}" class="card">
                <img src="${movie.poster}" alt="Poster for ${movie.title}" class="movie-poster">
                <div class="card-info">
                    <h3>${movie.title}</h3>
                    <p>Ratings: ${movie.ratings}</p>
                    <p>Runtime: ${movie.runtime}</p>
                <div>
            </div>
            `;
            wishlistContainer.appendChild(movieElement);
        });
    }
}

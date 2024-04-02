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





document.addEventListener('DOMContentLoaded', function () {

    if (!localStorage.getItem('movieData')) {
        console.error('localStorage is empty. Movie data cannot be added to the wishlist.');
        return;
    }

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    // Check if any of the required parameters are missing
    if (!urlParams.has('email') || !urlParams.has('fullname') || !urlParams.has('movie-title')) {
        console.error('Missing required parameters. Movie data cannot be added to the wishlist.');
        return;
    }

    

    // Retrieve movie data from the URL parameters
    const movieData = {
        email: urlParams.get('email'), // Retrieve email from URL
        fullname: urlParams.get('fullname'), // Retrieve fullname from URL
        title: urlParams.get('movie-title') || 'N/A',
        ratings: urlParams.get('ratings') || 'N/A',
        runtime: urlParams.get('runtime') || 'N/A',
        release: urlParams.get('release') || 'N/A',
        tags: urlParams.get('tags') || 'N/A',
        description: urlParams.get('description') || 'N/A',
        actors: urlParams.get('actors') || 'N/A',
        director: urlParams.get('director') || 'N/A',
        poster: urlParams.get('poster') || 'N/A'
    };

    // Send a request to add the movie to the wishlist
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

    localStorage.removeItem('movieData');
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
            const moviehtml = './movie_user.html';
            const movieLink = `${moviehtml}?movie-title=${encodeURIComponent(movie.title)}&ratings=${encodeURIComponent(movie.ratings)}&runtime=${encodeURIComponent(movie.runtime)}&release=${encodeURIComponent(movie.released)}&tags=${encodeURIComponent(movie.tags)}&description=${encodeURIComponent(movie.description)}&actors=Actors: ${encodeURIComponent(movie.actors)}&director=Director(s): ${encodeURIComponent(movie.director)}&poster=${encodeURIComponent(movie.poster)}`;
            movieElement.innerHTML = `
            <a href="${movieLink}" class="card-link">
                <div class="card">
                        <img src="${movie.poster}" alt="Poster for ${movie.title}" class="movie-poster">
                        <div class="card-info">
                            <h3>${movie.title}</h3>
                            <p>Ratings: ${movie.ratings}</p>
                            <p>Runtime: ${movie.runtime}</p>  
                        <div>
                </div>
            </a>
            `;
            wishlistContainer.appendChild(movieElement);
        });
    }
}

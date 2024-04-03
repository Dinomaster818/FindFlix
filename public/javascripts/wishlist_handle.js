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
    const movieData = localStorage.getItem('movieData');
    const bookData = localStorage.getItem('bookData');

    if (!movieData && !bookData) {
        console.error('localStorage is empty. Movie or book data cannot be added to the wishlist.');
        return;
    }

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    // Check if any of the required parameters are missing for both movie and book data
    if ((!urlParams.has('email') || !urlParams.has('fullname')) && (!urlParams.has('movie-title') || !urlParams.has('book-title'))) {
        console.error('Missing required parameters. Movie or book data cannot be added to the wishlist.');
        return;
    }

    // Determine if movie data or book data is present
    if (movieData) {
        const postData = {
            email: urlParams.get('email'), 
            fullname: urlParams.get('fullname'), 
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
            body: JSON.stringify(postData)
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
    } else if (bookData) {
        const postData = {
            email: urlParams.get('email'), 
            fullname: urlParams.get('fullname'), 
            title: urlParams.get('book-title') || 'N/A',
            ratings: urlParams.get('book-ratings') || 'N/A',
            pageCount: urlParams.get('book-pages') || 'N/A',
            release: urlParams.get('book-release') || 'N/A',
            genre: urlParams.get('book-genre') || 'N/A',
            description: urlParams.get('book-description') || 'N/A',
            format: urlParams.get('book-format') || 'N/A',
            author: urlParams.get('book-author') || 'N/A',
            isbn: urlParams.get('book-isbn') || 'N/A',
            publisher: urlParams.get('book-publisher') || 'N/A',
            language: urlParams.get('book-language') || 'N/A',
            cover: urlParams.get('book-cover') || null
        };

        // Send a request to add the book to the wishlist
        fetch('/add-book', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error adding book to wishlist');
            }
            return response.json();
        })
        .then(data => {
            console.log('Book added to wishlist successfully', data);
            // Optionally, update the UI here to reflect the addition
        })
        .catch(error => {
            console.error('Error adding book to wishlist:', error);
            // Optionally, inform the user that the addition failed
        });

        localStorage.removeItem('bookData');
    }
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

document.addEventListener('DOMContentLoaded', function () {
    // Extract email and fullname from the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const userEmail = urlParams.get('email');
    const userFullname = urlParams.get('fullname');

    // Check if email and fullname are present
    if (userEmail && userFullname) {
        // Proceed with fetching the wishlist
        fetch(`/user-books?email=${encodeURIComponent(userEmail)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(books => {
                renderBooks(books);
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
            const movieLink = `${moviehtml}?movieid=${encodeURIComponent(movie.id)}&movie-title=${encodeURIComponent(movie.title)}&ratings=${encodeURIComponent(movie.ratings)}&runtime=${encodeURIComponent(movie.runtime)}&release=${encodeURIComponent(movie.release)}&tags=${encodeURIComponent(movie.genre)}&description=${encodeURIComponent(movie.description)}&actors=Actors: ${encodeURIComponent(movie.actors)}&director=Director(s): ${encodeURIComponent(movie.director)}&poster=${encodeURIComponent(movie.poster)}`;
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

function renderBooks(books) {
    const booksContainer = document.getElementById('books-container');
    booksContainer.innerHTML = '';
    if (books.length === 0) {
        booksContainer.innerHTML = '<p>No books found in your wishlist.</p>';
    } else {
        books.forEach(book => {
            const bookElement = document.createElement('div');
            bookElement.classList.add('book-item');
            const bookHtml = './book_user.html';
            const bookLink = `${bookHtml}?bookid=${encodeURIComponent(book.id)}&book-title=${encodeURIComponent(book.title)}&book-ratings=${encodeURIComponent(book.ratings)}&book-pages=${encodeURIComponent(book.pageCount)}&book-release=${encodeURIComponent(book.publishedDate)}&book-genre=${encodeURIComponent(book.genre)}&book-description=${encodeURIComponent(book.description)}&book-format=${encodeURIComponent(book.format)}&book-author=${encodeURIComponent(book.author)}&book-isbn=${encodeURIComponent(book.isbn)}&book-publisher=${encodeURIComponent(book.publisher)}&book-language=${encodeURIComponent(book.language)}&book-cover=${encodeURIComponent(book.cover)}`;
            bookElement.innerHTML = `
            <a href="${bookLink}" class="card-link">
                <div class="card">
                    <img src="${book.cover}" alt="Cover for ${book.title}" class="book-cover">
                    <div class="card-info">
                        <h3>${book.title}</h3>
                        <p>Ratings: ${book.ratings}</p>
                        <p>Pages: ${book.pageCount}</p>
                    </div>
                </div>
            </a>
            `;
            booksContainer.appendChild(bookElement);
        });
    }
}



"use strict";
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const primaryResults = document.getElementById('primaryResults');
const similarResults = document.getElementById('similarResults');
const searchBar = document.querySelector('.search-bar'); 
let currentCategory = '';

const API_KEY_OMDB = 'cacfeca0'; // OMDb API key
const API_KEY_GOOGLE_BOOKS = 'AIzaSyBDOY1VMSEjrmxbaz0dsKESUIm7xhLMBJE'; // Google Books API key

document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        currentCategory = this.getAttribute('data-category');
        searchBar.style.display = 'block';
        searchInput.placeholder = `Search for ${currentCategory}`;
        // Clear previous results
        primaryResults.innerHTML = '';
        similarResults.innerHTML = '';
    });
});

searchBtn.addEventListener('click', function () {
    const query = searchInput.value.trim();
    if (!query) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: 'Please enter a search term!',
        });
        return;
    }
    // Depending on the selected category, search for movies or books
    if (currentCategory === 'movies') {
        searchMovies(query);
    } else if (currentCategory === 'books') {
        searchBooks(query);
    }
});



// Function to handle movie search
async function searchMovies(query, isRecommended = false) {
    try {
        const res = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY_OMDB}`);
        const data = await res.json();

        if (data.Search) {
            displayResults(data.Search, 'movie', isRecommended ? 'similarResults' : 'primaryResults');
            if (!isRecommended && currentCategory === 'movies') {
                searchBooks(query, true); // Trigger recommended books search
            }
        } else {
            displayMessage('No movies found.', isRecommended ? 'similarResults' : 'primaryResults');
        }
    } catch (error) {
        console.error("Error fetching movies:", error);
        displayMessage('Error fetching movies. Please try again.', isRecommended ? 'similarResults' : 'primaryResults');
    }
}


// Function to handle book search
async function searchBooks(query, isRecommended = false) {
    try {
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${API_KEY_GOOGLE_BOOKS}`);
        const data = await res.json();

        if (data.items) {
            displayResults(data.items, 'book', isRecommended ? 'similarResults' : 'primaryResults');
            if (!isRecommended && currentCategory === 'books') {
                searchMovies(query, true); // Trigger recommended movies search
            }
        } else {
            displayMessage('No books found.', isRecommended ? 'similarResults' : 'primaryResults');
        }
    } catch (error) {
        console.error("Error fetching books:", error);
        displayMessage('Error fetching books. Please try again.', isRecommended ? 'similarResults' : 'primaryResults');
    }
}

// Display the results
async function displayResults(results, type, targetId) {
    const target = document.getElementById(targetId);
    let headingText = targetId === 'primaryResults' ? `${currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)}` : `Recommended ${currentCategory === 'movies' ? 'Books' : 'Movies'}`;

    
    target.innerHTML = `<h2 class="results-heading">${headingText}</h2>`;

    const cardsContainer = document.createElement('div');
    cardsContainer.className = 'cards-container';

    let link;
    if (type === 'movie') {
        link = 'movie.html'; // Link for movies
    } else if (type === 'book') {
        link = 'book.html'; // Link for books
    }
    const promises = results.map(item => createCard(item, type, link));
    const cardsHtml = await Promise.all(promises);
    cardsHtml.forEach(html => {
        cardsContainer.innerHTML += html;
    });

    target.appendChild(cardsContainer);
}

async function fetchMovieDetailsById(imdbId) {
    const omdbUrl = `http://www.omdbapi.com/?i=${encodeURIComponent(imdbId)}&apikey=${API_KEY_OMDB}`;

    try {
        const response = await fetch(omdbUrl);
        const movieData = await response.json();

        if (movieData.Response === 'True') {
            return movieData; // Return the movie data
        } else {
            console.error("Movie not found.");
            return null;
        }
    } catch (error) {
        console.error("Error fetching data from OMDB:", error);
        return null;
    }
}

async function fetchBookDetailsById(volumeId) {
    const googleBooksUrl = `https://www.googleapis.com/books/v1/volumes/${encodeURIComponent(volumeId)}`;

    try {
        const response = await fetch(googleBooksUrl);
        const bookData = await response.json();

        if (bookData.error) {
            console.error("Book not found.");
            return null;
        } else {
            return bookData; // Return the book data
        }
    } catch (error) {
        console.error("Error fetching data from Google Books API:", error);
        return null;
    }
}




// Create HTML card for each result
async function createCard(item, type, link) {
    if (type === 'movie') {
        const movieID = item.imdbID;
        const movieDetails = await fetchMovieDetailsById(movieID);

        if (movieDetails) {
            const { Title = 'N/A', Ratings = [], Runtime = 'N/A', Released = 'N/A', Genre = 'N/A', Plot = 'N/A', Actors = 'N/A', Director = 'N/A' } = movieDetails;
            const posterUrl = (movieDetails.Poster && movieDetails.Poster.includes("N%2FA")) ? null : movieDetails.Poster || 'images/placeholder.svg';


            const imdbRating = Ratings.find(rating => rating.Source === "Internet Movie Database")?.Value || 'N/A';
            const movieLink = `${link}?movie-title=${encodeURIComponent(Title)}&ratings=${encodeURIComponent(imdbRating)}&runtime=${encodeURIComponent(Runtime)}&release=${encodeURIComponent(Released)}&tags=${encodeURIComponent(Genre)}&description=${encodeURIComponent(Plot)}&actors=Actors: ${encodeURIComponent(Actors)}&director=Director(s): ${encodeURIComponent(Director)}&poster=${encodeURIComponent(posterUrl)}`;

            return `
                <a href="${movieLink}" class="card-link">
                    <div class="card">
                        <img src="${posterUrl}" alt="Movie Poster" class="card-poster" />
                        <div class="card-info">
                            <h2 class="card-title">${Title}</h2>
                            <p class="card-rating">Rating: ${imdbRating}</p>
                            <p class="card-plot">${Released}</p>
                        </div>
                    </div>
                </a>
            `;
        } else {
            
            return '';
        }

        } else if (type === 'book') {
            const bookInfo = item.volumeInfo;
            const bookDetails = await fetchBookDetailsById(bookInfo.id);
            
            const bookTitle = bookInfo.title || 'N/A';
            const averageRating = bookInfo.averageRating + '/5' || 'N/A';
            const pageCount = bookInfo.pageCount || 'N/A';
            const releaseDate = bookInfo.publishedDate || 'N/A';
            const genre = bookInfo.categories ? bookInfo.categories.join(', ') : 'N/A';
            const description = bookInfo.description || 'N/A';
            const format = bookInfo.printType || 'N/A';
            const authors = bookInfo.authors ? bookInfo.authors.join(', ') : 'N/A';
            const isbn = bookInfo.industryIdentifiers ? bookInfo.industryIdentifiers[0].identifier  : 'N/A';
            const publisher = bookInfo.publisher || 'N/A';
            const language = bookInfo.language || 'N/A';
            const cover = bookInfo.imageLinks?.thumbnail || 'N/A';
            const buyLink = bookInfo.buyLink || 'N/A';
            //const bookDescription = bookInfo.description ? bookInfo.description.split(' ').slice(0, 10).join(' ') + '...' : 'No description available.';
            const bookLink = `${link}?book-title=${bookTitle}&ratings=${averageRating}&pages=${pageCount} pages&release=${releaseDate}&genre=${genre}&description=${description}&format=Format: ${format}&author=Author(s): ${authors}&isbn=ISBN: ${isbn}&publisher=Publisher: ${publisher}&language=Language(s): ${language}&cover=${encodeURIComponent(cover)}&buylink=${buyLink}`;
            return `
                <a href="${bookLink}" class="card-link">
                    <div class="card">
                        <img src="${bookInfo.imageLinks?.thumbnail || ''}" alt="Book Cover" class="card-poster" />
                        <div class="card-info">
                            <h2 class="card-title">${bookInfo.title}</h2>
                            <p class="card-plot">${bookInfo.publishedDate || 'Unknown date'}</p>
                        </div>
                    </div>
                </a>
            `;
        }
    }


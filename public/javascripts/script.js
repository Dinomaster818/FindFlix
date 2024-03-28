

"use strict";
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const primaryResults = document.getElementById('primaryResults');
const similarResults = document.getElementById('similarResults');
const searchBar = document.querySelector('.search-bar'); // Make sure this selector exists in your HTML
let currentCategory = ''; // Define currentCategory to store the current search category

const API_KEY_OMDB = '61efabcc'; // OMDb API key
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
            // After displaying books, if not a recommended search, then fetch recommended movies
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


function displayResults(results, type, targetId) {
    const target = document.getElementById(targetId);
    let headingText = targetId === 'primaryResults' ? `${currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)}` : `Recommended ${currentCategory === 'movies' ? 'Books' : 'Movies'}`;

    // Create the heading outside of the card container
    target.innerHTML = `<h2 class="results-heading">${headingText}</h2>`;

    // Create a container for the cards
    const cardsContainer = document.createElement('div');
    cardsContainer.className = 'cards-container';

    // Append new results to the cards container
    results.forEach(item => {
        cardsContainer.innerHTML += createCard(item, type);
    });

    // Append the cards container to the target element
    target.appendChild(cardsContainer);
}


// Create HTML card for each result
function createCard(item, type) {
    if (type === 'movie') {
        // Use the Plot property and limit the description to 20 words
        const movieDescription = item.Plot ? item.Plot.split(' ').slice(0, 10).join(' ') + '...' : 'No description available.';
        return `
            <div class="card">
                <img src="${item.Poster}" alt="Movie Poster" class="card-poster" />
                <div class="card-info">
                    <h2 class="card-title">${item.Title}</h2>
                    <p class="card-plot">${item.Year}</p>
                    <p class="card-description">${movieDescription}</p>
                </div>
            </div>
        `;

    } else if (type === 'book') {
        const bookInfo = item.volumeInfo;
        const bookDescription = bookInfo.description ? bookInfo.description.split(' ').slice(0, 10).join(' ') + '...' : 'No description available.';
        return `
            <div class="card">
                <img src="${bookInfo.imageLinks?.thumbnail || ''}" alt="Book Cover" class="card-poster" />
                <div class="card-info">
                    <h2 class="card-title">${bookInfo.title}</h2>
                    <p class="card-plot">Author: ${bookInfo.authors?.join(', ') || 'Unknown author'}</p>
                    <p class="card-description">${bookDescription}</p>
                </div>
            </div>
        `;
    }
}

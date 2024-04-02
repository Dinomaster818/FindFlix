
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

document.getElementById('movie-title').innerText = urlParams.get('movie-title') || 'N/A';
document.getElementById('ratings').innerText = urlParams.get('ratings') || 'N/A';
document.getElementById('runtime').innerText = urlParams.get('runtime') || 'N/A';
document.getElementById('release').innerText = urlParams.get('release') || 'N/A';
document.getElementById('tags').innerText = urlParams.get('tags') || 'N/A';
document.getElementById('description').innerText = urlParams.get('description') || 'N/A';
document.getElementById('actors').innerText = urlParams.get('actors') || 'N/A';
document.getElementById('director').innerText = urlParams.get('director') || 'N/A';

const posterSrc = urlParams.get('poster');
if (posterSrc) {
    document.getElementById('poster').src = posterSrc;
}

document.addEventListener('DOMContentLoaded', function () {
    const addMovieToWishlistBtn = document.getElementById('addMovieToWishlist');

    addMovieToWishlistBtn.addEventListener('click', function (event) {
        event.preventDefault(); 


        const movieData = {
            title: document.getElementById('movie-title').innerText || 'N/A',
            ratings: document.getElementById('ratings').innerText || 'N/A',
            runtime: document.getElementById('runtime').innerText || 'N/A',
            release: document.getElementById('release').innerText || 'N/A',
            tags: document.getElementById('tags').innerText || 'N/A',
            description: document.getElementById('description').innerText || 'N/A',
            actors: document.getElementById('actors').innerText || 'N/A',
            director: document.getElementById('director').innerText || 'N/A',
            poster: document.getElementById('poster').src || 'N/A'
        };
        
        // Store movie data in localStorage
        localStorage.setItem('movieData', JSON.stringify(movieData));

        // Redirect the user to login.html
        window.location.href = 'login.html';
    });
});




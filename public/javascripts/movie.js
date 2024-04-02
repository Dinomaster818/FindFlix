
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
            title: document.getElementById('movie-title').textContent || 'N/A',
            ratings: document.getElementById('ratings').textContent || 'N/A',
            runtime: document.getElementById('runtime').textContent || 'N/A',
            release: document.getElementById('release').textContent || 'N/A',
            tags: document.getElementById('tags').textContent || 'N/A',
            description: document.getElementById('description').textContent || 'N/A',
            actors: document.getElementById('actors').textContent || 'N/A',
            director: document.getElementById('director').textContent || 'N/A',
            poster: document.getElementById('poster').src || 'N/A'
        };
        
        // Store movie data in localStorage
        localStorage.setItem('movieData', JSON.stringify(movieData));

        // Redirect the user to login.html
        window.location.href = 'login.html';
    });
});




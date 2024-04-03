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
    const removeMovieButton = document.getElementById('removeMovieFromWishlist');

    removeMovieButton.addEventListener('click', function (event) {
        event.preventDefault(); 
        event.stopPropagation();
        
        // Extract the movie ID from the URL
        const urlParams = new URLSearchParams(window.location.search);
        const movieId = urlParams.get('movieid');
         

        
        // Send a DELETE request to remove the movie
        fetch(`/remove-movie/${movieId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error removing movie from wishlist');
            }
            return response.json();
        })
        .then(data => {
            console.log('Movie removed from wishlist successfully', data);
            window.location.href = 'login.html';
        })
        .catch(error => {
            console.error('Error removing movie from wishlist:', error.message);

        });
    });
});







// public/javascript/script.js
$(document).ready(function () {
    $('#searchForm').submit(async function (event) {
        event.preventDefault();

        const searchTerm = $('input[name="searchTerm"]').val();

        // Fetch movie data from the server
        const response = await fetch('/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ searchTerm }),
        });

        const result = await response.json();

        // Update the movie list on the page using jQuery
        updateMovieList(result.movies);
    });
});
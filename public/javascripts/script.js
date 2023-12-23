function updateMovieList(movies) {
    const movieListElement = $('#movieList');
    movieListElement.empty();

    if (movies.length === 0) {
        // Display a message when no results are found
        movieListElement.append('<p>No results found</p>');
    } else {
        // Display each movie
        movies.forEach(movie => {
            const movieItem = $('<div class="col-md-4">' +
                '<div class="card mb-4 shadow-sm">' +
                `<img src="${movie.Poster}" class="img-fluid">` +
                '<div class="card-body">' +
                `<h5 class="card-title">${movie.Title}</h5>` +
                `<p class="card-text">Year: ${movie.Year}</p>` +
                `<p class="card-text">Type: ${movie.Type}</p>` +
                `<p class="card-text">IMDb ID: ${movie.imdbID}</p>` +
                '</div></div></div>');

            movieListElement.append(movieItem);
        });
    }
}
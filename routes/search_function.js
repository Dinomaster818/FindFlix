const fetchModule = import('node-fetch');
require('dotenv').config();


async function fetchTMDBData(movieName) {
    const fetch = (await fetchModule).default; 
    const tmdbApiKey = process.env.TMDB_API_KEY;
    const tmdbUrl = `https://api.themoviedb.org/3/search/movie?api_key=${tmdbApiKey}&query=${encodeURIComponent(movieName)}`;

    try {
        const response = await fetch(tmdbUrl);
        const { results } = await response.json();
        return results;
    } catch (error) {
        console.error("Error fetching data from TMDB:", error);
        return null;
    }
}

async function fetchGoogleBooksData(bookTitle) {
    const fetch = (await fetchModule).default; 
    const googleBooksApiKey = process.env.GOOGLE_BOOKS_API_KEY;
    const googleBooksUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(bookTitle)}&key=${googleBooksApiKey}`;

    try {
        const response = await fetch(googleBooksUrl);
        const { items } = await response.json();
        return items;
    } catch (error) {
        console.error("Error fetching data from Google Books:", error);
        return null;
    }
}

module.exports = { fetchTMDBData, fetchGoogleBooksData };

const tmdbApiKey = "29ec8add73f1144a141e713a791aa2df";
const googleBooksApiKey = "AIzaSyBDOY1VMSEjrmxbaz0dsKESUIm7xhLMBJE";

// Function to fetch data from TMDB API
async function fetchTMDBData(movieName) {
    const tmdbUrl = `https://api.themoviedb.org/3/search/movie?api_key=${tmdbApiKey}&query=${encodeURIComponent(movieName)}`;

    try {
        const response = await fetch(tmdbUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data from TMDB:", error);
        return null;
    }
}

// Function to fetch data from Google Books API
async function fetchGoogleBooksData(bookTitle) {
    const googleBooksUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(bookTitle)}&key=${googleBooksApiKey}`;

    try {
        const response = await fetch(googleBooksUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data from Google Books:", error);
        return null;
    }
}

// Example usage
const movieName = "Inception";
const bookTitle = "The Great Gatsby";

fetchTMDBData(movieName)
    .then(tmdbData => {
        console.log("TMDB Data:", tmdbData);
        // Process TMDB data as needed
    })
    .catch(error => {
        console.error("Error fetching TMDB data:", error);
    });

fetchGoogleBooksData(bookTitle)
    .then(googleBooksData => {
        console.log("Google Books Data:", googleBooksData);
        // Process Google Books data as needed
    })
    .catch(error => {
        console.error("Error fetching Google Books data:", error);
    });

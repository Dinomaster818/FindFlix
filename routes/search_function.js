const tmdbApiKey = "29ec8add73f1144a141e713a791aa2df";
const googleBooksApiKey = "AIzaSyBDOY1VMSEjrmxbaz0dsKESUIm7xhLMBJE";

async function fetchTMDBData(movieName) {
    const tmdbUrl = `https://api.themoviedb.org/3/search/movie?api_key=${tmdbApiKey}&query=${encodeURIComponent(movieName)}`;

    try {
        const response = await fetch(tmdbUrl);
        const { results } = await response.json(); // Destructure to get results directly
        return results; // Return only results
    } catch (error) {
        console.error("Error fetching data from TMDB:", error);
        return null;
    }
}

async function fetchGoogleBooksData(bookTitle) {
    const googleBooksUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(bookTitle)}&key=${googleBooksApiKey}`;

    try {
        const response = await fetch(googleBooksUrl);
        const { items } = await response.json(); // Destructure to get items directly
        return items; // Return only items
    } catch (error) {
        console.error("Error fetching data from Google Books:", error);
        return null;
    }
}

export { fetchTMDBData, fetchGoogleBooksData };

const fetchModule = import('node-fetch'); // Changed to require
require('dotenv').config();

async function fetchTMDBData(movieName) {
    const fetch = (await fetchModule).default; 
    const tmdbApiKey = process.env.TMDB_API_KEY;
    const tmdbUrl = `https://api.themoviedb.org/3/search/movie?api_key=${tmdbApiKey}&query=${encodeURIComponent(movieName)}`;

    try {
        const response = await fetch(tmdbUrl);
        const { results } = await response.json();

        // Parse and format the data
        const formattedResults = results.map(result => ({
            title: result.title,
            releaseDate: result.release_date,
            overview: result.overview
            // Add more fields as needed
        }));

        return formattedResults;
    } catch (error) {
        console.error("Error fetching data from TMDB:", error);
        return null;
    }
}

async function formatGoogleBooksData(items) {
    return items.map(item => ({
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'N/A',
        publisher: item.volumeInfo.publisher || 'N/A',
        publishedDate: item.volumeInfo.publishedDate || 'N/A',
        description: item.volumeInfo.description || 'N/A',
        pageCount: item.volumeInfo.pageCount || 'N/A',
        printType: item.volumeInfo.printType || 'N/A',
        mainCategory: item.volumeInfo.mainCategory || 'N/A',
        averageRating: item.volumeInfo.averageRating || 'N/A',
        ratingsCount: item.volumeInfo.ratingsCount || 'N/A',
        smallThumbnail: item.volumeInfo.imageLinks?.smallThumbnail || 'N/A',
        thumbnail: item.volumeInfo.imageLinks?.thumbnail || 'N/A',
        language: item.volumeInfo.language || 'N/A',
        infoLink: item.volumeInfo.infoLink || 'N/A',
        canonicalVolumeLink: item.volumeInfo.canonicalVolumeLink || 'N/A',
        country: item.saleInfo?.country || 'N/A',
        saleability: item.saleInfo?.saleability || 'N/A',
        isEbook: item.saleInfo?.isEbook || 'N/A',
        buyLink: item.saleInfo?.buyLink || 'N/A'
    }));
}


async function fetchGoogleBooksData(bookTitle) {
    const fetch = (await fetchModule).default;
    const googleBooksApiKey = process.env.GOOGLE_BOOKS_API_KEY;
    const googleBooksUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(bookTitle)}&key=${googleBooksApiKey}&maxResults=1`;


    try {
        const response = await fetch(googleBooksUrl);
        const { items } = await response.json();

        const formattedItems = await formatGoogleBooksData(items);

        return formattedItems;
    } catch (error) {
        console.error("Error fetching data from Google Books:", error);
        return null;
    }
}


module.exports = { fetchTMDBData, fetchGoogleBooksData,formatGoogleBooksData };

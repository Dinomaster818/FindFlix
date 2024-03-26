const fetchModule = import('node-fetch');
require('dotenv').config();

async function fetchOMDBData(movieName) {
    const fetch = (await fetchModule).default; 
    const omdbApiKey = process.env.OMDB_API_KEY; 
    const omdbUrl = `http://www.omdbapi.com/?t=${encodeURIComponent(movieName)}&apikey=${omdbApiKey}`;

    try {
        const response = await fetch(omdbUrl);
        const movieData = await response.json();


        if (movieData.Response === 'True') {

            return await formatOMDBData(movieData);
        } else {
            console.error("Movie not found.");
            return null;
        }
    } catch (error) {
        console.error("Error fetching data from OMDB:", error);
        return null;
    }
}

async function formatOMDBData(movieData) {
    return {
        title: movieData.Title,
        year: movieData.Year,
        rated: movieData.Rated || 'N/A',
        released: movieData.Released || 'N/A',
        runtime: movieData.Runtime || 'N/A',
        genre: movieData.Genre || 'N/A',
        director: movieData.Director || 'N/A',
        writer: movieData.Writer || 'N/A',
        actors: movieData.Actors || 'N/A',
        plot: movieData.Plot || 'N/A',
        language: movieData.Language || 'N/A',
        country: movieData.Country || 'N/A',
        awards: movieData.Awards || 'N/A',
        poster: movieData.Poster || 'N/A',
        ratings: movieData.Ratings || [],
        metascore: movieData.Metascore || 'N/A',
        imdbRating: movieData.imdbRating || 'N/A',
        imdbVotes: movieData.imdbVotes || 'N/A',
        imdbID: movieData.imdbID || 'N/A',
        type: movieData.Type || 'N/A',
        DVD: movieData.DVD || 'N/A',
        boxOffice: movieData.BoxOffice || 'N/A',
        production: movieData.Production || 'N/A',
        website: movieData.Website || 'N/A'
    };
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


module.exports = { fetchOMDBData, fetchGoogleBooksData,formatGoogleBooksData };

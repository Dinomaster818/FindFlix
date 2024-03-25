import { fetchTMDBData, fetchGoogleBooksData } from './fetcher.js';

async function searchBookAndRelatedMedia(query) {
    const [books, movies] = await Promise.all([
        fetchGoogleBooksData(query),
        fetchTMDBData(query)
    ]);
    return { books, movies };
}

export { searchBookAndRelatedMedia };

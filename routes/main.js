import { searchBookAndRelatedMedia } from './datafetcher.js';

async function displayRelatedMedia(query) {
    const { books, movies } = await searchBookAndRelatedMedia(query);
    // Hantera datan och visa på hemsidan
    console.log("Books:", books);
    console.log("Movies:", movies);
}

// Anropa funktionen med en sökterm
const searchTerm = "Inception"; // Exempel
displayRelatedMedia(searchTerm);

const readline = require('readline');
const { fetchTMDBData, fetchGoogleBooksData } = require('./search_function.js');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function search() {
    rl.question("Do you want to search for a movie or a book? (Enter 'movie' or 'book'): ", async (answer) => {
        if (answer.toLowerCase() === 'movie') {
            await searchMovie();
        } else if (answer.toLowerCase() === 'book') {
            await searchBook();
        } else {
            console.log("Invalid choice. Please enter 'movie' or 'book'.");
        }
        rl.close();
    });
}

async function searchMovie() {
    return new Promise((resolve) => {
        rl.question("Enter the name of the movie you want to search for: ", async (movieName) => {
            const movieData = await fetchTMDBData(movieName);
            console.log("Movie Data:", movieData);
            resolve(); 
        });
    });
}


async function searchBook() {
    return new Promise((resolve) => {
        rl.question("Enter the title of the book you want to search for: ", async (bookTitle) => {
            const bookData = await fetchGoogleBooksData(bookTitle);
            console.log("Book Data:", bookData);
            resolve(); 
        });
    });

}


search();

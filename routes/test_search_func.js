const readline = require('readline');
const { fetchOMDBData, fetchGoogleBooksData } = require('./search_function.js');

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
            const movieData = await fetchOMDBData(movieName);
            console.log(""); 
            
            if (movieData) {
                console.log(`Title: ${movieData.title}`);
                console.log(`Year: ${movieData.year}`);
                console.log(`Rated: ${movieData.rated}`);
                console.log(`Released: ${movieData.released}`);
                console.log(`Runtime: ${movieData.runtime}`);
                console.log(`Genre: ${movieData.genre}`);
                console.log(`Director: ${movieData.director}`);
                console.log(`Writer: ${movieData.writer}`);
                console.log(`Actors: ${movieData.actors}`);
                console.log(`Plot: ${movieData.plot}`);
                console.log(`Language: ${movieData.language}`);
                console.log(`Country: ${movieData.country}`);
                console.log(`Awards: ${movieData.awards}`);
                console.log(`Poster: ${movieData.poster}`);
                console.log(`Metascore: ${movieData.metascore}`);
                console.log(`IMDB Rating: ${movieData.imdbRating}`);
                console.log(`IMDB Votes: ${movieData.imdbVotes}`);
                console.log(`IMDB ID: ${movieData.imdbID}`);
                console.log(`Type: ${movieData.type}`);
                console.log(`DVD: ${movieData.DVD}`);
                console.log(`Box Office: ${movieData.boxOffice}`);
                console.log(`Production: ${movieData.production}`);
                console.log(`Website: ${movieData.website}`);
            } else {
                console.log("No data found for the given movie title.");
            }

            const movieRelatedBooks = await fetchGoogleBooksData(movieName);
            console.log(" ");
            if(movieRelatedBooks){
                console.log("Books related to the book:");
                console.log(`Title: ${movieRelatedBooks.title}`);
            }else{
                console.log("No book related data found!");
            }
            
            resolve(); 
        });
    });
}



async function searchBook() {
    return new Promise((resolve) => {
        rl.question("Enter the title of the book you want to search for: ", async (bookTitle) => {
            const bookData = await fetchGoogleBooksData(bookTitle);
            console.log("");
            
            if (bookData) {
                bookData.forEach(book => {
                    console.log(`Title: ${book.title}`);
                    console.log(`Authors: ${book.authors}`);
                    console.log(`Publisher: ${book.publisher}`);
                    console.log(`Published Date: ${book.publishedDate}`);
                    console.log(`Description: ${book.description}`);
                    console.log(`Page Count: ${book.pageCount}`);
                    console.log(`Print Type: ${book.printType}`);
                    console.log(`Main Category: ${book.mainCategory}`);
                    console.log(`Average Rating: ${book.averageRating}`);
                    console.log(`Ratings Count: ${book.ratingsCount}`);
                    console.log(`Small Thumbnail: ${book.smallThumbnail}`);
                    console.log(`Thumbnail: ${book.thumbnail}`);
                    console.log(`Language: ${book.language}`);
                    console.log(`Info Link: ${book.infoLink}`);
                    console.log(`Canonical Volume Link: ${book.canonicalVolumeLink}`);
                    console.log(`Country: ${book.country}`);
                    console.log(`Saleability: ${book.saleability}`);
                    console.log(`Is Ebook: ${book.isEbook}`);
                    console.log(`Buy Link: ${book.buyLink}`);
                    console.log(""); 
                });
            } else {
                console.log("No data found for the given book title.");
            }
            
            
            resolve(); 
        });
    });
}





search();

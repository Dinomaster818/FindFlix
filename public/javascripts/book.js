const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

document.getElementById('book-book-title').innerText = urlParams.get('book-title') || 'N/A';
document.getElementById('book-ratings').innerText = urlParams.get('ratings') || 'N/A';
document.getElementById('book-pages').innerText = urlParams.get('pages') || 'N/A';
document.getElementById('book-release').innerText = urlParams.get('release') || 'N/A';
document.getElementById('book-genre').innerText = urlParams.get('genre') || 'N/A';
document.getElementById('book-description').innerText = urlParams.get('description') || 'N/A';
document.getElementById('book-format').innerText = urlParams.get('format') || 'N/A';
document.getElementById('book-author').innerText = urlParams.get('author') || 'N/A';
document.getElementById('book-isbn').innerText = urlParams.get('isbn') || 'N/A';
document.getElementById('book-publisher').innerText = urlParams.get('publisher') || 'N/A';
document.getElementById('book-language').innerText = urlParams.get('language') || 'N/A';

const coverSrc = urlParams.get('cover');
if (coverSrc) {
    document.getElementById('cover').src = coverSrc;
}

document.addEventListener('DOMContentLoaded', function () {
    const addBookToWishlistBtn = document.getElementById('watchlistbtn');

    addBookToWishlistBtn.addEventListener('click', function (event) {
        event.preventDefault(); 

        const bookData = {
            title: document.getElementById('book-book-title').innerText || 'N/A',
            ratings: document.getElementById('book-ratings').innerText || 'N/A',
            pages: document.getElementById('book-pages').innerText || 'N/A',
            release: document.getElementById('book-release').innerText || 'N/A',
            genre: document.getElementById('book-genre').innerText || 'N/A',
            description: document.getElementById('book-description').innerText || 'N/A',
            format: document.getElementById('book-format').innerText || 'N/A',
            author: document.getElementById('book-author').innerText || 'N/A',
            isbn: document.getElementById('book-isbn').innerText || 'N/A',
            publisher: document.getElementById('book-publisher').innerText || 'N/A',
            language: document.getElementById('book-language').innerText || 'N/A',
            cover: document.getElementById('book-cover').src || 'N/A'
        };
        
        // Store book data in localStorage
        localStorage.setItem('bookData', JSON.stringify(bookData));

        // Redirect the user to login.html
        window.location.href = 'login.html';
    });
});

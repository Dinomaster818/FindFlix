const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

document.getElementById('book-title').innerText = urlParams.get('book-title') || 'N/A';
document.getElementById('ratings').innerText = urlParams.get('ratings') || 'N/A';
document.getElementById('pages').innerText = urlParams.get('pages') || 'N/A';
document.getElementById('release').innerText = urlParams.get('release') || 'N/A';
document.getElementById('genre').innerText = urlParams.get('genre') || 'N/A';
document.getElementById('description').innerText = urlParams.get('description') || 'N/A';
document.getElementById('format').innerText = urlParams.get('format') || 'N/A';
document.getElementById('author').innerText = urlParams.get('author') || 'N/A';
document.getElementById('isbn').innerText = urlParams.get('isbn') || 'N/A';
document.getElementById('publisher').innerText = urlParams.get('publisher') || 'N/A';
document.getElementById('language').innerText = urlParams.get('language') || 'N/A';

const coverSrc = urlParams.get('cover');
if (coverSrc) {
    document.getElementById('cover').src = coverSrc;
}

document.addEventListener('DOMContentLoaded', function () {
    const addBookToWishlistBtn = document.getElementById('watchlistbtn');

    addBookToWishlistBtn.addEventListener('click', function (event) {
        event.preventDefault(); 

        const bookData = {
            title: document.getElementById('book-title').innerText || 'N/A',
            ratings: document.getElementById('ratings').innerText || 'N/A',
            pages: document.getElementById('pages').innerText || 'N/A',
            release: document.getElementById('release').innerText || 'N/A',
            genre: document.getElementById('genre').innerText || 'N/A',
            description: document.getElementById('description').innerText || 'N/A',
            format: document.getElementById('format').innerText || 'N/A',
            author: document.getElementById('author').innerText || 'N/A',
            isbn: document.getElementById('isbn').innerText || 'N/A',
            publisher: document.getElementById('publisher').innerText || 'N/A',
            language: document.getElementById('language').innerText || 'N/A',
            cover: document.getElementById('cover').src || 'N/A'
        };
        
        // Store book data in localStorage
        localStorage.setItem('bookData', JSON.stringify(bookData));

        // Redirect the user to login.html
        window.location.href = 'login.html';
    });
});

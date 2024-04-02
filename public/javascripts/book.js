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

const watchlistBtn = document.getElementById('watchlistbtn');

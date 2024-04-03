document.addEventListener('DOMContentLoaded', function () {
    const removeBookButton = document.getElementById('removeBookFromWishlist');

    removeBookButton.addEventListener('click', function (event) {
        event.preventDefault(); 
        event.stopPropagation();
        
 
        const urlParams = new URLSearchParams(window.location.search);
        const bookId = urlParams.get('bookid');
         

        

        fetch(`/remove-book/${bookId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error removing book from wishlist');
            }
            return response.json();
        })
        .then(data => {
            console.log('Book removed from wishlist successfully', data);
            window.location.href = 'login.html'; 
        })
        .catch(error => {
            console.error('Error removing book from wishlist:', error.message);
            
        });
    });
});


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

document.addEventListener('DOMContentLoaded', function () {
    const removeBookButton = document.getElementById('removeBookFromWishlist');

    removeBookButton.addEventListener('click', function (event) {
        event.preventDefault(); 
        event.stopPropagation();
        
        // Extract the book ID from the URL
        const urlParams = new URLSearchParams(window.location.search);
        const bookId = urlParams.get('bookid');
         

        
        // Send a DELETE request to remove the book
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
            window.location.href = 'login.html'; // Redirect to login.html after successful removal
        })
        .catch(error => {
            console.error('Error removing book from wishlist:', error.message);
            // Handle error appropriately
        });
    });
});


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

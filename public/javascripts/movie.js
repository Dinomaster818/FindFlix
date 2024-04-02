
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

document.getElementById('movie-title').innerText = urlParams.get('movie-title') || 'N/A';
document.getElementById('ratings').innerText = urlParams.get('ratings') || 'N/A';
document.getElementById('runtime').innerText = urlParams.get('runtime') || 'N/A';
document.getElementById('release').innerText = urlParams.get('release') || 'N/A';
document.getElementById('tags').innerText = urlParams.get('tags') || 'N/A';
document.getElementById('description').innerText = urlParams.get('description') || 'N/A';
document.getElementById('actors').innerText = urlParams.get('actors') || 'N/A';
document.getElementById('director').innerText = urlParams.get('director') || 'N/A';

const posterSrc = urlParams.get('poster');
if (posterSrc) {
    document.getElementById('poster').src = posterSrc;
}

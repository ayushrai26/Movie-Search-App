const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const movieList = document.getElementById('movie-list');

// API endpoint and API key
const apiUrl = 'https://www.omdbapi.com/';
const apiKey = 'ddf207de';

// Function to fetch movie data from OMDb API
function fetchMovieData(searchTerm) {
    const url = `${apiUrl}?s=${searchTerm}&apikey=${apiKey}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.Response === "True") {
                const movies = data.Search;
                displayMovieList(movies);
            } else {
                movieList.innerHTML = `<p>No movies found!</p>`;
            }
        })
        .catch(error => console.error(error));
}

// Function to display movie list
function displayMovieList(movies) {
    movieList.innerHTML = '';
    movies.forEach(movie => {
        const movieElement = document.createElement('li');
        movieElement.innerHTML = `
            <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'placeholder.jpg'}" alt="${movie.Title}">
            <h2>${movie.Title}</h2>
            <p>Year: ${movie.Year}</p>
            <button onclick="fetchMovieDetails('${movie.imdbID}')">More Details</button>
        `;
        movieList.appendChild(movieElement);
    });
}

// Function to fetch movie details (for additional info like Genre)
function fetchMovieDetails(imdbID) {
    const url = `${apiUrl}?i=${imdbID}&apikey=${apiKey}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            alert(`Title: ${data.Title}\nGenre: ${data.Genre}\nPlot: ${data.Plot}`);
        })
        .catch(error => console.error(error));
}

// Add event listener to search button
searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        fetchMovieData(searchTerm);
    }
});

// Add event listener to search input field
searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            fetchMovieData(searchTerm);
        }
    }
});

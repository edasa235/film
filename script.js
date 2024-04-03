const movieSearchBox = document.getElementById('movie-search-box');
const searchButton = document.getElementById('search-button');
const searchList = document.getElementById('search-list');
const resultGrid = document.getElementById('result-grid'); // Added this line

searchButton.addEventListener('click', findMovies);
movieSearchBox.addEventListener('keydown', function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        findMovies();
    }
});

async function getMovies() {
    let response = await fetch(
        "https://raw.githubusercontent.com/prust/wikipedia-movie-data/master/movies.json"
    );
    let data = await response.json();
    return data;
}

async function loadMovies(searchTerm) {
    const movies = await getMovies();
    const filteredMovies = movies.filter(movie => {
        const title = movie.title.toLowerCase();
        const search = searchTerm.toLowerCase();
        return title.includes(search);
    });
    return filteredMovies;
}

function displayMovieList(movies) {
    resultGrid.innerHTML = '';
    movies.forEach(movie => {
        const { title, cast, extract, genre, thumbnail, year } = movie;
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('movie-card');
        movieDiv.innerHTML = `
            <img src="${thumbnail}" alt="${title} Poster">
            <div class="movie-info">
                <h3>${title} (${year})</h3>
                <p>Cast: ${cast}</p>
                <p>${extract}</p>
            </div>
        `;
        resultGrid.appendChild(movieDiv);
    });
}

async function findMovies() {
    const searchTerm = movieSearchBox.value.trim();
    if (searchTerm.length > 0) {
        searchList.classList.remove('hide-search-list');
        const movies = await loadMovies(searchTerm);
        displayMovieList(movies);
    } else {
        searchList.classList.add('hide-search-list');
    }
}

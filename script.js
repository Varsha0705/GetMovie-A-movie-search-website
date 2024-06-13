const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
const movieBox = document.querySelector("#movie-box");
const find = document.querySelector("#find");
const searchInput = document.querySelector("#search");
const filterbtn = document.querySelector("#filterbtn");
const clear = document.querySelector("#clear");

const getMovies = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    showMovies(data);
};

getMovies(APIURL);

const showMovies = (data) => {
    movieBox.innerHTML = "";
    data.results.forEach((result) => {
        const imagePath = result.poster_path === null ? "img-1.png" : IMGPATH + result.poster_path;
        const box = document.createElement("div");
        box.classList.add("box");
        box.innerHTML = `
                    <img src="${imagePath}" alt="" />
                    <div class="overlay">
                        <div class="title">
                            <h2>${result.original_title}</h2>
                            <span>${result.vote_average}<br><br></span>
                            <span>${result.release_date}</span>
                            <p>${result.overview}</p>
                        </div>
                         <div class="details" style="display:none">
                            </div>
                        <button class="show-more">Show more</button>
                    </div>
                `;
        movieBox.appendChild(box);

        const showMoreBtn = box.querySelector(".show-more");
        const detailsDiv = box.querySelector(".details");

        showMoreBtn.addEventListener("click", () => {
            if (detailsDiv.style.display == "none") {
                detailsDiv.style.display = "block";
                detailsDiv.innerHTML = `
                            <p>Language: ${result.original_language}</p>
                            <p>Popularity: ${result.popularity}</p>`;
                showMoreBtn.textContent = "Show Less";
            }
            else {
                detailsDiv.style.display = "none";
                showMoreBtn.textContent = "Show More";
            }
        });
    });
};


find.addEventListener("click", function () {
    const query = searchInput.value;
    if (query) {
        getMovies(SEARCHAPI + query);
    } else {
        getMovies(APIURL);
    }


});

const show_Movies = (movies) => {
    movieBox.innerHTML = "";
    movies.forEach((result) => {
        const imagePath = result.poster_path === null ? "img-1.png" : IMGPATH + result.poster_path;
        const box = document.createElement("div");
        box.classList.add("box");
        box.innerHTML = `
                    <img src="${imagePath}" alt="" />
                    <div class="overlay">
                        <div class="title">
                            <h2>${result.original_title}</h2>
                            <span>${result.vote_average}<br><br></span>
                            <span>${result.release_date}</span>
                            <p>${result.overview}</p>
                        </div>
                         <div class="details" style="display:none">
                            </div>
                        <button class="show-more">Show more</button>
                    </div>
                `;
        movieBox.appendChild(box);

        const showMoreBtn = box.querySelector(".show-more");
        const detailsDiv = box.querySelector(".details");

        showMoreBtn.addEventListener("click", () => {
            if (detailsDiv.style.display == "none") {
                detailsDiv.style.display = "block";
                detailsDiv.innerHTML = `
                            <p>Language: ${result.original_language}</p>
                            <p>Popularity: ${result.popularity}</p>`;
                showMoreBtn.textContent = "Show Less";
            }
            else {
                detailsDiv.style.display = "none";
                showMoreBtn.textContent = "Show More";
            }
        });
    });
};

const filterMovies = async () => {
    const minRating = parseFloat(document.querySelector("#r1").value);
    const maxRating = parseFloat(document.querySelector("#r2").value);
    const fromYear = parseFloat(document.querySelector("#y1").value);
    const toYear = parseFloat(document.querySelector("#y2").value);
    const query = searchInput.value;

    const url = query ? (SEARCHAPI + query) : APIURL;
    const response = await fetch(url);
    const data = await response.json();
    const filteredMovies = data.results.filter(
        (movie) => {
            let releaseYear = new Date(movie.release_date).getFullYear();
            (fromYear && toYear && minRating && maxRating) ? (final = ((movie.vote_average >= minRating &&
                movie.vote_average <= maxRating) &&
                (releaseYear >= fromYear &&
                    releaseYear <= toYear))) : (final = ((movie.vote_average >= minRating &&
                        movie.vote_average <= maxRating) ||
                        (releaseYear >= fromYear &&
                            releaseYear <= toYear)));
            return (final);
        }
    );
    console.log(filteredMovies)
    filteredMovies.length > 0 ? show_Movies(filteredMovies) : getMovies(SEARCHAPI + query);
};

filterbtn.addEventListener("click", filterMovies);

clear.addEventListener("click", function () {
    searchInput.value = null;
    document.querySelector("#r1").value = null;
    document.querySelector("#r2").value = null;
    document.querySelector("#y1").value = null;
    document.querySelector("#y2").value = null;
    getMovies(APIURL);
})
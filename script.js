
const category = {
  genres: [
    {
      id: 28,
      name: "Action",
    },
    {
      id: 12,
      name: "Adventure",
    },
    {
      id: 16,
      name: "Animation",
    },
    {
      id: 35,
      name: "Comedy",
    },
    {
      id: 80,
      name: "Crime",
    },
    {
      id: 99,
      name: "Documentary",
    },
    {
      id: 18,
      name: "Drama",
    },
    {
      id: 10751,
      name: "Family",
    },
    {
      id: 14,
      name: "Fantasy",
    },
    {
      id: 36,
      name: "History",
    },
    {
      id: 27,
      name: "Horror",
    },
    {
      id: 10402,
      name: "Music",
    },
    {
      id: 9648,
      name: "Mystery",
    },
    {
      id: 10749,
      name: "Romance",
    },
    {
      id: 878,
      name: "Science Fiction",
    },
    {
      id: 10770,
      name: "TV Movie",
    },
    {
      id: 53,
      name: "Thriller",
    },
    {
      id: 10752,
      name: "War",
    },
    {
      id: 37,
      name: "Western",
    },
  ],
};
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZTIzMjhiNjY4ZWJmNWU2OGVjNWVhZmRlZmVlMjhhYyIsInN1YiI6IjYzNzYzN2YwZTg5OTliMDBjODgwODIyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.f_ZWtak48lTLu3BAwRzjeJNJQtnk2U4rFJn2tstrgP8",
  },
};

// fetch(
//   "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
//   options
// )
//   .then((response) => response.json())
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err));
document.addEventListener("DOMContentLoaded", function () {
 new Splide("#first-slider", {
   type: "loop",
   perPage: 4,
 }).mount();
 new Splide("#second-slider", {
   type: "loop",
   perPage: 4,
 }).mount();

});
const recommendedMovies = [];

const apiKey = "6e2328b668ebf5e68ec5eafdefee28ac";

const searchInput = document.getElementById("searchInput");
const textArea = document.querySelector(".search__text");
const searchImage = document.querySelector(".search__image");
const recSilder = document.querySelector(".splide__list");
// const favSlider = document.getElementById("fav-silder");

function getGenreNames(genreIds) {
  return genreIds
    .map((id) => {
      const genre = category.genres.find((g) => g.id === id);
      return genre ? genre.name : "";
    })
    .filter(Boolean)
    .join(", ");
}

searchInput.addEventListener("input", searchMovie);
searchInput.addEventListener("keydown", searchMovie);
// searchInput.addEventListener("blur", updateRecSlider);
async function searchMovie() {
  const searchInputValue = document.getElementById("searchInput").value;

  const searchResponse = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchInputValue}`,
    options
  );

  const searchData = await searchResponse.json();
  searchData.results.forEach((movie) => {
    console.log(movie)
    const image = movie.poster_path;
    const title = movie.title;
    const category = getGenreNames(movie.genre_ids);
    const releaseDate = movie.release_date;
    const description = movie.overview;
    recommendedMovies.push({
      image,
      title,
      category,
    });
    searchImage.innerHTML = `<img src=https://image.tmdb.org/t/p/w500/${image} />`;
    textArea.innerHTML = `<h1 class="search__movie__title">${title}</h1>
      <h2 class="search__movie__category">${category}</h2>  
      <p class="search__movie__description">
        Release Date: ${releaseDate}<br>
        ${description}
      </p>`;
      fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}/similar?language=en-US&page=1`,
        options
      )
        .then((response) => response.json())
        .then((response) =>
          recommendedMovies.push(response)
    );
    console.log(recommendedMovies)
    recSilder.innerHTML = recommendedMovies
          .map((recommendedMovie) => {
            const { title, category, image } = recommendedMovie;

            return `
              <li class="splide__slide">
                <img src="https://image.tmdb.org/t/p/w500/${image}" alt="${title}">
                <div class="slide__content">
                  <h1 class="slide__content__title">${title}</h1>
                  <h2 class="slide__content__category">${category}</h2>  
                </div>
              </li>`;
          })
          .join('');
  });
}
// console.log(recommendedMovies);
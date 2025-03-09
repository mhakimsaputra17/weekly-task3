const objOption = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OTM3NTM1YTkwNzk5YWQzNGUzYzI1MWRkZDAyODVkNSIsIm5iZiI6MTc0MTM1NjEwNS4wMDgsInN1YiI6IjY3Y2FmYzQ5NTQ3ODNjYWFhM2FmZjI4ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TRKDbK0_ae0jY-ZYpujQnuIvG90lefKw8fFul9qWdJM",
  },
};

const listGenre = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

// Create movie card DOM element
const createMovieCard = (movie, isUpcoming = false) => {
  const { genre_ids, original_title, poster_path } = movie;

  const moviePoster = document.createElement("div");
  moviePoster.classList.add("movie-card");

  const poster = document.createElement("div");
  poster.classList.add("poster");

  const image = document.createElement("img");
  image.src = `https://image.tmdb.org/t/p/w500${poster_path}`;
  image.alt = `${original_title} movie poster`;

  const action = document.createElement("div");
  action.classList.add("actions");

  const detailsBtn = document.createElement("a");
  detailsBtn.href = "./pages/order/order-page.html";
  detailsBtn.classList.add("button", "button-outline");
  detailsBtn.textContent = "Details";

  const buyBtn = document.createElement("a");
  buyBtn.href = "./pages/order/order-page.html";
  buyBtn.classList.add("button", "button-primary");
  buyBtn.textContent = "Buy Ticket";

  const title = document.createElement("h3");
  title.textContent = original_title;

  const tags = document.createElement("div");
  tags.classList.add("tags");

  action.appendChild(detailsBtn);
  action.appendChild(buyBtn);

  poster.appendChild(image);
  poster.appendChild(action);

  moviePoster.appendChild(poster);
  moviePoster.appendChild(title);
  moviePoster.appendChild(tags);

  const matchingGenres = genre_ids
    .filter((id) => id in listGenre)
    .map((id) => listGenre[id]);

  // Add up to 2 genre tags
  for (let i = 0; i < Math.min(matchingGenres.length, 3); i++) {
    const genre = document.createElement("span");
    genre.classList.add("tag");
    genre.textContent = matchingGenres[i];
    tags.appendChild(genre);
  }

  return moviePoster;
};

// Fetch current movies
const fetchCurrentMovies = async () => {
  try {
    const url =
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
    const response = await fetch(url, objOption);
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();
    const movieGrid = document.querySelector(
      ".movie-section-container:not(.upcoming-movies) .movie-grid"
    );

    // Clear existing content
    movieGrid.innerHTML = "";

    // Add first 4 movies
    data.results.slice(0, 4).forEach((movie) => {
      const movieCard = createMovieCard(movie);
      movieGrid.appendChild(movieCard);

      // Add recommendation badge to some movies
      if (movie.vote_average > 7.5) {
        const badge = document.createElement("div");
        badge.classList.add("badge-recommendation");
        badge.textContent = "Recommendation";
        movieCard.querySelector(".poster").prepend(badge);
      }
    });
  } catch (err) {
    if (err instanceof Error) console.log(err);
  }
};

// Fetch upcoming movies
const fetchUpcomingMovies = async () => {
  try {
    const url =
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";
    const response = await fetch(url, objOption);
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();
    const movieGrid = document.querySelector(".upcoming-movies .movie-grid");

    // Clear existing content
    movieGrid.innerHTML = "";

    // Add first 4 movies
    data.results.slice(0, 4).forEach((movie) => {
      const movieCard = createMovieCard(movie, true);
      movieGrid.appendChild(movieCard);
    });
  } catch (err) {
    if (err instanceof Error) console.log(err);
  }
};

// Initialize page content
const initPage = () => {
  fetchCurrentMovies();
  fetchUpcomingMovies();
};

// Run when DOM is fully loaded
document.addEventListener("DOMContentLoaded", initPage);

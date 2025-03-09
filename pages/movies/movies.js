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

/**
 * Creates a movie card element
 * @param {Object} movie - Movie data
 * @returns {HTMLElement} The movie card DOM element
 */
const createMovieCard = (movie) => {
  const { genre_ids, original_title, poster_path } = movie;

  // Create movie card container
  const movieCard = document.createElement("div");
  movieCard.classList.add("movie-card");

  // Create poster container
  const poster = document.createElement("div");
  poster.classList.add("poster");

  // Create and set up movie poster image
  const image = document.createElement("img");
  image.src = `https://image.tmdb.org/t/p/w500${poster_path}`;
  image.alt = `${original_title} movie poster`;

  // Create action buttons container
  const actions = document.createElement("div");
  actions.classList.add("actions");

  // Create details button
  const detailsBtn = document.createElement("a");
  detailsBtn.href = "/pages/order/order-page.html";
  detailsBtn.classList.add("button", "button-outline");
  detailsBtn.textContent = "Details";

  // Create buy ticket button
  const buyBtn = document.createElement("a");
  buyBtn.href = "/pages/order/order-page.html";
  buyBtn.classList.add("button", "button-primary");
  buyBtn.textContent = "Buy Ticket";

  // Create movie title
  const title = document.createElement("h3");
  title.textContent = original_title;

  // Create tags container
  const tags = document.createElement("div");
  tags.classList.add("tags");

  // Assemble the movie card
  actions.appendChild(detailsBtn);
  actions.appendChild(buyBtn);

  poster.appendChild(image);
  poster.appendChild(actions);

  movieCard.appendChild(poster);
  movieCard.appendChild(title);
  movieCard.appendChild(tags);

  // Add genre tags (limit to 3)
  const matchingGenres = genre_ids
    .filter((id) => id in listGenre)
    .map((id) => listGenre[id]);

  matchingGenres.slice(0, 3).forEach((genreName) => {
    const genre = document.createElement("span");
    genre.classList.add("tag");
    genre.textContent = genreName;
    tags.appendChild(genre);
  });

  return movieCard;
};

/**
 * Fetch movie data and populate the movie grid
 */
const createData = async () => {
  try {
    const url =
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=2";
    const response = await fetch(url, objOption);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const { results } = await response.json();
    const movieGridElement = document.querySelector(".movie-grid");

    // Clear any existing content
    movieGridElement.innerHTML = "";

    // Add movie cards to the grid
    results.forEach((movie) => {
      const movieCard = createMovieCard(movie);
      movieGridElement.appendChild(movieCard);
    });
  } catch (err) {
    console.error("Error fetching movie data:", err);
  }
};

// Initialize the page
createData();

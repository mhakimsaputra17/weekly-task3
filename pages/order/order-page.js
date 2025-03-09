const objOption = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OTM3NTM1YTkwNzk5YWQzNGUzYzI1MWRkZDAyODVkNSIsIm5iZiI6MTc0MTM1NjEwNS4wMDgsInN1YiI6IjY3Y2FmYzQ5NTQ3ODNjYWFhM2FmZjI4ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TRKDbK0_ae0jY-ZYpujQnuIvG90lefKw8fFul9qWdJM",
  },
};

// Helper function to create DOM elements
const createElement = (tag, className = "", textContent = "") => {
  const element = document.createElement(tag);
  if (className) element.classList.add(...className.split(" "));
  if (textContent) element.textContent = textContent;
  return element;
};

// Helper function to create metadata items
const createMetadataItem = (label, value) => {
  const metadataItem = createElement("div", "metadata-item");
  const labelElement = createElement("div", "metadata-label", label);
  const valueElement = createElement("div", "metadata-value", value);

  metadataItem.appendChild(labelElement);
  metadataItem.appendChild(valueElement);

  return metadataItem;
};

const getDetailsMovie = async () => {
  try {
    // Fetch movie credits
    const MOVIE_ID = "1357633";
    const urlCredit = `https://api.themoviedb.org/3/movie/${MOVIE_ID}/credits`;
    const responseCredit = await fetch(urlCredit, objOption);
    const creditsMovie = await responseCredit.json();

    const { cast } = creditsMovie;

    // Get top 4 actors
    const actorCasting = cast.slice(0, 4).map((actor) => actor.name);

    // Fetch movie details
    const url = `https://api.themoviedb.org/3/movie/${MOVIE_ID}`;
    const response = await fetch(url, objOption);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const detailsMovie = await response.json();

    const {
      backdrop_path,
      genres,
      original_title,
      overview,
      poster_path,
      release_date,
      runtime,
      production_companies,
    } = detailsMovie;

    const studio = production_companies[1].name;

    // Create banner section
    const bannerImage = createElement("img");
    bannerImage.src = `https://image.tmdb.org/t/p/w500${backdrop_path}`;
    bannerImage.alt = `${original_title} movie poster`;
    document.querySelector(".banner").appendChild(bannerImage);

    // Create movie poster
    const moviePoster = createElement("div", "movie-poster");
    const posterImage = createElement("img");
    posterImage.src = `https://image.tmdb.org/t/p/w500${poster_path}`;
    posterImage.alt = `${original_title} movie poster`;
    moviePoster.appendChild(posterImage);

    // Create movie info
    const movieInfo = createElement("div", "movie-info");
    const movieTitle = createElement("h1", "movie-title", original_title);
    const movieGenres = createElement("div", "movie-genres");

    // Add genres
    genres.forEach(({ name }) => {
      const genre = createElement("span", "genre", name);
      movieGenres.appendChild(genre);
    });

    // Create metadata section
    const movieMetaData = createElement("div", "movie-meta-data");

    // Add metadata items
    movieMetaData.appendChild(createMetadataItem("Release Date", release_date));
    movieMetaData.appendChild(createMetadataItem("Directed by", studio));
    movieMetaData.appendChild(
      createMetadataItem("Duration", `${runtime} minutes`)
    );
    movieMetaData.appendChild(
      createMetadataItem("Cast", actorCasting.join(", "))
    );

    // Create synopsis section
    const synopsis = createElement("div", "synopsis");
    const synopsisLabel = createElement("h2", "", "Synopsis");
    const synopsisText = createElement("p", "", overview);

    synopsis.appendChild(synopsisLabel);
    synopsis.appendChild(synopsisText);

    // Assemble the movie info
    movieInfo.appendChild(movieTitle);
    movieInfo.appendChild(movieGenres);
    movieInfo.appendChild(movieMetaData);

    // Add everything to the movie details container
    const movieDetailsContainer = document.querySelector(".movie-details");
    movieDetailsContainer.appendChild(moviePoster);
    movieDetailsContainer.appendChild(movieInfo);
    movieDetailsContainer.appendChild(synopsis);
  } catch (error) {
    console.error(error);
  }
};

// Initialize the page
getDetailsMovie();

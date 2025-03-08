const objOption = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OTM3NTM1YTkwNzk5YWQzNGUzYzI1MWRkZDAyODVkNSIsIm5iZiI6MTc0MTM1NjEwNS4wMDgsInN1YiI6IjY3Y2FmYzQ5NTQ3ODNjYWFhM2FmZjI4ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TRKDbK0_ae0jY-ZYpujQnuIvG90lefKw8fFul9qWdJM",
  },
};

const getMoviesGenre = async () => {
  try {
    const url = "https://api.themoviedb.org/3/genre/movie/list?language=en";
    const response = await fetch(url, objOption);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const genreData = await response.json();
    console.log(genreData.genres);
  } catch (err) {
    if (err instanceof Error) console.log(err);
  }
};

// getMoviesGenre();

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

const myMap = new Map(Object.entries(listGenre));
// console.log(myMap);

const createData = async () => {
  try {
    //     const test = await getMoviesGenre();
    // const url ="https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";
    // const url = "https://jsonplaceholder.typicode.com/users";
    const url =
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=7";
    const response = await fetch(url, objOption);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const postData = await response.json();

    console.log(postData.results);
    for (const { genre_ids, original_title, poster_path } of postData.results) {
      //   console.log(overview);
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
      detailsBtn.href = "/pages/order/order-page.html";
      detailsBtn.classList.add("button", "button-outline");
      detailsBtn.textContent = "Details";

      const buyBtn = document.createElement("a");
      buyBtn.href = "/pages/order/order-page.html";
      buyBtn.classList.add("button", "button-primary");
      buyBtn.textContent = "Buy Ticket";

      const title = document.createElement("h3");
      title.textContent = original_title;

      const tags = document.createElement("div");
      tags.classList.add("tags");

      // appendChild method
      action.appendChild(detailsBtn);
      action.appendChild(buyBtn);

      poster.appendChild(image);
      poster.appendChild(action);

      moviePoster.appendChild(poster);
      moviePoster.appendChild(title);
      document.querySelector(".movie-grid").appendChild(moviePoster);
      moviePoster.appendChild(tags);

      const matchingGenres = genre_ids
        .filter((id) => id in listGenre)
        .map((id) => {
          return listGenre[id];
        });

      for (let i = 0; i < matchingGenres.length; i++) {
        const genre = document.createElement("span");
        genre.classList.add("tag");
        genre.textContent = matchingGenres[i];
        tags.appendChild(genre);
      }
    }
  } catch (err) {
    if (err instanceof Error) console.log(err);
  }
};

createData();

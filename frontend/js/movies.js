document.addEventListener("DOMContentLoaded", () => {
    // Load all movies
    fetchMovies();
    
    // Setup filter change handlers
    setupFilters();
});
function displayMovies(movies) {
    const moviesContainer = document.getElementById("movies-list");
    moviesContainer.innerHTML = ""; // Clear previous content

    movies.forEach(movie => {
        const movieElement = document.createElement("div");
        movieElement.classList.add("movie");

        movieElement.innerHTML = `
            <img src="${movie.image}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>Director: ${movie.director}</p>
            <p>Genre: ${movie.genre}</p>
            <p>Year: ${movie.year}</p>
            <p>Rating: ${movie.rating}</p>
            <button onclick="addToCart('${movie._id}', '${movie.title}', ${movie.price}, '${movie.image}')">Add to Cart</button>
        `;

        moviesContainer.appendChild(movieElement);
    });
}

function setupFilters() {
    const genreFilter = document.getElementById('genre-filter');
    const sortFilter = document.getElementById('sort-filter');
    
    if (genreFilter) {
        genreFilter.addEventListener('change', applyFilters);
    }
    
    if (sortFilter) {
        sortFilter.addEventListener('change', applyFilters);
    }
}

// Global variable to store all movies so we can filter them client-side
let allMovies = [];

async function fetchMovies() {
    try {
        // Show loading state
        const moviesList = document.getElementById("movies-list");
        const emptyState = document.getElementById("empty-state");
        
        if (moviesList) {
            moviesList.innerHTML = '<div class="loading"><i class="ri-loader-4-line"></i>Loading movies...</div>';
        }
        
        console.log("Fetching movies from API...");

        // Fetch movies from API
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors' // Enable CORS
        });
        
        console.log("API Response status:", response.status);
        
        if (!response.ok) {
            throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
        }

        const movies = await response.json();
        console.log("Parsed movies data:", movies);
        
        // Store all movies for filtering
        allMovies = movies;
        
        // Apply filters (will use default values initially)
        applyFilters();
    } catch (error) {
        console.error("Error fetching movies:", error);

        const moviesList = document.getElementById("movies-list");
        if (moviesList) {
            moviesList.innerHTML = `
                <div class="error-state" style="text-align: center; padding: 40px; color: #ff6b6b;">
                    <i class="ri-error-warning-line" style="font-size: 48px; margin-bottom: 20px;"></i>
                    <h3>Failed to load movies</h3>
                    <p>Error details: ${error.message}</p>
                    <p style="margin-top: 20px; font-size: 14px; color: #aaa;">
                        Please check if the backend server is running at <code>http://127.0.0.1:5000</code>
                    </p>
                    <button onclick="fetchMovies()" style="margin-top: 20px; padding: 10px 20px;">
                        <i class="ri-refresh-line"></i> Try Again
                    </button>
                </div>
            `;
        }
    }
}

function applyFilters() {
    const genreFilter = document.getElementById('genre-filter');
    const sortFilter = document.getElementById('sort-filter');
    const moviesList = document.getElementById("movies-list");
    const emptyState = document.getElementById("empty-state");
    
    if (!moviesList || !allMovies.length) return;
    
    // Get filter values
    const genreValue = genreFilter ? genreFilter.value.toLowerCase() : '';
    const sortValue = sortFilter ? sortFilter.value : 'title-asc';
    
    // Apply genre filter
    let filteredMovies = allMovies;
    if (genreValue) {
        filteredMovies = allMovies.filter(movie => 
            Array.isArray(movie.genre) && 
            movie.genre.some(g => g.toLowerCase().includes(genreValue))
        );
    }
    
    // Apply sorting
    switch(sortValue) {
        case 'title-asc':
            filteredMovies.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'title-desc':
            filteredMovies.sort((a, b) => b.title.localeCompare(a.title));
            break;
        case 'price-asc':
            filteredMovies.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            filteredMovies.sort((a, b) => b.price - a.price);
            break;
    }
    
    // Clear container
    moviesList.innerHTML = "";
    
    // Show empty state if no movies found
    if (filteredMovies.length === 0) {
        if (emptyState) {
            emptyState.style.display = "block";
        }
        return;
    }

    // Hide empty state if movies found
    if (emptyState) {
        emptyState.style.display = "none";
    }

    // Render movie cards
    filteredMovies.forEach(movie => {
        const movieCard = document.createElement("div");
        movieCard.className = "movie-card";
        
        movieCard.innerHTML = `
            <img src="${movie.poster_url || '/img/no-poster.jpg'}" alt="${movie.title}" class="movie-poster">
            <div class="movie-info">
                <h3 class="movie-title">${movie.title}</h3>
                <p class="movie-genre">${Array.isArray(movie.genre) ? movie.genre.join(", ") : movie.genre}</p>
                <div class="movie-actions">
                    <button onclick="addToCart('${movie.title}', ${movie.price}, '${movie.poster_url || ''}', 'purchase')">
                        $${movie.price}
                    </button>
                    <button onclick="addToCart('${movie.title}', ${movie.rental_price || movie.price/2}, '${movie.poster_url || ''}', 'rental')">
                        Rent $${movie.rental_price || (movie.price/2).toFixed(2)}
                    </button>
                </div>
            </div>
        `;

        // Add click handler to navigate to movie details
        movieCard.querySelector(".movie-poster").addEventListener("click", () => {
            window.location.href = `movie.html?id=${movie.id || 'detail'}`;
        });

        movieCard.querySelector(".movie-title").addEventListener("click", () => {
            window.location.href = `movie.html?id=${movie.id || 'detail'}`;
        });

        moviesList.appendChild(movieCard);
    });
}

fetch("http://127.0.0.1:5000/movies/")  // Ensure the trailing slash `/`
  .then(response => response.json())
  .then(movies => {
      console.log("Movies:", movies);  // Debugging
      displayMovies(movies);
  })
  .catch(error => console.error("Error fetching movies:", error));

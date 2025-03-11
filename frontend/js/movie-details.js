document.addEventListener("DOMContentLoaded", () => {
    // Initialize UI elements
    initializeUI();
    
    // Get movie ID from URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');
    
    if (movieId) {
        fetchMovieDetails(movieId);
    } else {
        showError("Movie ID not provided");
    }
});

function initializeUI() {
    // Setup cart panel toggle
    const cartToggle = document.getElementById("cart-toggle");
    const cartPanel = document.getElementById("cart-panel");
    const cartClose = document.getElementById("cart-close");
    
    // Function to close all panels
    const closeAllPanels = () => {
        document.querySelectorAll(".utility-bar").forEach(panel => {
            panel.classList.remove("active");
        });
    };
    
    if (cartToggle && cartPanel) {
        cartToggle.addEventListener("click", () => {
            if (cartPanel.classList.contains("active")) {
                // If already open, close it
                cartPanel.classList.remove("active");
            } else {
                // Close all panels first
                closeAllPanels();
                // Then open this one
                cartPanel.classList.add("active");
            }
        });
        
        if (cartClose) {
            cartClose.addEventListener("click", () => {
                cartPanel.classList.remove("active");
            });
        }
    }
    
    // Allow pressing ESC to close panels
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeAllPanels();
        }
    });
}

async function fetchMovieDetails(movieId) {
    try {
        // Show loading state
        const movieDetailsContainer = document.getElementById("movie-details");
        
        if (movieDetailsContainer) {
            movieDetailsContainer.innerHTML = '<div class="loading"><i class="ri-loader-4-line"></i>Loading movie details...</div>';
        }
        
        console.log("Fetching movie details for ID:", movieId);

        // Fetch movie from API
        const API_URL = `http://127.0.0.1:5000/movies/${movieId}`;
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

        const movie = await response.json();
        console.log("Parsed movie data:", movie);
        
        // Render movie details
        renderMovieDetails(movie);
        
    } catch (error) {
        console.error("Error fetching movie details:", error);
        showError(error.message);
    }
}

function renderMovieDetails(movie) {
    const movieDetailsContainer = document.getElementById("movie-details");
    if (!movieDetailsContainer) return;
    
    // Update page title
    document.title = `CineEcom - ${movie.title}`;
    
    // Create movie details HTML
    movieDetailsContainer.innerHTML = `
        <div class="movie-details-poster">
            <img src="${movie.poster_url || '/img/no-poster.jpg'}" alt="${movie.title}" class="movie-poster-large">
        </div>
        <div class="movie-details-info">
            <h2>${movie.title}</h2>
            <div class="movie-details-meta">
                <span>${Array.isArray(movie.genre) ? movie.genre.join(", ") : movie.genre}</span>
                ${movie.year ? `<span> • ${movie.year}</span>` : ''}
                ${movie.runtime ? `<span> • ${movie.runtime} min</span>` : ''}
                ${movie.rating ? `<span> • Rating: ${movie.rating}/10</span>` : ''}
            </div>
            <div class="movie-details-description">
                ${movie.description || 'No description available.'}
            </div>
            <div class="movie-details-price">
                <p>Purchase: <strong>$${movie.price.toFixed(2)}</strong></p>
                <p>Rent: <strong>$${(movie.rental_price || movie.price/2).toFixed(2)}</strong></p>
            </div>
            <div class="movie-details-actions">
                <button onclick="addToCart('${movie.title}', ${movie.price}, '${movie.poster_url || ''}', 'purchase')">
                    <i class="ri-shopping-cart-line"></i> Add to Cart ($${movie.price.toFixed(2)})
                </button>
                <button onclick="addToCart('${movie.title}', ${movie.rental_price || movie.price/2}, '${movie.poster_url || ''}', 'rental')">
                    <i class="ri-film-line"></i> Rent Movie ($${(movie.rental_price || movie.price/2).toFixed(2)})
                </button>
            </div>
        </div>
    `;
}

function showError(message) {
    const movieDetailsContainer = document.getElementById("movie-details");
    
    if (movieDetailsContainer) {
        movieDetailsContainer.innerHTML = `
            <div class="error-state">
                <i class="ri-error-warning-line"></i>
                <h3>Failed to load movie details</h3>
                <p>Error: ${message}</p>
                <button onclick="window.location.href='index.html'" class="browse-button">
                    <i class="ri-arrow-left-line"></i> Back to Movies
                </button>
            </div>
        `;
    }
}
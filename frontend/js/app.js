document.addEventListener("DOMContentLoaded", () => {
    // Initialize UI elements
    initializeUI();
    
    // Fetch and display movies
    fetchMovies();
});

function initializeUI() {
    // Setup search panel toggle
    const searchToggle = document.getElementById("search-toggle");
    const searchPanel = document.getElementById("search-panel");
    const searchClose = document.getElementById("search-close");
    
    // Function to close all panels
    const closeAllPanels = () => {
        document.querySelectorAll(".utility-bar").forEach(panel => {
            panel.classList.remove("active");
        });
    };
    
    if (searchToggle && searchPanel) {
        searchToggle.addEventListener("click", () => {
            if (searchPanel.classList.contains("active")) {
                // If already open, close it
                searchPanel.classList.remove("active");
            } else {
                // Close all panels first
                closeAllPanels();
                // Then open this one
                searchPanel.classList.add("active");
            }
        });
        
        if (searchClose) {
            searchClose.addEventListener("click", () => {
                searchPanel.classList.remove("active");
            });
        }
    }
    
    // Allow pressing ESC to close panels
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeAllPanels();
        }
    });
    
    // Enable search on enter key
    const searchInput = document.getElementById("search");
    if (searchInput) {
        searchInput.addEventListener("keyup", (e) => {
            if (e.key === "Enter") {
                searchMovies();
            }
        });
    }
    
    // Highlight active nav link
    highlightActiveNavLink();
}

function highlightActiveNavLink() {
    // Get current page path
    const currentPath = window.location.pathname;
    
    // Find all nav links
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Loop through links and add active class to matching path
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        // If we're on the page that matches this link, add active class
        if (currentPath.endsWith(linkPath)) {
            link.classList.add('active');
        } else if (currentPath.endsWith('/') && linkPath === 'index.html') {
            // Special case for root (index)
            link.classList.add('active');
        }
    });
}

function checkout() {
    alert('Thank you for your purchase!');
    localStorage.removeItem('cart');
    updateCartPanel();
    updateCartCount();
}

function fetchMovies() {
    console.log("Fetching movies from API..."); // Debugging line
    fetch('http://127.0.0.1:5000/movies/')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
            }
            return response.json();
        })
        .then(movies => {
            console.log("Movies fetched:", movies); // Debugging line
            displayMovies(movies);
        })
        .catch(error => {
            console.error('Error fetching movies:', error);
            document.getElementById('movies').innerHTML = `
                <p>Failed to load movies</p>
                <p>Error details: ${error.message}</p>
                <p>Please check if the backend server is running at http://127.0.0.1:5000</p>
                <button onclick="fetchMovies()">Try Again</button>
            `;
        });
}

function displayMovies(movies) {
    const movieContainer = document.getElementById("movies-list");
    movieContainer.innerHTML = ""; // Clear previous content

    movies.forEach(movie => {
        console.log(movie.image)
        const movieCard = `
            <div class="movie-card">
                <img src="${movie.image}" alt="${movie.title}" />
                <h2>${movie.title}</h2>
                <p>Director: ${movie.director}</p>
                <p>Genre: ${movie.genre}</p>
                <p>Year: ${movie.year}</p>
                <p>Rating: ⭐${movie.rating}</p>
            </div>
        `;
        movieContainer.innerHTML += movieCard;
    });
}

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded and parsed");
    fetchMovies();
});
function searchMovies() {
    const query = document.getElementById("search").value.trim();
    fetchMovies(query);
    
    // Close search panel after search
    const searchPanel = document.getElementById("search-panel");
    if (searchPanel) {
        searchPanel.classList.remove("active");
    }
}   

document.addEventListener("DOMContentLoaded", function () {
    fetch("/movies/")
        .then(response => response.json())
        .then(data => {
            let moviesList = document.getElementById("movies-list");
            moviesList.innerHTML = ""; 

            data.forEach(movie => {
                let movieCard = document.createElement("div");
                movieCard.classList.add("movie-card");

                movieCard.innerHTML = `
                    <img src="${movie.image}" alt="${movie.title}" />
                    <h3>${movie.title}</h3>
                    <p>Director: ${movie.director}</p>
                    <p>Genre: ${movie.genre}</p>
                    <p>Year: ${movie.year}</p>
                    <p>Rating: ${movie.rating}</p>
                    <button onclick="addToCart('${movie._id}')">Add to Cart</button>
                `;

                moviesList.appendChild(movieCard);
            });
        });
});


function addToCart(movieId) {
    // Get current movie data from the rendered elements
    const movieCard = event.target.closest('.movie-card');
    const title = movieCard.querySelector('h3').textContent;
    const image = movieCard.querySelector('img').src;
    
    // Create movie object
    const movie = {
        id: movieId || Date.now().toString(), // Use provided ID or generate one
        title: title,
        image: image,
        price: 9.99 // Default price, you can adjust this
    };
    
    // Get existing cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if movie already in cart
    const existingMovie = cart.find(item => item.title === movie.title);
    
    if (existingMovie) {
        alert('This movie is already in your cart!');
    } else {
        // Add to cart
        cart.push(movie);
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Update cart count
        updateCartCount();
        
        // Show success message
        alert('Movie added to cart successfully!');
    }
}

// Function to update cart count
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cart.length;
    }
}
// Call this on page load to update cart count
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
});

// Add this to app.js so it runs on all pages
// Add user login status check to all pages
function checkLoginStatus() {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (user && user.isLoggedIn) {
        // Find login link in navigation
        const loginLink = document.querySelector('.nav-links a[href="login.html"]');
        
        if (loginLink) {
            // Change login link to user name with dropdown
            loginLink.innerHTML = `
                <div class="user-menu">
                    <i class="ri-user-line"></i> ${user.name} <i class="ri-arrow-down-s-line"></i>
                    <div class="dropdown-menu">
                        <a href="#" id="logout-button">Logout</a>
                    </div>
                </div>
            `;
            
            // Add logout handler
            setTimeout(() => {
                const logoutButton = document.getElementById('logout-button');
                if (logoutButton) {
                    logoutButton.addEventListener('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        // Remove user from localStorage
                        localStorage.removeItem("user");
                        
                        // Reload page
                        window.location.reload();
                    });
                }
            }, 100);
        }
    }
}

// Call this function when DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
    checkLoginStatus();
});

function removeFromCart(itemId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update UI
    updateCartPanel();
    updateCartCount();
}

function updateCartPanel() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    if (!cartItems || !cartTotal) return;
    
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="cart-empty">
                <i class="ri-shopping-cart-line"></i>
                <p>Your cart is empty</p>
            </div>
        `;
        cartTotal.innerHTML = '';
        return;
    }
    
    // Render cart items
    let totalPrice = 0;
    let itemsHtml = '';
    
    cart.forEach(item => {
        totalPrice += item.price;
        itemsHtml += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart('${item.id}')">
                    <i class="ri-delete-bin-line"></i>
                </button>
            </div>
        `;
    });
    
    cartItems.innerHTML = itemsHtml;
    cartTotal.innerHTML = `Total: $${totalPrice.toFixed(2)}`;
}

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded and parsed - extended initialization");
    updateCartCount();
    checkLoginStatus();
    
    // Setup cart panel toggle if it exists
    const cartToggle = document.getElementById("cart-toggle");
    const cartPanel = document.getElementById("cart-panel");
    const cartClose = document.getElementById("cart-close");
    
    if (cartToggle && cartPanel) {
        cartToggle.addEventListener("click", () => {
            // Update cart panel before showing
            updateCartPanel();
            
            if (cartPanel.classList.contains("active")) {
                // If already open, close it
                cartPanel.classList.remove("active");
            } else {
                // Close all panels first
                document.querySelectorAll(".utility-bar").forEach(panel => {
                    panel.classList.remove("active");
                });
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
});

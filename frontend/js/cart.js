// Initialize cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

document.addEventListener("DOMContentLoaded", () => {
    // Initialize UI elements
    initializeCartUI();
    
    // Display cart contents
    displayCart();
    
    // Update cart count badge
    updateCartCount();
});

function initializeCartUI() {
    // Setup cart panel toggle if we're on a page that has it
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
}

document.addEventListener("DOMContentLoaded", function () {
    loadCart();
});

// Load cart items when cart page is opened
function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotalContainer = document.getElementById("cart-total");
    const emptyCartMessage = document.getElementById("empty-cart");

    if (!cartItemsContainer) {
        console.error("Cart items container not found in DOM");
        return;
    }

    cartItemsContainer.innerHTML = ""; // Clear existing content
    let total = 0;

    if (cart.length === 0) {
        // Show empty cart message
        if (emptyCartMessage) {
            emptyCartMessage.style.display = "block";
        }
        if (cartTotalContainer) {
            cartTotalContainer.innerHTML = "Total: $0.00";
        }
        return;
    }

    // Hide empty cart message if we have items
    if (emptyCartMessage) {
        emptyCartMessage.style.display = "none";
    }

    // Display each cart item
    cart.forEach((item) => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("cart-item");

        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.title}" width="80">
            <div class="cart-item-info">
                <h4 class="cart-item-title">${item.title}</h4>
                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart('${item.id}')">
                <i class="ri-delete-bin-line"></i>
            </button>
        `;

        cartItemsContainer.appendChild(itemElement);
        total += item.price;
    });

    if (cartTotalContainer) {
        cartTotalContainer.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
    }
}

// Add a movie to cart
function addToCart(id, title, price, image) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Prevent duplicate items
    if (cart.some(item => item.id === id)) {
        alert("This movie is already in your cart!");
        return;
    }

    cart.push({ id, title, price, image });
    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`${title} added to cart!`);
    loadCart(); // Refresh the cart display
}

// Remove an item from the cart
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart(); // Reload cart
}

// Ensure the cart is loaded when visiting the cart page
if (window.location.pathname.includes("cart.html")) {
    document.addEventListener("DOMContentLoaded", loadCart);
}

// Function to update cart count badge
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cart.length;
    }
}

// Remove an item from the cart
function removeFromCart(itemId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.id !== itemId);
    localStorage.setItem("cart", JSON.stringify(cart));
    
    // Reload cart and update count
    loadCart();
    updateCartCount();
}

// Checkout function
function checkout() {
    alert('Thank you for your purchase!');
    localStorage.removeItem('cart');
    loadCart();
    updateCartCount();
}

// Ensure the cart is loaded when visiting the cart page
if (window.location.pathname.includes("cart.html")) {
    document.addEventListener("DOMContentLoaded", loadCart);
}

// Expose the addToCart function to window to avoid conflicts
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.checkout = checkout;

function addToCart(movieId, title, price, image) {
    // If called from a movie card, we may only have the ID
    // and need to extract other information from the DOM
    if (arguments.length === 1) {
        const movieCard = event.target.closest('.movie-card');
        if (movieCard) {
            title = movieCard.querySelector('h3').textContent;
            image = movieCard.querySelector('img').src;
            price = 9.99; // Default price
        }
    }
    
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Create a proper ID if not provided
    const id = movieId || Date.now().toString();
    
    // Prevent duplicate items
    if (cart.some(item => item.id === id || item.title === title)) {
        alert("This movie is already in your cart!");
        return;
    }

    cart.push({ 
        id: id, 
        title: title, 
        price: price || 9.99, 
        image: image 
    });
    
    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`${title} added to cart!`);
    updateCartCount();
}
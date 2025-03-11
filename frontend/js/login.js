document.addEventListener("DOMContentLoaded", () => {
    // Get form element
    const loginForm = document.querySelector(".login-form");
    
    if (loginForm) {
        // Add submit event listener
        loginForm.addEventListener("submit", handleLogin);
    }
    
    // Check if user is already logged in
    checkLoginStatus();
});

function handleLogin(event) {
    // Prevent form submission
    event.preventDefault();
    
    // Get form inputs
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    
    // Validate inputs
    if (!nameInput || !emailInput || !passwordInput) {
        showError("Form inputs not found");
        return;
    }
    
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    
    // Check if inputs are empty
    if (!name) {
        showError("Please enter your name");
        nameInput.focus();
        return;
    }
    
    if (!email) {
        showError("Please enter your email");
        emailInput.focus();
        return;
    }
    
    // Validate email format
    if (!isValidEmail(email)) {
        showError("Please enter a valid email address");
        emailInput.focus();
        return;
    }
    
    // Display loading state
    const loginButton = document.querySelector(".login-button");
    const originalButtonText = loginButton.innerHTML;
    loginButton.innerHTML = '<i class="ri-loader-4-line"></i> Logging in...';
    loginButton.disabled = true;
    
    const user = {
        email: email,
        name: name,
        isLoggedIn: true,
        loginTime: new Date().toISOString()
    };
    
    // Save user to localStorage
    localStorage.setItem("user", JSON.stringify(user));
    
    // Show success and reset button after short delay
    setTimeout(() => {
        // Show success message
        showSuccess("Login successful! Welcome, " + name);
        
        // Reset button
        loginButton.innerHTML = originalButtonText;
        loginButton.disabled = false;
        
        // Update UI to show logged in state
        updateLoginUI(user);
        
        // Optional: Clear form
        loginForm.reset();
    }, 1000);
}

// Add a success message function
function showSuccess(message) {
    // Remove any existing error messages
    const existingError = document.querySelector(".login-error");
    if (existingError) {
        existingError.remove();
    }
    
    // Check if success element already exists
    let successElement = document.querySelector(".login-success");
    
    if (!successElement) {
        // Create success element
        successElement = document.createElement("div");
        successElement.className = "login-success";
        successElement.style.color = "#4CAF50";
        successElement.style.marginBottom = "20px";
        successElement.style.padding = "10px";
        successElement.style.backgroundColor = "rgba(76, 175, 80, 0.1)";
        successElement.style.borderRadius = "4px";
        
        // Insert before form
        const loginForm = document.querySelector(".login-form");
        loginForm.parentNode.insertBefore(successElement, loginForm);
    }
    
    // Set success message
    successElement.innerHTML = `<i class="ri-check-line"></i> ${message}`;
}
function isValidEmail(email) {
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(message) {
    // Check if error element already exists
    let errorElement = document.querySelector(".login-error");
    
    if (!errorElement) {
        // Create error element
        errorElement = document.createElement("div");
        errorElement.className = "login-error";
        errorElement.style.color = "#ff6b6b";
        errorElement.style.marginBottom = "20px";
        errorElement.style.padding = "10px";
        errorElement.style.backgroundColor = "rgba(255, 107, 107, 0.1)";
        errorElement.style.borderRadius = "4px";
        
        // Insert before form
        const loginForm = document.querySelector(".login-form");
        loginForm.parentNode.insertBefore(errorElement, loginForm);
    }
    
    // Set error message
    errorElement.innerHTML = `<i class="ri-error-warning-line"></i> ${message}`;
}

function checkLoginStatus() {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (user && user.isLoggedIn) {
        // Instead of redirecting to index.html, update UI
        updateLoginUI(user);
    }
        
        // Update UI to show logged in state (this would update the header)
        updateLoginUI(user);
    }


function updateLoginUI(user) {
    // Find login link in navigation
    const loginLink = document.querySelector('.nav-links a[href="login.html"]');
    
    if (loginLink) {
        // Change login link to user name and logout option
        loginLink.innerHTML = `<i class="ri-user-line"></i> ${user.name}`;
        loginLink.href = "#";
        loginLink.addEventListener("click", handleLogout);
    }
}

function handleLogout(event) {
    event.preventDefault();
    
    // Remove user from localStorage
    localStorage.removeItem("user");
    
    // Reload page
    window.location.reload();
}
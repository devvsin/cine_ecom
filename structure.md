cine_ecom/
│── backend/
│   ├── __init__.py       # Initializes Flask app and registers blueprints
│   ├── config.py         # Stores Flask and database configuration
│   ├── db.py             # MongoDB connection file
│   ├── app.py            # Main Flask entry point
│   ├── models/           # Models folder
│   │   ├── movie.py      # Movie model (handles movie-related database functions)
│   │   ├── user.py       # User model (handles authentication)
│   │   ├── cart.py       # Cart model (handles shopping cart functionality)
│   ├── routes/           # Routes folder
│   │   ├── movie.py      # API endpoints for movies
│   │   ├── auth.py       # API endpoints for user authentication
│   │   ├── cart.py       # API endpoints for cart
│── frontend/             # Frontend folder (HTML, CSS, JS)
│   ├── css/
│   │   ├── styles.css    # Global styles
│   ├── js/
│   │   ├── app.js        # Fetches and displays movies
│   │   ├── login.js 
│   │   ├── movie-details.js
│   │   ├── movies.js
│   │   ├── cart.js        # Handles cart functionality
│   ├── index.html        # Homepage
│   ├── movie.html        # Movie details page
│   ├── login.html        # User login page
|   ├── cart.html 
│   ├── movies.html
│── .env                  # Environment variables (e.g., MongoDB URI)
│── requirements.txt      # List of dependencies (Flask, pymongo, etc.)
│── README.md             # Project documentation

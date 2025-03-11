# 🎬 CineEcom - Movie E-commerce Platform

Welcome to **CineEcom**, a web-based platform where users can **buy, rent, and explore movies** effortlessly. This project integrates a **Flask backend** with a **MongoDB database** and a **JavaScript-powered frontend** to create a seamless user experience.

---

## 📌 Features

### 🏗 Backend (Flask & MongoDB)
- User **authentication** (login, signup)
- Movie **catalog management** (CRUD operations)
- Shopping cart functionality for **purchasing and renting** movies
- Secure **MongoDB database integration**

### 🎨 Frontend (HTML, CSS, JavaScript)
- **Modern UI** with an intuitive user experience
- Dynamic **movie listings and details pages**
- Shopping **cart functionality** with real-time updates
- **User authentication** system

---

## 🚀 Tech Stack

### **Backend:**
- **Flask** (Python Web Framework)
- **MongoDB** (NoSQL Database)
- **Flask-JWT-Extended** (Authentication)
- **Flask-CORS** (Cross-Origin Requests)

### **Frontend:**
- **HTML, CSS, JavaScript**
- **AJAX / Fetch API** for data retrieval

---

## 📂 Project Structure

```
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
```

---

## 🎯 Installation & Setup

### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/devvsin/CineEcom.git
cd CineEcom
```

### **2️⃣ Backend Setup**
```bash
cd backend
python -m venv venv  # Create virtual environment
source venv/bin/activate  # Activate (Mac/Linux)
venv\Scripts\activate  # Activate (Windows)
pip install -r requirements.txt  # Install dependencies
```

### **3️⃣ Configure Environment Variables**
Create a `.env` file inside the **backend** folder:
```env
MONGO_URI=<your_mongodb_connection_string>
SECRET_KEY=<your_secret_key>
```

### **4️⃣ Run the Backend Server**
```bash
python app.py
```
The backend should now be running at `http://127.0.0.1:5000/`

### **5️⃣ Frontend Setup**
No additional setup is needed for the frontend. Simply open `index.html` in your browser or use a local server:
```bash
cd frontend
python -m http.server 8000
```
Now, visit `http://localhost:8000/` in your browser.

---

## 📌 API Endpoints

### **Authentication**
- `POST /auth/signup` → Register a new user
- `POST /auth/login` → User login (returns JWT token)

### **Movies**
- `GET /movies` → Fetch all movies
- `GET /movies/<id>` → Get details of a specific movie

### **Cart**
- `POST /cart/add` → Add a movie to the cart
- `GET /cart` → View cart items
- `DELETE /cart/remove/<id>` → Remove a movie from the cart



## 🤝 Contributing
We welcome contributions! To contribute:
1. **Fork the repository**
2. **Create a new branch** (`feature-branch`)
3. **Commit your changes**
4. **Push to GitHub**
5. **Create a pull request**

---

## 📩 Contact
💻 **Developer:** Devvrat Singh (**@devvsin**)  
📧 **Email:** devvratsingh35@gmail.com  
📌 **GitHub:** [github.com/devvsin](https://github.com/devvsin)  
📌 **LinkedIn:** [linkedin.com/in/devvsingh](https://linkedin.com/in/devvsingh)  

---

🚀 **Enjoy using CineEcom! Happy coding!** 🎥🍿


from flask import Blueprint, request, jsonify
from backend.model.user import create_user, get_user
from flask_bcrypt import check_password_hash
from flask_login import login_user, logout_user

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.json
    if get_user(data["email"]):
        return jsonify({"error": "User already exists"}), 400

    create_user(data["username"], data["email"], data["password"])
    return jsonify({"message": "User registered successfully"}), 201

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json
    user = get_user(data["email"])
    if user and check_password_hash(user["password"], data["password"]):
        login_user(user)
        return jsonify({"message": "Login successful"}), 200
    return jsonify({"error": "Invalid credentials"}), 401

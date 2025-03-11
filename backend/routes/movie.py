from flask import Blueprint, jsonify
from backend.model.movie import find_all

movie_bp = Blueprint('movie', __name__)

@movie_bp.route('/', methods=['GET'])
def get_movies():
    print("Fetching movies...")
    movies = find_all()
    print(f"Found {len(movies)} movies.")
    print(f"Movies: {movies}")
    return jsonify(movies)
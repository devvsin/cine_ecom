# backend/model/movie.py
from backend.db import db

def get_movie_collection():
    return db.db.movies

def find_all():
    print("Querying MongoDB for movies...")
    movies = list(get_movie_collection().find({}))
    for movie in movies:
        movie['_id'] = str(movie['_id'])
    print(f"MongoDB returned {len(movies)} movies.")
    return movies
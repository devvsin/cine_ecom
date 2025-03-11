# backend/db.py
from flask_pymongo import PyMongo

db = PyMongo()

def init_db(app):
    db.init_app(app)
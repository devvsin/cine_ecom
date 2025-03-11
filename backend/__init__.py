# backend/__init__.py
from flask import Flask, send_from_directory
from flask_cors import CORS
from .config import Config
from .db import init_db
from .routes.movie import movie_bp
from .routes.auth import auth_bp
from .routes.cart import cart_bp
from dotenv import load_dotenv
import os

load_dotenv()

def create_app():
    app = Flask(__name__, static_folder=os.path.join('..', 'frontend'))
    CORS(app)
    app.config.from_object(Config)

    init_db(app) #Make sure that this line is here.

    app.register_blueprint(movie_bp, url_prefix='/movies')
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(cart_bp, url_prefix='/cart')

    @app.route('/', defaults={'path': 'index.html'})
    @app.route('/<path:path>')
    def serve_static(path):
        return send_from_directory(app.static_folder, path)

    return app
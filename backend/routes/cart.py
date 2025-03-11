from flask import Blueprint, request, jsonify
from backend.model.cart import add_to_cart, get_cart

cart_bp = Blueprint("cart", __name__)

@cart_bp.route("/add", methods=["POST"])
def add_movie_to_cart():
    data = request.json
    add_to_cart(data["user_id"], data["movie"])
    return jsonify({"message": "Movie added to cart"}), 200

@cart_bp.route("/view/<user_id>", methods=["GET"])
def view_cart(user_id):
    cart = get_cart(user_id)
    return jsonify(cart), 200

# backend/model/cart.py
from flask import session
from backend.db import db
from bson.objectid import ObjectId

def get_cart_collection():
    return db.db.carts

def add_to_cart(movie_id, quantity):
    user_id = session.get('user_id')
    if user_id:
        get_cart_collection().update_one(
            {'user_id': user_id, 'movie_id': movie_id},
            {'$set': {'quantity': quantity}},
            upsert=True
        )
        return True
    return False

def get_cart():
    user_id = session.get('user_id')
    if user_id:
        return list(get_cart_collection().find({'user_id': user_id}))
    return []

def remove_from_cart(cart_item_id):
    user_id = session.get('user_id')
    if user_id:
        get_cart_collection().delete_one({'_id': ObjectId(cart_item_id), 'user_id': user_id})
        return True
    return False
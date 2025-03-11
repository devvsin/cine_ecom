# backend/model/user.py
from pymongo.errors import DuplicateKeyError
from werkzeug.security import generate_password_hash, check_password_hash

def create_user(username, password):
    from backend.db import db #import here instead.
    try:
        hashed_password = generate_password_hash(password)
        result = db.users.insert_one({
            'username': username,
            'password': hashed_password
        })
        return result.inserted_id
    except DuplicateKeyError:
        return None

def get_user(username):
    from backend.db import db #import here instead.
    return db.users.find_one({'username': username})

def verify_password(user, password):
    return check_password_hash(user['password'], password)
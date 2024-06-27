from flask_jwt_extended import create_access_token, decode_token

def create_token(identity):
    return create_access_token(identity=identity)

def decode_token(token):
    return decode_token(token)

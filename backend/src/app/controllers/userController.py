from flask import jsonify, request
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from app.services.userServices import UserService
from werkzeug.security import check_password_hash

class UserController:
    # Obtener a todos los usuarios
    @staticmethod
    def getAllUsers():
        try:
            users = UserService.getAllUsers()
            users_dicts = [user.to_dict() for user in users]
            return jsonify(users_dicts), 200
        except Exception as e:
            return jsonify({'message': str(e)}), 500
    
    @staticmethod
    def getUserById(id):
        try:
            users = UserService.get_user_by_id(id)
            # users_dicts = [user.from_dict() for user in users]
            return jsonify(users.to_dict()), 200
        except Exception as e:
            return jsonify({'message': str(e)}), 500

    # Registrar un nuevo usuario
    @staticmethod
    def register():
        try:
            data = request.get_json()
            user = UserService.create_user(
                photo=data['photo'],
                fullName=data['fullName'],
                email=data['email'],
                phone=data['phone'],
                state=data['state'],
                post=data['post'],
                address=data['address'],
                city=data['city'],
                postalCode=data['postalCode'],
            )
            return jsonify({'message': 'Usuario creado con éxito', 'user': user.to_dict()}), 201
        except Exception as e:
            return jsonify({'message': str(e)}), 500

    # Iniciar sesión con un usuario ya registrado previamente
    @staticmethod
    def login():
        try:
            data = request.get_json()
            email = data.get('email')
            password = data.get('password')
            if not email or not password:
                return jsonify({'message': '¡Error... Ingrese usuario y contraseña!'}), 400
            user = UserService.get_user_by_email(email)
            if user and check_password_hash(user.password, password):
                access_token = create_access_token(identity={'email': user.email})
                return jsonify(access_token=access_token), 200
            else:
                return jsonify({'message': '¡Email o contraseña incorrecta!'}), 401
        except Exception as e:
            return jsonify({'message': str(e)}), 500

    # Actualizar usuario
    @staticmethod
    def update(id):
        try:
            data = request.get_json()
            updated_user = UserService.update_user(id, data)
            return jsonify({'message': 'Usuario actualizado con éxito!', 'user': updated_user}), 200
        except Exception as e:
            return jsonify({'message': str(e)}), 500

    # Eliminar usuario
    @staticmethod
    def delete(id):
        try:
            UserService.delete_user(id)
            return jsonify({'message': '¡Usuario eliminado con éxito!'}), 200
        except Exception as e:
            return jsonify({'message': str(e)}), 500
        
    @staticmethod
    def count():
        try:
            count = UserService.count_employees()
            return jsonify({'count': count}), 200
        except Exception as e:
            return jsonify({'message': str(e)}), 500

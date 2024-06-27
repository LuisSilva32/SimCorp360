from flask import current_app
from app.models.userModel import User
from werkzeug.security import generate_password_hash, check_password_hash

class UserService:
    @staticmethod
    def getAllUsers():
        try:
            users_data = current_app.db.users.find()
            users = [User.from_dict(user) for user in users_data]
            for user in users:
                user._id = str(user._id)
            return users
        except Exception as e:
            raise Exception(f"¡Error al obtener usuarios!: {str(e)}")

    @staticmethod
    def create_user(photo, fullName, email, phone, state, post, address, city, postalCode):
        try:
            user = User(photo=photo, fullName=fullName, email=email, phone=phone, state=state, post=post, address=address, city=city, postalCode=postalCode)
            user_data = user.to_dict()
            current_app.db.users.insert_one(user_data)
            return user
        except Exception as e:
            raise Exception(f"¡Error al crear usuario!: {str(e)}")

    @staticmethod
    def get_user_by_email(email):
        try:
            user_data = current_app.db.users.find_one({'email': email})
            if user_data:
                return User.from_dict(user_data)
            return None
        except Exception as e:
            raise Exception(f"¡Error al obtener usuario!: {str(e)}")
        
    @staticmethod
    def get_user_by_id(id):
        try:
            user_data = current_app.db.users.find_one({'_id': id})
            if user_data:
                return User.from_dict(user_data)
            return None
        except Exception as e:
            raise Exception(f"¡Error al obtener usuario!: {str(e)}")

    @staticmethod
    def update_user(id, new_data):
        try:
            current_app.db.users.update_one({'_id': id}, {'$set': new_data})
        except Exception as e:
            raise Exception(f"¡Error al actualizar usuario!: {str(e)}")

    @staticmethod
    def delete_user(id):
        try:
            result = current_app.db.users.delete_one({'_id': id})
            if result.deleted_count == 0:
                raise Exception("Usuario no encontrado")
        except Exception as e:
            raise Exception(f"¡Error al eliminar usuario!: {str(e)}")
        
    
    @staticmethod
    def count_employees():
        try:
            count = current_app.db.users.count_documents({})
            return count
        except Exception as e:
            raise Exception(f"Error al contar empleados: {str(e)}")

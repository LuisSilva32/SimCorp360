from flask import Blueprint
from app.controllers.userController import UserController

user_bp = Blueprint('user_bp', __name__)

user_bp.route('/users/id/<string:id>', methods=['GET'])(UserController.getUserById)
user_bp.route('/users/', methods=['GET'])(UserController.getAllUsers)
user_bp.route('/users/register', methods=['POST'])(UserController.register)
user_bp.route('/users/login', methods=['POST'])(UserController.login)
user_bp.route('/users/update/<string:id>', methods=['PUT'])(UserController.update)
user_bp.route('/users/delete/<string:id>', methods=['DELETE'])(UserController.delete)
user_bp.route('/users/count', methods=['GET'])(UserController.count)

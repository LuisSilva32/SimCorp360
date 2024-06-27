from flask import Blueprint
from app.controllers.productController import ProductController

product_bp = Blueprint('product_bp', __name__)

product_bp.route('/products/id/<string:id>', methods=['GET'])(ProductController.getProductById)
product_bp.route('/products/', methods=['GET'])(ProductController.getAllProducts)
product_bp.route('/products/register', methods=['POST'])(ProductController.register)
product_bp.route('/products/update/<string:id>', methods=['PUT'])(ProductController.update)
product_bp.route('/products/delete/<string:id>', methods=['DELETE'])(ProductController.delete)
product_bp.route('/products/count', methods=['GET'])(ProductController.count)
product_bp.route('/products/cards', methods=['GET'])(ProductController.getRandomProducts)

from flask import jsonify, request
from app.services.productServices import ProductService
from werkzeug.security import check_password_hash

class ProductController:
    # Obtener a todos los usuarios
    @staticmethod
    def getAllProducts():
        try:
            products = ProductService.getAllProducts()
            products_dicts = [product.to_dict() for product in products]
            return jsonify(products_dicts), 200
        except Exception as e:
            return jsonify({'message': str(e)}), 500
    
    @staticmethod
    def getProductById(id):
        try:
            products = ProductService.get_product_by_id(id)
            # users_dicts = [user.from_dict() for user in users]
            return jsonify(products.to_dict()), 200
        except Exception as e:
            return jsonify({'message': str(e)}), 500

    # Registrar un nuevo usuario
    @staticmethod
    def register():
        try:
            data = request.get_json()
            product = ProductService.create_product(
                img=data['img'],
                name=data['name'],
                category=data['category'],
                price=data['price'],
                stock=data['stock'],
                description=data['description'],
                cost=data['cost'],
                state=data['state']
            )
            return jsonify({'message': 'Usuario creado con éxito', 'product': product.to_dict()}), 201
        except Exception as e:
            return jsonify({'message': str(e)}), 500

    
    # Actualizar usuario
    @staticmethod
    def update(id):
        try:
            data = request.get_json()
            updated_product = ProductService.update_product(id, data)
            return jsonify({'message': 'Producto actualizado con éxito!', 'user': updated_product}), 200
        except Exception as e:
            return jsonify({'message': str(e)}), 500

    # Eliminar usuario
    @staticmethod
    def delete(id):
        try:
            ProductService.delete_product(id)
            return jsonify({'message': '¡Producto eliminado con éxito!'}), 200
        except Exception as e:
            return jsonify({'message': str(e)}), 500
        
    @staticmethod
    def count():
        try:
            count = ProductService.count()
            return jsonify({'count': count}), 200
        except Exception as e:
            return jsonify({'message': str(e)}), 500
    

    @staticmethod
    def getRandomProducts():
        try:
            random_products = ProductService.get_random_products()
            random_products_dicts = [product.to_dict() for product in random_products]
            return jsonify(random_products_dicts), 200
        except Exception as e:
            return jsonify({'message': str(e)}), 500
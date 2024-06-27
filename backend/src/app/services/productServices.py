from flask import current_app
from app.models.productModel import Product
import random


class ProductService:
    @staticmethod
    def getAllProducts():
        try:
            products_data = current_app.db.products.find()
            products = [Product.from_dict(pro) for pro in products_data]
            for product in products:
                product._id = str(product._id)
            return products
        except Exception as e:
            raise Exception(f"¡Error al obtener Productos!: {str(e)}")

    @staticmethod
    def create_product(img, name, category, price, stock, description, cost, state):
        try:
            product = Product(img=img, name=name, category=category, price=price, stock=stock, description=description, cost=cost, state=state)
            product_data = product.to_dict()
            current_app.db.products.insert_one(product_data)
            return product
        except Exception as e:
            raise Exception(f"¡Error al insertar producto!: {str(e)}")


    @staticmethod
    def get_product_by_id(id):
        try:
            product_data = current_app.db.products.find_one({'_id': id})
            if product_data:
                return Product.from_dict(product_data)
            return None
        except Exception as e:
            raise Exception(f"¡Error al obtener producto!: {str(e)}")

    @staticmethod
    def update_product(id, new_data):
        try:
            current_app.db.products.update_one({'_id': id}, {'$set': new_data})
        except Exception as e:
            raise Exception(f"¡Error al actualizar producto!: {str(e)}")

    @staticmethod
    def delete_product(id):
        try:
            result = current_app.db.products.delete_one({'_id': id})
            if result.deleted_count == 0:
                raise Exception("Producto no encontrado")
        except Exception as e:
            raise Exception(f"¡Error al eliminar Producto!: {str(e)}")
        
    @staticmethod
    def count():
        try:
    
        # Count the documents 
            count = current_app.db.products.count_documents({})
        
            return count
        except Exception as e:
            raise Exception(f"Error al contar pedidos: {str(e)}")
        
    @staticmethod
    def get_random_products():
        try:
            # Obtenemos el número total de productos en la base de datos
            total_products = current_app.db.products.count_documents({})
            
            # Si hay menos de 10 productos en la base de datos, ajustamos el límite
            limit = min(total_products, 10)
            
            # Generamos una lista de índices aleatorios
            random_indices = random.sample(range(total_products), limit)
            
            # Utilizamos aggregate para obtener productos aleatorios por índice
            random_products = current_app.db.products.aggregate([
                { '$match': {} },  # Filtramos todos los documentos
                { '$skip': random.choice(range(total_products)) },  # Saltamos un número aleatorio de documentos
                { '$limit': 10 }  # Limitamos a 10 documentos
            ])
            
            # Convertimos los datos obtenidos en objetos Product
            products = [Product.from_dict(product) for product in random_products]
            
            # Convertimos el _id a formato string si es necesario
            for product in products:
                product._id = str(product._id)
            
            return products
        
        except Exception as e:
            raise Exception(f"¡Error al obtener productos aleatorios!: {str(e)}")
    
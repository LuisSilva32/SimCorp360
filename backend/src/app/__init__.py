# Importaciones necesarias
from flask import Flask
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
import os

# Cargar variables de entorno desde el archivo .env
load_dotenv()

# Crear la aplicación Flask
app = Flask(__name__)
app.config.from_object('app.config.Config')

# Configurar CORS globalmente para todas las rutas que coincidan con /api/* y /fin/*
CORS(app, resources={
    r"/api/*": {"origins": "http://localhost:5173", "methods": ["GET", "POST", "PUT", "DELETE"]},
    r"/fin/*": {"origins": "http://localhost:5173", "methods": ["GET"]}
})

# Configurar Bcrypt para encriptación de contraseñas
bcrypt = Bcrypt(app)

# Configurar la conexión a MongoDB
try:
    client = MongoClient(app.config['MONGO_URI'])
    app.db = client[app.config['MONGO_DB_NAME']]
    print("¡Conexión a MongoDB exitosa!")
except Exception as e:
    print(f"¡Error al intentar conectar con MongoDB!: {e}")

# Configurar la clave de API de Finage
app.finage = app.config['FINAGE_API_KEY']

# Importar y registrar los blueprints
from app.routes import user_bp, product_bp, orders_bp, stock_bp

app.register_blueprint(user_bp, url_prefix='/api')
app.register_blueprint(product_bp, url_prefix='/api')
app.register_blueprint(orders_bp, url_prefix='/api')
app.register_blueprint(stock_bp, url_prefix='/api')

# Iniciar la aplicación Flask
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')

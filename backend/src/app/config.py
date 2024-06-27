import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'supersecretkey'
    MONGO_URI = os.environ.get('MONGO_URI') or 'mongodb+srv://lesilva:lesilva@coca-cola.hxxtw2c.mongodb.net/?retryWrites=true&w=majority&appName=Coca-Cola'
    MONGO_DB_NAME = os.environ.get('MONGO_DB_NAME') or 'CocaCola'
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY') or 'jwtsecretkey'
    FINAGE_API_KEY = os.environ.get('FINAGE_API_KEY') or 'API_KEY655sfnxaIkHzLd089eedJY1QkzL7yao9a0qn13jWo00Nro'

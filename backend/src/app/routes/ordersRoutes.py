from flask import Blueprint
from app.controllers.ordersController import OrdersController

orders_bp = Blueprint('orders_bp', __name__)

orders_bp.route('/orders/count', methods=['GET'])(OrdersController.count)
orders_bp.route('/orders/earnings', methods=['GET'])(OrdersController.earnings)
orders_bp.route('/orders/', methods=['GET'])(OrdersController.getAllOrders)
orders_bp.route('/orders/sales', methods=['GET'])(OrdersController.sales)
orders_bp.route('/orders/salesdata', methods=['GET'])(OrdersController.sales_data)
orders_bp.route('/orders/register', methods=['POST'])(OrdersController.register)
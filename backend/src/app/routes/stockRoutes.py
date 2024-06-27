from flask import Blueprint
from app.controllers.stockControllers import StockController

stock_bp = Blueprint('stock_bp', __name__)

stock_bp.route('/stocks/chart/<string:symbol>', methods=['GET'])(StockController.get_stock_chart)
stock_bp.route('/stocks/simulate', methods=['POST'])(StockController.simulate_investment)


from flask import jsonify, request
from app.services.stockServices import StockService

class StockController:
    @staticmethod
    def get_stock_chart(symbol):
        data = StockService.get_stock_data(symbol)
        if 'error' in data:
            return jsonify({"error": data['error']}), 404
        return jsonify(data)

    @staticmethod
    def simulate_investment():
        data = request.get_json()
        symbol = data.get('symbol')
        investment = float(data.get('investment'))
        period = int(data.get('period'))

        try:
            result = StockService.predict_stock(symbol, investment, period)
            return jsonify(result), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 400
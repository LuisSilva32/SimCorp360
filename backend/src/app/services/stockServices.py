import yfinance as yf
from statsmodels.tsa.statespace.sarimax import SARIMAX
import pandas as pd

class StockService:
    @staticmethod
    def get_stock_data(symbol):
        stock = yf.Ticker(symbol)
        hist_data = stock.history(period='1y')
        if hist_data.empty:
            return {"error": f"No price data found for {symbol}"}

        hist_data.reset_index(inplace=True)
        hist_data['date'] = hist_data['Date'].dt.strftime('%Y-%m-%d')
        return hist_data[['date', 'Open', 'High', 'Low', 'Close', 'Volume']].to_dict(orient='records')
    
    @staticmethod
    def predict_stock(symbol, investment, period):
    # Obtener datos históricos de la acción
        stock = yf.Ticker(symbol)
        hist_data = stock.history(period='3y')

        # Modelo SARIMA
        model = SARIMAX(hist_data['Close'], order=(1, 1, 1), seasonal_order=(1, 1, 1, 12))
        model_fit = model.fit()

        # Predicción
        forecast = model_fit.get_forecast(steps=period)
        future_price = forecast.predicted_mean.iloc[-1]

        # Calcular el valor predicho y la ganancia/pérdida
        initial_price = hist_data['Close'][-1]
        predicted_value = (future_price / initial_price) * investment
        profit_loss = predicted_value - investment

        return {
            'symbol': symbol,
            'investment': investment,
            'period': period,
            'future_price': future_price,
            'predicted_value': predicted_value,
            'profit_loss': profit_loss
        }
from flask import current_app
from datetime import datetime, timedelta
from app.models.orderModels import Order

class OrdersService:


    @staticmethod
    def getAllOrders():
        try:
            orders_data = current_app.db.pedidos.find({}).sort("Fecha", -1).limit(100)
            orders = [Order.from_dict(orde) for orde in orders_data]
            for order in orders:
                order._id = str(order._id)
            return orders
        except Exception as e:
            raise Exception(f"¡Error al obtener Pedidos!: {str(e)}")
        
    @staticmethod
    def create_order(Ciudad, Cantidad, id_producto, precio_total):
        try:
            now = datetime.now()
            fecha = now.strftime("%Y-%m-%d")
            hora = now.strftime("%H:%M:%S")

            order = Order(Ciudad=Ciudad, Cantidad=Cantidad, id_producto=id_producto, precio_total=precio_total, Fecha=fecha, Hora=hora)
            order_data = order.to_dict()
            current_app.db.pedidos.insert_one(order_data)
            return order
        except Exception as e:
            raise Exception(f"¡Error al insertar producto!: {str(e)}")



    @staticmethod
    def count_orders():
        try:
        
        # Count the documents with a Fecha greater than or equal to the threshold
            count = current_app.db.pedidos.count_documents({})
        
            return count
        except Exception as e:
            raise Exception(f"Error al contar pedidos: {str(e)}")


    @staticmethod
    def earnings():
        try:
            total_earnings = 0

            # date_threshold = datetime(2023, 7, 1)
            
            orders = current_app.db.pedidos.find({})

            for order in orders:
                order_earnings = 0

                # Obtener el id_producto y cantidad vendida del pedido
                product_id = order['id_producto']
                cantidad = float(order['Cantidad'])

                # Obtener el costo del producto desde la colección de productos
                product_info = current_app.db.products.find_one({"_id": product_id})
                if product_info:
                    cost = float(product_info['cost'])

                    # Calcular la ganancia por este pedido
                    order_earnings = (order['precio_total']) -  ( cantidad * cost)

                # Sumar la ganancia del pedido al total de ganancias
                total_earnings += order_earnings

            return total_earnings

        except Exception as e:
            raise Exception(f"Error al calcular ganancias: {str(e)}")
    
    @staticmethod
    def sales():
        try:
        # Define the start date as the first day of the previous month
            end_date = datetime.now().replace(day=1) - timedelta(days=1)
            start_date = end_date.replace(day=1)

            # Fetch orders within the date range
            orders_data = current_app.db.pedidos.find({
                "Fecha": {"$gte": start_date, "$lte": end_date}
            })

            # Initialize a dictionary to hold the sales totals per week
            sales_totals = {}

            # Process each order
            for order_data in orders_data:
                order = Order.from_dict(order_data)
                order_date = order.Fecha  # Assuming Fecha is already a datetime object
                # Calculate the week number within the month
                week_number = (order_date.day - 1) // 7 + 1
                week_name = f"Semana {week_number}"
                # Initialize the week total if it doesn't exist
                if week_name not in sales_totals:
                    sales_totals[week_name] = 0
                sales_totals[week_name] += order.precio_total

            # Convert the dictionary to a list of dictionaries
            sales_totals_list = [{"name": week, "total": total} for week, total in sales_totals.items()]

            return sales_totals_list

        except Exception as e:
            raise Exception(f"Error al obtener totales de ventas por semana: {str(e)}")

    @staticmethod
    def sales_data():
        try:
        # Obtener la fecha actual y calcular el rango de las últimas dos semanas
            now = datetime.now()
            end_of_last_week = now - timedelta(days=now.weekday() + 1)
            start_of_last_week = end_of_last_week - timedelta(days=6)
            start_of_week_before_last = start_of_last_week - timedelta(days=7)
            
            # Obtener las ventas de la última semana
            last_week_sales = current_app.db.pedidos.find({
                "Fecha": {"$gte": start_of_last_week, "$lte": end_of_last_week}
            })
            
            # Obtener las ventas de la semana pasada
            week_before_last_sales = current_app.db.pedidos.find({
                "Fecha": {"$gte": start_of_week_before_last, "$lte": start_of_last_week}
            })
            
            # Calcular los totales de ventas
            last_week_total = sum(order["precio_total"] for order in last_week_sales)
            week_before_last_total = sum(order["precio_total"] for order in week_before_last_sales)
            
            # Calcular la diferencia y el porcentaje
            sales_difference = last_week_total - week_before_last_total
            percentage_to_target = (last_week_total / week_before_last_total) * 100 if week_before_last_total > 0 else 0
            
            return {
                "last_week_total": last_week_total,
                "week_before_last_total": week_before_last_total,
                "sales_difference": sales_difference,
                "percentage_to_target": percentage_to_target
            }
        except Exception as e:
            raise Exception(f"¡Error al obtener datos de ventas!: {str(e)}")

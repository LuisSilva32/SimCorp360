from bson.objectid import ObjectId

class Order:
    def __init__(self, _id=None, Ciudad=None, Cantidad=None, id_producto=None, precio_total=None, Fecha=None, Hora=None, state=None):
        self._id = _id if _id else ObjectId()
        self.Ciudad = Ciudad
        self.Cantidad = Cantidad
        self.id_producto = id_producto
        self.precio_total = precio_total
        self.Fecha = Fecha
        self.Hora = Hora

    def to_dict(self):
        return {
            '_id': str(self._id),
            'Ciudad': self.Ciudad,
            'Cantidad': self.Cantidad,
            'id_producto': self.id_producto,
            'precio_total': self.precio_total,
            'Fecha': self.Fecha,
            'Hora': self.Hora,
        }

    @staticmethod
    def from_dict(data):
        return Order(
            _id=data.get('_id'),
            Ciudad=data.get('Ciudad'),
            Cantidad=data.get('Cantidad'),
            id_producto=data.get('id_producto'),
            precio_total=data.get('precio_total'),
            Fecha=data.get('Fecha'),
            Hora=data.get('Hora'),
        )

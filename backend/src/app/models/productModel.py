from bson.objectid import ObjectId

class Product:
    def __init__(self, _id=None, img=None, name=None, category=None, price=None, cost=None, stock=None, description=None, state=None):
        self._id = _id if _id else ObjectId()
        self.img = img
        self.name = name
        self.category = category
        self.price = price
        self.stock = stock
        self.description = description
        self.cost = cost
        self.state = state

    def to_dict(self):
        return {
            '_id': str(self._id),
            'img': self.img,
            'name': self.name,
            'category': self.category,
            'price': self.price,
            'stock': self.stock,
            'description': self.description,
            'cost': int(self.cost),
            'state': self.state
        }

    @staticmethod
    def from_dict(data):
        return Product(
            _id=data.get('_id'),
            img=data.get('img'),
            name=data.get('name'),
            category=data.get('category'),
            price=data.get('price'),
            stock=data.get('stock'),
            description=data.get('description'),
            cost=data.get('cost'),
            state=data.get('state')
        )

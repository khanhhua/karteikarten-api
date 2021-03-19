from flask_mongoengine import MongoEngine

db = MongoEngine()

class User(db.Document):
    meta = {
        'collection': 'users'
    }

    username = db.StringField(required=True, max_length=50)


class Card(db.Document):
    meta = {
        'collection': 'cards'
    }

    front = db.StringField(required=True, max_length=50)
    back = db.StringField(required=True, max_length=50)
    owner_id = db.ReferenceField('User', required=True)
    media_id = db.StringField(max_length=255)


class Collection(db.Document):
    meta = {
        'collection': 'collections'
    }

    title = db.StringField(required=True, max_length=50)
    owner_id = db.ReferenceField('User', required=True)
    item_ids = db.ListField()


class Stat(db.Document):
    meta = {
        'collection': 'stats'
    }

    corrects = db.DoubleField(required=True, default=0.0)
    wrongs = db.DoubleField(required=True, default=0.0)
    ignores = db.DoubleField(required=True, default=0.0)
    owner_id = db.ReferenceField('User', required=True)

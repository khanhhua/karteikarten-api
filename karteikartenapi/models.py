import datetime

from flask_mongoengine import MongoEngine

db = MongoEngine()

class User(db.Document):
    meta = {
        'collection': 'users'
    }

    display_name = db.StringField(required=True, max_length=50)
    username = db.StringField(required=True, max_length=50)
    recent_collection_ids = db.ListField()

    @classmethod
    def query_by_username(cls, username):
        return cls.objects.filter(username__exact=username).first()


    @classmethod
    def query_by_user_id(cls, user_id):
        return cls.objects(id=user_id).first()


class Card(db.Document):
    meta = {
        'collection': 'cards'
    }

    owner_id = db.ReferenceField('User', required=True)
    front = db.StringField(required=True, max_length=50)
    back = db.StringField(required=True, max_length=50)
    media_id = db.StringField(max_length=255)
    created_at = db.DateTimeField(required=True, default=datetime.datetime.utcnow)

    def to_json(self):
        return dict(
            id=str(self.id),
            front=self.front,
            back=self.back,
            media_id=self.media_id
        )

    @classmethod
    def query_by_user_id(cls, user_id):
        return cls.objects.filter(owner_id__exact=user_id)

    @classmethod
    def get_by_card_id(cls, card_id):
        return cls.objects.filter(id__exact=card_id).first()

    @classmethod
    def get_by_card_ids(cls, card_ids):
        return cls.objects.filter(id__in=card_ids)


class Collection(db.Document):
    meta = {
        'collection': 'collections'
    }

    title = db.StringField(required=True, max_length=50)
    owner_id = db.ReferenceField('User', required=True)
    item_ids = db.ListField()
    created_at = db.DateTimeField(required=True, default=datetime.datetime.utcnow)

    def to_json(self):
        return dict(
            id=str(self.id),
            title=self.title,
            owner_id=str(self.owner_id),
            item_ids=self.item_ids
        )

    @classmethod
    def query_by_user_id(cls, user_id):
        return cls.objects.filter(owner_id__exact=user_id)

    @classmethod
    def get_by_collection_id(cls, collection_id):
        return cls.objects.filter(id__exact=collection_id).first()

    @classmethod
    def get_by_collection_ids(cls, collection_ids):
        return cls.objects.filter(id__in=collection_ids)


class ScoreCard(db.Document):
    meta = {
        'collection': 'stats'
    }

    corrects = db.FloatField(required=True, default=0.0)
    wrongs = db.FloatField(required=True, default=0.0)
    skippeds = db.FloatField(required=True, default=0.0)
    user_id = db.LazyReferenceField('User', required=True)
    card_id = db.LazyReferenceField('Card', required=True)
    updated_at = db.DateTimeField(required=True, default=datetime.datetime.utcnow)

    def to_json(self):
        return dict(
            corrects=self.corrects,
            wrongs=self.wrongs,
            skippeds=self.skippeds,
            user_id=str(self.user_id.id),
            card_id=str(self.card_id.id)
        )

    @classmethod
    def query_by_card_id(cls, user_id, card_id):
        return cls.objects.filter(user_id__exact=user_id,
                                  card_id__exact=card_id).first()


class Media(db.Document):
    meta = {
        'collection': 'media'
    }

    owner_id = db.ReferenceField('User', required=True)
    uri = db.StringField(required=True, max_length=255)
    content_type = db.StringField(required=True)
    card_ids = db.ListField()

    def to_json(self):
        pass

    @classmethod
    def get_by_media_id(cls, media_id):
        pass
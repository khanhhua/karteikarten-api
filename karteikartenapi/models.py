import os
import mock
import google.auth.credentials
from google.cloud import ndb

CLOUD_STORAGE_BASE_URL = os.getenv('CLOUD_STORAGE_BASE_URL', 'https://storage.googleapis.com')


def setup_db():
    if os.getenv('GAE_ENV', '').startswith('standard'):
        # production
        return ndb.Client()
    else:
        os.environ["DATASTORE_DATASET"] = "test"
        os.environ["DATASTORE_PROJECT_ID"] = "test"
        os.environ["DATASTORE_EMULATOR_HOST"] = "localhost:8001"
        os.environ["DATASTORE_EMULATOR_HOST_PATH"] = "localhost:8001/datastore"
        os.environ["DATASTORE_HOST"] = "http://localhost:8001"

        credentials = mock.Mock(spec=google.auth.credentials.Credentials)
        return ndb.Client(project="test", credentials=credentials)


db = setup_db()


class User(ndb.Model):
    """
    User of the API
    """
    display_name = ndb.StringProperty()
    username = ndb.StringProperty()
    password = ndb.BlobProperty()
    recent_collection_ids = ndb.IntegerProperty(repeated=True)

    @classmethod
    def query_by_username(cls, username):
        result = cls.query(User.username == username).fetch(limit=1)
        if len(result) == 0:
            return None

        return result[0]

    @classmethod
    def query_by_user_id(cls, user_id):
        key = ndb.Key(cls, user_id)
        return key.get()


class Card(ndb.Model):
    """
    Card created by user
    """
    owner_id = ndb.KeyProperty(kind=User)
    front = ndb.StringProperty()
    back = ndb.StringProperty()
    media_id = ndb.KeyProperty(kind='Media')
    created_at = ndb.DateTimeProperty(auto_now_add=True)

    def to_json(self):
        dict_data = self.to_dict(exclude=('created_at', 'owner_id', 'media_id'))
        dict_data['created_at'] = self.created_at.isoformat()
        dict_data['id'] = self.key.id()
        dict_data['owner_id'] = self.owner_id.id()
        dict_data['media_id'] = self.media_id.id() if self.media_id is not None else None

        return dict_data

    @classmethod
    def query_by_user_id(cls, user_id):
        return cls.query(Card.owner_id == ndb.Key(User, user_id))

    @classmethod
    def get_by_card_id(cls, card_id):
        key = ndb.Key(cls, card_id)
        return key.get()

    @classmethod
    def get_by_card_ids(cls, card_ids):
        keys = [ndb.Key(Card, item) if isinstance(item, int) else item for item in card_ids]
        return ndb.get_multi(keys)


class Collection(ndb.Model):
    """
    Collection of cards
    """
    owner_id = ndb.KeyProperty(kind=User)
    item_ids = ndb.KeyProperty(kind=Card, repeated=True)
    title = ndb.StringProperty()
    created_at = ndb.DateTimeProperty(auto_now_add=True)

    def to_json(self):
        dict_data = self.to_dict()
        dict_data['created_at'] = self.created_at.isoformat()
        dict_data['id'] = self.key.id()
        dict_data['owner_id'] = self.owner_id.id()
        dict_data['item_ids'] = [item.id() for item in self.item_ids]

        return dict_data

    @classmethod
    def query_by_user_id(cls, user_id):
        return cls.query(Collection.owner_id == ndb.Key(User, user_id))\
            .order(-Collection.created_at)

    @classmethod
    def get_by_collection_id(cls, collection_id):
        key = ndb.Key(cls, collection_id)
        return key.get()

    @classmethod
    def get_by_collection_ids(cls, collection_ids):
        keys = [ndb.Key(Collection, item) if isinstance(item, int) else item for item in collection_ids]
        return ndb.get_multi(keys)


class ScoreCard(ndb.Model):
    """
    Statistics of user performance
    """
    user_id = ndb.KeyProperty(kind=User)
    card_id = ndb.KeyProperty(kind=Card)
    corrects = ndb.IntegerProperty(default=0)
    wrongs = ndb.IntegerProperty(default=0)
    skippeds = ndb.IntegerProperty(default=0)
    updated_at = ndb.DateTimeProperty(auto_now_add=True, auto_now=True)

    def to_json(self):
        dict_data = self.to_dict()
        dict_data['id'] = self.key.id()
        dict_data['user_id'] = self.user_id.id()
        dict_data['card_id'] = self.card_id.id()

        return dict_data

    @classmethod
    def query_by_card_id(cls, user_id, card_id):
        results, _next_cursor, _more = cls.query(ScoreCard.user_id == ndb.Key(User, user_id),
                                                 ScoreCard.card_id == ndb.Key(Card, card_id)).fetch_page(1)
        if len(results) == 0:
            return None

        return results[0]


class Media(ndb.Model):
    """
    Uploaded media
    """
    owner_id = ndb.KeyProperty(kind=User)
    # /kartaikarten-media/123456789098765
    uri = ndb.StringProperty()
    # MIME-TYPE image/jpg, image/png, image/gif
    content_type = ndb.StringProperty()
    # List of keys for cards that refers to this media
    card_ids = ndb.KeyProperty(kind=Card, repeated=True)

    def to_json(self):
        dict_data = self.to_dict(exclude=('owner_id', 'card_ids'))
        dict_data['url'] = '%s%s' % (CLOUD_STORAGE_BASE_URL, self.uri)
        return dict_data

    @classmethod
    def get_by_media_id(cls, media_id):
        key = ndb.Key(cls, media_id)
        return key.get()

from flask import jsonify, request, make_response
from jose import jwt
from google.cloud.ndb import Key

from google.auth import default as GaDefault
from google.auth.iam import Signer
from google.auth.transport.requests import Request

from . import models
from . import stats
from .auth import (
    current_user,
    identity
)

credentials, project_id = GaDefault()
signer = Signer(Request(), credentials, 'karteikarten-263719@appspot.gserviceaccount.com')


def login():
    return jsonify(jwt="base64")


def register():
    data = request.json
    id_token = data['id_token']

    try:
        payload = jwt.get_unverified_claims(id_token)  # TODO production: verify must be True
        user = models.User.query_by_username(payload['email'])
        is_new = False
        if user is None:
            user = models.User(username=payload['email'],
                               display_name=payload['name'])
            user.put()
            is_new = True

        access_token = jwt.encode({
            'sub': user.key.id(),
        }, 's3cre3t')

        return jsonify(ok=True, is_new=is_new, access_token=access_token)
    except ValueError:
        return make_response((jsonify(ok=False), 403))


def list_cards():
    user_id = identity()
    cards, next_cursor, more = models.Card.query_by_user_id(user_id).fetch_page(10)
    # TODO handle cursor

    return jsonify(ok=True,
                   cards=[item.to_json() for item in cards],
                   next_cursor=next_cursor.urlsafe() if more else None)


def create_card():
    user_id = identity()

    data = request.json
    media_id = data['media_id'] if 'media_id' in data else None
    media = models.Media.query_by_media_id(media_id)
    if media is None:
        media_id = None

    card = models.Card(
        owner_id=Key(models.User, user_id),
        front=data['front'],
        back=data['back'],
        media_id=media_id
    )
    card_key = card.put()  # returns key
    if media is not None:
        media.populate(card_ids=media.card_ids + [card_key])
        media.put()

    return jsonify(ok=True, card=card.to_json())


def get_card_by_id(card_id):
    card = models.Card.get_by_card_id(card_id)
    if card is None:
        return make_response((jsonify(ok=False, error='Not found'), 404))

    media = card.media_id.get() if card.media_id is not None else None
    if media is None:
        return jsonify(ok=True, card=card.to_json())
    else:
        json = card.to_json()
        json['media'] = media.to_json()

        return jsonify(ok=True, card=json)


def update_card_by_id(card_id):
    user_id = identity()
    card = models.Card.get_by_card_id(card_id)

    if card is None:
        return make_response((jsonify(ok=False, error='Not found'), 404))
    if card.owner_id.id() != user_id:
        return make_response((jsonify(ok=False, error='Not allowed'), 403))

    EDITABLES = ['back', 'front', 'media_id']

    old_media_id = card.media_id
    old_media = card.media_id.get() if old_media_id is not None else None

    updated_media_id = request.json['media_id'] if 'media_id' in request.json else None
    updated_media = models.Media.get_by_media_id(updated_media_id)
    if updated_media is None:
        request.json['media_id'] = None
    else:
        request.json['media_id'] = updated_media.key

    data = {k: v for (k, v) in request.json.items() if k in EDITABLES}
    card.populate(**data)
    card.put()

    if old_media_id == updated_media_id:
        pass
    else:
        if updated_media is not None:
            card_ids = [item.id() for item in updated_media.card_ids]
            if card_id not in card_ids:
                updated_media.populate(card_ids=card_ids + [Key(models.Card, card_id)])
                updated_media.put()
        if old_media is not None:
            card_ids = [item.id() for item in old_media.card_ids]
            if card_id in card_ids:
                card_index = card_ids.index(card_id)
                del old_media.card_ids[card_index]
                updated_media.put()

    return jsonify(ok=True, card=card.to_json())


def list_collections():
    param_features = request.args.get('features')

    user_id = identity()
    with models.db.context():
        collections, next_cursor, more = models.Collection\
                .query_by_user_id(user_id)\
                .fetch_page(page_size=20)

    if param_features is None:
        return jsonify(ok=True,
                       collections=[item.to_json() for item in collections],
                       next_cursor=next_cursor.urlsafe() if more else None)

    features = param_features.split(',')
    if 'stats' in features:
        collections = [stats.collection_stats(user_id, item.to_json()) for item in collections]
        return jsonify(ok=True,
                       collections=collections,
                       next_cursor=next_cursor.urlsafe() if more else None)
    else:
        return jsonify(ok=True,
                       collections=[item.to_json() for item in collections],
                       next_cursor=next_cursor.urlsafe() if more else None)


def list_recent_collections():
    param_features = request.args.get('features')

    user = current_user()
    collections = models.Collection.get_by_collection_ids(user.recent_collection_ids)

    if param_features is None:
        return jsonify(ok=True,
                       collections=[item.to_json() for item in collections],
                       next_cursor=None)

    features = param_features.split(',')
    if 'stats' in features:
        collections = [stats.collection_stats(user.key.id(), item.to_json()) for item in collections]
        return jsonify(ok=True,
                       collections=collections,
                       next_cursor=None)
    else:
        return jsonify(ok=True,
                       collections=[item.to_json() for item in collections],
                       next_cursor=None)


def create_collection():
    user = current_user()

    data = request.json
    collection = models.Collection(
        owner_id=Key(models.User, user.key.id()),
        title=data['title']
    )
    collection_key = collection.put()  # returns key
    recent_collection_ids = [collection_key.id()] + user.recent_collection_ids\
        if user.recent_collection_ids is not None else [collection_key.id()]
    user.populate(recent_collection_ids=recent_collection_ids[0:10])
    user.put()

    return jsonify(ok=True, collection=collection.to_json())


def get_collection_by_id(collection_id):
    collection = models.Collection.get_by_collection_id(collection_id)
    if collection is None:
        return make_response((jsonify(ok=False, error='Not found'), 404))

    collection_items = models.Card.get_by_card_ids(collection.item_ids)
    collection_data = collection.to_json()
    collection_data['items'] = [dict(media=(None if item.media_id is None else item.media_id.get().to_json()),
                                     **item.to_json()
                                     )
                                for item in collection_items]

    return jsonify(ok=True, collection=collection_data)


def update_collection_by_id(collection_id):
    user_id = identity()
    collection = models.Collection.get_by_collection_id(collection_id)
    if collection is None:
        return make_response((jsonify(ok=False, error='Not found'), 404))
    if collection.owner_id.id() != user_id:
        return make_response((jsonify(ok=False, error='Not allowed'), 403))

    EDITABLES = ['title', 'item_ids']

    data = {k: v for (k, v) in request.json.items() if k in EDITABLES}
    if 'item_ids' in data:
        data['item_ids'] = [Key(models.Card, item) for item in data['item_ids']]

    collection.populate(**data)
    collection.put()

    return jsonify(ok=True, collection=collection.to_json())


def update_scorecard(card_id):
    user_id = identity()
    scorecard = models.ScoreCard.query_by_card_id(user_id, card_id)
    if scorecard is None:
        scorecard = models.ScoreCard(user_id=Key(models.User, user_id),
                                     card_id=Key(models.Card, card_id))
        scorecard.put()
    elif scorecard.user_id.id() != user_id:
        return make_response((jsonify(ok=False, error='Not allowed'), 403))

    current = {
        'corrects': scorecard.corrects or 0,
        'wrongs': scorecard.wrongs or 0,
        'skippeds': scorecard.skippeds or 0
    }

    EDITABLES = ['corrects', 'wrongs', 'skippeds']
    data = {k: v + current[k] for (k, v) in request.json.items() if k in EDITABLES}
    scorecard.populate(**data)
    scorecard.put()

    return jsonify(ok=True, scorecard=scorecard.to_json())


def update_recent_collections():
    user = current_user()
    collection_id = int(request.json['collection_id'])
    recent_collection_ids = user.recent_collection_ids

    if recent_collection_ids is None:
        user.populate(recent_collection_ids=[collection_id])
    elif collection_id in recent_collection_ids:
        recent_collection_ids.remove(collection_id)
        recent_collection_ids.insert(0, collection_id)
        user.populate(recent_collection_ids=list(set(recent_collection_ids))[0:10])
    else:
        recent_collection_ids.insert(0, collection_id)
        user.populate(recent_collection_ids=list(set(recent_collection_ids))[0:10])
    user.put()

    return jsonify(ok=True)

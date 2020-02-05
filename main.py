import os

from flask import Flask
from flask_cors import CORS

from karteikartenapi import media
from karteikartenapi import rest


app = Flask(__name__)
CORS(app, resources={r'/*': {'origins': '*', 'supports_credential': True}})


app.add_url_rule('/auth/handler', 'auth.handler', rest.login, methods=['GET'])
app.add_url_rule('/auth/register', 'auth.register', rest.register, methods=['POST'])
app.add_url_rule('/cards', 'cards.list', rest.list_cards, methods=['GET'])
app.add_url_rule('/cards', 'cards.create', rest.create_card, methods=['POST'])
app.add_url_rule('/cards/<int:card_id>', 'card.get', rest.get_card_by_id, methods=['GET'])
app.add_url_rule('/cards/<int:card_id>', 'card.update', rest.update_card_by_id, methods=['PATCH'])
app.add_url_rule('/collections', 'collection.list', rest.list_collections, methods=['GET'])
app.add_url_rule('/collections/recent', 'collection.list_recent', rest.list_recent_collections, methods=['GET'])
app.add_url_rule('/collections', 'collection.create', rest.create_collection, methods=['POST'])
app.add_url_rule('/collections/<int:collection_id>', 'collection.get', rest.get_collection_by_id, methods=['GET'])
app.add_url_rule('/collections/<int:collection_id>', 'collection.update', rest.update_collection_by_id, methods=['PATCH'])
app.add_url_rule('/me/scorecard/<int:card_id>', 'me.scorecard.update', rest.update_scorecard, methods=['PATCH'])
app.add_url_rule('/me/recent-collections', 'me.recent-collections.update', rest.update_recent_collections, methods=['PATCH'])

app.add_url_rule('/media', 'media.create', media.upload, methods=['POST'])
app.add_url_rule('/media/<int:media_id>', 'media.edit', media.edit_photo, methods=['PUT'])


if __name__ == '__main__':
    if os.getenv('GAE_ENV', '').startswith('standard'):
        app.run()  # production
    else:
        app.run(port=8080, host="localhost", debug=True)  # localhost
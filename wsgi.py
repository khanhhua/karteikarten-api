import os
from flask import Flask, send_file
from flask_cors import CORS
from karteikartenapi import (
    media,
    rest
)
from karteikartenapi.models import db

is_development = os.getenv('FLASK_ENV') == 'development'

app = Flask(__name__,
            static_url_path='',
            static_folder='static',
            )
if is_development:
    app.config.from_object('config.DevelopmentConfig')
else:
    app.config.from_object('config.ProductionConfig')
db.init_app(app)


app.add_url_rule('/auth/handler', 'auth.handler', rest.login, methods=['GET'])
app.add_url_rule('/auth/register', 'auth.register', rest.register, methods=['POST'])
app.add_url_rule('/cards', 'cards.list', rest.list_cards, methods=['GET'])
app.add_url_rule('/cards', 'cards.create', rest.create_card, methods=['POST'])
app.add_url_rule('/cards/<card_id>', 'card.get', rest.get_card_by_id, methods=['GET'])
app.add_url_rule('/cards/<card_id>', 'card.update', rest.update_card_by_id, methods=['PATCH'])
app.add_url_rule('/collections', 'collection.list', rest.list_collections, methods=['GET'])
app.add_url_rule('/collections/recent', 'collection.list_recent', rest.list_recent_collections, methods=['GET'])
app.add_url_rule('/collections', 'collection.create', rest.create_collection, methods=['POST'])
app.add_url_rule('/collections/<collection_id>', 'collection.get', rest.get_collection_by_id, methods=['GET'])
app.add_url_rule('/collections/<collection_id>', 'collection.update', rest.update_collection_by_id, methods=['PATCH'])
app.add_url_rule('/me/scorecard/<card_id>', 'me.scorecard.update', rest.update_scorecard, methods=['PATCH'])
app.add_url_rule('/me/recent-collections', 'me.recent-collections.update', rest.update_recent_collections, methods=['PATCH'])

app.add_url_rule('/media', 'media.create', media.upload, methods=['POST'])
app.add_url_rule('/media/<media_id>', 'media.edit', media.edit_photo, methods=['PUT'])

@app.route('/')
def index():
    return send_file('static/index.html')

if is_development:
    CORS(app, resources={r'/*': {'origins': '*', 'supports_credential': True}})


if __name__ == '__main__':
    # Bind to PORT if defined, otherwise default to 5000.
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)

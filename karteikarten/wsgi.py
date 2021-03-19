import os
from flask import Flask
from .models import db

app = Flask(__name__)
app.config.from_object('config.DevelopmentConfig')
db.init_app(app)


@app.route('/auth/callback', method='GET')
def auth_callback():
    return 'ok'


@app.route('/collections', method='POST')
def create_collection():
    return 'Hello World!'


@app.route('/collections', method='GET')
def list_collections():
    return []


@app.route('/collections/recent', method='GET')
def list_recent_collections():
    return []


@app.route('/cards', method='POST')
def create_card():
    return 'Hello World!'


@app.route('/cards/<str:card_id>', method='PATCH')
def update_card(card_id):
    return 'Hello World!'


@app.route('/collections/<str:collection_id>', method='GET')
def list_cards_by_collection(collection_id):
    return []


@app.route('/collections/<str:collection_id>', method='PATCH')
def update_collection(collection_id):
    return []


if __name__ == '__main__':
    # Bind to PORT if defined, otherwise default to 5000.
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)

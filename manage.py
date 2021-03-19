# https://flask-script.readthedocs.io/en/latest/

from flask import Flask
from flask_script import Manager
from karteikarten.models import (
    db,
    User,
    Card,
    Collection
)

app = Flask(__name__)
app.config.from_object('config.DevelopmentConfig')
db.init_app(app)

manager = Manager(app)

@manager.command
def setup():
    User.ensure_index('username')
    Card.ensure_index('owner_id')
    Collection.ensure_index('owner_id')

if __name__ == '__main__':
    manager.run()
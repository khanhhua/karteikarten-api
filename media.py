import os
from math import floor
from flask import Flask, jsonify, request, make_response
from flask_cors import CORS
from karteikartenapi import models
from google import auth
import cloudstorage
from PIL import Image
from hashids import Hashids
import hashlib
from time import time

from auth import (
    current_user,
    identity
)


CLOUD_STORAGE_BASE_URL = os.getenv('CLOUD_STORAGE_BASE_URL', 'https://storage.cloud.google.com')
HASHIDS_SECRET = os.getenv('HASHIDS_SECRET', 'secret')

credentials, project_id = auth.default()
app = Flask(__name__)
CORS(app, resources={r'/*': {'origins': '*'}})
hashids = Hashids(salt=HASHIDS_SECRET)

ALLOWED_TYPES = {
    'image/png': 'PNG',
    'image/jpg': 'JPEG',
    'image/jpeg': 'JPEG',
    'image/gif': 'GIF'
}
WH_RATIO = 1/1.3
IMAGE_WIDTH = 400
IMAGE_HEIGHT = int(floor(IMAGE_WIDTH * WH_RATIO))


def hashid_from_string(s):
    """

    :param s: File name
    :return: HASHID string
    """
    hash = int(hashlib.sha1(s).hexdigest(), 16)
    now_timestamp = int(time())
    return hashids.encode(hash * 10 + now_timestamp)


@app.route('/media', methods=['POST'])
def upload():
    user = current_user()
    if len(request.files) == 0:
        return make_response((jsonify(ok=False), 400))

    uploaded_file = request.files['file']
    content_type = uploaded_file.content_type
    if content_type not in ALLOWED_TYPES:
        return make_response((jsonify(ok=False), 400))

    options = {'x-goog-acl': 'public-read', 'Cache-Control': 'private, max-age=0, no-transform'}
    uri = '/karteikarten-media/%s' % hashid_from_string(uploaded_file.filename)

    im = Image.open(uploaded_file)
    im.thumbnail((IMAGE_WIDTH, IMAGE_HEIGHT), Image.BICUBIC)

    with cloudstorage.open(uri,
                           options=options,
                           mode='w',
                           content_type=uploaded_file.content_type) as cloud_file:
        im.save(cloud_file, ALLOWED_TYPES[uploaded_file.content_type])
        cloud_file.close()

    media = models.Media(owner_id=user.key,
                         content_type=content_type,
                         uri=uri)
    media_key = media.put()

    return jsonify(ok=True,
                   media=dict(
                       id=media_key.id(),
                       url='%s%s' % (CLOUD_STORAGE_BASE_URL, uri),
                       content_type=content_type
                   ))

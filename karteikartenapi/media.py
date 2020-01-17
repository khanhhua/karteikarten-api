import os
import io
from math import floor
from flask import jsonify, request, make_response
from google.cloud import storage
from PIL import Image
from hashids import Hashids
import hashlib
from time import time

from . import models
from .auth import (
    credentials,
    current_user
)


CLOUD_STORAGE_BASE_URL = os.getenv('CLOUD_STORAGE_BASE_URL', 'https://storage.cloud.google.com')
HASHIDS_SECRET = os.getenv('HASHIDS_SECRET', 'secret')

ALLOWED_TYPES = {
    'image/png': 'PNG',
    'image/jpg': 'JPEG',
    'image/jpeg': 'JPEG',
    'image/gif': 'GIF'
}
WH_RATIO = 1/1.3
IMAGE_WIDTH = 400
IMAGE_HEIGHT = int(floor(IMAGE_WIDTH * WH_RATIO))

hashids = Hashids(salt=HASHIDS_SECRET)
client = storage.Client(credentials=credentials)
bucket = client.get_bucket('karteikarten-media')


def hashid_from_string(s):
    """

    :param s: File name
    :return: HASHID string
    """
    hashed = int(hashlib.sha1(s.encode('utf-8')).hexdigest(), 16)
    now_timestamp = int(time())
    return hashids.encode(hashed * 10 + now_timestamp)


def upload():
    if not bucket.exists():
        return make_response((jsonify(ok=False), 500))

    user = current_user()
    if len(request.files) == 0:
        return make_response((jsonify(ok=False), 400))

    uploaded_file = request.files['file']
    content_type = uploaded_file.content_type
    if content_type not in ALLOWED_TYPES:
        return make_response((jsonify(ok=False), 400))

    filename = hashid_from_string(uploaded_file.filename)
    uri = '/karteikarten-media/%s' % filename

    im = Image.open(uploaded_file)
    im.thumbnail((IMAGE_WIDTH, IMAGE_HEIGHT), Image.BICUBIC)
    buffer = io.BytesIO()
    im.save(buffer, ALLOWED_TYPES[content_type])

    cloud_file = bucket.blob(filename)
    cloud_file.upload_from_file(file_obj=buffer,
                                content_type=uploaded_file.content_type,
                                predefined_acl='public-read',
                                rewind=True,
                                num_retries=3
                                )

    media = models.Media(owner_id=user.key,
                         content_type=content_type,
                         uri=uri)
    with models.db.context():
        media_key = media.put()

        return jsonify(ok=True,
                       media=dict(
                           id=media_key.id(),
                           url='%s%s' % (CLOUD_STORAGE_BASE_URL, uri),
                           content_type=content_type
                       ))

import os
import io
from math import floor
from flask import jsonify, request, make_response
from PIL import Image
# from flask import logging
from hashids import Hashids
import hashlib
from time import time

from karteikartenapi.models import Media
from . import models
from .auth import (
    current_user,
    identity)

# logger = logging.

CLOUD_STORAGE_BASE_URL = os.getenv('CLOUD_STORAGE_BASE_URL', 'https://storage.googleapis.com')
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
# client = storage.Client(credentials=credentials)
# bucket = client.get_bucket('karteikarten-media')


def hashid_from_string(s):
    """

    :param s: File name
    :return: HASHID string
    """
    hashed = int(hashlib.sha1(s.encode('utf-8')).hexdigest(), 16)
    now_timestamp = int(time())
    return hashids.encode(hashed * 10 + now_timestamp)


def upload():
    # if not bucket.exists():
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
    cloud_file.cache_control = 'public, max-age=0'
    cloud_file.patch()

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


def edit_photo(media_id):
    # if not bucket.exists():
    return make_response((jsonify(ok=False), 500))

    user_id = identity()

    media = Media.get_by_media_id(media_id)
    if media is None:
        return make_response((jsonify(ok=False), 404))
    if media.owner_id.id() != user_id:
        return make_response((jsonify(ok=False), 403))

    if 'op' not in request.args:
        return make_response((jsonify(ok=False), 400))

    operation = request.args['op']
    if operation != 'rotate_left' and operation != 'rotate_right':
        return make_response((jsonify(ok=False), 400))

    filename = media.uri.replace(r"/karteikarten-media/", "")
    # logger.log_text("filename: {filename}".format(filename=filename))
    # cloud_file = bucket.blob(filename)

    buffer = io.BytesIO()
    cloud_file.download_to_file(buffer)

    buffer.seek(0)
    im = Image.open(buffer)

    if operation == 'rotate_left':
        im = im.transpose(Image.ROTATE_90)
    elif operation == 'rotate_right':
        im = im.transpose(Image.ROTATE_270)
    else:
        return make_response((jsonify(ok=False), 400))

    buffer = io.BytesIO()
    im.save(buffer, ALLOWED_TYPES[media.content_type])
    cloud_file = bucket.blob(filename)
    cloud_file.upload_from_file(file_obj=buffer,
                                content_type=media.content_type,
                                predefined_acl='public-read',
                                rewind=True,
                                num_retries=3
                                )
    cloud_file.cache_control = 'public, max-age=0'
    cloud_file.patch()

    return jsonify(ok=True,
                   media=dict(
                       id=media.key.id(),
                       url='%s%s' % (CLOUD_STORAGE_BASE_URL, media.uri),
                       content_type=media.content_type
                   ))

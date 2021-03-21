from flask import request
from jose import jwt

from . import models


def current_user():
    authorization = request.headers.get('Authorization', None)
    if authorization is None:
        raise ValueError('Authentication required')

    parts = authorization.split('Bearer ')
    if len(parts) != 2:
        raise ValueError('Authentication required')

    access_token = parts[1]
    payload = jwt.get_unverified_claims(access_token)  # TODO production: verify must be True
    user = models.User.query_by_user_id(payload['sub'])
    if user is None:
        raise ValueError('Authentication required')

    return user


def identity():
    user = current_user()
    return str(user.id)

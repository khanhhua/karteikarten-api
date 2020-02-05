from functools import wraps

from . import models


def context_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        with models.db.context():
            return f(*args, **kwargs)

    return decorated
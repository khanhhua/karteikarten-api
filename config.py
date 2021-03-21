from dotenv import load_dotenv
load_dotenv()

import os

class Config(object):
    DEBUG = False
    TESTING = False

    GOOGLE_CLIENT_ID = os.getenv('GOOGLE_CLIENT_ID')
    MONGODB_HOST = os.getenv('MONGODB_HOST')

    MONGODB_SETTINGS={
        'MONGODB_HOST': MONGODB_HOST
    }

class ProductionConfig(Config):
    pass

class DevelopmentConfig(Config):
    DEBUG = True

class TestingConfig(Config):
    TESTING = True
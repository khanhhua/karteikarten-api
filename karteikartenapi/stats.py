from __future__ import division
from functools import reduce
from . import models

def collection_stats(user_id, collection):
    item_ids = collection['item_ids']
    scorecards = list(map(lambda card_id: models.ScoreCard.query_by_card_id(user_id, card_id), item_ids))

    stats = {
        'corrects': 0,
        'wrongs': 0,
        'skippeds': 0,
        'total': 0,
        'updated_at': None
    }

    if len(list(filter(lambda item: item is not None, scorecards))) == 0:
        collection.update(stats=None)
        return collection

    def iterator(acc, scorecard):
        if scorecard is None:
            return acc

        acc['corrects'] += scorecard.corrects
        acc['wrongs'] += scorecard.wrongs
        acc['skippeds'] += scorecard.skippeds

        if acc['updated_at'] is None or acc['updated_at'] < scorecard.updated_at:
            acc['updated_at'] = scorecard.updated_at

        return acc

    stats = reduce(iterator, scorecards, stats)

    total = stats['corrects'] + stats['wrongs'] + stats['skippeds']
    stats['total'] = total
    stats['corrects_ratio'] = None if total == 0 else stats['corrects'] / total
    stats['wrongs_ratio'] = None if total == 0 else stats['wrongs'] / total
    stats['skippeds_ratio'] = None if total == 0 else stats['skippeds'] / total
    stats['updated_at'] = stats['updated_at'].isoformat() if stats['updated_at'] is not None else None

    collection.update(stats=stats)

    return collection

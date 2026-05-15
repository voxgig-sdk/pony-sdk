# Pony SDK feature factory

from feature.base_feature import PonyBaseFeature
from feature.test_feature import PonyTestFeature


def _make_feature(name):
    features = {
        "base": lambda: PonyBaseFeature(),
        "test": lambda: PonyTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()

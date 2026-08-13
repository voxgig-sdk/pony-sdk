# Pony SDK feature factory

from pony_sdk.feature.base_feature import PonyBaseFeature
from pony_sdk.feature.test_feature import PonyTestFeature


def _make_feature(name):
    features = {
        "base": lambda: PonyBaseFeature(),
        "test": lambda: PonyTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()

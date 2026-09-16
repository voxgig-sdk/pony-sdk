# Pony SDK feature factory

from pony_sdk.feature.base_feature import PonyBaseFeature
from pony_sdk.feature.ratelimit_feature import PonyRatelimitFeature
from pony_sdk.feature.retry_feature import PonyRetryFeature
from pony_sdk.feature.test_feature import PonyTestFeature
from pony_sdk.feature.timeout_feature import PonyTimeoutFeature


_FEATURES = {
    "base": lambda: PonyBaseFeature(),
    "ratelimit": lambda: PonyRatelimitFeature(),
    "retry": lambda: PonyRetryFeature(),
    "test": lambda: PonyTestFeature(),
    "timeout": lambda: PonyTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES

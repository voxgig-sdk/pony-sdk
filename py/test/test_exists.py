# ProjectName SDK exists test

import pytest
from pony_sdk import PonySDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = PonySDK.test(None, None)
        assert testsdk is not None

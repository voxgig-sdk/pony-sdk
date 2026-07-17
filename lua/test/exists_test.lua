-- Pony SDK exists test

local sdk = require("pony_sdk")

describe("PonySDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)

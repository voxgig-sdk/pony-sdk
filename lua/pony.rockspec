package = "voxgig-sdk-pony"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/pony-sdk.git"
}
description = {
  summary = "Pony SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["pony_sdk"] = "pony_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}

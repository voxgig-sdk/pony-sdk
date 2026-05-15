-- Pony SDK error

local PonyError = {}
PonyError.__index = PonyError


function PonyError.new(code, msg, ctx)
  local self = setmetatable({}, PonyError)
  self.is_sdk_error = true
  self.sdk = "Pony"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function PonyError:error()
  return self.msg
end


function PonyError:__tostring()
  return self.msg
end


return PonyError

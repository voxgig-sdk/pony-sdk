# Pony SDK utility: make_context
require_relative '../core/context'
module PonyUtilities
  MakeContext = ->(ctxmap, basectx) {
    PonyContext.new(ctxmap, basectx)
  }
end

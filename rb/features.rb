# Pony SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module PonyFeatures
  def self.make_feature(name)
    case name
    when "base"
      PonyBaseFeature.new
    when "ratelimit"
      PonyRatelimitFeature.new
    when "retry"
      PonyRetryFeature.new
    when "test"
      PonyTestFeature.new
    when "timeout"
      PonyTimeoutFeature.new
    else
      PonyBaseFeature.new
    end
  end
end

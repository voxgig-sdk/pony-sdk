# Pony SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module PonyFeatures
  def self.make_feature(name)
    case name
    when "base"
      PonyBaseFeature.new
    when "test"
      PonyTestFeature.new
    else
      PonyBaseFeature.new
    end
  end
end

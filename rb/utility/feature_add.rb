# Pony SDK utility: feature_add
module PonyUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end

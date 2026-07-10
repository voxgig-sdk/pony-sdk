# frozen_string_literal: true

# Typed models for the Pony SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Character entity data model.
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] error
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [Integer]
#
# @!attribute [rw] warning
#   @return [String, nil]
Character = Struct.new(
  :data,
  :error,
  :status,
  :warning,
  keyword_init: true
)

# Request payload for Character#load.
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] kind
#   @return [Object, nil]
#
# @!attribute [rw] occupation
#   @return [String, nil]
#
# @!attribute [rw] residence
#   @return [String, nil]
CharacterLoadMatch = Struct.new(
  :id,
  :kind,
  :occupation,
  :residence,
  keyword_init: true
)

# Request payload for Character#list.
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] error
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [Integer, nil]
#
# @!attribute [rw] warning
#   @return [String, nil]
CharacterListMatch = Struct.new(
  :data,
  :error,
  :status,
  :warning,
  keyword_init: true
)

# Comic entity data model.
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] error
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [Integer]
#
# @!attribute [rw] warning
#   @return [String, nil]
Comic = Struct.new(
  :data,
  :error,
  :status,
  :warning,
  keyword_init: true
)

# Request payload for Comic#load.
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] series
#   @return [String, nil]
ComicLoadMatch = Struct.new(
  :id,
  :series,
  keyword_init: true
)

# Request payload for Comic#list.
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] error
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [Integer, nil]
#
# @!attribute [rw] warning
#   @return [String, nil]
ComicListMatch = Struct.new(
  :data,
  :error,
  :status,
  :warning,
  keyword_init: true
)

# Episode entity data model.
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] error
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [Integer]
#
# @!attribute [rw] warning
#   @return [String, nil]
Episode = Struct.new(
  :data,
  :error,
  :status,
  :warning,
  keyword_init: true
)

# Request payload for Episode#load.
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] season
#   @return [Integer, nil]
EpisodeLoadMatch = Struct.new(
  :id,
  :season,
  keyword_init: true
)

# Request payload for Episode#list.
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] error
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [Integer, nil]
#
# @!attribute [rw] warning
#   @return [String, nil]
EpisodeListMatch = Struct.new(
  :data,
  :error,
  :status,
  :warning,
  keyword_init: true
)

# Image entity data model.
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] error
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [Integer]
#
# @!attribute [rw] warning
#   @return [String, nil]
Image = Struct.new(
  :data,
  :error,
  :status,
  :warning,
  keyword_init: true
)

# Request payload for Image#list.
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] error
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [Integer, nil]
#
# @!attribute [rw] warning
#   @return [String, nil]
ImageListMatch = Struct.new(
  :data,
  :error,
  :status,
  :warning,
  keyword_init: true
)

# Kind entity data model.
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] error
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [Integer]
#
# @!attribute [rw] warning
#   @return [String, nil]
Kind = Struct.new(
  :data,
  :error,
  :status,
  :warning,
  keyword_init: true
)

# Request payload for Kind#load.
#
# @!attribute [rw] id
#   @return [String]
KindLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Kind#list.
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] error
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [Integer, nil]
#
# @!attribute [rw] warning
#   @return [String, nil]
KindListMatch = Struct.new(
  :data,
  :error,
  :status,
  :warning,
  keyword_init: true
)

# Song entity data model.
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] error
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [Integer]
#
# @!attribute [rw] warning
#   @return [String, nil]
Song = Struct.new(
  :data,
  :error,
  :status,
  :warning,
  keyword_init: true
)

# Request payload for Song#load.
#
# @!attribute [rw] episode
#   @return [Object, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
SongLoadMatch = Struct.new(
  :episode,
  :id,
  keyword_init: true
)

# Request payload for Song#list.
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] error
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [Integer, nil]
#
# @!attribute [rw] warning
#   @return [String, nil]
SongListMatch = Struct.new(
  :data,
  :error,
  :status,
  :warning,
  keyword_init: true
)


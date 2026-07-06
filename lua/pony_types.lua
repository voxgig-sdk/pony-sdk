-- Typed models for the Pony SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Character
---@field data? table
---@field error? string
---@field status number
---@field warning? string

---@class CharacterLoadMatch
---@field id string
---@field kind any
---@field occupation string
---@field residence string

---@class CharacterListMatch
---@field data? table
---@field error? string
---@field status? number
---@field warning? string

---@class Comic
---@field data? table
---@field error? string
---@field status number
---@field warning? string

---@class ComicLoadMatch
---@field id string
---@field series string

---@class ComicListMatch
---@field data? table
---@field error? string
---@field status? number
---@field warning? string

---@class Episode
---@field data? table
---@field error? string
---@field status number
---@field warning? string

---@class EpisodeLoadMatch
---@field id string
---@field season number

---@class EpisodeListMatch
---@field data? table
---@field error? string
---@field status? number
---@field warning? string

---@class Image
---@field data? table
---@field error? string
---@field status number
---@field warning? string

---@class ImageListMatch
---@field data? table
---@field error? string
---@field status? number
---@field warning? string

---@class Kind
---@field data? table
---@field error? string
---@field status number
---@field warning? string

---@class KindLoadMatch
---@field id string

---@class KindListMatch
---@field data? table
---@field error? string
---@field status? number
---@field warning? string

---@class Song
---@field data? table
---@field error? string
---@field status number
---@field warning? string

---@class SongLoadMatch
---@field episode any
---@field id string

---@class SongListMatch
---@field data? table
---@field error? string
---@field status? number
---@field warning? string

local M = {}

return M

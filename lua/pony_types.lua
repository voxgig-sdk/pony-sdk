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
---@field id? string
---@field status number
---@field warning? string

---@class CharacterLoadMatch
---@field id string
---@field limit? number
---@field offset? number

---@class CharacterListMatch
---@field limit? number
---@field offset? number

---@class Comic
---@field data? table
---@field error? string
---@field id? string
---@field status number
---@field warning? string

---@class ComicLoadMatch
---@field id string
---@field limit? number
---@field offset? number

---@class ComicListMatch
---@field limit? number
---@field offset? number

---@class Episode
---@field data? table
---@field error? string
---@field id? string
---@field status number
---@field warning? string

---@class EpisodeLoadMatch
---@field id string
---@field limit? number
---@field offset? number

---@class EpisodeListMatch
---@field limit? number
---@field offset? number

---@class Image
---@field data? table
---@field error? string
---@field status number
---@field warning? string

---@class ImageListMatch
---@field limit? number
---@field offset? number

---@class Kind
---@field data? table
---@field error? string
---@field id? string
---@field status number
---@field warning? string

---@class KindLoadMatch
---@field id string

---@class KindListMatch
---@field limit? number
---@field offset? number

---@class Song
---@field data? table
---@field error? string
---@field id? string
---@field status number
---@field warning? string

---@class SongLoadMatch
---@field id string
---@field limit? number
---@field offset? number

---@class SongListMatch
---@field limit? number
---@field offset? number

local M = {}

return M

// Typed models for the Pony SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Character {
  data?: any[]
  error?: string
  status: number
  warning?: string
}

export interface CharacterLoadMatch {
  id: string
  kind: any
  occupation: string
  residence: string
}

export type CharacterListMatch = Partial<Character>

export interface Comic {
  data?: any[]
  error?: string
  status: number
  warning?: string
}

export interface ComicLoadMatch {
  id: string
  series: string
}

export type ComicListMatch = Partial<Comic>

export interface Episode {
  data?: any[]
  error?: string
  status: number
  warning?: string
}

export interface EpisodeLoadMatch {
  id: string
  season: number
}

export type EpisodeListMatch = Partial<Episode>

export interface Image {
  data?: any[]
  error?: string
  status: number
  warning?: string
}

export type ImageListMatch = Partial<Image>

export interface Kind {
  data?: any[]
  error?: string
  status: number
  warning?: string
}

export interface KindLoadMatch {
  id: string
}

export type KindListMatch = Partial<Kind>

export interface Song {
  data?: any[]
  error?: string
  status: number
  warning?: string
}

export interface SongLoadMatch {
  episode: any
  id: string
}

export type SongListMatch = Partial<Song>


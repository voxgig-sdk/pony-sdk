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

export interface CharacterListMatch {
  data?: any[]
  error?: string
  status?: number
  warning?: string
}

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

export interface ComicListMatch {
  data?: any[]
  error?: string
  status?: number
  warning?: string
}

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

export interface EpisodeListMatch {
  data?: any[]
  error?: string
  status?: number
  warning?: string
}

export interface Image {
  data?: any[]
  error?: string
  status: number
  warning?: string
}

export interface ImageListMatch {
  data?: any[]
  error?: string
  status?: number
  warning?: string
}

export interface Kind {
  data?: any[]
  error?: string
  status: number
  warning?: string
}

export interface KindLoadMatch {
  id: string
}

export interface KindListMatch {
  data?: any[]
  error?: string
  status?: number
  warning?: string
}

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

export interface SongListMatch {
  data?: any[]
  error?: string
  status?: number
  warning?: string
}


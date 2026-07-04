// Typed models for the Pony SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Character is the typed data model for the character entity.
type Character struct {
	Data *[]any `json:"data,omitempty"`
	Error *string `json:"error,omitempty"`
	Status int `json:"status"`
	Warning *string `json:"warning,omitempty"`
}

// CharacterLoadMatch is the typed request payload for Character.LoadTyped.
type CharacterLoadMatch struct {
	Id string `json:"id"`
	Kind any `json:"kind"`
	Occupation string `json:"occupation"`
	Residence string `json:"residence"`
}

// CharacterListMatch mirrors the character fields as an all-optional match
// filter (Go analog of Partial<Character>).
type CharacterListMatch struct {
	Data *[]any `json:"data,omitempty"`
	Error *string `json:"error,omitempty"`
	Status *int `json:"status,omitempty"`
	Warning *string `json:"warning,omitempty"`
}

// Comic is the typed data model for the comic entity.
type Comic struct {
	Data *[]any `json:"data,omitempty"`
	Error *string `json:"error,omitempty"`
	Status int `json:"status"`
	Warning *string `json:"warning,omitempty"`
}

// ComicLoadMatch is the typed request payload for Comic.LoadTyped.
type ComicLoadMatch struct {
	Id string `json:"id"`
	Series string `json:"series"`
}

// ComicListMatch mirrors the comic fields as an all-optional match
// filter (Go analog of Partial<Comic>).
type ComicListMatch struct {
	Data *[]any `json:"data,omitempty"`
	Error *string `json:"error,omitempty"`
	Status *int `json:"status,omitempty"`
	Warning *string `json:"warning,omitempty"`
}

// Episode is the typed data model for the episode entity.
type Episode struct {
	Data *[]any `json:"data,omitempty"`
	Error *string `json:"error,omitempty"`
	Status int `json:"status"`
	Warning *string `json:"warning,omitempty"`
}

// EpisodeLoadMatch is the typed request payload for Episode.LoadTyped.
type EpisodeLoadMatch struct {
	Id string `json:"id"`
	Season int `json:"season"`
}

// EpisodeListMatch mirrors the episode fields as an all-optional match
// filter (Go analog of Partial<Episode>).
type EpisodeListMatch struct {
	Data *[]any `json:"data,omitempty"`
	Error *string `json:"error,omitempty"`
	Status *int `json:"status,omitempty"`
	Warning *string `json:"warning,omitempty"`
}

// Image is the typed data model for the image entity.
type Image struct {
	Data *[]any `json:"data,omitempty"`
	Error *string `json:"error,omitempty"`
	Status int `json:"status"`
	Warning *string `json:"warning,omitempty"`
}

// ImageListMatch mirrors the image fields as an all-optional match
// filter (Go analog of Partial<Image>).
type ImageListMatch struct {
	Data *[]any `json:"data,omitempty"`
	Error *string `json:"error,omitempty"`
	Status *int `json:"status,omitempty"`
	Warning *string `json:"warning,omitempty"`
}

// Kind is the typed data model for the kind entity.
type Kind struct {
	Data *[]any `json:"data,omitempty"`
	Error *string `json:"error,omitempty"`
	Status int `json:"status"`
	Warning *string `json:"warning,omitempty"`
}

// KindLoadMatch is the typed request payload for Kind.LoadTyped.
type KindLoadMatch struct {
	Id string `json:"id"`
}

// KindListMatch mirrors the kind fields as an all-optional match
// filter (Go analog of Partial<Kind>).
type KindListMatch struct {
	Data *[]any `json:"data,omitempty"`
	Error *string `json:"error,omitempty"`
	Status *int `json:"status,omitempty"`
	Warning *string `json:"warning,omitempty"`
}

// Song is the typed data model for the song entity.
type Song struct {
	Data *[]any `json:"data,omitempty"`
	Error *string `json:"error,omitempty"`
	Status int `json:"status"`
	Warning *string `json:"warning,omitempty"`
}

// SongLoadMatch is the typed request payload for Song.LoadTyped.
type SongLoadMatch struct {
	Episode any `json:"episode"`
	Id string `json:"id"`
}

// SongListMatch mirrors the song fields as an all-optional match
// filter (Go analog of Partial<Song>).
type SongListMatch struct {
	Data *[]any `json:"data,omitempty"`
	Error *string `json:"error,omitempty"`
	Status *int `json:"status,omitempty"`
	Warning *string `json:"warning,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

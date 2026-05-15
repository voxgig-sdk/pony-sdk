package voxgigponysdk

import (
	"github.com/voxgig-sdk/pony-sdk/core"
	"github.com/voxgig-sdk/pony-sdk/entity"
	"github.com/voxgig-sdk/pony-sdk/feature"
	_ "github.com/voxgig-sdk/pony-sdk/utility"
)

// Type aliases preserve external API.
type PonySDK = core.PonySDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type PonyEntity = core.PonyEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type PonyError = core.PonyError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewCharacterEntityFunc = func(client *core.PonySDK, entopts map[string]any) core.PonyEntity {
		return entity.NewCharacterEntity(client, entopts)
	}
	core.NewComicEntityFunc = func(client *core.PonySDK, entopts map[string]any) core.PonyEntity {
		return entity.NewComicEntity(client, entopts)
	}
	core.NewEpisodeEntityFunc = func(client *core.PonySDK, entopts map[string]any) core.PonyEntity {
		return entity.NewEpisodeEntity(client, entopts)
	}
	core.NewImageEntityFunc = func(client *core.PonySDK, entopts map[string]any) core.PonyEntity {
		return entity.NewImageEntity(client, entopts)
	}
	core.NewKindEntityFunc = func(client *core.PonySDK, entopts map[string]any) core.PonyEntity {
		return entity.NewKindEntity(client, entopts)
	}
	core.NewSongEntityFunc = func(client *core.PonySDK, entopts map[string]any) core.PonyEntity {
		return entity.NewSongEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewPonySDK = core.NewPonySDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature

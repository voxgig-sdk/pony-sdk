package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewCharacterEntityFunc func(client *PonySDK, entopts map[string]any) PonyEntity

var NewComicEntityFunc func(client *PonySDK, entopts map[string]any) PonyEntity

var NewEpisodeEntityFunc func(client *PonySDK, entopts map[string]any) PonyEntity

var NewImageEntityFunc func(client *PonySDK, entopts map[string]any) PonyEntity

var NewKindEntityFunc func(client *PonySDK, entopts map[string]any) PonyEntity

var NewSongEntityFunc func(client *PonySDK, entopts map[string]any) PonyEntity


package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Pony",
			"slug": "pony",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "http://ponyapi.net/v1",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"character": map[string]any{},
				"comic": map[string]any{},
				"episode": map[string]any{},
				"image": map[string]any{},
				"kind": map[string]any{},
				"song": map[string]any{},
			},
		},
		"entity": map[string]any{
			"character": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "data",
						"short": "Array of found objects.",
						"type": "`$ARRAY`",
						"union": map[string]any{
							"branches": 3,
							"count": 4,
							"depth": 4,
						},
					},
					map[string]any{
						"name": "error",
						"short": "First error message",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "status",
						"req": true,
						"short": "HTTP status code",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "warning",
						"short": "Warning messages separated by newline",
						"type": "`$STRING`",
					},
				},
				"name": "character",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 50,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/character/all",
								"parts": []any{
									"character",
									"all",
								},
								"select": map[string]any{
									"$action": "all",
									"exist": []any{
										"limit",
										"offset",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "character",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"example": 50,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/character/{character}",
								"parts": []any{
									"character",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"character": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"limit",
										"offset",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "dragon",
											"kind": "param",
											"name": "kind",
											"orig": "kind",
											"reqd": true,
											"type": "`$ANY`",
										},
									},
									"query": []any{
										map[string]any{
											"example": 50,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/character/by-kind/{kind}",
								"parts": []any{
									"character",
									"by-kind",
									"{kind}",
								},
								"select": map[string]any{
									"exist": []any{
										"kind",
										"limit",
										"offset",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "crusader",
											"kind": "param",
											"name": "occupation",
											"orig": "occupation",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"example": 50,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/character/by-occupation/{occupation}",
								"parts": []any{
									"character",
									"by-occupation",
									"{occupation}",
								},
								"select": map[string]any{
									"exist": []any{
										"limit",
										"occupation",
										"offset",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "residence",
											"orig": "residence",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"example": 50,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/character/by-residence/{residence}",
								"parts": []any{
									"character",
									"by-residence",
									"{residence}",
								},
								"select": map[string]any{
									"exist": []any{
										"limit",
										"offset",
										"residence",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"by_kind",
						},
						[]any{
							"by_occupation",
						},
						[]any{
							"by_residence",
						},
					},
				},
			},
			"comic": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "data",
						"short": "Array of found objects.",
						"type": "`$ARRAY`",
						"union": map[string]any{
							"branches": 3,
							"count": 4,
							"depth": 4,
						},
					},
					map[string]any{
						"name": "error",
						"short": "First error message",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "status",
						"req": true,
						"short": "HTTP status code",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "warning",
						"short": "Warning messages separated by newline",
						"type": "`$STRING`",
					},
				},
				"name": "comic",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 50,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/comics/all",
								"parts": []any{
									"comics",
									"all",
								},
								"select": map[string]any{
									"$action": "all",
									"exist": []any{
										"limit",
										"offset",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "comic",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"example": 50,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/comics/{comics}",
								"parts": []any{
									"comics",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"comics": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"limit",
										"offset",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "series",
											"orig": "series",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"example": 50,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/comics/by-series/{series}",
								"parts": []any{
									"comics",
									"by-series",
									"{series}",
								},
								"select": map[string]any{
									"exist": []any{
										"limit",
										"offset",
										"series",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"by_series",
						},
					},
				},
			},
			"episode": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "data",
						"short": "Array of found objects.",
						"type": "`$ARRAY`",
						"union": map[string]any{
							"branches": 3,
							"count": 4,
							"depth": 4,
						},
					},
					map[string]any{
						"name": "error",
						"short": "First error message",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "status",
						"req": true,
						"short": "HTTP status code",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "warning",
						"short": "Warning messages separated by newline",
						"type": "`$STRING`",
					},
				},
				"name": "episode",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 50,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/episode/all",
								"parts": []any{
									"episode",
									"all",
								},
								"select": map[string]any{
									"$action": "all",
									"exist": []any{
										"limit",
										"offset",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "episode",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"example": 50,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/episode/{episode}",
								"parts": []any{
									"episode",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"episode": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"limit",
										"offset",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "season",
											"orig": "season",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
									"query": []any{
										map[string]any{
											"example": 50,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/episode/by-season/{season}",
								"parts": []any{
									"episode",
									"by-season",
									"{season}",
								},
								"select": map[string]any{
									"exist": []any{
										"limit",
										"offset",
										"season",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"by_season",
						},
					},
				},
			},
			"image": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "data",
						"short": "Array of found objects.",
						"type": "`$ARRAY`",
						"union": map[string]any{
							"branches": 3,
							"count": 4,
							"depth": 4,
						},
					},
					map[string]any{
						"name": "error",
						"short": "First error message",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "status",
						"req": true,
						"short": "HTTP status code",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "warning",
						"short": "Warning messages separated by newline",
						"type": "`$STRING`",
					},
				},
				"name": "image",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 50,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/image/all",
								"parts": []any{
									"image",
									"all",
								},
								"select": map[string]any{
									"$action": "all",
									"exist": []any{
										"limit",
										"offset",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"kind": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "data",
						"short": "Array of found objects.",
						"type": "`$ARRAY`",
						"union": map[string]any{
							"branches": 3,
							"count": 4,
							"depth": 4,
						},
					},
					map[string]any{
						"name": "error",
						"short": "First error message",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "status",
						"req": true,
						"short": "HTTP status code",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "warning",
						"short": "Warning messages separated by newline",
						"type": "`$STRING`",
					},
				},
				"name": "kind",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 50,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/kind/all",
								"parts": []any{
									"kind",
									"all",
								},
								"select": map[string]any{
									"$action": "all",
									"exist": []any{
										"limit",
										"offset",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "kind",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/kind/{kind}",
								"parts": []any{
									"kind",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"kind": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"song": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "data",
						"short": "Array of found objects.",
						"type": "`$ARRAY`",
						"union": map[string]any{
							"branches": 3,
							"count": 4,
							"depth": 4,
						},
					},
					map[string]any{
						"name": "error",
						"short": "First error message",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "status",
						"req": true,
						"short": "HTTP status code",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "warning",
						"short": "Warning messages separated by newline",
						"type": "`$STRING`",
					},
				},
				"name": "song",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 50,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/song/all",
								"parts": []any{
									"song",
									"all",
								},
								"select": map[string]any{
									"$action": "all",
									"exist": []any{
										"limit",
										"offset",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "episode",
											"orig": "episode",
											"reqd": true,
											"type": "`$ANY`",
										},
									},
									"query": []any{
										map[string]any{
											"example": 50,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/song/by-episode/{episode}",
								"parts": []any{
									"song",
									"by-episode",
									"{episode}",
								},
								"select": map[string]any{
									"exist": []any{
										"episode",
										"limit",
										"offset",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "song",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"example": 50,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/song/{song}",
								"parts": []any{
									"song",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"song": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"limit",
										"offset",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"by_episode",
						},
					},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}

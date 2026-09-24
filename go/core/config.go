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
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
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
						"title": "Data",
						"type": "`$ARRAY`",
						"short": "Array of found objects.",
					},
					map[string]any{
						"name": "error",
						"title": "Error",
						"type": "`$STRING`",
						"short": "First error message",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$INTEGER`",
						"req": true,
						"short": "HTTP status code",
					},
					map[string]any{
						"name": "warning",
						"title": "Warning",
						"type": "`$STRING`",
						"short": "Warning messages separated by newline",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "character",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/character/all",
								"segments": []any{
									map[string]any{
										"lit": "character",
									},
									map[string]any{
										"lit": "all",
									},
								},
								"parts": []any{
									"character",
									"all",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 50,
										},
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
									},
								},
								"select": map[string]any{
									"$action": "all",
									"exist": []any{
										"limit",
										"offset",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/character/{character}",
								"segments": []any{
									map[string]any{
										"lit": "character",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"character",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"character": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "character",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 50,
										},
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"limit",
										"offset",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/character/by-kind/{kind}",
								"segments": []any{
									map[string]any{
										"lit": "character",
									},
									map[string]any{
										"lit": "by-kind",
									},
									map[string]any{
										"var": "kind",
									},
								},
								"parts": []any{
									"character",
									"by-kind",
									"{kind}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "kind",
											"orig": "kind",
											"type": "`$ANY`",
											"kind": "param",
											"reqd": true,
											"example": "dragon",
										},
									},
									"query": []any{
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 50,
										},
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"kind",
										"limit",
										"offset",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/character/by-occupation/{occupation}",
								"segments": []any{
									map[string]any{
										"lit": "character",
									},
									map[string]any{
										"lit": "by-occupation",
									},
									map[string]any{
										"var": "occupation",
									},
								},
								"parts": []any{
									"character",
									"by-occupation",
									"{occupation}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "occupation",
											"orig": "occupation",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "crusader",
										},
									},
									"query": []any{
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 50,
										},
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"limit",
										"occupation",
										"offset",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/character/by-residence/{residence}",
								"segments": []any{
									map[string]any{
										"lit": "character",
									},
									map[string]any{
										"lit": "by-residence",
									},
									map[string]any{
										"var": "residence",
									},
								},
								"parts": []any{
									"character",
									"by-residence",
									"{residence}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "residence",
											"orig": "residence",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 50,
										},
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"limit",
										"offset",
										"residence",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"comic": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "data",
						"title": "Data",
						"type": "`$ARRAY`",
						"short": "Array of found objects.",
					},
					map[string]any{
						"name": "error",
						"title": "Error",
						"type": "`$STRING`",
						"short": "First error message",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$INTEGER`",
						"req": true,
						"short": "HTTP status code",
					},
					map[string]any{
						"name": "warning",
						"title": "Warning",
						"type": "`$STRING`",
						"short": "Warning messages separated by newline",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "comic",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/comics/all",
								"segments": []any{
									map[string]any{
										"lit": "comics",
									},
									map[string]any{
										"lit": "all",
									},
								},
								"parts": []any{
									"comics",
									"all",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 50,
										},
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
									},
								},
								"select": map[string]any{
									"$action": "all",
									"exist": []any{
										"limit",
										"offset",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/comics/{comics}",
								"segments": []any{
									map[string]any{
										"lit": "comics",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"comics",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"comics": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "comic",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 50,
										},
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"limit",
										"offset",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/comics/by-series/{series}",
								"segments": []any{
									map[string]any{
										"lit": "comics",
									},
									map[string]any{
										"lit": "by-series",
									},
									map[string]any{
										"var": "series",
									},
								},
								"parts": []any{
									"comics",
									"by-series",
									"{series}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "series",
											"orig": "series",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 50,
										},
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"limit",
										"offset",
										"series",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"episode": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "data",
						"title": "Data",
						"type": "`$ARRAY`",
						"short": "Array of found objects.",
					},
					map[string]any{
						"name": "error",
						"title": "Error",
						"type": "`$STRING`",
						"short": "First error message",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$INTEGER`",
						"req": true,
						"short": "HTTP status code",
					},
					map[string]any{
						"name": "warning",
						"title": "Warning",
						"type": "`$STRING`",
						"short": "Warning messages separated by newline",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "episode",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/episode/all",
								"segments": []any{
									map[string]any{
										"lit": "episode",
									},
									map[string]any{
										"lit": "all",
									},
								},
								"parts": []any{
									"episode",
									"all",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 50,
										},
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
									},
								},
								"select": map[string]any{
									"$action": "all",
									"exist": []any{
										"limit",
										"offset",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/episode/{episode}",
								"segments": []any{
									map[string]any{
										"lit": "episode",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"episode",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"episode": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "episode",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 50,
										},
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"limit",
										"offset",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/episode/by-season/{season}",
								"segments": []any{
									map[string]any{
										"lit": "episode",
									},
									map[string]any{
										"lit": "by-season",
									},
									map[string]any{
										"var": "season",
									},
								},
								"parts": []any{
									"episode",
									"by-season",
									"{season}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "season",
											"orig": "season",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 50,
										},
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"limit",
										"offset",
										"season",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"image": map[string]any{
				"fields": []any{},
				"name": "image",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/image/all",
								"segments": []any{
									map[string]any{
										"lit": "image",
									},
									map[string]any{
										"lit": "all",
									},
								},
								"parts": []any{
									"image",
									"all",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 50,
										},
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
									},
								},
								"select": map[string]any{
									"$action": "all",
									"exist": []any{
										"limit",
										"offset",
									},
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
						"title": "Data",
						"type": "`$ARRAY`",
						"short": "Array of found objects.",
					},
					map[string]any{
						"name": "error",
						"title": "Error",
						"type": "`$STRING`",
						"short": "First error message",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$INTEGER`",
						"req": true,
						"short": "HTTP status code",
					},
					map[string]any{
						"name": "warning",
						"title": "Warning",
						"type": "`$STRING`",
						"short": "Warning messages separated by newline",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "kind",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/kind/all",
								"segments": []any{
									map[string]any{
										"lit": "kind",
									},
									map[string]any{
										"lit": "all",
									},
								},
								"parts": []any{
									"kind",
									"all",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 50,
										},
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
									},
								},
								"select": map[string]any{
									"$action": "all",
									"exist": []any{
										"limit",
										"offset",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/kind/{kind}",
								"segments": []any{
									map[string]any{
										"lit": "kind",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"kind",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"kind": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "kind",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
						"title": "Data",
						"type": "`$ARRAY`",
						"short": "Array of found objects.",
					},
					map[string]any{
						"name": "error",
						"title": "Error",
						"type": "`$STRING`",
						"short": "First error message",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$INTEGER`",
						"req": true,
						"short": "HTTP status code",
					},
					map[string]any{
						"name": "warning",
						"title": "Warning",
						"type": "`$STRING`",
						"short": "Warning messages separated by newline",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "song",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/song/all",
								"segments": []any{
									map[string]any{
										"lit": "song",
									},
									map[string]any{
										"lit": "all",
									},
								},
								"parts": []any{
									"song",
									"all",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 50,
										},
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
									},
								},
								"select": map[string]any{
									"$action": "all",
									"exist": []any{
										"limit",
										"offset",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/song/by-episode/{episode}",
								"segments": []any{
									map[string]any{
										"lit": "song",
									},
									map[string]any{
										"lit": "by-episode",
									},
									map[string]any{
										"var": "episode",
									},
								},
								"parts": []any{
									"song",
									"by-episode",
									"{episode}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "episode",
											"orig": "episode",
											"type": "`$ANY`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 50,
										},
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"episode",
										"limit",
										"offset",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/song/{song}",
								"segments": []any{
									map[string]any{
										"lit": "song",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"song",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"song": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "song",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 50,
										},
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"limit",
										"offset",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
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
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}

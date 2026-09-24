
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'Pony',
        slug: "pony",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
        "factor": 2,
        "maxDelay": 2000,
        "minDelay": 50,
        "retries": 2,
        "statuses": [
          408,
          425,
          429,
          500,
          502,
          503,
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


  options = {
    base: "http://ponyapi.net/v1",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        character: {
        },
  
        comic: {
        },
  
        episode: {
        },
  
        image: {
        },
  
        kind: {
        },
  
        song: {
        },
  
    }
  }


  entity = {
    "character": {
      "fields": [
        {
          "name": "data",
          "title": "Data",
          "type": "`$ARRAY`",
          "short": "Array of found objects."
        },
        {
          "name": "error",
          "title": "Error",
          "type": "`$STRING`",
          "short": "First error message"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        },
        {
          "name": "status",
          "title": "Status",
          "type": "`$INTEGER`",
          "req": true,
          "short": "HTTP status code"
        },
        {
          "name": "warning",
          "title": "Warning",
          "type": "`$STRING`",
          "short": "Warning messages separated by newline"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "character",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/character/all",
              "segments": [
                {
                  "lit": "character"
                },
                {
                  "lit": "all"
                }
              ],
              "parts": [
                "character",
                "all"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 50
                  },
                  {
                    "name": "offset",
                    "orig": "offset",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 0
                  }
                ]
              },
              "select": {
                "$action": "all",
                "exist": [
                  "limit",
                  "offset"
                ]
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/character/{character}",
              "segments": [
                {
                  "lit": "character"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "character",
                "{id}"
              ],
              "rename": {
                "param": {
                  "character": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "character",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 50
                  },
                  {
                    "name": "offset",
                    "orig": "offset",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 0
                  }
                ]
              },
              "select": {
                "exist": [
                  "id",
                  "limit",
                  "offset"
                ]
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/character/by-kind/{kind}",
              "segments": [
                {
                  "lit": "character"
                },
                {
                  "lit": "by-kind"
                },
                {
                  "var": "kind"
                }
              ],
              "parts": [
                "character",
                "by-kind",
                "{kind}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "kind",
                    "orig": "kind",
                    "type": "`$ANY`",
                    "kind": "param",
                    "reqd": true,
                    "example": "dragon"
                  }
                ],
                "query": [
                  {
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 50
                  },
                  {
                    "name": "offset",
                    "orig": "offset",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 0
                  }
                ]
              },
              "select": {
                "exist": [
                  "kind",
                  "limit",
                  "offset"
                ]
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/character/by-occupation/{occupation}",
              "segments": [
                {
                  "lit": "character"
                },
                {
                  "lit": "by-occupation"
                },
                {
                  "var": "occupation"
                }
              ],
              "parts": [
                "character",
                "by-occupation",
                "{occupation}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "occupation",
                    "orig": "occupation",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true,
                    "example": "crusader"
                  }
                ],
                "query": [
                  {
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 50
                  },
                  {
                    "name": "offset",
                    "orig": "offset",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 0
                  }
                ]
              },
              "select": {
                "exist": [
                  "limit",
                  "occupation",
                  "offset"
                ]
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/character/by-residence/{residence}",
              "segments": [
                {
                  "lit": "character"
                },
                {
                  "lit": "by-residence"
                },
                {
                  "var": "residence"
                }
              ],
              "parts": [
                "character",
                "by-residence",
                "{residence}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "residence",
                    "orig": "residence",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 50
                  },
                  {
                    "name": "offset",
                    "orig": "offset",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 0
                  }
                ]
              },
              "select": {
                "exist": [
                  "limit",
                  "offset",
                  "residence"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "comic": {
      "fields": [
        {
          "name": "data",
          "title": "Data",
          "type": "`$ARRAY`",
          "short": "Array of found objects."
        },
        {
          "name": "error",
          "title": "Error",
          "type": "`$STRING`",
          "short": "First error message"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        },
        {
          "name": "status",
          "title": "Status",
          "type": "`$INTEGER`",
          "req": true,
          "short": "HTTP status code"
        },
        {
          "name": "warning",
          "title": "Warning",
          "type": "`$STRING`",
          "short": "Warning messages separated by newline"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "comic",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/comics/all",
              "segments": [
                {
                  "lit": "comics"
                },
                {
                  "lit": "all"
                }
              ],
              "parts": [
                "comics",
                "all"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 50
                  },
                  {
                    "name": "offset",
                    "orig": "offset",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 0
                  }
                ]
              },
              "select": {
                "$action": "all",
                "exist": [
                  "limit",
                  "offset"
                ]
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/comics/{comics}",
              "segments": [
                {
                  "lit": "comics"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "comics",
                "{id}"
              ],
              "rename": {
                "param": {
                  "comics": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "comic",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 50
                  },
                  {
                    "name": "offset",
                    "orig": "offset",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 0
                  }
                ]
              },
              "select": {
                "exist": [
                  "id",
                  "limit",
                  "offset"
                ]
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/comics/by-series/{series}",
              "segments": [
                {
                  "lit": "comics"
                },
                {
                  "lit": "by-series"
                },
                {
                  "var": "series"
                }
              ],
              "parts": [
                "comics",
                "by-series",
                "{series}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "series",
                    "orig": "series",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 50
                  },
                  {
                    "name": "offset",
                    "orig": "offset",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 0
                  }
                ]
              },
              "select": {
                "exist": [
                  "limit",
                  "offset",
                  "series"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "episode": {
      "fields": [
        {
          "name": "data",
          "title": "Data",
          "type": "`$ARRAY`",
          "short": "Array of found objects."
        },
        {
          "name": "error",
          "title": "Error",
          "type": "`$STRING`",
          "short": "First error message"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        },
        {
          "name": "status",
          "title": "Status",
          "type": "`$INTEGER`",
          "req": true,
          "short": "HTTP status code"
        },
        {
          "name": "warning",
          "title": "Warning",
          "type": "`$STRING`",
          "short": "Warning messages separated by newline"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "episode",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/episode/all",
              "segments": [
                {
                  "lit": "episode"
                },
                {
                  "lit": "all"
                }
              ],
              "parts": [
                "episode",
                "all"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 50
                  },
                  {
                    "name": "offset",
                    "orig": "offset",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 0
                  }
                ]
              },
              "select": {
                "$action": "all",
                "exist": [
                  "limit",
                  "offset"
                ]
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/episode/{episode}",
              "segments": [
                {
                  "lit": "episode"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "episode",
                "{id}"
              ],
              "rename": {
                "param": {
                  "episode": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "episode",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 50
                  },
                  {
                    "name": "offset",
                    "orig": "offset",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 0
                  }
                ]
              },
              "select": {
                "exist": [
                  "id",
                  "limit",
                  "offset"
                ]
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/episode/by-season/{season}",
              "segments": [
                {
                  "lit": "episode"
                },
                {
                  "lit": "by-season"
                },
                {
                  "var": "season"
                }
              ],
              "parts": [
                "episode",
                "by-season",
                "{season}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "season",
                    "orig": "season",
                    "type": "`$INTEGER`",
                    "kind": "param",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 50
                  },
                  {
                    "name": "offset",
                    "orig": "offset",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 0
                  }
                ]
              },
              "select": {
                "exist": [
                  "limit",
                  "offset",
                  "season"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "image": {
      "fields": [],
      "name": "image",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/image/all",
              "segments": [
                {
                  "lit": "image"
                },
                {
                  "lit": "all"
                }
              ],
              "parts": [
                "image",
                "all"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 50
                  },
                  {
                    "name": "offset",
                    "orig": "offset",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 0
                  }
                ]
              },
              "select": {
                "$action": "all",
                "exist": [
                  "limit",
                  "offset"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "kind": {
      "fields": [
        {
          "name": "data",
          "title": "Data",
          "type": "`$ARRAY`",
          "short": "Array of found objects."
        },
        {
          "name": "error",
          "title": "Error",
          "type": "`$STRING`",
          "short": "First error message"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        },
        {
          "name": "status",
          "title": "Status",
          "type": "`$INTEGER`",
          "req": true,
          "short": "HTTP status code"
        },
        {
          "name": "warning",
          "title": "Warning",
          "type": "`$STRING`",
          "short": "Warning messages separated by newline"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "kind",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/kind/all",
              "segments": [
                {
                  "lit": "kind"
                },
                {
                  "lit": "all"
                }
              ],
              "parts": [
                "kind",
                "all"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 50
                  },
                  {
                    "name": "offset",
                    "orig": "offset",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 0
                  }
                ]
              },
              "select": {
                "$action": "all",
                "exist": [
                  "limit",
                  "offset"
                ]
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/kind/{kind}",
              "segments": [
                {
                  "lit": "kind"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "kind",
                "{id}"
              ],
              "rename": {
                "param": {
                  "kind": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "kind",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "song": {
      "fields": [
        {
          "name": "data",
          "title": "Data",
          "type": "`$ARRAY`",
          "short": "Array of found objects."
        },
        {
          "name": "error",
          "title": "Error",
          "type": "`$STRING`",
          "short": "First error message"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        },
        {
          "name": "status",
          "title": "Status",
          "type": "`$INTEGER`",
          "req": true,
          "short": "HTTP status code"
        },
        {
          "name": "warning",
          "title": "Warning",
          "type": "`$STRING`",
          "short": "Warning messages separated by newline"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "song",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/song/all",
              "segments": [
                {
                  "lit": "song"
                },
                {
                  "lit": "all"
                }
              ],
              "parts": [
                "song",
                "all"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 50
                  },
                  {
                    "name": "offset",
                    "orig": "offset",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 0
                  }
                ]
              },
              "select": {
                "$action": "all",
                "exist": [
                  "limit",
                  "offset"
                ]
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/song/by-episode/{episode}",
              "segments": [
                {
                  "lit": "song"
                },
                {
                  "lit": "by-episode"
                },
                {
                  "var": "episode"
                }
              ],
              "parts": [
                "song",
                "by-episode",
                "{episode}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "episode",
                    "orig": "episode",
                    "type": "`$ANY`",
                    "kind": "param",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 50
                  },
                  {
                    "name": "offset",
                    "orig": "offset",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 0
                  }
                ]
              },
              "select": {
                "exist": [
                  "episode",
                  "limit",
                  "offset"
                ]
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/song/{song}",
              "segments": [
                {
                  "lit": "song"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "song",
                "{id}"
              ],
              "rename": {
                "param": {
                  "song": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "song",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 50
                  },
                  {
                    "name": "offset",
                    "orig": "offset",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 0
                  }
                ]
              },
              "select": {
                "exist": [
                  "id",
                  "limit",
                  "offset"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}


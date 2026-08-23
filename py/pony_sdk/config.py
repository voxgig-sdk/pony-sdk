# Pony SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Pony",
            "slug": "pony",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "http://ponyapi.net/v1",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "character": {},
                "comic": {},
                "episode": {},
                "image": {},
                "kind": {},
                "song": {},
            },
        },
        "entity": {
      "character": {
        "fields": [
          {
            "name": "data",
            "short": "Array of found objects.",
            "type": "`$ARRAY`",
            "union": {
              "branches": 3,
              "count": 4,
              "depth": 4,
            },
          },
          {
            "name": "error",
            "short": "First error message",
            "type": "`$STRING`",
          },
          {
            "name": "status",
            "req": True,
            "short": "HTTP status code",
            "type": "`$INTEGER`",
          },
          {
            "name": "warning",
            "short": "Warning messages separated by newline",
            "type": "`$STRING`",
          },
        ],
        "name": "character",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": 50,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 0,
                      "kind": "query",
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/character/all",
                "parts": [
                  "character",
                  "all",
                ],
                "select": {
                  "$action": "all",
                  "exist": [
                    "limit",
                    "offset",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "character",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "example": 50,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 0,
                      "kind": "query",
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/character/{character}",
                "parts": [
                  "character",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "character": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                    "limit",
                    "offset",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "example": "dragon",
                      "kind": "param",
                      "name": "kind",
                      "orig": "kind",
                      "reqd": True,
                      "type": "`$ANY`",
                    },
                  ],
                  "query": [
                    {
                      "example": 50,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 0,
                      "kind": "query",
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/character/by-kind/{kind}",
                "parts": [
                  "character",
                  "by-kind",
                  "{kind}",
                ],
                "select": {
                  "exist": [
                    "kind",
                    "limit",
                    "offset",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "example": "crusader",
                      "kind": "param",
                      "name": "occupation",
                      "orig": "occupation",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "example": 50,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 0,
                      "kind": "query",
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/character/by-occupation/{occupation}",
                "parts": [
                  "character",
                  "by-occupation",
                  "{occupation}",
                ],
                "select": {
                  "exist": [
                    "limit",
                    "occupation",
                    "offset",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "residence",
                      "orig": "residence",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "example": 50,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 0,
                      "kind": "query",
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/character/by-residence/{residence}",
                "parts": [
                  "character",
                  "by-residence",
                  "{residence}",
                ],
                "select": {
                  "exist": [
                    "limit",
                    "offset",
                    "residence",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "by_kind",
            ],
            [
              "by_occupation",
            ],
            [
              "by_residence",
            ],
          ],
        },
      },
      "comic": {
        "fields": [
          {
            "name": "data",
            "short": "Array of found objects.",
            "type": "`$ARRAY`",
            "union": {
              "branches": 3,
              "count": 4,
              "depth": 4,
            },
          },
          {
            "name": "error",
            "short": "First error message",
            "type": "`$STRING`",
          },
          {
            "name": "status",
            "req": True,
            "short": "HTTP status code",
            "type": "`$INTEGER`",
          },
          {
            "name": "warning",
            "short": "Warning messages separated by newline",
            "type": "`$STRING`",
          },
        ],
        "name": "comic",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": 50,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 0,
                      "kind": "query",
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/comics/all",
                "parts": [
                  "comics",
                  "all",
                ],
                "select": {
                  "$action": "all",
                  "exist": [
                    "limit",
                    "offset",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "comic",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "example": 50,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 0,
                      "kind": "query",
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/comics/{comics}",
                "parts": [
                  "comics",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "comics": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                    "limit",
                    "offset",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "series",
                      "orig": "series",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "example": 50,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 0,
                      "kind": "query",
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/comics/by-series/{series}",
                "parts": [
                  "comics",
                  "by-series",
                  "{series}",
                ],
                "select": {
                  "exist": [
                    "limit",
                    "offset",
                    "series",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "by_series",
            ],
          ],
        },
      },
      "episode": {
        "fields": [
          {
            "name": "data",
            "short": "Array of found objects.",
            "type": "`$ARRAY`",
            "union": {
              "branches": 3,
              "count": 4,
              "depth": 4,
            },
          },
          {
            "name": "error",
            "short": "First error message",
            "type": "`$STRING`",
          },
          {
            "name": "status",
            "req": True,
            "short": "HTTP status code",
            "type": "`$INTEGER`",
          },
          {
            "name": "warning",
            "short": "Warning messages separated by newline",
            "type": "`$STRING`",
          },
        ],
        "name": "episode",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": 50,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 0,
                      "kind": "query",
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/episode/all",
                "parts": [
                  "episode",
                  "all",
                ],
                "select": {
                  "$action": "all",
                  "exist": [
                    "limit",
                    "offset",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "episode",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "example": 50,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 0,
                      "kind": "query",
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/episode/{episode}",
                "parts": [
                  "episode",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "episode": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                    "limit",
                    "offset",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "season",
                      "orig": "season",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                  "query": [
                    {
                      "example": 50,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 0,
                      "kind": "query",
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/episode/by-season/{season}",
                "parts": [
                  "episode",
                  "by-season",
                  "{season}",
                ],
                "select": {
                  "exist": [
                    "limit",
                    "offset",
                    "season",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "by_season",
            ],
          ],
        },
      },
      "image": {
        "fields": [
          {
            "name": "data",
            "short": "Array of found objects.",
            "type": "`$ARRAY`",
            "union": {
              "branches": 3,
              "count": 4,
              "depth": 4,
            },
          },
          {
            "name": "error",
            "short": "First error message",
            "type": "`$STRING`",
          },
          {
            "name": "status",
            "req": True,
            "short": "HTTP status code",
            "type": "`$INTEGER`",
          },
          {
            "name": "warning",
            "short": "Warning messages separated by newline",
            "type": "`$STRING`",
          },
        ],
        "name": "image",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": 50,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 0,
                      "kind": "query",
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/image/all",
                "parts": [
                  "image",
                  "all",
                ],
                "select": {
                  "$action": "all",
                  "exist": [
                    "limit",
                    "offset",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "kind": {
        "fields": [
          {
            "name": "data",
            "short": "Array of found objects.",
            "type": "`$ARRAY`",
            "union": {
              "branches": 3,
              "count": 4,
              "depth": 4,
            },
          },
          {
            "name": "error",
            "short": "First error message",
            "type": "`$STRING`",
          },
          {
            "name": "status",
            "req": True,
            "short": "HTTP status code",
            "type": "`$INTEGER`",
          },
          {
            "name": "warning",
            "short": "Warning messages separated by newline",
            "type": "`$STRING`",
          },
        ],
        "name": "kind",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": 50,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 0,
                      "kind": "query",
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/kind/all",
                "parts": [
                  "kind",
                  "all",
                ],
                "select": {
                  "$action": "all",
                  "exist": [
                    "limit",
                    "offset",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "kind",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/kind/{kind}",
                "parts": [
                  "kind",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "kind": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "song": {
        "fields": [
          {
            "name": "data",
            "short": "Array of found objects.",
            "type": "`$ARRAY`",
            "union": {
              "branches": 3,
              "count": 4,
              "depth": 4,
            },
          },
          {
            "name": "error",
            "short": "First error message",
            "type": "`$STRING`",
          },
          {
            "name": "status",
            "req": True,
            "short": "HTTP status code",
            "type": "`$INTEGER`",
          },
          {
            "name": "warning",
            "short": "Warning messages separated by newline",
            "type": "`$STRING`",
          },
        ],
        "name": "song",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": 50,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 0,
                      "kind": "query",
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/song/all",
                "parts": [
                  "song",
                  "all",
                ],
                "select": {
                  "$action": "all",
                  "exist": [
                    "limit",
                    "offset",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "episode",
                      "orig": "episode",
                      "reqd": True,
                      "type": "`$ANY`",
                    },
                  ],
                  "query": [
                    {
                      "example": 50,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 0,
                      "kind": "query",
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/song/by-episode/{episode}",
                "parts": [
                  "song",
                  "by-episode",
                  "{episode}",
                ],
                "select": {
                  "exist": [
                    "episode",
                    "limit",
                    "offset",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "song",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "example": 50,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 0,
                      "kind": "query",
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/song/{song}",
                "parts": [
                  "song",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "song": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                    "limit",
                    "offset",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "by_episode",
            ],
          ],
        },
      },
    },
    }

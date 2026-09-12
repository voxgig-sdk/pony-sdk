# Pony SDK configuration

module PonyConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "Pony",
        "slug" => "pony",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
          "transport" => "base",
        },
      },
      "options" => {
        "base" => "http://ponyapi.net/v1",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "character" => {},
          "comic" => {},
          "episode" => {},
          "image" => {},
          "kind" => {},
          "song" => {},
        },
      },
      "entity" => {
        "character" => {
          "fields" => [
            {
              "name" => "data",
              "short" => "Array of found objects.",
              "type" => "`$ARRAY`",
              "union" => {
                "branches" => 3,
                "count" => 4,
                "depth" => 4,
              },
            },
            {
              "name" => "error",
              "short" => "First error message",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "status",
              "req" => true,
              "short" => "HTTP status code",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "warning",
              "short" => "Warning messages separated by newline",
              "type" => "`$STRING`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "character",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => 50,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "example" => 0,
                        "kind" => "query",
                        "name" => "offset",
                        "orig" => "offset",
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/character/all",
                  "segments" => [
                    {
                      "lit" => "character",
                    },
                    {
                      "lit" => "all",
                    },
                  ],
                  "select" => {
                    "$action" => "all",
                    "exist" => [
                      "limit",
                      "offset",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "character",
                    "all",
                  ],
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "character",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                    "query" => [
                      {
                        "example" => 50,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "example" => 0,
                        "kind" => "query",
                        "name" => "offset",
                        "orig" => "offset",
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/character/{character}",
                  "rename" => {
                    "param" => {
                      "character" => "id",
                    },
                  },
                  "segments" => [
                    {
                      "lit" => "character",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                      "limit",
                      "offset",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "character",
                    "{id}",
                  ],
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "dragon",
                        "kind" => "param",
                        "name" => "kind",
                        "orig" => "kind",
                        "reqd" => true,
                        "type" => "`$ANY`",
                      },
                    ],
                    "query" => [
                      {
                        "example" => 50,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "example" => 0,
                        "kind" => "query",
                        "name" => "offset",
                        "orig" => "offset",
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/character/by-kind/{kind}",
                  "segments" => [
                    {
                      "lit" => "character",
                    },
                    {
                      "lit" => "by-kind",
                    },
                    {
                      "var" => "kind",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "kind",
                      "limit",
                      "offset",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "character",
                    "by-kind",
                    "{kind}",
                  ],
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "crusader",
                        "kind" => "param",
                        "name" => "occupation",
                        "orig" => "occupation",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                    "query" => [
                      {
                        "example" => 50,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "example" => 0,
                        "kind" => "query",
                        "name" => "offset",
                        "orig" => "offset",
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/character/by-occupation/{occupation}",
                  "segments" => [
                    {
                      "lit" => "character",
                    },
                    {
                      "lit" => "by-occupation",
                    },
                    {
                      "var" => "occupation",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "limit",
                      "occupation",
                      "offset",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "character",
                    "by-occupation",
                    "{occupation}",
                  ],
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "residence",
                        "orig" => "residence",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                    "query" => [
                      {
                        "example" => 50,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "example" => 0,
                        "kind" => "query",
                        "name" => "offset",
                        "orig" => "offset",
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/character/by-residence/{residence}",
                  "segments" => [
                    {
                      "lit" => "character",
                    },
                    {
                      "lit" => "by-residence",
                    },
                    {
                      "var" => "residence",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "limit",
                      "offset",
                      "residence",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "character",
                    "by-residence",
                    "{residence}",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
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
        "comic" => {
          "fields" => [
            {
              "name" => "data",
              "short" => "Array of found objects.",
              "type" => "`$ARRAY`",
              "union" => {
                "branches" => 3,
                "count" => 4,
                "depth" => 4,
              },
            },
            {
              "name" => "error",
              "short" => "First error message",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "status",
              "req" => true,
              "short" => "HTTP status code",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "warning",
              "short" => "Warning messages separated by newline",
              "type" => "`$STRING`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "comic",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => 50,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "example" => 0,
                        "kind" => "query",
                        "name" => "offset",
                        "orig" => "offset",
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/comics/all",
                  "segments" => [
                    {
                      "lit" => "comics",
                    },
                    {
                      "lit" => "all",
                    },
                  ],
                  "select" => {
                    "$action" => "all",
                    "exist" => [
                      "limit",
                      "offset",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "comics",
                    "all",
                  ],
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "comic",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                    "query" => [
                      {
                        "example" => 50,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "example" => 0,
                        "kind" => "query",
                        "name" => "offset",
                        "orig" => "offset",
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/comics/{comics}",
                  "rename" => {
                    "param" => {
                      "comics" => "id",
                    },
                  },
                  "segments" => [
                    {
                      "lit" => "comics",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                      "limit",
                      "offset",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "comics",
                    "{id}",
                  ],
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "series",
                        "orig" => "series",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                    "query" => [
                      {
                        "example" => 50,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "example" => 0,
                        "kind" => "query",
                        "name" => "offset",
                        "orig" => "offset",
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/comics/by-series/{series}",
                  "segments" => [
                    {
                      "lit" => "comics",
                    },
                    {
                      "lit" => "by-series",
                    },
                    {
                      "var" => "series",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "limit",
                      "offset",
                      "series",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "comics",
                    "by-series",
                    "{series}",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "by_series",
              ],
            ],
          },
        },
        "episode" => {
          "fields" => [
            {
              "name" => "data",
              "short" => "Array of found objects.",
              "type" => "`$ARRAY`",
              "union" => {
                "branches" => 3,
                "count" => 4,
                "depth" => 4,
              },
            },
            {
              "name" => "error",
              "short" => "First error message",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "status",
              "req" => true,
              "short" => "HTTP status code",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "warning",
              "short" => "Warning messages separated by newline",
              "type" => "`$STRING`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "episode",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => 50,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "example" => 0,
                        "kind" => "query",
                        "name" => "offset",
                        "orig" => "offset",
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/episode/all",
                  "segments" => [
                    {
                      "lit" => "episode",
                    },
                    {
                      "lit" => "all",
                    },
                  ],
                  "select" => {
                    "$action" => "all",
                    "exist" => [
                      "limit",
                      "offset",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "episode",
                    "all",
                  ],
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "episode",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                    "query" => [
                      {
                        "example" => 50,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "example" => 0,
                        "kind" => "query",
                        "name" => "offset",
                        "orig" => "offset",
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/episode/{episode}",
                  "rename" => {
                    "param" => {
                      "episode" => "id",
                    },
                  },
                  "segments" => [
                    {
                      "lit" => "episode",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                      "limit",
                      "offset",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "episode",
                    "{id}",
                  ],
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "season",
                        "orig" => "season",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                    ],
                    "query" => [
                      {
                        "example" => 50,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "example" => 0,
                        "kind" => "query",
                        "name" => "offset",
                        "orig" => "offset",
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/episode/by-season/{season}",
                  "segments" => [
                    {
                      "lit" => "episode",
                    },
                    {
                      "lit" => "by-season",
                    },
                    {
                      "var" => "season",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "limit",
                      "offset",
                      "season",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "episode",
                    "by-season",
                    "{season}",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "by_season",
              ],
            ],
          },
        },
        "image" => {
          "fields" => [
            {
              "name" => "data",
              "short" => "Array of found objects.",
              "type" => "`$ARRAY`",
              "union" => {
                "branches" => 3,
                "count" => 4,
                "depth" => 4,
              },
            },
            {
              "name" => "error",
              "short" => "First error message",
              "type" => "`$STRING`",
            },
            {
              "name" => "status",
              "req" => true,
              "short" => "HTTP status code",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "warning",
              "short" => "Warning messages separated by newline",
              "type" => "`$STRING`",
            },
          ],
          "name" => "image",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => 50,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "example" => 0,
                        "kind" => "query",
                        "name" => "offset",
                        "orig" => "offset",
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/image/all",
                  "segments" => [
                    {
                      "lit" => "image",
                    },
                    {
                      "lit" => "all",
                    },
                  ],
                  "select" => {
                    "$action" => "all",
                    "exist" => [
                      "limit",
                      "offset",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "image",
                    "all",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "kind" => {
          "fields" => [
            {
              "name" => "data",
              "short" => "Array of found objects.",
              "type" => "`$ARRAY`",
              "union" => {
                "branches" => 3,
                "count" => 4,
                "depth" => 4,
              },
            },
            {
              "name" => "error",
              "short" => "First error message",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "status",
              "req" => true,
              "short" => "HTTP status code",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "warning",
              "short" => "Warning messages separated by newline",
              "type" => "`$STRING`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "kind",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => 50,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "example" => 0,
                        "kind" => "query",
                        "name" => "offset",
                        "orig" => "offset",
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/kind/all",
                  "segments" => [
                    {
                      "lit" => "kind",
                    },
                    {
                      "lit" => "all",
                    },
                  ],
                  "select" => {
                    "$action" => "all",
                    "exist" => [
                      "limit",
                      "offset",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "kind",
                    "all",
                  ],
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "kind",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/kind/{kind}",
                  "rename" => {
                    "param" => {
                      "kind" => "id",
                    },
                  },
                  "segments" => [
                    {
                      "lit" => "kind",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "kind",
                    "{id}",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "song" => {
          "fields" => [
            {
              "name" => "data",
              "short" => "Array of found objects.",
              "type" => "`$ARRAY`",
              "union" => {
                "branches" => 3,
                "count" => 4,
                "depth" => 4,
              },
            },
            {
              "name" => "error",
              "short" => "First error message",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "status",
              "req" => true,
              "short" => "HTTP status code",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "warning",
              "short" => "Warning messages separated by newline",
              "type" => "`$STRING`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "song",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => 50,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "example" => 0,
                        "kind" => "query",
                        "name" => "offset",
                        "orig" => "offset",
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/song/all",
                  "segments" => [
                    {
                      "lit" => "song",
                    },
                    {
                      "lit" => "all",
                    },
                  ],
                  "select" => {
                    "$action" => "all",
                    "exist" => [
                      "limit",
                      "offset",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "song",
                    "all",
                  ],
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "episode",
                        "orig" => "episode",
                        "reqd" => true,
                        "type" => "`$ANY`",
                      },
                    ],
                    "query" => [
                      {
                        "example" => 50,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "example" => 0,
                        "kind" => "query",
                        "name" => "offset",
                        "orig" => "offset",
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/song/by-episode/{episode}",
                  "segments" => [
                    {
                      "lit" => "song",
                    },
                    {
                      "lit" => "by-episode",
                    },
                    {
                      "var" => "episode",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "episode",
                      "limit",
                      "offset",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "song",
                    "by-episode",
                    "{episode}",
                  ],
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "song",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                    "query" => [
                      {
                        "example" => 50,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "example" => 0,
                        "kind" => "query",
                        "name" => "offset",
                        "orig" => "offset",
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/song/{song}",
                  "rename" => {
                    "param" => {
                      "song" => "id",
                    },
                  },
                  "segments" => [
                    {
                      "lit" => "song",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                      "limit",
                      "offset",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "song",
                    "{id}",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "by_episode",
              ],
            ],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    PonyFeatures.make_feature(name)
  end
end

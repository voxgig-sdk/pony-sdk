# Pony SDK

Browse My Little Pony: Friendship is Magic characters, episodes, songs, and comics via a simple REST API

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Pony API

Pony API is a small REST service that exposes structured data about *My Little Pony: Friendship is Magic* — characters, episodes, songs, comics and related media — served from `http://ponyapi.net/v1/`. The dataset was hand-corrected from the MLP fandom wiki by the maintainer (contact: cloudcolt@protonmail.com).

What you get from the API:

- Character records searchable by id, name, kind, occupation or residence (`v1/character/...`).
- Episode records searchable by id, season, overall number or author (`v1/episode/...`).
- Song records, optionally filtered by episode or author (`v1/song/...`).
- Comic stories and comic issues, filterable by series, story or author (`v1/comics-story/...`, `v1/comics-issue/...`).
- Character kinds and image records, both cross-referenced to characters (`v1/kind/...`, `v1/image/...`).

Responses come back as JSON envelopes of the form `{ "status": 200, "data": [...], "warning": "...", "error": "..." }`. The global `limit` (default 50) and `offset` (default 0) query parameters page through list endpoints.

No authentication is required and CORS is enabled. The service does not document a published rate limit. A downloadable SQLite snapshot of the database and the API source are also offered from the homepage for offline use.

## Try it

**TypeScript**
```bash
npm install pony
```

**Python**
```bash
pip install pony-sdk
```

**PHP**
```bash
composer require voxgig/pony-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/pony-sdk/go
```

**Ruby**
```bash
gem install pony-sdk
```

**Lua**
```bash
luarocks install pony-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { PonySDK } from 'pony'

const client = new PonySDK({})

// List all characters
const characters = await client.Character().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o pony-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "pony": {
      "command": "/abs/path/to/pony-mcp"
    }
  }
}
```

## Entities

The API exposes 6 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Character** | A pony or other named cast member from the show, retrievable in bulk or by id/name and filterable by kind, occupation or residence via `v1/character/all`, `v1/character/[id|name]`, `v1/character/by-kind/[kind]`, `v1/character/by-occupation/[occupation]` and `v1/character/by-residence/[residence]`. | `/character/all` |
| **Comic** | An IDW comic story or issue, with story-level (`v1/comics-story/...`) and issue-level (`v1/comics-issue/...`) endpoints that support lookup by id/name and filtering by series, story or author. | `/comics/all` |
| **Episode** | An aired television episode, available via `v1/episode/all`, `v1/episode/[id]`, `v1/episode/by-overall/[number]`, `v1/episode/by-season/[season]/[episode|all]` and `v1/episode/by-author/[author]`. | `/episode/all` |
| **Image** | An image asset linked to a character, accessible via `v1/image/all`, `v1/image/[id|name]` and `v1/image/by-character/[id|name]`. | `/image/all` |
| **Kind** | A character type or species classification (e.g. pony sub-types), exposed via `v1/kind/all`, `v1/kind/[id|name]` and `v1/kind/by-character/[id|name]`. | `/kind/all` |
| **Song** | A song performed in the show, retrievable via `v1/song/all`, `v1/song/[id|name]`, `v1/song/by-episode/[id|name]` and `v1/song/by-author/[author]`. | `/song/all` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from pony_sdk import PonySDK

client = PonySDK({})

# List all characters
characters, err = client.Character(None).list(None, None)

# Load a specific character
character, err = client.Character(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'pony_sdk.php';

$client = new PonySDK([]);

// List all characters
[$characters, $err] = $client->Character(null)->list(null, null);

// Load a specific character
[$character, $err] = $client->Character(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/pony-sdk/go"

client := sdk.NewPonySDK(map[string]any{})

// List all characters
characters, err := client.Character(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "Pony_sdk"

client = PonySDK.new({})

# List all characters
characters, err = client.Character(nil).list(nil, nil)

# Load a specific character
character, err = client.Character(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("pony_sdk")

local client = sdk.new({})

-- List all characters
local characters, err = client:Character(nil):list(nil, nil)

-- Load a specific character
local character, err = client:Character(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = PonySDK.test()
const result = await client.Character().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = PonySDK.test(None, None)
result, err = client.Character(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = PonySDK::test(null, null);
[$result, $err] = $client->Character(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Character(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = PonySDK.test(nil, nil)
result, err = client.Character(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Character(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Pony API

- Upstream: [https://ponyapi.net/](https://ponyapi.net/)

- Database content is licensed under CC BY-SA 3.0, derived from the My Little Pony fandom wiki.
- API source code is licensed under the MIT License.
- Data was manually curated; the catalogue notes the last content update was 30 April 2020.
- Attribution to the upstream wiki contributors is required when redistributing the dataset.

---

Generated from the Pony API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

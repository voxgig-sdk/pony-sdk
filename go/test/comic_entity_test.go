package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/pony-sdk"
	"github.com/voxgig-sdk/pony-sdk/core"

	vs "github.com/voxgig/struct"
)

func TestComicEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Comic(nil)
		if ent == nil {
			t.Fatal("expected non-nil ComicEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := comicBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "comic." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set PONY_TEST_COMIC_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		comicRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.comic", setup.data)))
		var comicRef01Data map[string]any
		if len(comicRef01DataRaw) > 0 {
			comicRef01Data = core.ToMapAny(comicRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = comicRef01Data

		// LIST
		comicRef01Ent := client.Comic(nil)
		comicRef01Match := map[string]any{}

		comicRef01ListResult, err := comicRef01Ent.List(comicRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, comicRef01ListOk := comicRef01ListResult.([]any)
		if !comicRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", comicRef01ListResult)
		}

		// LOAD
		comicRef01MatchDt0 := map[string]any{}
		comicRef01DataDt0Loaded, err := comicRef01Ent.Load(comicRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if comicRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func comicBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "comic", "ComicTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read comic test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse comic test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"comic01", "comic02", "comic03", "by_series01", "by_series02", "by_series03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("PONY_TEST_COMIC_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"PONY_TEST_COMIC_ENTID": idmap,
		"PONY_TEST_LIVE":      "FALSE",
		"PONY_TEST_EXPLAIN":   "FALSE",
		"PONY_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["PONY_TEST_COMIC_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["PONY_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["PONY_APIKEY"],
			},
			extra,
		})
		client = sdk.NewPonySDK(core.ToMapAny(mergedOpts))
	}

	live := env["PONY_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["PONY_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}

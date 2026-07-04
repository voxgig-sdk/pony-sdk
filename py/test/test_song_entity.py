# Song entity test

import json
import os
import time

import pytest

from utility.voxgig_struct import voxgig_struct as vs
from pony_sdk import PonySDK
from core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestSongEntity:

    def test_should_create_instance(self):
        testsdk = PonySDK.test(None, None)
        ent = testsdk.Song(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _song_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["list", "load"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "song." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set PONY_TEST_SONG_ENTID JSON to run live")
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        song_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.song")))
        song_ref01_data = None
        if len(song_ref01_data_raw) > 0:
            song_ref01_data = helpers.to_map(song_ref01_data_raw[0][1])

        # LIST
        song_ref01_ent = client.Song(None)
        song_ref01_match = {}

        song_ref01_list_result = song_ref01_ent.list(song_ref01_match, None)
        assert isinstance(song_ref01_list_result, list)

        # LOAD
        song_ref01_match_dt0 = {}
        song_ref01_data_dt0_loaded = song_ref01_ent.load(song_ref01_match_dt0, None)
        assert song_ref01_data_dt0_loaded is not None



def _song_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/song/SongTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = PonySDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["song01", "song02", "song03", "by_episode01", "by_episode02", "by_episode03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Detect ENTID env override before envOverride consumes it. When live
    # mode is on without a real override, the basic test runs against synthetic
    # IDs from the fixture and 4xx's. We surface this so the test can skip.
    _entid_env_raw = os.environ.get(
        "PONY_TEST_SONG_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "PONY_TEST_SONG_ENTID": idmap,
        "PONY_TEST_LIVE": "FALSE",
        "PONY_TEST_EXPLAIN": "FALSE",
    })

    idmap_resolved = helpers.to_map(
        env.get("PONY_TEST_SONG_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("PONY_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            {
            },
            extra or {},
        ])
        client = PonySDK(helpers.to_map(merged_opts))

    _live = env.get("PONY_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("PONY_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }

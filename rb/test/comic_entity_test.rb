# Comic entity test

require "minitest/autorun"
require "json"
require_relative "../Pony_sdk"
require_relative "runner"

class ComicEntityTest < Minitest::Test
  def test_create_instance
    testsdk = PonySDK.test(nil, nil)
    ent = testsdk.Comic(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = comic_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "comic." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set PONY_TEST_COMIC_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    comic_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.comic")))
    comic_ref01_data = nil
    if comic_ref01_data_raw.length > 0
      comic_ref01_data = Helpers.to_map(comic_ref01_data_raw[0][1])
    end

    # LIST
    comic_ref01_ent = client.Comic(nil)
    comic_ref01_match = {}

    comic_ref01_list_result = comic_ref01_ent.list(comic_ref01_match, nil)
    assert comic_ref01_list_result.is_a?(Array)

    # LOAD
    comic_ref01_match_dt0 = {}
    comic_ref01_data_dt0_loaded = comic_ref01_ent.load(comic_ref01_match_dt0, nil)
    assert !comic_ref01_data_dt0_loaded.nil?

  end
end

def comic_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "comic", "ComicTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = PonySDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["comic01", "comic02", "comic03", "by_series01", "by_series02", "by_series03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["PONY_TEST_COMIC_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "PONY_TEST_COMIC_ENTID" => idmap,
    "PONY_TEST_LIVE" => "FALSE",
    "PONY_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["PONY_TEST_COMIC_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["PONY_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
      },
      extra || {},
    ])
    client = PonySDK.new(Helpers.to_map(merged_opts))
  end

  live = env["PONY_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["PONY_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end

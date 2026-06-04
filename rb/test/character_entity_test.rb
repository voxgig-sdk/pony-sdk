# Character entity test

require "minitest/autorun"
require "json"
require_relative "../Pony_sdk"
require_relative "runner"

class CharacterEntityTest < Minitest::Test
  def test_create_instance
    testsdk = PonySDK.test(nil, nil)
    ent = testsdk.Character(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = character_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "character." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set PONY_TEST_CHARACTER_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    character_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.character")))
    character_ref01_data = nil
    if character_ref01_data_raw.length > 0
      character_ref01_data = Helpers.to_map(character_ref01_data_raw[0][1])
    end

    # LIST
    character_ref01_ent = client.Character(nil)
    character_ref01_match = {}

    character_ref01_list_result, err = character_ref01_ent.list(character_ref01_match, nil)
    assert_nil err
    assert character_ref01_list_result.is_a?(Array)

    # LOAD
    character_ref01_match_dt0 = {}
    character_ref01_data_dt0_loaded, err = character_ref01_ent.load(character_ref01_match_dt0, nil)
    assert_nil err
    assert !character_ref01_data_dt0_loaded.nil?

  end
end

def character_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "character", "CharacterTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = PonySDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["character01", "character02", "character03", "by_kind01", "by_kind02", "by_kind03", "by_occupation01", "by_occupation02", "by_occupation03", "by_residence01", "by_residence02", "by_residence03"],
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
  entid_env_raw = ENV["PONY_TEST_CHARACTER_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "PONY_TEST_CHARACTER_ENTID" => idmap,
    "PONY_TEST_LIVE" => "FALSE",
    "PONY_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["PONY_TEST_CHARACTER_ENTID"])
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

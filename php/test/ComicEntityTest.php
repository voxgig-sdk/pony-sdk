<?php
declare(strict_types=1);

// Comic entity test

require_once __DIR__ . '/../pony_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class ComicEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = PonySDK::test(null, null);
        $ent = $testsdk->Comic(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = comic_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "comic." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set PONY_TEST_COMIC_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $comic_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.comic")));
        $comic_ref01_data = null;
        if (count($comic_ref01_data_raw) > 0) {
            $comic_ref01_data = Helpers::to_map($comic_ref01_data_raw[0][1]);
        }

        // LIST
        $comic_ref01_ent = $client->Comic(null);
        $comic_ref01_match = [];

        [$comic_ref01_list_result, $err] = $comic_ref01_ent->list($comic_ref01_match, null);
        $this->assertNull($err);
        $this->assertIsArray($comic_ref01_list_result);

        // LOAD
        $comic_ref01_match_dt0 = [];
        [$comic_ref01_data_dt0_loaded, $err] = $comic_ref01_ent->load($comic_ref01_match_dt0, null);
        $this->assertNull($err);
        $this->assertNotNull($comic_ref01_data_dt0_loaded);

    }
}

function comic_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/comic/ComicTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = PonySDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["comic01", "comic02", "comic03", "by_series01", "by_series02", "by_series03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("PONY_TEST_COMIC_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "PONY_TEST_COMIC_ENTID" => $idmap,
        "PONY_TEST_LIVE" => "FALSE",
        "PONY_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["PONY_TEST_COMIC_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["PONY_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
            ],
            $extra ?? [],
        ]);
        $client = new PonySDK(Helpers::to_map($merged_opts));
    }

    $live = $env["PONY_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["PONY_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}

<?php
declare(strict_types=1);

// Pony SDK exists test

require_once __DIR__ . '/../pony_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = PonySDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}

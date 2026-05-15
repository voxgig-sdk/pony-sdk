<?php
declare(strict_types=1);

// Pony SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class PonyFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new PonyBaseFeature();
            case "test":
                return new PonyTestFeature();
            default:
                return new PonyBaseFeature();
        }
    }
}

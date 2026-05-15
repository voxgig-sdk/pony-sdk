<?php
declare(strict_types=1);

// Pony SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class PonyMakeContext
{
    public static function call(array $ctxmap, ?PonyContext $basectx): PonyContext
    {
        return new PonyContext($ctxmap, $basectx);
    }
}

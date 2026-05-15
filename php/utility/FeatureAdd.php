<?php
declare(strict_types=1);

// Pony SDK utility: feature_add

class PonyFeatureAdd
{
    public static function call(PonyContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}

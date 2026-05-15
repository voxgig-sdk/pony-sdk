<?php
declare(strict_types=1);

// Pony SDK utility: prepare_body

class PonyPrepareBody
{
    public static function call(PonyContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}

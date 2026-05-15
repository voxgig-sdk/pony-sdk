<?php
declare(strict_types=1);

// Pony SDK utility: result_body

class PonyResultBody
{
    public static function call(PonyContext $ctx): ?PonyResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}

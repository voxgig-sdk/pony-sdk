<?php
declare(strict_types=1);

// Pony SDK utility: result_headers

class PonyResultHeaders
{
    public static function call(PonyContext $ctx): ?PonyResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}

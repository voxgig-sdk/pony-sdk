<?php
declare(strict_types=1);

// Pony SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

PonyUtility::setRegistrar(function (PonyUtility $u): void {
    $u->clean = [PonyClean::class, 'call'];
    $u->done = [PonyDone::class, 'call'];
    $u->make_error = [PonyMakeError::class, 'call'];
    $u->feature_add = [PonyFeatureAdd::class, 'call'];
    $u->feature_hook = [PonyFeatureHook::class, 'call'];
    $u->feature_init = [PonyFeatureInit::class, 'call'];
    $u->fetcher = [PonyFetcher::class, 'call'];
    $u->make_fetch_def = [PonyMakeFetchDef::class, 'call'];
    $u->make_context = [PonyMakeContext::class, 'call'];
    $u->make_options = [PonyMakeOptions::class, 'call'];
    $u->make_request = [PonyMakeRequest::class, 'call'];
    $u->make_response = [PonyMakeResponse::class, 'call'];
    $u->make_result = [PonyMakeResult::class, 'call'];
    $u->make_point = [PonyMakePoint::class, 'call'];
    $u->make_spec = [PonyMakeSpec::class, 'call'];
    $u->make_url = [PonyMakeUrl::class, 'call'];
    $u->param = [PonyParam::class, 'call'];
    $u->prepare_auth = [PonyPrepareAuth::class, 'call'];
    $u->prepare_body = [PonyPrepareBody::class, 'call'];
    $u->prepare_headers = [PonyPrepareHeaders::class, 'call'];
    $u->prepare_method = [PonyPrepareMethod::class, 'call'];
    $u->prepare_params = [PonyPrepareParams::class, 'call'];
    $u->prepare_path = [PonyPreparePath::class, 'call'];
    $u->prepare_query = [PonyPrepareQuery::class, 'call'];
    $u->result_basic = [PonyResultBasic::class, 'call'];
    $u->result_body = [PonyResultBody::class, 'call'];
    $u->result_headers = [PonyResultHeaders::class, 'call'];
    $u->transform_request = [PonyTransformRequest::class, 'call'];
    $u->transform_response = [PonyTransformResponse::class, 'call'];
});

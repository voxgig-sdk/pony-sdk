# Pony SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

PonyUtility.registrar = ->(u) {
  u.clean = PonyUtilities::Clean
  u.done = PonyUtilities::Done
  u.make_error = PonyUtilities::MakeError
  u.feature_add = PonyUtilities::FeatureAdd
  u.feature_hook = PonyUtilities::FeatureHook
  u.feature_init = PonyUtilities::FeatureInit
  u.fetcher = PonyUtilities::Fetcher
  u.make_fetch_def = PonyUtilities::MakeFetchDef
  u.make_context = PonyUtilities::MakeContext
  u.make_options = PonyUtilities::MakeOptions
  u.make_request = PonyUtilities::MakeRequest
  u.make_response = PonyUtilities::MakeResponse
  u.make_result = PonyUtilities::MakeResult
  u.make_point = PonyUtilities::MakePoint
  u.make_spec = PonyUtilities::MakeSpec
  u.make_url = PonyUtilities::MakeUrl
  u.param = PonyUtilities::Param
  u.prepare_auth = PonyUtilities::PrepareAuth
  u.prepare_body = PonyUtilities::PrepareBody
  u.prepare_headers = PonyUtilities::PrepareHeaders
  u.prepare_method = PonyUtilities::PrepareMethod
  u.prepare_params = PonyUtilities::PrepareParams
  u.prepare_path = PonyUtilities::PreparePath
  u.prepare_query = PonyUtilities::PrepareQuery
  u.result_basic = PonyUtilities::ResultBasic
  u.result_body = PonyUtilities::ResultBody
  u.result_headers = PonyUtilities::ResultHeaders
  u.transform_request = PonyUtilities::TransformRequest
  u.transform_response = PonyUtilities::TransformResponse
}



import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { PonySDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('ComicEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when PONY_TEST_LIVE=TRUE.
  afterEach(liveDelay('PONY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = PonySDK.test()
    const ent = testsdk.Comic()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.PONY_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'comic.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"data","req":false,"short":"Array of found objects.","type":"`$ARRAY`","union":{"branches":3,"count":4,"depth":4},"index$":0},{"active":true,"name":"error","req":false,"short":"First error message","type":"`$STRING`","index$":1},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":2},{"active":true,"name":"status","req":true,"short":"HTTP status code","type":"`$INTEGER`","index$":3},{"active":true,"name":"warning","req":false,"short":"Warning messages separated by newline","type":"`$STRING`","index$":4}],"id":{"field":"id","name":"id"},"name":"comic","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":50,"kind":"query","name":"limit","orig":"limit","reqd":false,"type":"`$INTEGER`","index$":0},{"active":true,"example":0,"kind":"query","name":"offset","orig":"offset","reqd":false,"type":"`$INTEGER`","index$":1}]},"contract":{"id":"GET /comics/all","json":"{\"operationId\":\"getAllComics\",\"parameters\":[{\"description\":\"Limit of the response data array\",\"in\":\"query\",\"name\":\"limit\",\"required\":false,\"schema\":{\"default\":50,\"type\":\"integer\"}},{\"description\":\"Offset of the response data array (SQL-like behavior)\",\"in\":\"query\",\"name\":\"offset\",\"required\":false,\"schema\":{\"default\":0,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"allOf\":[{\"properties\":{\"data\":{\"description\":\"Array of found objects. Empty array if no objects found.\",\"items\":{\"properties\":{\"airdate\":{\"description\":\"Air date of the episode\",\"format\":\"date\",\"type\":\"string\"},\"alias\":{\"description\":\"Possible alias of this character\",\"type\":\"string\"},\"comment\":{\"description\":\"Comment about the kind\",\"type\":\"string\"},\"cover_image\":{\"description\":\"Cover image URL\",\"format\":\"uri\",\"type\":\"string\"},\"description\":{\"description\":\"Image description\",\"type\":\"string\"},\"episode\":{\"description\":\"Episode number within the season\",\"type\":\"integer\"},\"id\":{\"description\":\"Unique character identifier\",\"type\":\"integer\"},\"image\":{\"description\":\"All images of possible kinds and transformations of this character\",\"items\":{\"oneOf\":[{\"type\":\"integer\"},{\"format\":\"uri\",\"type\":\"string\"},{\"items\":{},\"type\":\"array\"}]},\"type\":\"array\"},\"issues\":{\"description\":\"Issues contained in this story\",\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"kind\":{\"description\":\"All possible kinds of this character\",\"items\":{\"oneOf\":[{\"type\":\"integer\"},{\"type\":\"string\"},{\"items\":{},\"type\":\"array\"}]},\"type\":\"array\"},\"length\":{\"description\":\"Length of the song\",\"type\":\"string\"},\"name\":{\"description\":\"The name of this character\",\"type\":\"string\"},\"occupation\":{\"description\":\"Occupation of this character\",\"oneOf\":[{\"type\":\"string\"},{\"items\":{\"type\":\"string\"},\"type\":\"array\"}]},\"overall\":{\"description\":\"Overall episode number\",\"type\":\"integer\"},\"residence\":{\"description\":\"Residence of this character\",\"oneOf\":[{\"type\":\"string\"},{\"items\":{\"type\":\"string\"},\"type\":\"array\"}]},\"season\":{\"description\":\"Season number\",\"type\":\"integer\"},\"series\":{\"description\":\"Series name\",\"type\":\"string\"},\"sex\":{\"description\":\"Sex of this character\",\"type\":\"string\"},\"thumbnail\":{\"description\":\"Thumbnail image URL\",\"format\":\"uri\",\"type\":\"string\"},\"url\":{\"description\":\"URL to the MLP fandom wiki about this character\",\"format\":\"uri\",\"type\":\"string\"},\"video_url\":{\"description\":\"Video URL\",\"format\":\"uri\",\"type\":\"string\"}},\"required\":[\"id\",\"name\",\"url\"],\"type\":\"object\"},\"type\":\"array\"},\"error\":{\"description\":\"First error message\",\"type\":\"string\"},\"status\":{\"description\":\"HTTP status code\",\"type\":\"integer\"},\"warning\":{\"description\":\"Warning messages separated by newline\",\"type\":\"string\"}},\"required\":[\"status\"],\"type\":\"object\"},{\"properties\":{\"data\":{\"description\":\"Array of found objects. Empty array if no objects found.\",\"items\":{\"properties\":{\"airdate\":{\"description\":\"Air date of the episode\",\"format\":\"date\",\"type\":\"string\"},\"alias\":{\"description\":\"Possible alias of this character\",\"type\":\"string\"},\"cover_image\":{\"description\":\"Cover image URL\",\"format\":\"uri\",\"type\":\"string\"},\"description\":{\"description\":\"Image description\",\"type\":\"string\"},\"episode\":{\"description\":\"Episode number within the season\",\"type\":\"integer\"},\"id\":{\"description\":\"Unique character identifier\",\"type\":\"integer\"},\"image\":{\"description\":\"All images of possible kinds and transformations of this character\",\"items\":{\"oneOf\":[{\"type\":\"integer\"},{\"format\":\"uri\",\"type\":\"string\"},{\"items\":{},\"type\":\"array\"}]},\"type\":\"array\"},\"issues\":{\"description\":\"Issues contained in this story\",\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"kind\":{\"description\":\"All possible kinds of this character\",\"items\":{\"oneOf\":[{\"type\":\"integer\"},{\"type\":\"string\"},{\"items\":{},\"type\":\"array\"}]},\"type\":\"array\"},\"name\":{\"description\":\"The name of this character\",\"type\":\"string\"},\"occupation\":{\"description\":\"Occupation of this character\",\"oneOf\":[{\"type\":\"string\"},{\"items\":{\"type\":\"string\"},\"type\":\"array\"}]},\"overall\":{\"description\":\"Overall episode number\",\"type\":\"integer\"},\"residence\":{\"description\":\"Residence of this character\",\"oneOf\":[{\"type\":\"string\"},{\"items\":{\"type\":\"string\"},\"type\":\"array\"}]},\"season\":{\"description\":\"Season number\",\"type\":\"integer\"},\"series\":{\"description\":\"Series name\",\"type\":\"string\"},\"sex\":{\"description\":\"Sex of this character\",\"type\":\"string\"},\"thumbnail\":{\"description\":\"Thumbnail image URL\",\"format\":\"uri\",\"type\":\"string\"},\"url\":{\"description\":\"URL to the MLP fandom wiki about this character\",\"format\":\"uri\",\"type\":\"string\"}},\"required\":[\"id\",\"name\",\"url\"],\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}]}}},\"description\":\"Successful response with comics data\"},\"400\":{\"content\":{\"application/json\":{\"example\":{\"error\":\"Some arguments are not valid\",\"status\":400},\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"status\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Bad Request - Some arguments are not valid\"},\"405\":{\"content\":{\"application/json\":{\"example\":{\"error\":\"Method not allowed\",\"status\":405},\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"status\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Method Not Allowed - Invalid method\"},\"500\":{\"content\":{\"application/json\":{\"example\":{\"error\":\"Internal server error\",\"status\":500},\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"status\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Internal Server Error - Server-side error in database query\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/comics/all","segments":[{"lit":"comics"},{"lit":"all"}],"select":{"$action":"all","exist":["limit","offset"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"comic","reqd":true,"type":"`$STRING`","index$":0}],"query":[{"active":true,"example":50,"kind":"query","name":"limit","orig":"limit","reqd":false,"type":"`$INTEGER`","index$":0},{"active":true,"example":0,"kind":"query","name":"offset","orig":"offset","reqd":false,"type":"`$INTEGER`","index$":1}]},"contract":{"id":"GET /comics/{comics}","json":"{\"operationId\":\"getComics\",\"parameters\":[{\"description\":\"Comics ID (integer) or name (string)\",\"in\":\"path\",\"name\":\"comics\",\"required\":true,\"schema\":{\"oneOf\":[{\"type\":\"integer\"},{\"type\":\"string\"}]}},{\"description\":\"Limit of the response data array\",\"in\":\"query\",\"name\":\"limit\",\"required\":false,\"schema\":{\"default\":50,\"type\":\"integer\"}},{\"description\":\"Offset of the response data array (SQL-like behavior)\",\"in\":\"query\",\"name\":\"offset\",\"required\":false,\"schema\":{\"default\":0,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"allOf\":[{\"properties\":{\"data\":{\"description\":\"Array of found objects. Empty array if no objects found.\",\"items\":{\"properties\":{\"airdate\":{\"description\":\"Air date of the episode\",\"format\":\"date\",\"type\":\"string\"},\"alias\":{\"description\":\"Possible alias of this character\",\"type\":\"string\"},\"comment\":{\"description\":\"Comment about the kind\",\"type\":\"string\"},\"cover_image\":{\"description\":\"Cover image URL\",\"format\":\"uri\",\"type\":\"string\"},\"description\":{\"description\":\"Image description\",\"type\":\"string\"},\"episode\":{\"description\":\"Episode number within the season\",\"type\":\"integer\"},\"id\":{\"description\":\"Unique character identifier\",\"type\":\"integer\"},\"image\":{\"description\":\"All images of possible kinds and transformations of this character\",\"items\":{\"oneOf\":[{\"type\":\"integer\"},{\"format\":\"uri\",\"type\":\"string\"},{\"items\":{},\"type\":\"array\"}]},\"type\":\"array\"},\"issues\":{\"description\":\"Issues contained in this story\",\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"kind\":{\"description\":\"All possible kinds of this character\",\"items\":{\"oneOf\":[{\"type\":\"integer\"},{\"type\":\"string\"},{\"items\":{},\"type\":\"array\"}]},\"type\":\"array\"},\"length\":{\"description\":\"Length of the song\",\"type\":\"string\"},\"name\":{\"description\":\"The name of this character\",\"type\":\"string\"},\"occupation\":{\"description\":\"Occupation of this character\",\"oneOf\":[{\"type\":\"string\"},{\"items\":{\"type\":\"string\"},\"type\":\"array\"}]},\"overall\":{\"description\":\"Overall episode number\",\"type\":\"integer\"},\"residence\":{\"description\":\"Residence of this character\",\"oneOf\":[{\"type\":\"string\"},{\"items\":{\"type\":\"string\"},\"type\":\"array\"}]},\"season\":{\"description\":\"Season number\",\"type\":\"integer\"},\"series\":{\"description\":\"Series name\",\"type\":\"string\"},\"sex\":{\"description\":\"Sex of this character\",\"type\":\"string\"},\"thumbnail\":{\"description\":\"Thumbnail image URL\",\"format\":\"uri\",\"type\":\"string\"},\"url\":{\"description\":\"URL to the MLP fandom wiki about this character\",\"format\":\"uri\",\"type\":\"string\"},\"video_url\":{\"description\":\"Video URL\",\"format\":\"uri\",\"type\":\"string\"}},\"required\":[\"id\",\"name\",\"url\"],\"type\":\"object\"},\"type\":\"array\"},\"error\":{\"description\":\"First error message\",\"type\":\"string\"},\"status\":{\"description\":\"HTTP status code\",\"type\":\"integer\"},\"warning\":{\"description\":\"Warning messages separated by newline\",\"type\":\"string\"}},\"required\":[\"status\"],\"type\":\"object\"},{\"properties\":{\"data\":{\"description\":\"Array of found objects. Empty array if no objects found.\",\"items\":{\"properties\":{\"airdate\":{\"description\":\"Air date of the episode\",\"format\":\"date\",\"type\":\"string\"},\"alias\":{\"description\":\"Possible alias of this character\",\"type\":\"string\"},\"cover_image\":{\"description\":\"Cover image URL\",\"format\":\"uri\",\"type\":\"string\"},\"description\":{\"description\":\"Image description\",\"type\":\"string\"},\"episode\":{\"description\":\"Episode number within the season\",\"type\":\"integer\"},\"id\":{\"description\":\"Unique character identifier\",\"type\":\"integer\"},\"image\":{\"description\":\"All images of possible kinds and transformations of this character\",\"items\":{\"oneOf\":[{\"type\":\"integer\"},{\"format\":\"uri\",\"type\":\"string\"},{\"items\":{},\"type\":\"array\"}]},\"type\":\"array\"},\"issues\":{\"description\":\"Issues contained in this story\",\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"kind\":{\"description\":\"All possible kinds of this character\",\"items\":{\"oneOf\":[{\"type\":\"integer\"},{\"type\":\"string\"},{\"items\":{},\"type\":\"array\"}]},\"type\":\"array\"},\"name\":{\"description\":\"The name of this character\",\"type\":\"string\"},\"occupation\":{\"description\":\"Occupation of this character\",\"oneOf\":[{\"type\":\"string\"},{\"items\":{\"type\":\"string\"},\"type\":\"array\"}]},\"overall\":{\"description\":\"Overall episode number\",\"type\":\"integer\"},\"residence\":{\"description\":\"Residence of this character\",\"oneOf\":[{\"type\":\"string\"},{\"items\":{\"type\":\"string\"},\"type\":\"array\"}]},\"season\":{\"description\":\"Season number\",\"type\":\"integer\"},\"series\":{\"description\":\"Series name\",\"type\":\"string\"},\"sex\":{\"description\":\"Sex of this character\",\"type\":\"string\"},\"thumbnail\":{\"description\":\"Thumbnail image URL\",\"format\":\"uri\",\"type\":\"string\"},\"url\":{\"description\":\"URL to the MLP fandom wiki about this character\",\"format\":\"uri\",\"type\":\"string\"}},\"required\":[\"id\",\"name\",\"url\"],\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}]}}},\"description\":\"Successful response with comics data\"},\"400\":{\"content\":{\"application/json\":{\"example\":{\"error\":\"Some arguments are not valid\",\"status\":400},\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"status\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Bad Request - Some arguments are not valid\"},\"405\":{\"content\":{\"application/json\":{\"example\":{\"error\":\"Method not allowed\",\"status\":405},\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"status\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Method Not Allowed - Invalid method\"},\"500\":{\"content\":{\"application/json\":{\"example\":{\"error\":\"Internal server error\",\"status\":500},\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"status\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Internal Server Error - Server-side error in database query\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/comics/{comics}","rename":{"param":{"comics":"id"}},"segments":[{"lit":"comics"},{"var":"id"}],"select":{"exist":["id","limit","offset"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"series","orig":"series","reqd":true,"type":"`$STRING`","index$":0}],"query":[{"active":true,"example":50,"kind":"query","name":"limit","orig":"limit","reqd":false,"type":"`$INTEGER`","index$":0},{"active":true,"example":0,"kind":"query","name":"offset","orig":"offset","reqd":false,"type":"`$INTEGER`","index$":1}]},"contract":{"id":"GET /comics/by-series/{series}","json":"{\"operationId\":\"getComicsBySeries\",\"parameters\":[{\"description\":\"Series name\",\"in\":\"path\",\"name\":\"series\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Limit of the response data array\",\"in\":\"query\",\"name\":\"limit\",\"required\":false,\"schema\":{\"default\":50,\"type\":\"integer\"}},{\"description\":\"Offset of the response data array (SQL-like behavior)\",\"in\":\"query\",\"name\":\"offset\",\"required\":false,\"schema\":{\"default\":0,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"allOf\":[{\"properties\":{\"data\":{\"description\":\"Array of found objects. Empty array if no objects found.\",\"items\":{\"properties\":{\"airdate\":{\"description\":\"Air date of the episode\",\"format\":\"date\",\"type\":\"string\"},\"alias\":{\"description\":\"Possible alias of this character\",\"type\":\"string\"},\"comment\":{\"description\":\"Comment about the kind\",\"type\":\"string\"},\"cover_image\":{\"description\":\"Cover image URL\",\"format\":\"uri\",\"type\":\"string\"},\"description\":{\"description\":\"Image description\",\"type\":\"string\"},\"episode\":{\"description\":\"Episode number within the season\",\"type\":\"integer\"},\"id\":{\"description\":\"Unique character identifier\",\"type\":\"integer\"},\"image\":{\"description\":\"All images of possible kinds and transformations of this character\",\"items\":{\"oneOf\":[{\"type\":\"integer\"},{\"format\":\"uri\",\"type\":\"string\"},{\"items\":{},\"type\":\"array\"}]},\"type\":\"array\"},\"issues\":{\"description\":\"Issues contained in this story\",\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"kind\":{\"description\":\"All possible kinds of this character\",\"items\":{\"oneOf\":[{\"type\":\"integer\"},{\"type\":\"string\"},{\"items\":{},\"type\":\"array\"}]},\"type\":\"array\"},\"length\":{\"description\":\"Length of the song\",\"type\":\"string\"},\"name\":{\"description\":\"The name of this character\",\"type\":\"string\"},\"occupation\":{\"description\":\"Occupation of this character\",\"oneOf\":[{\"type\":\"string\"},{\"items\":{\"type\":\"string\"},\"type\":\"array\"}]},\"overall\":{\"description\":\"Overall episode number\",\"type\":\"integer\"},\"residence\":{\"description\":\"Residence of this character\",\"oneOf\":[{\"type\":\"string\"},{\"items\":{\"type\":\"string\"},\"type\":\"array\"}]},\"season\":{\"description\":\"Season number\",\"type\":\"integer\"},\"series\":{\"description\":\"Series name\",\"type\":\"string\"},\"sex\":{\"description\":\"Sex of this character\",\"type\":\"string\"},\"thumbnail\":{\"description\":\"Thumbnail image URL\",\"format\":\"uri\",\"type\":\"string\"},\"url\":{\"description\":\"URL to the MLP fandom wiki about this character\",\"format\":\"uri\",\"type\":\"string\"},\"video_url\":{\"description\":\"Video URL\",\"format\":\"uri\",\"type\":\"string\"}},\"required\":[\"id\",\"name\",\"url\"],\"type\":\"object\"},\"type\":\"array\"},\"error\":{\"description\":\"First error message\",\"type\":\"string\"},\"status\":{\"description\":\"HTTP status code\",\"type\":\"integer\"},\"warning\":{\"description\":\"Warning messages separated by newline\",\"type\":\"string\"}},\"required\":[\"status\"],\"type\":\"object\"},{\"properties\":{\"data\":{\"description\":\"Array of found objects. Empty array if no objects found.\",\"items\":{\"properties\":{\"airdate\":{\"description\":\"Air date of the episode\",\"format\":\"date\",\"type\":\"string\"},\"alias\":{\"description\":\"Possible alias of this character\",\"type\":\"string\"},\"cover_image\":{\"description\":\"Cover image URL\",\"format\":\"uri\",\"type\":\"string\"},\"description\":{\"description\":\"Image description\",\"type\":\"string\"},\"episode\":{\"description\":\"Episode number within the season\",\"type\":\"integer\"},\"id\":{\"description\":\"Unique character identifier\",\"type\":\"integer\"},\"image\":{\"description\":\"All images of possible kinds and transformations of this character\",\"items\":{\"oneOf\":[{\"type\":\"integer\"},{\"format\":\"uri\",\"type\":\"string\"},{\"items\":{},\"type\":\"array\"}]},\"type\":\"array\"},\"issues\":{\"description\":\"Issues contained in this story\",\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"kind\":{\"description\":\"All possible kinds of this character\",\"items\":{\"oneOf\":[{\"type\":\"integer\"},{\"type\":\"string\"},{\"items\":{},\"type\":\"array\"}]},\"type\":\"array\"},\"name\":{\"description\":\"The name of this character\",\"type\":\"string\"},\"occupation\":{\"description\":\"Occupation of this character\",\"oneOf\":[{\"type\":\"string\"},{\"items\":{\"type\":\"string\"},\"type\":\"array\"}]},\"overall\":{\"description\":\"Overall episode number\",\"type\":\"integer\"},\"residence\":{\"description\":\"Residence of this character\",\"oneOf\":[{\"type\":\"string\"},{\"items\":{\"type\":\"string\"},\"type\":\"array\"}]},\"season\":{\"description\":\"Season number\",\"type\":\"integer\"},\"series\":{\"description\":\"Series name\",\"type\":\"string\"},\"sex\":{\"description\":\"Sex of this character\",\"type\":\"string\"},\"thumbnail\":{\"description\":\"Thumbnail image URL\",\"format\":\"uri\",\"type\":\"string\"},\"url\":{\"description\":\"URL to the MLP fandom wiki about this character\",\"format\":\"uri\",\"type\":\"string\"}},\"required\":[\"id\",\"name\",\"url\"],\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}]}}},\"description\":\"Successful response with comics data\"},\"400\":{\"content\":{\"application/json\":{\"example\":{\"error\":\"Some arguments are not valid\",\"status\":400},\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"status\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Bad Request - Some arguments are not valid\"},\"405\":{\"content\":{\"application/json\":{\"example\":{\"error\":\"Method not allowed\",\"status\":405},\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"status\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Method Not Allowed - Invalid method\"},\"500\":{\"content\":{\"application/json\":{\"example\":{\"error\":\"Internal server error\",\"status\":500},\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"status\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Internal Server Error - Server-side error in database query\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/comics/by-series/{series}","segments":[{"lit":"comics"},{"lit":"by-series"},{"var":"series"}],"select":{"exist":["limit","offset","series"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[["by_series"]]},"key$":"comic","name__orig":"comic","Name":"Comic","name_":"comic","name-":"comic","NAME":"COMIC","index$":1}, {"active":true,"entity":"comic","key$":"BasicComicFlow","kind":"basic","name":"BasicComicFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"comic_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"comic_ref01","srcdatavar":"comic_ref01_data","suffix":"_dt0"},"match":{"id":"comic01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-comic_ref01"}}],"index$":1}]}, 'Comic')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let comic_ref01_data = Object.values(setup.data.existing.comic)[0] as any

    // LIST
    const comic_ref01_ent = client.Comic()
    const comic_ref01_match: any = {}

    const comic_ref01_list = (await comic_ref01_ent.list(comic_ref01_match)).map((e: any) => e.data())


    // LOAD
    const comic_ref01_match_dt0: any = {}
    comic_ref01_match_dt0.id = comic_ref01_data.id
    const comic_ref01_data_dt0 = (await comic_ref01_ent.load(comic_ref01_match_dt0)).data()
    assert(comic_ref01_data_dt0.id === comic_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/comic/ComicTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = PonySDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['comic01','comic02','comic03','by_series01','by_series02','by_series03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'PONY_TEST_COMIC_ENTID': idmap,
    'PONY_TEST_LIVE': 'FALSE',
    'PONY_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['PONY_TEST_COMIC_ENTID']

  const live = 'TRUE' === env.PONY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['PONY_TEST_COMIC_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new PonySDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.PONY_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  

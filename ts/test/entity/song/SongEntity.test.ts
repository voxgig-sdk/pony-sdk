

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


loadEnvLocal(__dirname + '/../../../.env.local')


describe('SongEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when PONY_TEST_LIVE=TRUE.
  afterEach(liveDelay('PONY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = PonySDK.test()
    const ent = testsdk.Song()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.PONY_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'song.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"data":{"a":true,"h":"Data","n":"data","r":false,"sh":"Array of found objects.","t":"`$ARRAY`","union":{"branches":3,"count":4,"depth":4},"key$":"data","index$":0},"error":{"a":true,"h":"Error","n":"error","r":false,"sh":"First error message","t":"`$STRING`","key$":"error","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":2},"status":{"a":true,"h":"Status","n":"status","r":true,"sh":"HTTP status code","t":"`$INTEGER`","key$":"status","index$":3},"warning":{"a":true,"h":"Warning","n":"warning","r":false,"sh":"Warning messages separated by newline","t":"`$STRING`","key$":"warning","index$":4}},"id":{"field":"id","name":"id"},"name":"song","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /song/all","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":50,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":0,"k":"query","n":"offset","or":"offset","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/song/all","q":{"$action":"all","exist":["limit","offset"]},"r":{},"s":[{"lit":"song"},{"lit":"all"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /song/by-episode/{episode}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"episode","or":"episode","r":true,"t":"`$ANY`","index$":0}],"query":[{"a":true,"ex":50,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":0,"k":"query","n":"offset","or":"offset","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/song/by-episode/{episode}","q":{"exist":["episode","limit","offset"]},"r":{},"s":[{"lit":"song"},{"lit":"by-episode"},{"var":"episode"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /song/{song}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"song","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":50,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":0,"k":"query","n":"offset","or":"offset","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/song/{song}","q":{"exist":["id","limit","offset"]},"r":{"param":{"song":"id"}},"s":[{"lit":"song"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"song","name__orig":"song","Name":"Song","name_":"song","name-":"song","NAME":"SONG","index$":5}, {"active":true,"entity":"song","key$":"BasicSongFlow","kind":"basic","name":"BasicSongFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"song_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"song_ref01","srcdatavar":"song_ref01_data","suffix":"_dt0"},"m":{"id":"song01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-song_ref01"}}],"index$":1}]}, 'Song', {"GET /song/all":{"protocol":"http","operationId":"getAllSongs","responses":{"200":{"description":"Successful response with song data","content":{"application/json":{"schema":{"allOf":[{"type":"object","properties":{"status":{"description":"HTTP status code","key$":"status","type":"integer"},"data":{"description":"Array of found objects. Empty array if no objects found.","items":{"properties":{"airdate":{"description":"Air date of the episode","format":"date","type":"string"},"alias":{"description":"Possible alias of this character","type":"string"},"comment":{"description":"Comment about the kind","type":"string"},"cover_image":{"description":"Cover image URL","format":"uri","type":"string"},"description":{"description":"Image description","type":"string"},"episode":{"description":"Episode number within the season","type":"integer"},"id":{"description":"Unique character identifier","type":"integer"},"image":{"description":"All images of possible kinds and transformations of this character","items":{"oneOf":[{"type":"integer"},{"format":"uri","type":"string"},{"items":{},"type":"array"}]},"type":"array"},"issues":{"description":"Issues contained in this story","items":{"type":"object"},"type":"array"},"kind":{"description":"All possible kinds of this character","items":{"oneOf":[{"type":"integer"},{"type":"string"},{"items":{},"type":"array"}]},"type":"array"},"length":{"description":"Length of the song","type":"string"},"name":{"description":"The name of this character","type":"string"},"occupation":{"description":"Occupation of this character","oneOf":[{"type":"string"},{"items":{"type":"string"},"type":"array"}]},"overall":{"description":"Overall episode number","type":"integer"},"residence":{"description":"Residence of this character","oneOf":[{"type":"string"},{"items":{"type":"string"},"type":"array"}]},"season":{"description":"Season number","type":"integer"},"series":{"description":"Series name","type":"string"},"sex":{"description":"Sex of this character","type":"string"},"thumbnail":{"description":"Thumbnail image URL","format":"uri","type":"string"},"url":{"description":"URL to the MLP fandom wiki about this character","format":"uri","type":"string"},"video_url":{"description":"Video URL","format":"uri","type":"string"}},"required":["id","name","url"],"type":"object","x-ref":"#/components/schemas/Character"},"key$":"data","type":"array"},"warning":{"description":"Warning messages separated by newline","key$":"warning","type":"string"},"error":{"description":"First error message","key$":"error","type":"string"}},"required":["status"],"x-ref":"#/components/schemas/ApiResponse","index$":0},{"type":"object","properties":{"data":{"description":"Array of found objects. Empty array if no objects found.","items":{"properties":{"airdate":{"description":"Air date of the episode","format":"date","type":"string"},"alias":{"description":"Possible alias of this character","type":"string"},"comment":{"description":"Comment about the kind","type":"string"},"cover_image":{"description":"Cover image URL","format":"uri","type":"string"},"description":{"description":"Image description","type":"string"},"episode":{"description":"Episode number within the season","type":"integer"},"id":{"description":"Unique character identifier","type":"integer"},"image":{"description":"All images of possible kinds and transformations of this character","items":{"oneOf":[{"type":"integer"},{"format":"uri","type":"string"},{"items":{},"type":"array"}]},"type":"array"},"issues":{"description":"Issues contained in this story","items":{"type":"object"},"type":"array"},"kind":{"description":"All possible kinds of this character","items":{"oneOf":[{"type":"integer"},{"type":"string"},{"items":{},"type":"array"}]},"type":"array"},"length":{"description":"Length of the song","type":"string"},"name":{"description":"The name of this character","type":"string"},"occupation":{"description":"Occupation of this character","oneOf":[{"type":"string"},{"items":{"type":"string"},"type":"array"}]},"overall":{"description":"Overall episode number","type":"integer"},"residence":{"description":"Residence of this character","oneOf":[{"type":"string"},{"items":{"type":"string"},"type":"array"}]},"season":{"description":"Season number","type":"integer"},"series":{"description":"Series name","type":"string"},"sex":{"description":"Sex of this character","type":"string"},"thumbnail":{"description":"Thumbnail image URL","format":"uri","type":"string"},"url":{"description":"URL to the MLP fandom wiki about this character","format":"uri","type":"string"},"video_url":{"description":"Video URL","format":"uri","type":"string"}},"required":["id","name","url"],"type":"object","x-ref":"#/components/schemas/Character"},"key$":"data","type":"array"}},"index$":1}]}}},"x-ref":"#/components/responses/SongResponse"},"400":{"description":"Bad Request - Some arguments are not valid","content":{"application/json":{"schema":{"type":"object","properties":{"status":{"type":"integer","description":"HTTP status code"},"error":{"type":"string","description":"Error message"}},"x-ref":"#/components/schemas/Error"},"example":{"status":400,"error":"Some arguments are not valid"}}},"x-ref":"#/components/responses/BadRequest"},"405":{"description":"Method Not Allowed - Invalid method","content":{"application/json":{"schema":{"type":"object","properties":{"status":{"type":"integer","description":"HTTP status code"},"error":{"type":"string","description":"Error message"}},"x-ref":"#/components/schemas/Error"},"example":{"status":405,"error":"Method not allowed"}}},"x-ref":"#/components/responses/MethodNotAllowed"},"500":{"description":"Internal Server Error - Server-side error in database query","content":{"application/json":{"schema":{"type":"object","properties":{"status":{"type":"integer","description":"HTTP status code"},"error":{"type":"string","description":"Error message"}},"x-ref":"#/components/schemas/Error"},"example":{"status":500,"error":"Internal server error"}}},"x-ref":"#/components/responses/InternalServerError"}},"parameters":[{"name":"limit","in":"query","description":"Limit of the response data array","required":false,"schema":{"type":"integer","default":50},"x-ref":"#/components/parameters/limitParam","index$":0},{"name":"offset","in":"query","description":"Offset of the response data array (SQL-like behavior)","required":false,"schema":{"type":"integer","default":0},"x-ref":"#/components/parameters/offsetParam","index$":1}],"securitySource":"unspecified"},"GET /song/by-episode/{episode}":{"protocol":"http","operationId":"getSongsByEpisode","responses":{"200":{"description":"Successful response with song data","content":{"application/json":{"schema":{"allOf":[{"type":"object","properties":{"status":{"description":"HTTP status code","key$":"status","type":"integer"},"data":{"description":"Array of found objects. Empty array if no objects found.","items":{"properties":{"airdate":{"description":"Air date of the episode","format":"date","type":"string"},"alias":{"description":"Possible alias of this character","type":"string"},"comment":{"description":"Comment about the kind","type":"string"},"cover_image":{"description":"Cover image URL","format":"uri","type":"string"},"description":{"description":"Image description","type":"string"},"episode":{"description":"Episode number within the season","type":"integer"},"id":{"description":"Unique character identifier","type":"integer"},"image":{"description":"All images of possible kinds and transformations of this character","items":{"oneOf":[{"type":"integer"},{"format":"uri","type":"string"},{"items":{},"type":"array"}]},"type":"array"},"issues":{"description":"Issues contained in this story","items":{"type":"object"},"type":"array"},"kind":{"description":"All possible kinds of this character","items":{"oneOf":[{"type":"integer"},{"type":"string"},{"items":{},"type":"array"}]},"type":"array"},"length":{"description":"Length of the song","type":"string"},"name":{"description":"The name of this character","type":"string"},"occupation":{"description":"Occupation of this character","oneOf":[{"type":"string"},{"items":{"type":"string"},"type":"array"}]},"overall":{"description":"Overall episode number","type":"integer"},"residence":{"description":"Residence of this character","oneOf":[{"type":"string"},{"items":{"type":"string"},"type":"array"}]},"season":{"description":"Season number","type":"integer"},"series":{"description":"Series name","type":"string"},"sex":{"description":"Sex of this character","type":"string"},"thumbnail":{"description":"Thumbnail image URL","format":"uri","type":"string"},"url":{"description":"URL to the MLP fandom wiki about this character","format":"uri","type":"string"},"video_url":{"description":"Video URL","format":"uri","type":"string"}},"required":["id","name","url"],"type":"object","x-ref":"#/components/schemas/Character"},"key$":"data","type":"array"},"warning":{"description":"Warning messages separated by newline","key$":"warning","type":"string"},"error":{"description":"First error message","key$":"error","type":"string"}},"required":["status"],"x-ref":"#/components/schemas/ApiResponse","index$":0},{"type":"object","properties":{"data":{"description":"Array of found objects. Empty array if no objects found.","items":{"properties":{"airdate":{"description":"Air date of the episode","format":"date","type":"string"},"alias":{"description":"Possible alias of this character","type":"string"},"comment":{"description":"Comment about the kind","type":"string"},"cover_image":{"description":"Cover image URL","format":"uri","type":"string"},"description":{"description":"Image description","type":"string"},"episode":{"description":"Episode number within the season","type":"integer"},"id":{"description":"Unique character identifier","type":"integer"},"image":{"description":"All images of possible kinds and transformations of this character","items":{"oneOf":[{"type":"integer"},{"format":"uri","type":"string"},{"items":{},"type":"array"}]},"type":"array"},"issues":{"description":"Issues contained in this story","items":{"type":"object"},"type":"array"},"kind":{"description":"All possible kinds of this character","items":{"oneOf":[{"type":"integer"},{"type":"string"},{"items":{},"type":"array"}]},"type":"array"},"length":{"description":"Length of the song","type":"string"},"name":{"description":"The name of this character","type":"string"},"occupation":{"description":"Occupation of this character","oneOf":[{"type":"string"},{"items":{"type":"string"},"type":"array"}]},"overall":{"description":"Overall episode number","type":"integer"},"residence":{"description":"Residence of this character","oneOf":[{"type":"string"},{"items":{"type":"string"},"type":"array"}]},"season":{"description":"Season number","type":"integer"},"series":{"description":"Series name","type":"string"},"sex":{"description":"Sex of this character","type":"string"},"thumbnail":{"description":"Thumbnail image URL","format":"uri","type":"string"},"url":{"description":"URL to the MLP fandom wiki about this character","format":"uri","type":"string"},"video_url":{"description":"Video URL","format":"uri","type":"string"}},"required":["id","name","url"],"type":"object","x-ref":"#/components/schemas/Character"},"key$":"data","type":"array"}},"index$":1}]}}},"x-ref":"#/components/responses/SongResponse"},"400":{"description":"Bad Request - Some arguments are not valid","content":{"application/json":{"schema":{"type":"object","properties":{"status":{"type":"integer","description":"HTTP status code"},"error":{"type":"string","description":"Error message"}},"x-ref":"#/components/schemas/Error"},"example":{"status":400,"error":"Some arguments are not valid"}}},"x-ref":"#/components/responses/BadRequest"},"405":{"description":"Method Not Allowed - Invalid method","content":{"application/json":{"schema":{"type":"object","properties":{"status":{"type":"integer","description":"HTTP status code"},"error":{"type":"string","description":"Error message"}},"x-ref":"#/components/schemas/Error"},"example":{"status":405,"error":"Method not allowed"}}},"x-ref":"#/components/responses/MethodNotAllowed"},"500":{"description":"Internal Server Error - Server-side error in database query","content":{"application/json":{"schema":{"type":"object","properties":{"status":{"type":"integer","description":"HTTP status code"},"error":{"type":"string","description":"Error message"}},"x-ref":"#/components/schemas/Error"},"example":{"status":500,"error":"Internal server error"}}},"x-ref":"#/components/responses/InternalServerError"}},"parameters":[{"name":"episode","in":"path","required":true,"description":"Episode identifier","schema":{"oneOf":[{"type":"integer"},{"type":"string"}]},"index$":0},{"name":"limit","in":"query","description":"Limit of the response data array","required":false,"schema":{"type":"integer","default":50},"x-ref":"#/components/parameters/limitParam","index$":1},{"name":"offset","in":"query","description":"Offset of the response data array (SQL-like behavior)","required":false,"schema":{"type":"integer","default":0},"x-ref":"#/components/parameters/offsetParam","index$":2}],"securitySource":"unspecified"},"GET /song/{song}":{"protocol":"http","operationId":"getSong","responses":{"200":{"description":"Successful response with song data","content":{"application/json":{"schema":{"allOf":[{"type":"object","properties":{"status":{"description":"HTTP status code","key$":"status","type":"integer"},"data":{"description":"Array of found objects. Empty array if no objects found.","items":{"properties":{"airdate":{"description":"Air date of the episode","format":"date","type":"string"},"alias":{"description":"Possible alias of this character","type":"string"},"comment":{"description":"Comment about the kind","type":"string"},"cover_image":{"description":"Cover image URL","format":"uri","type":"string"},"description":{"description":"Image description","type":"string"},"episode":{"description":"Episode number within the season","type":"integer"},"id":{"description":"Unique character identifier","type":"integer"},"image":{"description":"All images of possible kinds and transformations of this character","items":{"oneOf":[{"type":"integer"},{"format":"uri","type":"string"},{"items":{},"type":"array"}]},"type":"array"},"issues":{"description":"Issues contained in this story","items":{"type":"object"},"type":"array"},"kind":{"description":"All possible kinds of this character","items":{"oneOf":[{"type":"integer"},{"type":"string"},{"items":{},"type":"array"}]},"type":"array"},"length":{"description":"Length of the song","type":"string"},"name":{"description":"The name of this character","type":"string"},"occupation":{"description":"Occupation of this character","oneOf":[{"type":"string"},{"items":{"type":"string"},"type":"array"}]},"overall":{"description":"Overall episode number","type":"integer"},"residence":{"description":"Residence of this character","oneOf":[{"type":"string"},{"items":{"type":"string"},"type":"array"}]},"season":{"description":"Season number","type":"integer"},"series":{"description":"Series name","type":"string"},"sex":{"description":"Sex of this character","type":"string"},"thumbnail":{"description":"Thumbnail image URL","format":"uri","type":"string"},"url":{"description":"URL to the MLP fandom wiki about this character","format":"uri","type":"string"},"video_url":{"description":"Video URL","format":"uri","type":"string"}},"required":["id","name","url"],"type":"object","x-ref":"#/components/schemas/Character"},"key$":"data","type":"array"},"warning":{"description":"Warning messages separated by newline","key$":"warning","type":"string"},"error":{"description":"First error message","key$":"error","type":"string"}},"required":["status"],"x-ref":"#/components/schemas/ApiResponse","index$":0},{"type":"object","properties":{"data":{"description":"Array of found objects. Empty array if no objects found.","items":{"properties":{"airdate":{"description":"Air date of the episode","format":"date","type":"string"},"alias":{"description":"Possible alias of this character","type":"string"},"comment":{"description":"Comment about the kind","type":"string"},"cover_image":{"description":"Cover image URL","format":"uri","type":"string"},"description":{"description":"Image description","type":"string"},"episode":{"description":"Episode number within the season","type":"integer"},"id":{"description":"Unique character identifier","type":"integer"},"image":{"description":"All images of possible kinds and transformations of this character","items":{"oneOf":[{"type":"integer"},{"format":"uri","type":"string"},{"items":{},"type":"array"}]},"type":"array"},"issues":{"description":"Issues contained in this story","items":{"type":"object"},"type":"array"},"kind":{"description":"All possible kinds of this character","items":{"oneOf":[{"type":"integer"},{"type":"string"},{"items":{},"type":"array"}]},"type":"array"},"length":{"description":"Length of the song","type":"string"},"name":{"description":"The name of this character","type":"string"},"occupation":{"description":"Occupation of this character","oneOf":[{"type":"string"},{"items":{"type":"string"},"type":"array"}]},"overall":{"description":"Overall episode number","type":"integer"},"residence":{"description":"Residence of this character","oneOf":[{"type":"string"},{"items":{"type":"string"},"type":"array"}]},"season":{"description":"Season number","type":"integer"},"series":{"description":"Series name","type":"string"},"sex":{"description":"Sex of this character","type":"string"},"thumbnail":{"description":"Thumbnail image URL","format":"uri","type":"string"},"url":{"description":"URL to the MLP fandom wiki about this character","format":"uri","type":"string"},"video_url":{"description":"Video URL","format":"uri","type":"string"}},"required":["id","name","url"],"type":"object","x-ref":"#/components/schemas/Character"},"key$":"data","type":"array"}},"index$":1}]}}},"x-ref":"#/components/responses/SongResponse"},"400":{"description":"Bad Request - Some arguments are not valid","content":{"application/json":{"schema":{"type":"object","properties":{"status":{"type":"integer","description":"HTTP status code"},"error":{"type":"string","description":"Error message"}},"x-ref":"#/components/schemas/Error"},"example":{"status":400,"error":"Some arguments are not valid"}}},"x-ref":"#/components/responses/BadRequest"},"405":{"description":"Method Not Allowed - Invalid method","content":{"application/json":{"schema":{"type":"object","properties":{"status":{"type":"integer","description":"HTTP status code"},"error":{"type":"string","description":"Error message"}},"x-ref":"#/components/schemas/Error"},"example":{"status":405,"error":"Method not allowed"}}},"x-ref":"#/components/responses/MethodNotAllowed"},"500":{"description":"Internal Server Error - Server-side error in database query","content":{"application/json":{"schema":{"type":"object","properties":{"status":{"type":"integer","description":"HTTP status code"},"error":{"type":"string","description":"Error message"}},"x-ref":"#/components/schemas/Error"},"example":{"status":500,"error":"Internal server error"}}},"x-ref":"#/components/responses/InternalServerError"}},"parameters":[{"name":"song","in":"path","required":true,"description":"Song ID (integer) or name (string)","schema":{"oneOf":[{"type":"integer"},{"type":"string"}]},"index$":0},{"name":"limit","in":"query","description":"Limit of the response data array","required":false,"schema":{"type":"integer","default":50},"x-ref":"#/components/parameters/limitParam","index$":1},{"name":"offset","in":"query","description":"Offset of the response data array (SQL-like behavior)","required":false,"schema":{"type":"integer","default":0},"x-ref":"#/components/parameters/offsetParam","index$":2}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let song_ref01_data = Object.values(setup.data.existing.song)[0] as any

    // LIST
    const song_ref01_ent = client.Song()
    const song_ref01_match: any = {}

    const song_ref01_list = (await song_ref01_ent.list(song_ref01_match)).map((e: any) => e.data())


    // LOAD
    const song_ref01_match_dt0: any = {}
    song_ref01_match_dt0.id = song_ref01_data.id
    const song_ref01_data_dt0 = (await song_ref01_ent.load(song_ref01_match_dt0)).data()
    assert(song_ref01_data_dt0.id === song_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/song/SongTestData.json')

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
    ['song01','song02','song03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'PONY_TEST_SONG_ENTID': idmap,
    'PONY_TEST_LIVE': 'FALSE',
    'PONY_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['PONY_TEST_SONG_ENTID']

  const live = 'TRUE' === env.PONY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['PONY_TEST_SONG_ENTID']
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
  

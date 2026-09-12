import { CharacterEntity } from './entity/CharacterEntity';
import { ComicEntity } from './entity/ComicEntity';
import { EpisodeEntity } from './entity/EpisodeEntity';
import { ImageEntity } from './entity/ImageEntity';
import { KindEntity } from './entity/KindEntity';
import { SongEntity } from './entity/SongEntity';
export type * from './PonyTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { PonyEntityBase } from './PonyEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class PonySDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Character(entopts?: Record<string, any>): CharacterEntity;
    Comic(entopts?: Record<string, any>): ComicEntity;
    Episode(entopts?: Record<string, any>): EpisodeEntity;
    Image(entopts?: Record<string, any>): ImageEntity;
    Kind(entopts?: Record<string, any>): KindEntity;
    Song(entopts?: Record<string, any>): SongEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): PonySDK;
    tester(testopts?: any, sdkopts?: any): PonySDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof PonySDK;
export { stdutil, config, BaseFeature, PonyEntityBase, PonySDK, SDK, };

import { PonyEntityBase } from '../PonyEntityBase';
import type { PonySDK } from '../PonySDK';
import type { Control } from '../types';
import type { Song, SongLoadMatch, SongListMatch } from '../PonyTypes';
declare class SongEntity extends PonyEntityBase<Song> {
    constructor(client: PonySDK, entopts: any);
    make(this: SongEntity): SongEntity;
    load(this: any, reqmatch?: SongLoadMatch, ctrl?: Control): Promise<SongEntity>;
    list(this: any, reqmatch?: SongListMatch, ctrl?: Control): Promise<SongEntity[]>;
}
export { SongEntity };

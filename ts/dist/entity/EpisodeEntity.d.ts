import { PonyEntityBase } from '../PonyEntityBase';
import type { PonySDK } from '../PonySDK';
import type { Control } from '../types';
import type { Episode, EpisodeLoadMatch, EpisodeListMatch } from '../PonyTypes';
declare class EpisodeEntity extends PonyEntityBase<Episode> {
    constructor(client: PonySDK, entopts: any);
    make(this: EpisodeEntity): EpisodeEntity;
    load(this: any, reqmatch?: EpisodeLoadMatch, ctrl?: Control): Promise<EpisodeEntity>;
    list(this: any, reqmatch?: EpisodeListMatch, ctrl?: Control): Promise<EpisodeEntity[]>;
}
export { EpisodeEntity };

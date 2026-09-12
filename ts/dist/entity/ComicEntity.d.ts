import { PonyEntityBase } from '../PonyEntityBase';
import type { PonySDK } from '../PonySDK';
import type { Control } from '../types';
import type { Comic, ComicLoadMatch, ComicListMatch } from '../PonyTypes';
declare class ComicEntity extends PonyEntityBase<Comic> {
    constructor(client: PonySDK, entopts: any);
    make(this: ComicEntity): ComicEntity;
    load(this: any, reqmatch?: ComicLoadMatch, ctrl?: Control): Promise<ComicEntity>;
    list(this: any, reqmatch?: ComicListMatch, ctrl?: Control): Promise<ComicEntity[]>;
}
export { ComicEntity };

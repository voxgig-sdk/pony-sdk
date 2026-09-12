import { PonyEntityBase } from '../PonyEntityBase';
import type { PonySDK } from '../PonySDK';
import type { Control } from '../types';
import type { Kind, KindLoadMatch, KindListMatch } from '../PonyTypes';
declare class KindEntity extends PonyEntityBase<Kind> {
    constructor(client: PonySDK, entopts: any);
    make(this: KindEntity): KindEntity;
    load(this: any, reqmatch?: KindLoadMatch, ctrl?: Control): Promise<KindEntity>;
    list(this: any, reqmatch?: KindListMatch, ctrl?: Control): Promise<KindEntity[]>;
}
export { KindEntity };

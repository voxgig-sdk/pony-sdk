import { PonyEntityBase } from '../PonyEntityBase';
import type { PonySDK } from '../PonySDK';
import type { Control } from '../types';
import type { Character, CharacterLoadMatch, CharacterListMatch } from '../PonyTypes';
declare class CharacterEntity extends PonyEntityBase<Character> {
    constructor(client: PonySDK, entopts: any);
    make(this: CharacterEntity): CharacterEntity;
    load(this: any, reqmatch?: CharacterLoadMatch, ctrl?: Control): Promise<CharacterEntity>;
    list(this: any, reqmatch?: CharacterListMatch, ctrl?: Control): Promise<CharacterEntity[]>;
}
export { CharacterEntity };

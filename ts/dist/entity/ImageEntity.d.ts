import { PonyEntityBase } from '../PonyEntityBase';
import type { PonySDK } from '../PonySDK';
import type { Control } from '../types';
import type { Image, ImageListMatch } from '../PonyTypes';
declare class ImageEntity extends PonyEntityBase<Image> {
    constructor(client: PonySDK, entopts: any);
    make(this: ImageEntity): ImageEntity;
    list(this: any, reqmatch?: ImageListMatch, ctrl?: Control): Promise<ImageEntity[]>;
}
export { ImageEntity };

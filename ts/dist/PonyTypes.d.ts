export interface Character {
    data?: any[];
    error?: string;
    id?: string;
    status: number;
    warning?: string;
}
export interface CharacterLoadMatch {
    id: string;
    limit?: number;
    offset?: number;
}
export interface CharacterListMatch {
    limit?: number;
    offset?: number;
    $action?: string;
    [action: string]: any;
}
export interface Comic {
    data?: any[];
    error?: string;
    id?: string;
    status: number;
    warning?: string;
}
export interface ComicLoadMatch {
    id: string;
    limit?: number;
    offset?: number;
}
export interface ComicListMatch {
    limit?: number;
    offset?: number;
    $action?: string;
    [action: string]: any;
}
export interface Episode {
    data?: any[];
    error?: string;
    id?: string;
    status: number;
    warning?: string;
}
export interface EpisodeLoadMatch {
    id: string;
    limit?: number;
    offset?: number;
}
export interface EpisodeListMatch {
    limit?: number;
    offset?: number;
    $action?: string;
    [action: string]: any;
}
export interface Image {
    data?: any[];
    error?: string;
    status: number;
    warning?: string;
}
export interface ImageListMatch {
    limit?: number;
    offset?: number;
    $action?: string;
    [action: string]: any;
}
export interface Kind {
    data?: any[];
    error?: string;
    id?: string;
    status: number;
    warning?: string;
}
export interface KindLoadMatch {
    id: string;
}
export interface KindListMatch {
    limit?: number;
    offset?: number;
    $action?: string;
    [action: string]: any;
}
export interface Song {
    data?: any[];
    error?: string;
    id?: string;
    status: number;
    warning?: string;
}
export interface SongLoadMatch {
    id: string;
    limit?: number;
    offset?: number;
}
export interface SongListMatch {
    limit?: number;
    offset?: number;
    $action?: string;
    [action: string]: any;
}

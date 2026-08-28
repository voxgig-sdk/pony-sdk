# Typed models for the Pony SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class CharacterRequired(TypedDict):
    status: int


class Character(CharacterRequired, total=False):
    data: list
    error: str
    id: str
    warning: str


class CharacterLoadMatchRequired(TypedDict):
    id: str


class CharacterLoadMatch(CharacterLoadMatchRequired, total=False):
    limit: int
    offset: int


class CharacterListMatch(TypedDict, total=False):
    limit: int
    offset: int


class ComicRequired(TypedDict):
    status: int


class Comic(ComicRequired, total=False):
    data: list
    error: str
    id: str
    warning: str


class ComicLoadMatchRequired(TypedDict):
    id: str


class ComicLoadMatch(ComicLoadMatchRequired, total=False):
    limit: int
    offset: int


class ComicListMatch(TypedDict, total=False):
    limit: int
    offset: int


class EpisodeRequired(TypedDict):
    status: int


class Episode(EpisodeRequired, total=False):
    data: list
    error: str
    id: str
    warning: str


class EpisodeLoadMatchRequired(TypedDict):
    id: str


class EpisodeLoadMatch(EpisodeLoadMatchRequired, total=False):
    limit: int
    offset: int


class EpisodeListMatch(TypedDict, total=False):
    limit: int
    offset: int


class ImageRequired(TypedDict):
    status: int


class Image(ImageRequired, total=False):
    data: list
    error: str
    warning: str


class ImageListMatch(TypedDict, total=False):
    limit: int
    offset: int


class KindRequired(TypedDict):
    status: int


class Kind(KindRequired, total=False):
    data: list
    error: str
    id: str
    warning: str


class KindLoadMatch(TypedDict):
    id: str


class KindListMatch(TypedDict, total=False):
    limit: int
    offset: int


class SongRequired(TypedDict):
    status: int


class Song(SongRequired, total=False):
    data: list
    error: str
    id: str
    warning: str


class SongLoadMatchRequired(TypedDict):
    id: str


class SongLoadMatch(SongLoadMatchRequired, total=False):
    limit: int
    offset: int


class SongListMatch(TypedDict, total=False):
    limit: int
    offset: int

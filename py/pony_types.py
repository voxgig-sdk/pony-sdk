# Typed models for the Pony SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Character:
    status: int
    data: Optional[list] = None
    error: Optional[str] = None
    warning: Optional[str] = None


@dataclass
class CharacterLoadMatch:
    id: str
    kind: Any
    occupation: str
    residence: str


@dataclass
class CharacterListMatch:
    data: Optional[list] = None
    error: Optional[str] = None
    status: Optional[int] = None
    warning: Optional[str] = None


@dataclass
class Comic:
    status: int
    data: Optional[list] = None
    error: Optional[str] = None
    warning: Optional[str] = None


@dataclass
class ComicLoadMatch:
    id: str
    series: str


@dataclass
class ComicListMatch:
    data: Optional[list] = None
    error: Optional[str] = None
    status: Optional[int] = None
    warning: Optional[str] = None


@dataclass
class Episode:
    status: int
    data: Optional[list] = None
    error: Optional[str] = None
    warning: Optional[str] = None


@dataclass
class EpisodeLoadMatch:
    id: str
    season: int


@dataclass
class EpisodeListMatch:
    data: Optional[list] = None
    error: Optional[str] = None
    status: Optional[int] = None
    warning: Optional[str] = None


@dataclass
class Image:
    status: int
    data: Optional[list] = None
    error: Optional[str] = None
    warning: Optional[str] = None


@dataclass
class ImageListMatch:
    data: Optional[list] = None
    error: Optional[str] = None
    status: Optional[int] = None
    warning: Optional[str] = None


@dataclass
class Kind:
    status: int
    data: Optional[list] = None
    error: Optional[str] = None
    warning: Optional[str] = None


@dataclass
class KindLoadMatch:
    id: str


@dataclass
class KindListMatch:
    data: Optional[list] = None
    error: Optional[str] = None
    status: Optional[int] = None
    warning: Optional[str] = None


@dataclass
class Song:
    status: int
    data: Optional[list] = None
    error: Optional[str] = None
    warning: Optional[str] = None


@dataclass
class SongLoadMatch:
    episode: Any
    id: str


@dataclass
class SongListMatch:
    data: Optional[list] = None
    error: Optional[str] = None
    status: Optional[int] = None
    warning: Optional[str] = None


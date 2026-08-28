<?php
declare(strict_types=1);

// Typed models for the Pony SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Character entity data model. */
class Character
{
    public ?array $data = null;
    public ?string $error = null;
    public ?string $id = null;
    public int $status;
    public ?string $warning = null;
}

/** Request payload for Character#load. */
class CharacterLoadMatch
{
    public string $id;
    public ?int $limit = null;
    public ?int $offset = null;
}

/** Request payload for Character#list. */
class CharacterListMatch
{
    public ?int $limit = null;
    public ?int $offset = null;
}

/** Comic entity data model. */
class Comic
{
    public ?array $data = null;
    public ?string $error = null;
    public ?string $id = null;
    public int $status;
    public ?string $warning = null;
}

/** Request payload for Comic#load. */
class ComicLoadMatch
{
    public string $id;
    public ?int $limit = null;
    public ?int $offset = null;
}

/** Request payload for Comic#list. */
class ComicListMatch
{
    public ?int $limit = null;
    public ?int $offset = null;
}

/** Episode entity data model. */
class Episode
{
    public ?array $data = null;
    public ?string $error = null;
    public ?string $id = null;
    public int $status;
    public ?string $warning = null;
}

/** Request payload for Episode#load. */
class EpisodeLoadMatch
{
    public string $id;
    public ?int $limit = null;
    public ?int $offset = null;
}

/** Request payload for Episode#list. */
class EpisodeListMatch
{
    public ?int $limit = null;
    public ?int $offset = null;
}

/** Image entity data model. */
class Image
{
    public ?array $data = null;
    public ?string $error = null;
    public int $status;
    public ?string $warning = null;
}

/** Request payload for Image#list. */
class ImageListMatch
{
    public ?int $limit = null;
    public ?int $offset = null;
}

/** Kind entity data model. */
class Kind
{
    public ?array $data = null;
    public ?string $error = null;
    public ?string $id = null;
    public int $status;
    public ?string $warning = null;
}

/** Request payload for Kind#load. */
class KindLoadMatch
{
    public string $id;
}

/** Request payload for Kind#list. */
class KindListMatch
{
    public ?int $limit = null;
    public ?int $offset = null;
}

/** Song entity data model. */
class Song
{
    public ?array $data = null;
    public ?string $error = null;
    public ?string $id = null;
    public int $status;
    public ?string $warning = null;
}

/** Request payload for Song#load. */
class SongLoadMatch
{
    public string $id;
    public ?int $limit = null;
    public ?int $offset = null;
}

/** Request payload for Song#list. */
class SongListMatch
{
    public ?int $limit = null;
    public ?int $offset = null;
}


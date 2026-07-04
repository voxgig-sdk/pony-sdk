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
    public int $status;
    public ?string $warning = null;
}

/** Request payload for Character#load. */
class CharacterLoadMatch
{
    public string $id;
    public mixed $kind;
    public string $occupation;
    public string $residence;
}

/** Match filter for Character#list (any subset of Character fields). */
class CharacterListMatch
{
    public ?array $data = null;
    public ?string $error = null;
    public ?int $status = null;
    public ?string $warning = null;
}

/** Comic entity data model. */
class Comic
{
    public ?array $data = null;
    public ?string $error = null;
    public int $status;
    public ?string $warning = null;
}

/** Request payload for Comic#load. */
class ComicLoadMatch
{
    public string $id;
    public string $series;
}

/** Match filter for Comic#list (any subset of Comic fields). */
class ComicListMatch
{
    public ?array $data = null;
    public ?string $error = null;
    public ?int $status = null;
    public ?string $warning = null;
}

/** Episode entity data model. */
class Episode
{
    public ?array $data = null;
    public ?string $error = null;
    public int $status;
    public ?string $warning = null;
}

/** Request payload for Episode#load. */
class EpisodeLoadMatch
{
    public string $id;
    public int $season;
}

/** Match filter for Episode#list (any subset of Episode fields). */
class EpisodeListMatch
{
    public ?array $data = null;
    public ?string $error = null;
    public ?int $status = null;
    public ?string $warning = null;
}

/** Image entity data model. */
class Image
{
    public ?array $data = null;
    public ?string $error = null;
    public int $status;
    public ?string $warning = null;
}

/** Match filter for Image#list (any subset of Image fields). */
class ImageListMatch
{
    public ?array $data = null;
    public ?string $error = null;
    public ?int $status = null;
    public ?string $warning = null;
}

/** Kind entity data model. */
class Kind
{
    public ?array $data = null;
    public ?string $error = null;
    public int $status;
    public ?string $warning = null;
}

/** Request payload for Kind#load. */
class KindLoadMatch
{
    public string $id;
}

/** Match filter for Kind#list (any subset of Kind fields). */
class KindListMatch
{
    public ?array $data = null;
    public ?string $error = null;
    public ?int $status = null;
    public ?string $warning = null;
}

/** Song entity data model. */
class Song
{
    public ?array $data = null;
    public ?string $error = null;
    public int $status;
    public ?string $warning = null;
}

/** Request payload for Song#load. */
class SongLoadMatch
{
    public mixed $episode;
    public string $id;
}

/** Match filter for Song#list (any subset of Song fields). */
class SongListMatch
{
    public ?array $data = null;
    public ?string $error = null;
    public ?int $status = null;
    public ?string $warning = null;
}


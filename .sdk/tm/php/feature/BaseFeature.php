<?php
declare(strict_types=1);

// Pony SDK base feature

class PonyBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(PonyContext $ctx, array $options): void {}
    public function PostConstruct(PonyContext $ctx): void {}
    public function PostConstructEntity(PonyContext $ctx): void {}
    public function SetData(PonyContext $ctx): void {}
    public function GetData(PonyContext $ctx): void {}
    public function GetMatch(PonyContext $ctx): void {}
    public function SetMatch(PonyContext $ctx): void {}
    public function PrePoint(PonyContext $ctx): void {}
    public function PreSpec(PonyContext $ctx): void {}
    public function PreRequest(PonyContext $ctx): void {}
    public function PreResponse(PonyContext $ctx): void {}
    public function PreResult(PonyContext $ctx): void {}
    public function PreDone(PonyContext $ctx): void {}
    public function PreUnexpected(PonyContext $ctx): void {}
}

<?php

/** Reads the parsed JSON body once per request. */
final class Request
{
    private static ?array $body = null;

    /** Decoded JSON body as an associative array (empty array for an empty/invalid body). */
    public static function body(): array
    {
        if (self::$body === null) {
            $raw = file_get_contents('php://input');
            $decoded = json_decode($raw ?: '[]', true);
            self::$body = is_array($decoded) ? $decoded : [];
        }

        return self::$body;
    }

    /** Value from the body, or $default when the key is missing (mirrors JS `?? default`). */
    public static function input(string $key, mixed $default = null): mixed
    {
        $value = self::body()[$key] ?? null;
        return $value === null ? $default : $value;
    }

    /** Whether the key was present in the body at all — for partial updates (PUT). */
    public static function has(string $key): bool
    {
        return array_key_exists($key, self::body());
    }
}

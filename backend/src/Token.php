<?php

/**
 * Minimal, dependency-free JWT (HS256): issues and verifies the admin login
 * token without needing Composer on a shared host.
 */
final class Token
{
    public static function issue(array $payload, int $ttlSeconds): string
    {
        $payload['iat'] = time();
        $payload['exp'] = time() + $ttlSeconds;

        $header = self::encode(['alg' => 'HS256', 'typ' => 'JWT']);
        $body = self::encode($payload);
        $signature = self::sign("$header.$body");

        return "$header.$body.$signature";
    }

    /** Returns the payload when the token is well-formed, signed correctly and not expired; null otherwise. */
    public static function verify(string $token): ?array
    {
        $parts = explode('.', $token);
        if (count($parts) !== 3) {
            return null;
        }
        [$header, $body, $signature] = $parts;

        if (!hash_equals(self::sign("$header.$body"), $signature)) {
            return null;
        }

        $payload = json_decode(self::decode($body), true);
        if (!is_array($payload) || ($payload['exp'] ?? 0) < time()) {
            return null;
        }

        return $payload;
    }

    private static function sign(string $data): string
    {
        return self::encode(hash_hmac('sha256', $data, JWT_SECRET, true), raw: true);
    }

    private static function encode(array|string $data, bool $raw = false): string
    {
        $json = $raw ? $data : json_encode($data, JSON_UNESCAPED_UNICODE);
        return rtrim(strtr(base64_encode($json), '+/', '-_'), '=');
    }

    private static function decode(string $data): string
    {
        $padded = str_pad($data, strlen($data) + (4 - strlen($data) % 4) % 4, '=');
        return base64_decode(strtr($padded, '-_', '+/'));
    }
}

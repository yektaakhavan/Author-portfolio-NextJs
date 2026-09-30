<?php

/**
 * Loads .env into $_ENV (a minimal parser — no Composer dependency needed).
 * Missing file is fine locally where real env vars are set another way.
 */
function loadEnv(string $path): void
{
    if (!is_file($path)) {
        return;
    }

    foreach (file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
        $line = trim($line);
        if ($line === '' || str_starts_with($line, '#') || !str_contains($line, '=')) {
            continue;
        }

        [$key, $value] = explode('=', $line, 2);
        $key = trim($key);
        $value = trim($value);

        if (!array_key_exists($key, $_ENV)) {
            $_ENV[$key] = $value;
            putenv("$key=$value");
        }
    }
}

loadEnv(__DIR__ . '/.env');

function env(string $key, ?string $default = null): ?string
{
    $value = $_ENV[$key] ?? getenv($key);
    return $value === false || $value === null || $value === '' ? $default : $value;
}

define('DB_HOST', env('DB_HOST', '127.0.0.1'));
define('DB_NAME', env('DB_NAME', 'akhavan_safaei'));
define('DB_USER', env('DB_USER', 'root'));
define('DB_PASS', env('DB_PASS', ''));

define('JWT_SECRET', env('JWT_SECRET', 'dev-secret-change-me'));
define('ADMIN_USERNAME', env('ADMIN_USERNAME', 'admin'));
define('ADMIN_PASSWORD_HASH', env('ADMIN_PASSWORD_HASH', ''));

define('ALLOWED_ORIGIN', env('ALLOWED_ORIGIN', '*'));

// Uploaded/gallery images live next to this file and are served directly by
// Apache; the frontend resolves them relative to the API origin.
define('UPLOADS_DIR', __DIR__ . '/uploads');

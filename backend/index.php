<?php

/**
 * Front controller: every request under /api/* (see .htaccess) lands here
 * and is dispatched to the matching file in routes/.
 */

require __DIR__ . '/config.php';
require __DIR__ . '/src/Database.php';
require __DIR__ . '/src/Request.php';
require __DIR__ . '/src/Response.php';
require __DIR__ . '/src/Token.php';
require __DIR__ . '/src/Auth.php';

header('Access-Control-Allow-Origin: ' . ALLOWED_ORIGIN);
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS');

$method = $_SERVER['REQUEST_METHOD'];
if ($method === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Strip a leading "/api" so this file works whether it sits at the domain
// root or is reached through a rewritten "/api/..." path.
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$path = preg_replace('#^/api#', '', $path);
$segments = array_values(array_filter(explode('/', $path)));

$resource = $segments[0] ?? null;
$id = $segments[1] ?? null;
$subResource = $segments[2] ?? null;

try {
    match ($resource) {
        'health' => Response::json(['ok' => true]),
        'auth' => ($id === 'login') ? require __DIR__ . '/routes/auth.php' : Response::error('یافت نشد.', 404),
        'articles' => require __DIR__ . '/routes/articles.php',
        'books' => require __DIR__ . '/routes/books.php',
        'orders' => require __DIR__ . '/routes/orders.php',
        'settings' => require __DIR__ . '/routes/settings.php',
        default => Response::error('یافت نشد.', 404),
    };
} catch (Throwable $e) {
    error_log($e->getMessage());
    Response::error('خطای داخلی سرور.', 500);
}

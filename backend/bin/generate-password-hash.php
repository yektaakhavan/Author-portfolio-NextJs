<?php

/**
 * One-time helper: turns an admin password into the bcrypt hash that goes in
 * ADMIN_PASSWORD_HASH (.env). Never store the plain password anywhere.
 *
 * Usage (SSH/Terminal, if your host has one):
 *   php bin/generate-password-hash.php "your-new-password"
 *
 * No terminal access? Temporarily upload this folder, open
 * https://yourdomain.com/api/bin/generate-password-hash.php?password=your-new-password
 * in the browser, copy the hash it prints, then delete this file (or the
 * whole bin/ folder) again — .htaccess normally blocks it, this only works
 * while the file is reachable directly.
 */

$password = $argv[1] ?? $_GET['password'] ?? null;

if (!$password) {
    http_response_code(400);
    echo "Usage: php generate-password-hash.php <password>\n";
    exit(1);
}

$hash = password_hash($password, PASSWORD_BCRYPT);

header('Content-Type: text/plain; charset=utf-8');
echo "ADMIN_PASSWORD_HASH=$hash\n";

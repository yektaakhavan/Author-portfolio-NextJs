<?php

/** Reads and verifies the "Authorization: Bearer <token>" header of admin requests. */
final class Auth
{
    /** Works across SAPIs (built-in server, Apache module, FPM) where header casing/availability differs. */
    private static function authorizationHeader(): string
    {
        if (!empty($_SERVER['HTTP_AUTHORIZATION'])) {
            return $_SERVER['HTTP_AUTHORIZATION'];
        }
        if (function_exists('getallheaders')) {
            foreach (getallheaders() as $name => $value) {
                if (strcasecmp($name, 'Authorization') === 0) {
                    return $value;
                }
            }
        }
        return '';
    }

    /** Returns the token payload, or sends a 401 response and stops the request. */
    public static function requireAuth(): array
    {
        if (!preg_match('/^Bearer\s+(.+)$/', self::authorizationHeader(), $matches)) {
            Response::error('ورود لازم است.', 401);
        }

        $payload = Token::verify($matches[1]);
        if ($payload === null) {
            Response::error('نشست منقضی شده است، دوباره وارد شوید.', 401);
        }

        return $payload;
    }
}

<?php

/** POST /api/auth/login — the only public write on this route; issues a 12h admin token. */

$username = (string) Request::input('username', '');
$password = (string) Request::input('password', '');

$validUsername = hash_equals(ADMIN_USERNAME, $username);
$validPassword = ADMIN_PASSWORD_HASH !== '' && password_verify($password, ADMIN_PASSWORD_HASH);

if (!$validUsername || !$validPassword) {
    Response::error('نام کاربری یا رمز عبور اشتباه است.', 401);
}

$token = Token::issue(['username' => $username], ttlSeconds: 12 * 3600);
Response::json(['token' => $token]);

<?php

/** Routes for /api/settings — a single editable row (contact info, socials). Available variable: $method. */

$FIELDS = ['contact_phone', 'contact_email', 'support_note', 'social_instagram', 'social_telegram', 'social_whatsapp', 'social_eitaa'];

$db = Database::get();

if ($method === 'GET') {
    $row = $db->query('SELECT * FROM settings WHERE id = 1')->fetch();
    Response::json(array_intersect_key($row, array_flip($FIELDS)));
}

if ($method === 'PUT') {
    Auth::requireAuth();

    $set = [];
    $values = [];
    foreach ($FIELDS as $field) {
        if (Request::has($field)) {
            $set[] = "$field = ?";
            $values[] = Request::input($field);
        }
    }

    if ($set !== []) {
        $db->prepare('UPDATE settings SET ' . implode(', ', $set) . ' WHERE id = 1')->execute($values);
    }

    $row = $db->query('SELECT * FROM settings WHERE id = 1')->fetch();
    Response::json(array_intersect_key($row, array_flip($FIELDS)));
}

Response::error('یافت نشد.', 404);

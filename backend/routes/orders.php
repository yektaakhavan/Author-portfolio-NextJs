<?php

/**
 * Routes for /api/orders.
 * Available variables: $method, $id, $subResource ("status" for the PATCH route, or null).
 */

/** DB row -> the shape the frontend expects (items/customer as nested JSON, not flat columns). */
function orderToJson(array $row): array
{
    return [
        'id' => $row['id'],
        'createdAt' => gmdate('Y-m-d\TH:i:s.000\Z', strtotime($row['created_at'])),
        'customer' => [
            'fullName' => $row['full_name'],
            'phone' => $row['phone'],
            'city' => $row['city'],
            'address' => $row['address'],
            'postalCode' => $row['postal_code'],
            'preferredCallTime' => $row['preferred_call_time'],
        ],
        'items' => json_decode($row['items'], true),
        'total' => (int) $row['total'],
        'status' => $row['status'],
    ];
}

$db = Database::get();

if ($method === 'POST' && $id === null) {
    $customer = Request::input('customer', []);
    $items = Request::input('items', []);

    if (empty($customer['fullName']) || empty($customer['phone']) || empty($items)) {
        Response::error('اطلاعات سفارش ناقص است.', 400);
    }

    $orderId = 'ORD-' . (int) round(microtime(true) * 1000);
    $createdAt = gmdate('Y-m-d H:i:s.v');

    $db->prepare(
        'INSERT INTO orders (id, created_at, full_name, phone, city, address, postal_code, preferred_call_time, items, total, status)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    )->execute([
        $orderId,
        $createdAt,
        $customer['fullName'],
        $customer['phone'],
        $customer['city'] ?? '',
        $customer['address'] ?? '',
        $customer['postalCode'] ?? null,
        $customer['preferredCallTime'] ?? null,
        json_encode($items, JSON_UNESCAPED_UNICODE),
        (int) Request::input('total', 0),
        'در انتظار تماس',
    ]);

    $stmt = $db->prepare('SELECT * FROM orders WHERE id = ?');
    $stmt->execute([$orderId]);
    Response::json(orderToJson($stmt->fetch()), 201);
}

if ($method === 'GET' && $id === null) {
    Auth::requireAuth();

    $rows = $db->query('SELECT * FROM orders ORDER BY created_at DESC')->fetchAll();
    Response::json(array_map('orderToJson', $rows));
}

if ($method === 'PATCH' && $id !== null && $subResource === 'status') {
    Auth::requireAuth();

    $stmt = $db->prepare('SELECT * FROM orders WHERE id = ?');
    $stmt->execute([$id]);
    $existing = $stmt->fetch();
    if (!$existing) {
        Response::error('سفارش پیدا نشد.', 404);
    }

    $status = Request::input('status') ?: $existing['status'];
    $db->prepare('UPDATE orders SET status = ? WHERE id = ?')->execute([$status, $id]);

    $stmt = $db->prepare('SELECT * FROM orders WHERE id = ?');
    $stmt->execute([$id]);
    Response::json(orderToJson($stmt->fetch()));
}

Response::error('یافت نشد.', 404);

<?php

/**
 * Routes for /api/books — admin-managed price/stock overrides only.
 * The book catalog itself (title, description, specs...) lives in the frontend.
 * Available variables: $method, $id (book id segment, or null).
 */

$db = Database::get();

if ($method === 'GET' && $id === null) {
    $rows = $db->query('SELECT * FROM book_overrides')->fetchAll();

    $overrides = [];
    foreach ($rows as $row) {
        $overrides[$row['book_id']] = [
            'price' => $row['price'] !== null ? (int) $row['price'] : null,
            'stock' => $row['stock'] !== null ? (int) $row['stock'] : null,
        ];
    }
    Response::json($overrides);
}

if ($method === 'PUT' && $id !== null) {
    Auth::requireAuth();

    $stmt = $db->prepare('SELECT * FROM book_overrides WHERE book_id = ?');
    $stmt->execute([$id]);
    $existing = $stmt->fetch() ?: ['price' => null, 'stock' => null];

    $price = Request::has('price') ? Request::input('price') : $existing['price'];
    $stock = Request::has('stock') ? Request::input('stock') : $existing['stock'];

    $db->prepare(
        'INSERT INTO book_overrides (book_id, price, stock) VALUES (?, ?, ?)
         ON DUPLICATE KEY UPDATE price = VALUES(price), stock = VALUES(stock)'
    )->execute([$id, $price, $stock]);

    Response::json([
        'price' => $price !== null ? (int) $price : null,
        'stock' => $stock !== null ? (int) $stock : null,
    ]);
}

Response::error('یافت نشد.', 404);

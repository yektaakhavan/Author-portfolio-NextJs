<?php

/**
 * Routes for /api/articles, dispatched by index.php.
 * Available variables: $method, $id (article id segment, or null).
 */

/** DB row -> the shape the frontend expects (id as int, publishedAt as ISO 8601 UTC). */
function articleToJson(array $row): array
{
    return [
        'id' => (int) $row['id'],
        'title' => $row['title'],
        'summary' => $row['summary'],
        'content1' => $row['content1'],
        'content2' => $row['content2'],
        'image' => $row['image'],
        'publishedAt' => gmdate('Y-m-d\TH:i:s.000\Z', strtotime($row['published_at'])),
    ];
}

$db = Database::get();

if ($method === 'GET' && $id === null) {
    $rows = $db->query('SELECT * FROM articles ORDER BY published_at DESC')->fetchAll();
    Response::json(array_map('articleToJson', $rows));
}

if ($method === 'GET' && $id !== null) {
    $stmt = $db->prepare('SELECT * FROM articles WHERE id = ?');
    $stmt->execute([$id]);
    $row = $stmt->fetch();
    if (!$row) {
        Response::error('مقاله پیدا نشد.', 404);
    }
    Response::json(articleToJson($row));
}

if ($method === 'POST' && $id === null) {
    Auth::requireAuth();

    $title = Request::input('title');
    $summary = Request::input('summary');
    $content1 = Request::input('content1');

    if (!$title || !$summary || !$content1) {
        Response::error('عنوان، خلاصه و متن اصلی الزامی است.', 400);
    }

    $publishedAt = Request::input('publishedAt') ?: gmdate('Y-m-d H:i:s');

    $stmt = $db->prepare(
        'INSERT INTO articles (title, summary, content1, content2, image, published_at)
         VALUES (?, ?, ?, ?, ?, ?)'
    );
    $stmt->execute([
        $title,
        $summary,
        $content1,
        Request::input('content2', ''),
        Request::input('image', '/uploads/articles/focus-productivity.svg'),
        $publishedAt,
    ]);

    $stmt = $db->prepare('SELECT * FROM articles WHERE id = ?');
    $stmt->execute([$db->lastInsertId()]);
    Response::json(articleToJson($stmt->fetch()), 201);
}

if ($method === 'PUT' && $id !== null) {
    Auth::requireAuth();

    $stmt = $db->prepare('SELECT * FROM articles WHERE id = ?');
    $stmt->execute([$id]);
    $existing = $stmt->fetch();
    if (!$existing) {
        Response::error('مقاله پیدا نشد.', 404);
    }

    // Only fields present in the request body are changed (partial update).
    $columns = ['title' => 'title', 'summary' => 'summary', 'content1' => 'content1',
        'content2' => 'content2', 'image' => 'image', 'publishedAt' => 'published_at'];

    $set = [];
    $values = [];
    foreach ($columns as $field => $column) {
        if (Request::has($field)) {
            $set[] = "$column = ?";
            $values[] = Request::input($field);
        }
    }

    if ($set !== []) {
        $values[] = $id;
        $db->prepare('UPDATE articles SET ' . implode(', ', $set) . ' WHERE id = ?')->execute($values);
    }

    $stmt = $db->prepare('SELECT * FROM articles WHERE id = ?');
    $stmt->execute([$id]);
    Response::json(articleToJson($stmt->fetch()));
}

if ($method === 'DELETE' && $id !== null) {
    Auth::requireAuth();

    $stmt = $db->prepare('DELETE FROM articles WHERE id = ?');
    $stmt->execute([$id]);
    if ($stmt->rowCount() === 0) {
        Response::error('مقاله پیدا نشد.', 404);
    }
    Response::noContent();
}

Response::error('یافت نشد.', 404);

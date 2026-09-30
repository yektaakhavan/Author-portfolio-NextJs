<?php

/**
 * One-time import: reads the old Express backend's data file
 * (backend/data/db.json) and inserts everything — articles, book price/stock
 * overrides, orders, settings — into the MySQL database configured in .env.
 *
 * Usage: php bin/migrate-json-to-mysql.php /path/to/db.json
 * Safe to run once against an empty schema (created from schema.sql); running
 * it twice would insert duplicate articles/settings, so it refuses to run
 * if the articles table already has rows.
 */

require __DIR__ . '/../config.php';
require __DIR__ . '/../src/Database.php';

$jsonPath = $argv[1] ?? null;
if (!$jsonPath || !is_file($jsonPath)) {
    fwrite(STDERR, "Usage: php migrate-json-to-mysql.php /path/to/db.json\n");
    exit(1);
}

$data = json_decode(file_get_contents($jsonPath), true);
if (!is_array($data)) {
    fwrite(STDERR, "Could not parse $jsonPath as JSON.\n");
    exit(1);
}

$db = Database::get();

if ((int) $db->query('SELECT COUNT(*) FROM articles')->fetchColumn() > 0) {
    fwrite(STDERR, "articles table is not empty — aborting to avoid duplicate data.\n");
    exit(1);
}

$insertArticle = $db->prepare(
    'INSERT INTO articles (id, title, summary, content1, content2, image, published_at) VALUES (?, ?, ?, ?, ?, ?, ?)'
);
foreach ($data['articles'] ?? [] as $article) {
    $insertArticle->execute([
        $article['id'],
        $article['title'],
        $article['summary'],
        $article['content1'],
        $article['content2'] ?? '',
        $article['image'],
        gmdate('Y-m-d H:i:s', strtotime($article['publishedAt'])),
    ]);
}
// Keep future auto-increment ids from colliding with the imported ones.
$db->exec('ALTER TABLE articles AUTO_INCREMENT = ' . ((int) ($data['nextArticleId'] ?? 1)));

$insertOverride = $db->prepare('INSERT INTO book_overrides (book_id, price, stock) VALUES (?, ?, ?)');
foreach ($data['bookOverrides'] ?? [] as $bookId => $override) {
    $insertOverride->execute([$bookId, $override['price'] ?? null, $override['stock'] ?? null]);
}

$insertOrder = $db->prepare(
    'INSERT INTO orders (id, created_at, full_name, phone, city, address, postal_code, preferred_call_time, items, total, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
);
foreach ($data['orders'] ?? [] as $order) {
    $customer = $order['customer'] ?? [];
    $insertOrder->execute([
        $order['id'],
        (new DateTime($order['createdAt']))->format('Y-m-d H:i:s.v'), // DateTime keeps the millisecond part; strtotime() would drop it
        $customer['fullName'] ?? '',
        $customer['phone'] ?? '',
        $customer['city'] ?? '',
        $customer['address'] ?? '',
        $customer['postalCode'] ?? null,
        $customer['preferredCallTime'] ?? null,
        json_encode($order['items'] ?? [], JSON_UNESCAPED_UNICODE),
        (int) ($order['total'] ?? 0),
        $order['status'] ?? 'در انتظار تماس',
    ]);
}

if (isset($data['settings'])) {
    $fields = ['contact_phone', 'contact_email', 'support_note', 'social_instagram', 'social_telegram', 'social_whatsapp', 'social_eitaa'];
    $set = implode(', ', array_map(fn ($f) => "$f = ?", $fields));
    $values = array_map(fn ($f) => $data['settings'][$f] ?? null, $fields);
    $db->prepare("UPDATE settings SET $set WHERE id = 1")->execute($values);
}

printf(
    "Imported %d articles, %d book overrides, %d orders.\n",
    count($data['articles'] ?? []),
    count($data['bookOverrides'] ?? []),
    count($data['orders'] ?? [])
);

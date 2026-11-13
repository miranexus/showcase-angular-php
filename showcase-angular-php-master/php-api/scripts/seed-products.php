<?php

declare(strict_types=1);

if (PHP_SAPI !== 'cli') {
    http_response_code(403);
    exit('CLI only');
}

$arguments = array_slice($argv, 1);
if (array_diff($arguments, ['--force']) || count($arguments) > 1) {
    fwrite(STDERR, "Usage: php php-api/scripts/seed-products.php [--force]\n");
    exit(1);
}

$source = __DIR__ . '/../data/products.json';
$target = __DIR__ . '/../data/seeded-products.json';
$contents = file_get_contents($source);
if ($contents === false) {
    fwrite(STDERR, "Cannot read seed data: $source\n");
    exit(1);
}

try {
    $products = json_decode($contents, true, 512, JSON_THROW_ON_ERROR);
} catch (JsonException $error) {
    fwrite(STDERR, "Invalid seed data: {$error->getMessage()}\n");
    exit(1);
}

if (!is_array($products) || !array_is_list($products) || count($products) === 0) {
    fwrite(STDERR, "Seed data must contain a non-empty product array.\n");
    exit(1);
}

$mode = in_array('--force', $arguments, true) ? 'wb' : 'xb';
$file = @fopen($target, $mode);
if ($file === false) {
    fwrite(STDERR, "Cannot write $target. If it already exists, use --force to replace it.\n");
    exit(1);
}

try {
    $written = fwrite($file, $contents);
    if ($written !== strlen($contents) || !fflush($file)) {
        fwrite(STDERR, "Failed to write the complete catalogue to $target.\n");
        exit(1);
    }
} finally {
    fclose($file);
}

echo 'Seeded ' . count($products) . " products into $target\n";

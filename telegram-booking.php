<?php
header('Content-Type: application/json; charset=utf-8');

function respond(int $status, array $data): void
{
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function textField(array $data, string $key): string
{
    $value = $data[$key] ?? '';
    return is_string($value) || is_numeric($value) ? trim((string) $value) : '';
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, ['success' => false]);
}

$contentType = strtolower((string) ($_SERVER['CONTENT_TYPE'] ?? ''));
if (strpos($contentType, 'multipart/form-data') === 0) {
    $input = $_POST;
} else {
    $input = json_decode(file_get_contents('php://input') ?: '', true);
}
if (!is_array($input)) {
    respond(400, ['success' => false]);
}

$service = textField($input, 'service');
$size = filter_var($input['size'] ?? null, FILTER_VALIDATE_FLOAT);
$unit = textField($input, 'unit');
$name = textField($input, 'name');
$phone = textField($input, 'phone');
$location = textField($input, 'location');
$bookingId = textField($input, 'bookingId');

$fieldPhoto = null;
if (isset($_FILES['fieldPhoto'])) {
    $upload = $_FILES['fieldPhoto'];
    if (!is_array($upload) || !isset($upload['error'], $upload['tmp_name'], $upload['size'])) {
        respond(422, ['success' => false]);
    }

    if ($upload['error'] !== UPLOAD_ERR_NO_FILE) {
        if (
            $upload['error'] !== UPLOAD_ERR_OK ||
            !is_string($upload['tmp_name']) ||
            !is_uploaded_file($upload['tmp_name']) ||
            !is_int($upload['size']) ||
            $upload['size'] <= 0 ||
            $upload['size'] > 8 * 1024 * 1024
        ) {
            respond(422, ['success' => false]);
        }
        if (!function_exists('finfo_open')) {
            respond(500, ['success' => false]);
        }

        $fileInfo = new finfo(FILEINFO_MIME_TYPE);
        $mimeType = $fileInfo->file($upload['tmp_name']);
        $photoTypes = [
            'image/jpeg' => ['field-photo.jpg', 'photo'],
            'image/png' => ['field-photo.png', 'document'],
            'image/webp' => ['field-photo.webp', 'document'],
        ];
        if (!is_string($mimeType) || !isset($photoTypes[$mimeType])) {
            respond(422, ['success' => false]);
        }

        $fieldPhoto = [
            'path' => $upload['tmp_name'],
            'mime' => $mimeType,
            'name' => $photoTypes[$mimeType][0],
            'method' => $photoTypes[$mimeType][1],
        ];
    }
}

$services = [
    'harvest' => ['label' => 'ច្រូតកាត់ស្រូវ (Kubota DC-70 Pro)', 'rate' => 400000],
    'tractor' => ['label' => 'វាយដីត្រាក់ទ័រ (Kubota M6040)', 'rate' => 250000],
];
$unitFactors = ['hectare' => 1, 'rai' => 0.16, 'are' => 0.01];
$unitLabels = ['hectare' => 'ហិកតា', 'rai' => 'រ៉ៃ', 'are' => 'អា'];

if (
    !isset($services[$service], $unitFactors[$unit]) ||
    $size === false || $size <= 0 || $size > 10000 ||
    $name === '' || strlen($name) > 200 ||
    !preg_match('/^[0-9]{6,15}$/', $phone) ||
    $location === '' || strlen($location) > 500
) {
    respond(422, ['success' => false]);
}

$token = trim((string) getenv('TELEGRAM_BOT_TOKEN'));
$chatId = trim((string) getenv('TELEGRAM_CHAT_ID'));
if ($token === '' || $chatId === '' || !function_exists('curl_init')) {
    respond(500, ['success' => false]);
}

if (!preg_match('/^#BS-\d{4}$/', $bookingId)) {
    $bookingId = '#BS-' . random_int(1000, 9999);
}

$estimatedTotal = (int) round($size * $unitFactors[$unit] * $services[$service]['rate']);
$message = "🌾 មានការកក់សេវាកម្មថ្មី!\n\n" .
    "🔖 លេខកូដ៖ {$bookingId}\n" .
    "👤 ឈ្មោះ៖ {$name}\n" .
    "📞 លេខទូរស័ព្ទ៖ {$phone}\n" .
    "📍 ទីតាំង៖ {$location}\n" .
    "🚜 ប្រភេទសេវាកម្ម៖ {$services[$service]['label']}\n" .
    "📐 ទំហំដី៖ {$size} {$unitLabels[$unit]}\n" .
    '💰 តម្លៃប៉ាន់ស្មាន៖ ' . number_format($estimatedTotal) . ' ៛';

$telegramMethod = 'sendMessage';
if ($fieldPhoto !== null) {
    $telegramMethod = $fieldPhoto['method'] === 'photo' ? 'sendPhoto' : 'sendDocument';
    $photoField = $fieldPhoto['method'] === 'photo' ? 'photo' : 'document';
    $payload = [
        'chat_id' => $chatId,
        'caption' => $message,
        $photoField => new CURLFile($fieldPhoto['path'], $fieldPhoto['mime'], $fieldPhoto['name']),
    ];
} else {
    $payload = json_encode([
        'chat_id' => $chatId,
        'text' => $message,
    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
}

$curl = curl_init("https://api.telegram.org/bot{$token}/{$telegramMethod}");
$curlOptions = [
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => $payload,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CONNECTTIMEOUT => 5,
    CURLOPT_TIMEOUT => 15,
];
if ($fieldPhoto === null) {
    $curlOptions[CURLOPT_HTTPHEADER] = ['Content-Type: application/json'];
}
if (PHP_OS_FAMILY === 'Windows' && defined('CURLSSLOPT_NATIVE_CA')) {
    $curlOptions[CURLOPT_SSL_OPTIONS] = CURLSSLOPT_NATIVE_CA;
}
curl_setopt_array($curl, $curlOptions);
$telegramResponse = curl_exec($curl);
$httpStatus = (int) curl_getinfo($curl, CURLINFO_HTTP_CODE);
$curlError = curl_error($curl);

$telegramResult = is_string($telegramResponse) ? json_decode($telegramResponse, true) : null;
if ($telegramResponse === false) {
    error_log('Telegram booking cURL request failed: ' . $curlError);
    respond(502, ['success' => false]);
}

if ($httpStatus < 200 || $httpStatus >= 300 || !is_array($telegramResult) || empty($telegramResult['ok'])) {
    $description = is_array($telegramResult) && is_string($telegramResult['description'] ?? null)
        ? substr(preg_replace('/[\r\n]+/', ' ', $telegramResult['description']), 0, 300)
        : 'Invalid Telegram API response';
    error_log("Telegram booking API rejected request (HTTP {$httpStatus}): {$description}");
    respond(502, ['success' => false]);
}

respond(200, ['success' => true]);
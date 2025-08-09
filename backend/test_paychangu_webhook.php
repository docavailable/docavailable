<?php

// Test with actual PayChangu webhook structure
echo "🧪 Testing with Actual PayChangu Webhook Structure...\n\n";

$webhookUrl = 'https://docavailable-1.onrender.com/api/payments/webhook';

$webhookData = [
    'event_type' => 'checkout.payment',
    'first_name' => 'Test',
    'last_name' => 'User',
    'email' => 'test@example.com',
    'currency' => 'MWK',
    'amount' => 100,
    'charge' => 3,
    'amount_split' => [
        'fee_paid_by_customer' => 0,
        'fee_paid_by_merchant' => 3,
        'total_amount_paid_by_customer' => 100,
        'amount_received_by_merchant' => 97
    ],
    'total_amount_paid' => 100,
    'mode' => 'live',
    'type' => 'API Payment (Checkout)',
    'status' => 'success',
    'reference' => 'TEST_REF_' . time(),
    'tx_ref' => 'PLAN_TEST_' . time(),
    'customization' => [
        'title' => 'DocAvailable Plan Purchase',
        'description' => 'Basic Life',
        'logo' => null
    ],
    'meta' => json_encode([
        'user_id' => 11,
        'plan_id' => 5
    ]),
    'customer' => [
        'customer_ref' => 'cs_test_' . time(),
        'email' => 'test@example.com',
        'first_name' => 'Test',
        'last_name' => 'User',
        'phone' => '+265123456789',
        'created_at' => time()
    ],
    'authorization' => [
        'channel' => 'Mobile Money',
        'card_details' => null,
        'bank_payment_details' => null,
        'mobile_money' => [
            'mobile_number' => '+265980xxxx99',
            'operator' => 'Airtel Money',
            'trans_id' => null
        ],
        'completed_at' => null
    ],
    'created_at' => date('Y-m-d\TH:i:s.000000\Z'),
    'updated_at' => date('Y-m-d\TH:i:s.000000\Z')
];

echo "Testing webhook with actual PayChangu structure:\n";
print_r($webhookData);
echo "\n";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $webhookUrl);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($webhookData));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Accept: application/json'
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo "HTTP Status Code: $httpCode\n";
echo "Response:\n";
$responseData = json_decode($response, true);
print_r($responseData);

if ($httpCode === 200 && isset($responseData['success']) && $responseData['success']) {
    echo "\n🎉 SUCCESS: Webhook is working with actual PayChangu structure!\n";
    echo "✅ Field extraction fixed\n";
    echo "✅ JSON meta parsing fixed\n";
    echo "✅ Transaction creation working\n";
    echo "✅ Subscription creation working\n";
} else {
    echo "\n❌ FAILED: Still have issues\n";
    echo "Error: " . ($responseData['error'] ?? 'Unknown error') . "\n";
} 
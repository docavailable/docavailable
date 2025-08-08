<?php

require_once __DIR__ . '/vendor/autoload.php';

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use App\Providers\CustomDatabaseServiceProvider;

// Load .env file manually
if (file_exists(__DIR__ . '/.env')) {
    $lines = file(__DIR__ . '/.env', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos($line, '=') !== false && strpos($line, '#') !== 0) {
            list($key, $value) = explode('=', $line, 2);
            $_ENV[$key] = $value;
            putenv("$key=$value");
        }
    }
}

// Bootstrap Laravel application
$app = Application::configure(basePath: __DIR__)
    ->withRouting(
        web: __DIR__ . '/routes/web.php',
        api: __DIR__ . '/routes/api.php',
        commands: __DIR__ . '/routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        //
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();

// Register our custom service provider manually
$app->register(CustomDatabaseServiceProvider::class);

// Test the Laravel database connection
try {
    echo "🔍 Testing Laravel database connection...\n";
    
    // Get the default database connection
    $connection = $app->make('db')->connection();
    
    echo "✅ Laravel connection created successfully\n";
    echo "📊 Connection class: " . get_class($connection) . "\n";
    
    // Test a simple query
    $result = $connection->select('SELECT version() as version');
    
    echo "✅ Database query successful\n";
    echo "📊 PostgreSQL Version: " . $result[0]->version . "\n";
    
    // Test if we can access the database name
    $dbName = $connection->getDatabaseName();
    echo "📊 Database Name: " . $dbName . "\n";
    
    echo "\n🎉 Laravel database connection is working! Laravel 12 connector bug bypassed.\n";
    
} catch (Exception $e) {
    echo "❌ Error testing Laravel connection: " . $e->getMessage() . "\n";
    echo "📋 Stack trace:\n" . $e->getTraceAsString() . "\n";
} 
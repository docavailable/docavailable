<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Connectors\NeonPostgresConnector;

class NeonDatabaseServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        // Register the custom connector for pgsql_simple
        $this->app->extend('db', function ($manager, $app) {
            $manager->extend('pgsql_simple', function ($config, $name) {
                $connector = new NeonPostgresConnector();
                $pdo = $connector->connect($config);
                
                return new \Illuminate\Database\PostgresConnection(
                    $pdo,
                    $config['database'],
                    $config['prefix'] ?? '',
                    $config
                );
            });
            
            return $manager;
        });
    }
}

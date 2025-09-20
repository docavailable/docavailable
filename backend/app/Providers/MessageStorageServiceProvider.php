<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\MessageStorageService;

class MessageStorageServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->singleton(MessageStorageService::class, function ($app) {
            return new MessageStorageService();
        });
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}

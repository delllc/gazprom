<?php

namespace App\Providers;

use App\Models\Tasks;
use Illuminate\Support\ServiceProvider;
use function Pest\Laravel\delete;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Tasks::where('completed', true)->where('completed', 'true', now())->delete();
    }
}

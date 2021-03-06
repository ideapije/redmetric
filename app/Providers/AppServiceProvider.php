<?php

namespace App\Providers;

use App\Support\Collection as SupportCollection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        if (env('APP_ENV') === 'production') {
            URL::forceScheme('https');
        }
        Schema::defaultStringLength(191);
        Response::macro('success', function ($value, $code = 200) {
            return Response::make([
                'status' => 'success',
                'data' => $value
            ], $code);
        });

        Response::macro('fail', function ($value, $code = 404) {
            return Response::make([
                'status' => 'fail',
                'data' => $value
            ], $code);
        });
    }
}

<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Models\Sanctum\PersonalAccessToken;
use Laravel\Sanctum\Sanctum;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(
            \App\Repositories\AuthRepositoryInterface::class,
            \App\Repositories\AuthRepository::class,
        );

        $this->app->bind(
            \App\Repositories\WorkspaceRepositoryInterface::class,
            \App\Repositories\WorkspaceRepository::class
        );

        $this->app->bind(
            \App\Repositories\TaskRepositoryInterface::class,
            \App\Repositories\TaskRepository::class
        );

        $this->app->bind(
            \App\Repositories\CommentRepositoryInterface::class,
            \App\Repositories\CommentRepository::class
        );


    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Sanctum::usePersonalAccessTokenModel(PersonalAccessToken::class);

    }
}

<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware(['throttle:5,1'])->post('/register', [AuthController::class, 'register']);
Route::middleware(['throttle:5,1'])->post('/login', [AuthController::class, 'login']);

Route::get('/user-list', function (Request $request) {
    return $request->user();
});
<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\WorkspaceController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\CommentController;


Route::middleware(['throttle:5,1'])->post('/register', [AuthController::class, 'register']);
Route::middleware(['throttle:5,1'])->post('/login', [AuthController::class, 'login']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::get('/workspaces', [WorkspaceController::class, 'index']);
    Route::post('/workspaces', [WorkspaceController::class, 'store']);
    Route::get('/workspaces/{id}', [WorkspaceController::class, 'show']);
    Route::delete('/workspaces/{id}', [WorkspaceController::class, 'destroy']);

    Route::get('/workspaces/{id}/members', [WorkspaceController::class, 'members']);

    Route::get('/workspaces/{id}/tasks', [TaskController::class, 'index']);
    Route::post('/workspaces/{id}/tasks', [TaskController::class, 'store']);
    Route::get('/tasks/{id}', [TaskController::class, 'show']);

    Route::post('/tasks/{id}/comment', [CommentController::class, 'store']);
    Route::put('/tasks/{task}', [TaskController::class, 'update']);



});
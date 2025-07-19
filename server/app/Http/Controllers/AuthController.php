<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Services\AuthService;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    private AuthService $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function register(Request $request)
    {
        try {
            $user = $this->authService->register($request->all());
            return response()->json([
                'status' => 'success',
                'message' => 'User registered successfully!',
                'user' => $user
            ], 201);
        } catch (ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'errors' => $e->errors(),
            ], 422);
        }
    }

    public function login(Request $request)
    {
        try {
            $user = $this->authService->login($request->only('email', 'password'));
            return response()->json([
                'message' => 'Login successful',
                'user' => $user
            ], 200);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Invalid login credentials',
                'errors' => $e->errors(),
            ], 401);
        }
    }

}

<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\CommentService;
use Illuminate\Validation\ValidationException;

class CommentController extends Controller
{
    
    protected CommentService $commentService;

    public function __construct(CommentService $commentService)
    {
        $this->commentService = $commentService;
    }

    public function store(Request $request, int $task_id)
    {

        try {
            $comment = $this->commentService->createComment($task_id, $request->all());
            return response()->json([
                'status'=>'success',
                'message' => 'Comment created successfully',
                'comment' => $comment
            ], 201);

        } catch (ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'errors' => $e->errors(),
            ], 422);
        }

    }
}

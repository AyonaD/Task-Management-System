<?php

namespace App\Repositories;

use App\Models\Comment;
use App\Repositories\CommentRepositoryInterface;

class CommentRepository implements CommentRepositoryInterface
{
    public function create(array $data): Comment
    {
        return Comment::create($data);
    }

    public function getCommentsByTaskId(int $taskId): array
    {
        return Comment::where('task_id', $taskId)
            ->with('user:id,name')
            ->latest()
            ->get()
            ->toArray();
    }
}

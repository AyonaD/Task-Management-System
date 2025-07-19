<?php

namespace App\Services;

use App\Repositories\CommentRepositoryInterface;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use App\Models\ActivityLog;

class CommentService
{
    protected $commentRepo;

    public function __construct(CommentRepositoryInterface $commentRepo)
    {
        $this->commentRepo = $commentRepo;
    }

    public function createComment(int $task_id, array $data)
    {
        $validator = Validator::make($data, [
            'comment' => 'required'
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        $data['task_id'] = $task_id;
        $data['user_id'] = Auth::id();

        $comment = $this->commentRepo->create($data);

        ActivityLog::create(
           [ 
            'task_id' => $task_id,
            'user_id' => Auth::id(),
            'log' => "Commented as  ".$comment->comment
            ]
        );
        return $comment;
    }

    

}

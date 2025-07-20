<?php

namespace App\Services;

use App\Repositories\TaskRepositoryInterface;
use Illuminate\Support\Facades\Auth;
use App\Models\Workspace;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use App\Models\ActivityLog;

class TaskService
{
    protected $taskRepo;

    public function __construct(TaskRepositoryInterface $taskRepo)
    {
        $this->taskRepo = $taskRepo;
    }

    public function createTask(int $workspaceId, array $data)
    {
        $validator = Validator::make($data, [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'assigned_user_id' => 'nullable|exists:users,id',
            'priority' => 'required|in:1,2,3',
            'status' => 'required',
            'start_date' => 'required|date',
            'due_date' => 'required|date|after_or_equal:start_date',
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        // Ensure the user has access to the workspace
        $workspace = Workspace::where('id', $workspaceId)
            ->where(function ($q) {
                $q->where('created_user_id', Auth::id())
                  ->orWhereHas('members', function ($query) {
                      $query->where('user_id', Auth::id());
                  });
            })
            ->first();

        if (!$workspace) {
            throw new ModelNotFoundException('Workspace not found or access denied.');
        }

        $data['workspace_id'] = $workspaceId;
        $data['created_by'] = Auth::id();

        $task = $this->taskRepo->create($data);

        ActivityLog::create(
           [ 
            'task_id' => $task->id,
            'user_id' => Auth::id(),
            'log' => 'Task '.$task->title.' created.'
            ]
        );
        return $task;
    }

    public function getWorkspaceTasks(int $workspaceId)
    {
        return $this->taskRepo->getTasksByWorkspace($workspaceId);
    }

    public function findTask(int $id)
    {
        return $this->taskRepo->findById($id, Auth::id());
    }

    public function getUserTasks(int $workspaceId)
    {
        return $this->taskRepo->getTasksByUserspace($workspaceId);
    }

}

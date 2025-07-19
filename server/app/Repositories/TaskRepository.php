<?php

namespace App\Repositories;

use App\Models\Task;

class TaskRepository implements TaskRepositoryInterface
{
    public function create(array $data): Task
    {
        return Task::create($data);
    }

    public function getTasksByWorkspace(int $workspaceId)
    {
        $tasks = Task::with([
            'assignedUser:id,name,email',
            'activityLogs.user:id,name'
        ])
        ->where('workspace_id', $workspaceId)
        ->orderBy('status', 'asc')
        ->get()
        ->groupBy('status');

        return $tasks;

    }

    public function findById(int $id): ?Task
    {
        return Task::with([
            'assignedUser:id,name,email',
            'activityLogs.user:id,name',
            'comments.user:id,name'
        ])->find($id);
    }

    public function update(int $id, array $data): bool
    {
        $task = Task::findOrFail($id);
        return $task->update($data);
    }

    public function delete(int $id): bool
    {
        $task = Task::findOrFail($id);
        return $task->delete();
    }
}

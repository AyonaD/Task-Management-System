<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\TaskService;
use Illuminate\Validation\ValidationException;
use App\Models\Task;
use App\Models\ActivityLog;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    protected TaskService $taskService;

    public function __construct(TaskService $taskService)
    {
        $this->taskService = $taskService;
    }

    public function index($id){
        $tasks = $this->taskService->getWorkspaceTasks((int) $id);
        return response()->json(['tasks' => $tasks]);
    }

    public function store(Request $request, int $workspaceId)
    {

        try {
            $task = $this->taskService->createTask($workspaceId, $request->all());
            return response()->json([
                'status'=>'success',
                'message' => 'Task created successfully',
                'task' => $task
            ], 201);

        } catch (ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'errors' => $e->errors(),
            ], 422);
        }

    }

    public function show($id){
        $task = $this->taskService->findTask($id);
        return response()->json(['task' => $task]);
    }

    public function update(Request $request, Task $task)
    {
        $task->update($request->all());
        ActivityLog::create(
           [ 
            'task_id' => $task->id,
            'user_id' => Auth::id(),
            'log' => 'Task updated.'
            ]
        );
        return response()->json(['message' => 'Task updated successfully', 'task' => $task]);
    }

    public function getTasksByUser($id){
        $tasks = $this->taskService->getUserTasks((int) $id);
        return response()->json(['tasks' => $tasks]);
    }

}

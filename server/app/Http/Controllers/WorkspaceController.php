<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\WorkspaceService;

class WorkspaceController extends Controller
{

    protected $workspaceService;

    public function __construct(WorkspaceService $workspaceService)
    {
        $this->workspaceService = $workspaceService;
    }

    public function index()
    {
        return response()->json([
            'workspaces' => $this->workspaceService->listUserWorkspaces()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
        ]);

        $workspace = $this->workspaceService->createWorkspace($request->only('title'));

        return response()->json([
            'message' => 'Workspace created successfully',
            'workspace' => $workspace
        ], 201);
    }

    public function show($id)
    {
        $workspace = $this->workspaceService->findWorkspace($id);
        return response()->json(['workspace' => $workspace]);
    }

    public function destroy($id)
    {
        $this->workspaceService->deleteWorkspace($id);
        return response()->json(['message' => 'Workspace deleted']);
    }
}

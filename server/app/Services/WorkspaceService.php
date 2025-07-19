<?php

namespace App\Services;

use App\Repositories\WorkspaceRepositoryInterface;
use Illuminate\Support\Facades\Auth;

class WorkspaceService
{
    protected $workspaceRepo;

    public function __construct(WorkspaceRepositoryInterface $workspaceRepo)
    {
        $this->workspaceRepo = $workspaceRepo;
    }

    public function listUserWorkspaces()
    {
        return $this->workspaceRepo->getUserWorkspaces(Auth::id());
    }

    public function createWorkspace(array $data)
    {
        $data['created_user_id'] = Auth::id();
        return $this->workspaceRepo->createWorkspace($data);
    }

    public function findWorkspace(int $id)
    {
        return $this->workspaceRepo->findWorkspaceByUser($id, Auth::id());
    }

    public function deleteWorkspace(int $id)
    {
        return $this->workspaceRepo->deleteWorkspace($id, Auth::id());
    }
}

<?php

namespace App\Repositories;

use App\Models\Workspace;

class WorkspaceRepository implements WorkspaceRepositoryInterface
{
    public function getUserWorkspaces(int $userId)
    {
        return Workspace::where('created_user_id', $userId)->get();
    }

    public function createWorkspace(array $data): Workspace
    {
        return Workspace::create($data);
    }

    public function findWorkspaceByUser(int $workspaceId, int $userId): Workspace
    {
        return Workspace::where('id', $workspaceId)
            ->where('created_user_id', $userId)
            ->firstOrFail();
    }

    public function deleteWorkspace(int $workspaceId, int $userId): bool
    {
        $workspace = $this->findWorkspaceByUser($workspaceId, $userId);
        return $workspace->delete();
    }
}

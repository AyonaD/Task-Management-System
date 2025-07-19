<?php

namespace App\Repositories;

use App\Models\Workspace;

interface WorkspaceRepositoryInterface
{
    public function getUserWorkspaces(int $userId);
    public function createWorkspace(array $data): Workspace;
    public function findWorkspaceByUser(int $workspaceId, int $userId): Workspace;
    public function deleteWorkspace(int $workspaceId, int $userId): bool;
}

<?php

namespace App\Repositories;

use App\Models\Workspace;
use App\Models\WorkspaceMember;

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
        ->where(function ($query) use ($userId) {
            $query->where('created_user_id', $userId)
                  ->orWhereHas('members', function ($q) use ($userId) {
                      $q->where('user_id', $userId);
                  });
        })
        ->firstOrFail();
    }

    public function deleteWorkspace(int $workspaceId, int $userId): bool
    {
        $workspace = $this->findWorkspaceByUser($workspaceId, $userId);
        return $workspace->delete();
    }

    public function addMember(array $data)
    {
        return WorkspaceMember::create($data);
    }

    public function getUserRelatedWorkspaces(int $userId)
    {
        return Workspace::where('created_user_id', $userId)
            ->orWhereHas('members', function ($query) use ($userId) {
                $query->where('user_id', $userId);
            })
            ->with('members.user') // eager load members with user
            ->get();
    }

    public function getWorkspaceMembers(int $workspaceId, int $userId)
    {
        return Workspace::with('members.user')
            ->where(function ($q) use ($workspaceId, $userId) {
                $q->where('id', $workspaceId)
                ->where('created_user_id', $userId)
                ->orWhereHas('members', function ($q) use ($workspaceId, $userId) {
                    $q->where('workspace_id', $workspaceId)
                        ->where('user_id', $userId);
                });
            })
            ->first();
    }


}

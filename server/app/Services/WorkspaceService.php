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
        return $this->workspaceRepo->getUserRelatedWorkspaces(Auth::id());
    }

    public function createWorkspace(array $data)
    {
        $data['created_user_id'] = Auth::id();
        $workspace = $this->workspaceRepo->createWorkspace($data);

        $this->workspaceRepo->addMember([
            'workspace_id' => $workspace->id,
            'user_id'      => Auth::id(),
            'role_id'      => 1,
        ]);

        return $workspace;

        // return $this->workspaceRepo->createWorkspace($data);
    }

    public function findWorkspace(int $id)
    {
        return $this->workspaceRepo->findWorkspaceByUser($id, Auth::id());
    }

    public function deleteWorkspace(int $id)
    {
        return $this->workspaceRepo->deleteWorkspace($id, Auth::id());
    }

    public function getWorkspaceMembers(int $workspaceId)
    {
        $workspace = $this->workspaceRepo->getWorkspaceMembers($workspaceId, Auth::id());

        if (!$workspace) {
            abort(404, 'Workspace not found or access denied.');
        }

        return $workspace->members->map(function ($member) {
            return [
                'id' => $member->user->id,
                'name' => $member->user->name,
                'role_id' => $member->role_id,
            ];
        });
    }

}

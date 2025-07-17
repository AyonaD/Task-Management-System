<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Task extends Model
{
    use SoftDeletes;

    protected $dates = ['deleted_at'];
    
    protected $table = 'tasks';

    protected $fillable = [
        'workspace_id', 'assigned_user_id', 'title', 'description', 'status', 'priority','start_date','due_date'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'assigned_user_id');
    }

    public function status()
    {
        return $this->belongsTo(TaskStatus::class, 'status');
    }

    public function workpace()
    {
        return $this->belongsTo(Workspace::class, 'workspace_id');
    }

    public function priority()
    {
        return $this->belongsTo(Priority::class, 'priority');
    }

}

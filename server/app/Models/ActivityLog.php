<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ActivityLog extends Model
{
    protected $fillable = [
        'task_id', 'user_id', 'log'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

}

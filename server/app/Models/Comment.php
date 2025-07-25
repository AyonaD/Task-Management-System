<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $fillable = [
        'task_id', 'user_id', 'comment'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}

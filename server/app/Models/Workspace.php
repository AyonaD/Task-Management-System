<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Workspace extends Model
{
    use SoftDeletes;

    protected $dates = ['deleted_at'];

    protected $fillable = [
        'title',
        'created_user_id',
    ];

    public function members()
    {
        return $this->hasMany(WorkspaceMember::class);
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_user_id');
    }

}

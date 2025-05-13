<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notifications extends Model
{
    protected $fillable = [
        'user_id',
        'title',
        'message',
        'is_read',
        'type',
        'related_id',
    ];

    protected $casts = [
        'is_read' => 'boolean',
    ];

    // Отношения
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

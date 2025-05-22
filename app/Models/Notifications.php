<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notifications extends Model
{
    use hasFactory;
    protected $fillable = [
        'user_id',
        'type',
        'message',
        'is_read',
        'notifiable_type',
        'notifiable_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function notifiable()
    {
        return $this->morphTo();
    }
}

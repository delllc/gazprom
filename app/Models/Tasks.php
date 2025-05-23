<?php

namespace App\Models;

use App\Traits\Notifiable;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Tasks extends Model
{
    use Notifiable;
    protected $fillable = [
        'user_id',
        'title',
        'description',
        'completed',
        'completed_at',
    ];

    protected $casts = [
        'completed' => 'boolean',
        'completed_at' => 'datetime',
    ];

    // Отношения
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Scope для автоматического удаления старых задач
    protected static function booted()
    {
        static::creating(function ($task) {
            $task->delete_at = now()->addDays(7);
            $task->save();
        });
    }
}

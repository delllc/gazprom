<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Task extends Model
{
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
    protected static function boot()
    {
        parent::boot();

        static::addGlobalScope('not_old_completed', function ($builder) {
            $builder->where(function ($query) {
                $query->where('completed', false)
                    ->orWhere('completed_at', '>', Carbon::now()->subDays(7));
            });
        });
    }
}

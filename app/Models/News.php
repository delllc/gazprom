<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    protected $fillable = [
        'title',
        'short_description',
        'content',
        'image_path',
        'published_at',
        'author_id'
    ];

    protected $casts = [
        'published_at' => 'datetime'
    ];

    // Отношения
    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }
}

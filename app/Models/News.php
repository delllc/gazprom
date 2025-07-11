<?php

namespace App\Models;

use App\Traits\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    use Notifiable;
    use HasFactory;
    protected $table = 'news';
    protected $fillable = [
        'title',
        'short_description',
        'content',
        'image',
        'published_at',
        'author_id'
    ];

    protected $casts = [
        'published_at' => 'datetime'
    ];

    // Отношения
    public function user()
    {
        return $this->belongsTo(User::class, 'author_id');

    }
}

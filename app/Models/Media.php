<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Media extends Model
{

    use HasFactory;
    protected $fillable = [
        'name',
        'path',
        'mime_type',
        'size',
        'folder_id',
        'uploaded_by',
        'metadata',
        'is_public'
    ];

    protected $casts = [
        'metadata' => 'array',
        'is_public' => 'boolean',
        'size'=> 'integer',
    ];

    public function folder(): BelongsTo
    {
        return $this->belongsTo(Folder::class);
    }

    /**
     * Пользователь, загрузивший файл
     */
    public function uploader(): BelongsTo
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }

    /**
     * Полиморфная связь для привязки к другим моделям
     */
    public function mediable(): MorphTo
    {
        return $this->morphTo();
    }

    /**
     * Получить URL для доступа к файлу
     */
    public function getUrlAttribute(): string
    {
        return $this->is_public
            ? asset("storage/{$this->path}")
            : route('media.download', $this);
    }

    /**
     * Получить иконку файла в зависимости от типа
     */
    public function getIconAttribute(): string
    {
        return match($this->mime_type) {
            'application/pdf' => 'file-pdf',
            'image/*' => 'file-image',
            'video/*' => 'file-video',
            'audio/*' => 'file-audio',
            'text/*', 'application/json' => 'file-code',
            default => 'file'
        };
    }

    /**
     * Проверка прав доступа
     */
    public function canAccess(User $user): bool
    {
        return $this->is_public
            || $this->uploaded_by === $user->id
            || $user->isAdmin();
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Kalnoy\Nestedset\NodeTrait;


class Folder extends Model
{
    //
    use NodeTrait;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'slug',
        'description',
        'parent_id',
        'created_by',
        'is_system'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'is_system' => 'boolean'
    ];

    /**
     * Родительская папка
     */
    public function parent(): BelongsTo
    {
        return $this->belongsTo(Folder::class, 'parent_id');
    }

    /**
     * Дочерние папки
     */
    public function children(): HasMany
    {
        return $this->hasMany(Folder::class, 'parent_id')->orderBy('name');
    }

    /**
     * Файлы в папке
     */
    public function files(): HasMany
    {
        return $this->hasMany(Media::class)->orderBy('name');
    }

    /**
     * Пользователь, создавший папку
     */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Полный путь к папке
     */
    public function getFullPathAttribute(): string
    {
        return $this->ancestors()->pluck('slug')->push($this->slug)->implode('/');
    }

    /**
     * Проверка, является ли папка корневой
     */
    public function isRoot(): bool
    {
        return is_null($this->parent_id);
    }

    /**
     * Проверка прав доступа
     */
    public function canAccess(User $user): bool
    {
        return $this->created_by === $user->id || $user->isAdmin();
    }

    /**
     * Системные папки по умолчанию
     */
    public static function createDefaultFolders(User $user): void
    {
        $folders = [
            ['name' => 'Общие файлы', 'is_system' => true],
            ['name' => 'Документы', 'is_system' => true],
            ['name' => 'Изображения', 'is_system' => true]
        ];

        foreach ($folders as $folder) {
            self::create($folder + ['created_by' => $user->id]);
        }
    }
}

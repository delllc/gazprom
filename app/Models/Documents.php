<?php

namespace App\Models;

use App\Traits\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Documents extends Model
{
    use Notifiable;
    use HasFactory;

    protected $table = 'documents';


    public const TYPE_GENERAL = 'general';
    public const TYPE_NORMATIVE = 'normative';
    public const TYPE_STYLE = 'style';
    public const TYPE_VACATION = 'vacation';
    protected $fillable = [
        'name',
        'title',
        'type',
        'assigned_user_id',
        'status',
        'file_path',
        'uploaded_by'
    ];
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];




    // Отношения
    public function uploader()
    {
        return $this->belongsTo(User::class, 'uploaded_by');

    }


    public function user()
    {
        return $this->belongsTo(User::class, 'id');
    }
}

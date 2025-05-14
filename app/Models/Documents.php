<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Documents extends Model
{

    use HasFactory;
    const TYPE_GENERAL = 'general';
    const TYPE_NORMATIVE = 'normative';
    const TYPE_STYLE = 'style';
    const TYPE_VACATION = 'vacation';

    protected $fillable = [
        'name',
        'description',
        'file_path',
        'type',
        'uploaded_by',
    ];

    // Отношения
    public function uploader()
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }
}

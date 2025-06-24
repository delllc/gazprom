<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Notifications\AdminNotification;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Filament\Panel;
use Filament\Models\Contracts\FilamentUser;
use Filament\Models\Contracts\HasName;

class User extends Authenticatable implements FilamentUser, HasName
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory;
    use Notifiable;

    protected $table = 'users';


    public const ROLE_ADMIN = 'admin';
    public const ROLE_EMPLOYEE = 'employee';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'position',
        'username',
        'departament',
        'email',
        'role',
        'phone',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    public function isAdmin(): bool
    {
        return $this->role === self::ROLE_ADMIN;
    }


    // Метод для создания пользователя администратором

    public static function createByAdmin(array $data): User
    {
        return self::create([
            'email' => $data['email'],
            'username' => $data['username'],
            'password' => bcrypt($data['password']),
            'role' => $data['role'],
            'phone' => $data['phone'] ?? null,
        ]);
    }

    public function tasks()
    {
        return $this->hasMany(Tasks::class);
    }

    //
    public function notifications()
    {
        return $this->hasMany(Notifications::class)->orderBy('created_at', 'desc');
    }

    public function unreadNotifications()
    {
        return $this->notifications()->where('is_read', false);
    }

    public function sendAdminAlert(string $message, string $changeType)
    {
        $this->notify(new AdminNotification($message, $changeType));

    }



    public function getFilamentName(): string
    {
        return "{$this->username}";
    }
    public function canAccessPanel(Panel $panel): bool
    {
        return str_ends_with($this->role, 'admin');
    }
}

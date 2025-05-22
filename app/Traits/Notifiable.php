<?php

namespace App\Traits;

use App\Models\Notifications;
use App\Models\User;
use Illuminate\Database\Eloquent\Relations\MorphMany;

trait Notifiable
{
    public function notifyUsers(string $type, string $message, $users)
    {
        $users = is_array($users) ? $users : [$users];

        foreach ($users as $user) {
            Notifications::create([
                'user_id' => $user instanceof User ? $user->id : $user,
                'type' => $type,
                'notifiable_type' => get_class($this),
                'notifiable_id' => $this->id,
                'message' => $message
            ]);
        }
    }
    public function notifications(): MorphMany
    {
        return $this->morphMany(Notifications::class, 'notifiable');
    }
    public function markNotificationsAsRead(): void
    {
        $this->notifications()->update(['is_read' => true]);
    }
}

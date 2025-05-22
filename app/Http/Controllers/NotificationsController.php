<?php

namespace App\Http\Controllers;

use App\Models\Notifications;
use Illuminate\Http\Request;

class NotificationsController extends Controller
{
    public function index(Request $request)
    {
        return $request->user()
            ->notifications()
            ->orderBy('created_at', 'desc')
            ->limit(20)
            ->get();
    }

    public function markAsRead(Notifications $notification)
    {
        $notification->update(['is_read' => true]);
        return response()->noContent();
    }

    public function unreadCount() {
        return response()->json([
            'count' => auth()->user()->unreadNotifications()->count()
        ]);
    }
}

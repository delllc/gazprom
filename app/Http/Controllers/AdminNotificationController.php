<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class AdminNotificationController extends Controller
{
    public function massNotify(Request $request) {
        $validated = $request->validate([
            'message' => 'required|string|max:255',
            'change_type' => 'required|in:document,event',
            'notifiable_id' => 'required|integer',
            'notifiable_type' => 'required|string'
        ]);

        $model = $validated['notifiable_type']::findOrFail($validated['notifiable_id']);

        User::where('id', '!=', auth()->id())
            ->each(function ($user) use ($model, $validated) {
                $model->notifyUsers(
                    $validated['change_type'],
                    $validated['message'],
                    $user->id
                );
            });

        return response()->json(['status' => 'success']);

    }
}

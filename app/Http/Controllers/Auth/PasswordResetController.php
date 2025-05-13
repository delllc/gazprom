<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\PasswordResetMail;
class PasswordResetController extends Controller
{
    public function requestReset(Request $request) {

        $request->validate(['email' => 'required|email']);

        $user = User::where('email', $request->email)->first();

        if ($user) {
            $token = \Str::random(60);
            $user->update(['reset_token' => $token]);

            Mail::to($user->email)->send(new PasswordResetMail($token));
        }

        return response()->json(['message' => 'If email exists, reset link sent']);
    }

    public function reset(Request $request) {

        $request->validate([
            'token' => 'required|string',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = User::where('reset_token', $request->token)->firstOrFail();

        $user->update([
            'password' => bcrypt($request->password),
            'reset_token' => null,
        ]);

        return response()->json(['message' => 'Password changed']);
    }

}

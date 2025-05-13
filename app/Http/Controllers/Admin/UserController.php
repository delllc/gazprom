<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller {
    public function create(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'username' => 'required|string|unique:users',
            'password' => 'required|string|min:8',
            'departament' => 'sometimes|string|max:255|nullable',
            'position' => 'sometimes|string|max:255|nullable',
            'role' => 'sometimes|in:admin,employee',
            'phone' => 'required|string|unique:users',
        ]);

        $user = User::createByAdmin($validated);

        return response()->json([
            'message' => 'User created successfully',
            'user' => $user->makeHidden(['password'])
        ], 201);
    }
}

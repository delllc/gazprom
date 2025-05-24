<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Auth\Events\Registered;



class UserController extends Controller {

    public function create(): Response
    {
        return Inertia::render('auth/register');
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email|unique:users',
            'username' => 'required|string|unique:users',
            'password' => 'required|string|min:8',
            // 'departament' => 'sometimes|string|max:255|nullable',
            // 'position' => 'sometimes|string|max:255|nullable',
            // 'role' => 'sometimes|in:admin,employee',
            // 'phone' => 'required|string|unique:users',
        ]);

/*         $user = User::createByAdmin($validated); */
        $user = User::create([
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        Auth::login($user);

        return to_route('dashboard');


        // return response()->json([
        //     'message' => 'User created successfully',
        //     'user' => $user->makeHidden(['password'])
        // ], 201);
        //

        Auth::login($user);


        return route_to('dashboard');
    }

    public function index(Request $request) {
        return User::query()
            ->when($request->departament, fn($q, $dept) => $q->where('departament', $dept))
            ->when($request->search, fn($q, $search) => $q->where('name', 'like', '%' . $search . '%'))
            ->paginate(15);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Tasks;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function tasks()
    {
        return Inertia::render('Tasks');
    }
}

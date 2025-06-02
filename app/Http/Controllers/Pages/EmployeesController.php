<?php

// app/Http/Controllers/EmployeesController.php

namespace App\Http\Controllers\Pages;

use App\Http\Controllers\Controller;
use App\Models\User;
use Inertia\Inertia;

class EmployeesController extends Controller
{
    public function index()
    {
        $employees = User::get();


        return Inertia::render('Employees', [
            'employees' => $employees,
        ]);
    }
}

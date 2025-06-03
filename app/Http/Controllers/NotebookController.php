<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class NotebookController extends Controller
{
    public function notebook()
    {
        return Inertia::render('Notebook');
    }
}

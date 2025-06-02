<?php

namespace App\Http\Controllers\Pages;

use App\Http\Controllers\Controller;
use App\Models\Documents;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;

class DocumentsController extends Controller
{
    public function index(Request $request)
    {

        $type = $request->input('type');

        // Получаем все документы
        $documents = Documents::with('user')
                  ->when($type, function ($query) use ($type) {
                      return $query->where('type', $type);
                  })
                  ->get();





        return Inertia::render('Documents', [
            'documents' => $documents,
        ]);
    }
}

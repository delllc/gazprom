<?php

namespace App\Http\Controllers\Pages;

use App\Http\Controllers\Controller;
use App\Models\Documents;
use App\Models\News;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request)
    {


        // Получаем все документы
        $news = News::with('user')->get();




        return Inertia::render('dashboard', [
            'news' => $news,

        ]);
    }
}

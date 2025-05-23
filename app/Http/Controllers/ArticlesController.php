<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ArticlesController extends Controller
{
    public function index()
    {
        return Article::published()
            ->orderBy('published_at', 'desc')
            ->paginate(6);
    }

    public function loadMore(Request $request)
    {
        return Article::published()
            ->orderBy('published_at', 'desc')
            ->paginate(6, ['*'], 'page', $request->page);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\JsonResponse;

class NewsController extends Controller
{
    public function index(): JsonResponse
    {
        $news = News::with('user')->latest()->take(5)->get();

        return response()->json($news);
    }

    public function show(int $id): JsonResponse
    {
        $newsItem = News::with('user')->findOrFail($id);

        return response()->json($newsItem);
    }
}

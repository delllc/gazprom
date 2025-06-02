<?php

namespace App\Http\Controllers\Search;

use App\Models\Documents;
use App\Models\News;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = $request->input('query');


        if (!$query || strlen($query) < 2) {
            return response()->json([
                'results' => [
                    'users' => [],
                    'documents' => [],
                    'news' => []
                ],
                'query' => $query,
            ]);
        }

        $results = [
            'users' => User::where('username', 'like', "%$query%")
                ->orWhere('email', 'like', "%$query%")
                ->limit(5)
                ->get(['id', 'username', 'email']) ?: [],

            'documents' => Documents::where('name', 'like', "%$query%")
                ->orWhere('type', 'like', "%$query%")
                ->limit(5)
                ->get(['id', 'title', 'type']),

            'news' => News::where('title', 'like', "%$query%")
                ->orWhere('short_description', 'like', "%$query%")
                ->limit(5)
                ->get(['id', 'title']),
        ];

        return response()->json(compact('results', 'query'));
    }
}

<?php

namespace App\Http\Controllers\Search;

use App\Http\Controllers\Controller;
use App\Models\Documents;
use App\Models\News;
use App\Models\User;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function globalSearch(Request $request) {


        $query = $request->input('query');

        if (empty($query)) {
            return response()->json(['message' => 'Search query is required'], 400);
        }

        $request->validate([
            'query' => 'required|string|min:2'
        ]);

        $results = [
            'documents' => $this->searchDocument($query),
            'news' => $this->searchNews($query),
            'users' => $this->searchUsers($query),
        ];

        return response()->json($results);
    }

    protected function searchDocument($query) {
        return Documents::where('name', 'like', "%{$query}")
            ->orWhere('type', 'like', "%{$query}%")
            ->limit(5)
            ->get();
    }

    protected function searchNews($query) {
        return News::where('title', 'like', "%{$query}%")
            ->orWhere('short_description', 'like', "%{$query}%")
            ->limit(5)
            ->get();
    }

    protected function searchUsers($query) {
        return User::where('name', 'like', "%{$query}%")
            ->orWhere('email', 'like', "%{$query}%")
            ->limit(5)
            ->get();
    }

}

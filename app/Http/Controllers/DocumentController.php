<?php

namespace App\Http\Controllers;

use App\Models\Documents;
use App\Models\User;
use Illuminate\Http\Request;

class DocumentController extends Controller
{

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'type' => 'required|string|in:contract,report,invoice',
            'file_path' => 'required|string',
            'status' => 'sometimes|string',
            'assigned_user_id' => 'required|exists:users,id',
            'uploaded_by' => 'required|exists:users,id'
        ]);

        $document = Documents::create($validated);

        $document->notifyUsers(
            'document',
            'Новый документ: '.$document->title,
            $validated['assigned_user_id']
        );

        return response()->json($document, 201);
    }
}

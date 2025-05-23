<?php

namespace App\Http\Controllers;

use App\Models\Events;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index() {
        return Events::where('user_id', auth()->id())->get();
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'location' =>'required|string',
            'max_participants' => 'required|exists:users,id',
            'created_by' => 'required|exists:users,id',
        ]);


        return auth()->user()->events()->create($validated);
    }

    public function getParticipants(Events $event) {
        return response()->json([
            'count' => $event->participants->count(),
            'preview' => $event->participants->take(5)->get(),
        ]);
    }

    public function getAllParticipants(Events $event)
    {
        return $event->participants()->paginate(20);
    }
}

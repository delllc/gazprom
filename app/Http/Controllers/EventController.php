<?php

namespace App\Http\Controllers;

use App\Models\Events;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index()
    {
        $events = Events::all();

        return response()->json(['events' => $events]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'start_date' => 'required|date',
            'location' => 'required|string',
        ]);

        $event = Events::create($validated);

        return $event;
    }

    public function getParticipants(Events $event)
    {
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

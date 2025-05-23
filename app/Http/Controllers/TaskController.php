<?php

namespace App\Http\Controllers;

use App\Models\Tasks;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
        return Tasks::query()
            ->where('user_id', Auth::id())
            ->with('assignedBy')
            ->orderBy('due_date')
            ->paginate(10);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'required|date|after:now',
            'priority' => 'required|in:low,medium,high',
            'assigned_to' => 'sometimes|exists:users,id'
        ]);

        $task = Task::create([
            ...$validated,
            'user_id' => $request->assigned_to ?? Auth::id(),
            'assigned_by' => Auth::id()
        ]);

        return response()->json($task, 201);
    }

    public function update(Request $request, Task $task)
    {
        $this->authorize('update', $task);

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'sometimes|date',
            'priority' => 'sometimes|in:low,medium,high',
            'completed' => 'sometimes|boolean'
        ]);

        $task->update($validated);

        return response()->json($task);
    }

    public function destroy(Task $task)
    {
        $this->authorize('delete', $task);
        $task->delete();
        return response()->noContent();
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Media;
use Illuminate\Http\Request;

class MediaController extends Controller
{
    public function storeMedia(Request $request) {
        $request->validate([
            'file' => 'required|file',
            'folder_d' => 'exists:folder,id',
        ]);

        $path = $request->file('file')->store("media/{$request->folder_id}");


        Media::create([
            'path'=> $path,
            'folder_id' => $request->folder_id,
            'uploaded_by' => auth()->id
        ]);
    }
}

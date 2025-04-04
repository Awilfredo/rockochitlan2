<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ImageController extends Controller {
    public function index() {
        return Inertia::render('Images/Index', [
            'images' => Image::orderBy('section')
                            ->orderBy('position')
                            ->get()
        ]);
    }

    public function create() {
        return Inertia::render('Images/Create');
    }

    public function store(Request $request) {
        $request->validate([
            'file' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'section' => 'required|string|max:255',
            'alt_text' => 'nullable|string|max:255',
            'position' => 'nullable|integer',
        ]);

        $filePath = $request->file('file')->store('images', 'public');
        
        Image::create([
            'file_path' => $filePath,
            'section' => $request->section,
            'alt_text' => $request->alt_text,
            'position' => $request->position ?? Image::where('section', $request->section)->max('position') + 1,
        ]);

        return redirect()->route('images.index')
            ->with('success', 'Imagen subida con éxito.');
    }

    public function show(Image $image) {
        return Inertia::render('Images/Show', [
            'image' => $image
        ]);
    }

    public function edit(Image $image) {
        return Inertia::render('Images/Edit', [
            'image' => $image
        ]);
    }

    public function update(Request $request, Image $image) {
        $request->validate([
            'file' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'section' => 'required|string|max:255',
            'alt_text' => 'nullable|string|max:255',
            'position' => 'nullable|integer',
        ]);

        if ($request->hasFile('file')) {
            // Delete old image
            Storage::disk('public')->delete($image->file_path);
            // Store new image
            $filePath = $request->file('file')->store('images', 'public');
            $image->file_path = $filePath;
        }

        $image->update([
            'section' => $request->section,
            'alt_text' => $request->alt_text,
            'position' => $request->position ?? $image->position,
        ]);

        return redirect()->route('images.index')
            ->with('success', 'Imagen actualizada con éxito.');
    }

    public function destroy(Image $image) {
        // Delete the file from storage
        Storage::disk('public')->delete($image->file_path);
        
        $image->delete();

        return redirect()->route('images.index')
            ->with('success', 'Imagen eliminada con éxito.');
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ImageController extends Controller {
    public function index() {
        return Inertia::render( 'Images/Index', [
            'images' => Image::orderBy( 'section' )
            ->orderBy( 'position' )
            ->get()
        ] );
    }

    public function create() {
        $banners = Image::where('section', 'banner')->get();
        return Inertia::render( 'Images/Create', ['banners'=> $banners] );
    }

    public function store(Request $request) {
        //return json_encode($request->all());
        $request->validate([
            'file' => 'required|file|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'section' => 'required|string|max:255',
            'alt_text' => 'nullable|string|max:255',
            'position' => 'nullable|integer',
        ]);

        try {
            if ($request->hasFile('file')) {
                $image = $request->file('file');
                $imagePath = $image->storeAs(
                    'images/banners',
                    'banner_' . time() . '.' . $image->getClientOriginalExtension(),
                    'public'
                );

                //return json_encode($imagePath);

                Image::create([
                    'file_path' => $imagePath,
                    'section' => $request->section,
                    'alt_text' => $request->alt_text,
                    'position' => $request->position ?? Image::where('section', $request->section)->max('position') + 1,
                ]);

                return redirect()->route('images.create')
                    ->with('success', 'Imagen subida con éxito.');
            }

            return redirect()->back()
                ->withErrors(['image' => 'No se pudo procesar la imagen.'])
                ->withInput();

        } catch ( \Exception $e ) {
            return redirect()->back()
            ->withErrors( [ 'error' => 'Error al guardar la imagen: ' . $e->getMessage() ] )
            ->withInput();
        }
    }

    public function show( Image $image ) {
        return Inertia::render( 'Images/Show', [
            'image' => $image
        ] );
    }

    public function edit( Image $image ) {
        return Inertia::render( 'Images/Edit', [
            'image' => $image
        ] );
    }

    public function update( Request $request, Image $image ) {
        $request->validate( [
            'file' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'section' => 'required|string|max:255',
            'alt_text' => 'nullable|string|max:255',
            'position' => 'nullable|integer',
        ] );

        if ( $request->hasFile( 'file' ) ) {
            // Delete old image
            Storage::disk( 'public' )->delete( $image->file_path );
            // Store new image
            $filePath = $request->file( 'file' )->store( 'images', 'public' );
            $image->file_path = $filePath;
        }

        $image->update( [
            'section' => $request->section,
            'alt_text' => $request->alt_text,
            'position' => $request->position ?? $image->position,
        ] );

        return redirect()->route( 'images.index' )
        ->with( 'success', 'Imagen actualizada con éxito.' );
    }

    public function destroy(Image $image) {
        try {
            // Get the file path before deleting the record
            $filePath = $image->file_path;

            // Delete the database record first
            $image->delete();

            // Then delete the file from storage
            if ($filePath && Storage::disk('public')->exists($filePath)) {
                Storage::disk('public')->delete($filePath);
            }

            return redirect()->route('images.create')
                ->with('success', 'Imagen eliminada con éxito.');

        } catch (\Exception $e) {
            // \Log::error('Error deleting image: ' . $e->getMessage());
            return redirect()->back()
                ->withErrors(['error' => 'Error al eliminar la imagen: ' . $e->getMessage()]);
        }
    }
}

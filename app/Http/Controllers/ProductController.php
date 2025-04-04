<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller {
    /**
    * Display a listing of the resource.
    */

    public function index() {
        $catalog = Category::with( 'subcategories.products' )->get();
        return Inertia::render( 'Products/Index', [ 'data' => $catalog ] );
    }

    /**
    * Show the form for creating a new resource.
    */

    public function create() {
        $categories = Category::with( 'subcategories' )->get();
        return Inertia::render( 'Products/Create', [ 'categories' => $categories ] );
        //return json_encode( [ 'categories'=>$categories ] );
    }

    /**
    * Store a newly created resource in storage.
    */

    public function store( Request $request ) {
        try {
            // Validación de los datos
            $request->validate( [
                'name' => 'required|string|max:255',
                'price' => 'required|numeric',
                'stock' => 'required|integer',
                'subcategory_id' => 'required|exists:subcategories,id',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            ] );

            // Crear el producto
            $product = new Product();
            $product->name = $request->name;
            $product->description = $request->description;
            $product->price = $request->price;
            $product->stock = $request->stock;
            $product->subcategory_id = $request->subcategory_id;

            // Manejar la imagen si se ha subido
            if ( $request->hasFile( 'image' ) ) {
                $image = $request->file( 'image' );

                // Guardar la imagen en storage/app/public/image/products
                $imagePath = $image->storeAs( 'images/products', 'product_'. time() . '.' . $image->getClientOriginalExtension(), 'public' );
                //$imagePath = $image->store( 'images/products', 'public' );
                // Guardar la ruta relativa en la base de datos
                $product->image = $imagePath;
            }

            // Guardar el producto en la base de datos
            $product->save();

            // Responder con el producto guardado
            return back()->with( 'success', 'Producto creado exitosamente' );

        } catch ( \Exception $e ) {
            // Registrar el error en el archivo de logs
            //\Log::error( 'Error al guardar el producto: ' . $e->getMessage() );
            // Responder con un mensaje de error
            return back()->with( 'error', 'Error al guardar el producto' );
        }
    }

    /**
    * Display the specified resource.
    */

    public function show( Product $product ) {
        $product->load( 'subcategory.category' );
        return Inertia::render( 'Products/Show', [ 'product' => $product ] );
    }

    /**
    * Show the form for editing the specified resource.
    */

    public function edit( Product $product ) {
        $categories = Category::with( 'subcategories' )->get();
        $product->load( 'subcategory.category' );
        return Inertia::render( 'Products/Edit', [
            'product' => $product,
            'categories' => $categories
        ] );
    }

    public function update( Request $request, Product $product ) {
        try {
            $request->validate( [
                'name' => 'required|string|max:255',
                'price' => 'required|numeric',
                'stock' => 'required|integer',
                'subcategory_id' => 'required|exists:subcategories,id',
                'image' => 'nullable',
            ] );

            $product->name = $request->name;
            $product->description = $request->description;
            $product->price = $request->price;
            $product->stock = $request->stock;
            $product->subcategory_id = $request->subcategory_id;
            $product->visible = $request->visible;

            // Handle image update
            if ( $request->hasFile( 'image' ) ) {
                // Delete old image
                if ( $product->image ) {
                    Storage::disk( 'public' )->delete( $product->image );
                }

                $image = $request->file( 'image' );
                $imagePath = $image->storeAs(
                    'images/products',
                    'product_' . time() . '.' . $image->getClientOriginalExtension(),
                    'public'
                );
                $product->image = $imagePath;
            } else if ( $request->image && is_string( $request->image ) && str_starts_with( $request->image, 'data:image' ) ) {
                // Handle base64 image
                if ( $product->image ) {
                    Storage::disk( 'public' )->delete( $product->image );
                }

                $base64Image = explode( ';base64,', $request->image );
                $imageType = explode( 'image/', $base64Image[ 0 ] )[ 1 ];
                $imageData = base64_decode( $base64Image[ 1 ] );

                $imageName = 'product_' . time() . '.' . $imageType;
                $imagePath = 'images/products/' . $imageName;

                Storage::disk( 'public' )->put( $imagePath, $imageData );
                $product->image = $imagePath;
            }

            $product->save();

            return redirect()->route( 'products' )->with( 'success', 'Producto actualizado exitosamente' );

        } catch ( \Exception $e ) {
            return redirect()->back()
            ->with( 'error', 'Error al actualizar el producto: ' . $e->getMessage() );
        }
    }

    public function feature( Product $product ) {
        $product->featured = !$product->featured;
        $product->save();
        return;
    }

    public function hide( Product $product ) {
        $product->visible = !$product->visible;
        $product->save();
        return ;
    }

    /**
    * Remove the specified resource from storage.
    */

    public function destroy( Product $product){
        $product->delete();
        return back()->with('success', 'Producto eliminado exitosamente' );
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Post;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
class LikeController extends Controller {
    /**
    * Display a listing of the resource.
    */

    public function index() {
        //
    }

    /**
    * Show the form for creating a new resource.
    */

    public function create() {
        //
    }

    /**
    * Store a newly created resource in storage.
    */

    public function store( Request $request ) {
        //
    }

    /**
    * Display the specified resource.
    */

    public function show( string $id ) {
        //
    }

    /**
    * Show the form for editing the specified resource.
    */

    public function edit( string $id ) {
        //
    }

    /**
    * Update the specified resource in storage.
    */

    public function update( Request $request, string $id ) {
        //
    }

    /**
    * Remove the specified resource from storage.
    */

    public function destroy( string $id ) {
        //
    }

    // Método para dar "like" a un producto
    public function likeProduct($productId)
    {
        $product = Product::findOrFail($productId);

        // Verifica si el usuario ya dio like
        if ($product->likes()->where('user_id', Auth::id())->exists()) {
            return response()->json(['message' => 'You already liked this product'], 400);
        }

        // Crear el like
        $like = new Like();
        $like->user_id = Auth::id();
        $like->likeable_id = $productId;
        $like->likeable_type = Product::class;
        $like->save();

        return response()->json(['message' => 'Product liked successfully']);
    }

    // Método para dar "like" a un post
    public function likePost($postId)
    {
        $post = Post::findOrFail($postId);

        // Verifica si el usuario ya dio like
        if ($post->likes()->where('user_id', Auth::id())->exists()) {
            return response()->json(['message' => 'You already liked this post'], 400);
        }

        // Crear el like
        $like = new Like();
        $like->user_id = Auth::id();
        $like->likeable_id = $postId;
        $like->likeable_type = Post::class;
        $like->save();

        return response()->json(['message' => 'Post liked successfully']);
    }

    // Método para quitar el like a un producto
    public function unlikeProduct($productId)
    {
        $product = Product::findOrFail($productId);

        // Eliminar el like
        $product->likes()->where('user_id', Auth::id())->delete();

        return response()->json(['message' => 'Product unliked successfully']);
    }

    // Método para quitar el like a un post
    public function unlikePost($postId)
    {
        $post = Post::findOrFail($postId);

        // Eliminar el like
        $post->likes()->where('user_id', Auth::id())->delete();

        return response()->json(['message' => 'Post unliked successfully']);
    }
}

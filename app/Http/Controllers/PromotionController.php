<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Promotion;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PromotionController extends Controller {
    public function index() {
        return Inertia::render('Promotions/Index', [
            'promotions' => Promotion::with('product')->get()
        ]);
    }

    public function create() {
        $products = Product::all();
        return inertia( 'Promotions/Create', [ 'products' => $products ] );
    }

    public function store( Request $request ) {
        $validated = $request->validate( [
            'title' => 'required|string',
            'description' => 'nullable|string',
            'discount' => 'required|numeric|min:0|max:100',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'product_id' => 'required|exists:products,id',
        ] );

        Promotion::create( $validated );

        return redirect()->route( 'promotions.index' )
        ->with( 'success', 'Promoción creada correctamente' );
    }

    public function edit(Promotion $promotion) {
        return Inertia::render('Promotions/Edit', [
            'promotion' => $promotion,
            'products' => Product::all()
        ]);
    }

    public function update(Request $request, Promotion $promotion) {
        $validated = $request->validate([
            'title' => 'required|string',
            'description' => 'nullable|string',
            'discount' => 'required|numeric|min:0|max:100',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'product_id' => 'required|exists:products,id',
        ]);

        $promotion->update($validated);

        return redirect()->route('promotions.index')
            ->with('success', 'Promoción actualizada correctamente');
    }

    public function destroy(Promotion $promotion) {
        $promotion->delete();

        return redirect()->route('promotions.index')
            ->with('success', 'Promoción eliminada correctamente');
    }

    public function show(Promotion $promotion) {
        return Inertia::render('Promotions/Show', [
            'promotion' => $promotion->load('product')
        ]);
    }
}

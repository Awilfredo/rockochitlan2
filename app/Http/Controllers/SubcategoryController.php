<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Subcategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubcategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {


    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if($request->createCategory){
            $category = new Category();
            $category->name = $request->categoryName;   
            $category->save();
            $subcategory = new Subcategory();
            $subcategory->name = $request->subcategoryName;
            $subcategory->category_id = $category->id;
            $subcategory->save();
        }else{
            $subcategory = new Subcategory();
            $subcategory->name = $request->subcategoryName;
            $subcategory->category_id = $request->categoryId;
            $subcategory->save();
        }
        
        return redirect()->route('product.create');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

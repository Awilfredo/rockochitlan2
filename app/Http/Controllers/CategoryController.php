<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Subcategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function edit()
    {
        return Inertia::render('Categories/Edit', [
            'categories' => Category::with('subcategories')->get()
        ]);
    }

    public function updateCategory(Request $request, Category $category)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string'
        ]);

        $category->update($request->all());
        return back()->with('success', 'Categoría actualizada con éxito');
    }

    public function storeCategory(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string'
        ]);

        Category::create($request->all());
        return back()->with('success', 'Categoría creada con éxito');
    }

    public function destroyCategory(Category $category)
    {
        $category->delete();
        return back()->with('success', 'Categoría eliminada con éxito');
    }

    public function storeSubcategory(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category_id' => 'required|exists:categories,id'
        ]);

        Subcategory::create($request->all());
        return back()->with('success', 'Subcategoría creada con éxito');
    }

    public function updateSubcategory(Request $request, Subcategory $subcategory)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category_id' => 'required|exists:categories,id'
        ]);

        $subcategory->update($request->all());
        return back()->with('success', 'Subcategoría actualizada con éxito');
    }

    public function destroySubcategory(Subcategory $subcategory)
    {
        $subcategory->delete();
        return back()->with('success', 'Subcategoría eliminada con éxito');
    }
}

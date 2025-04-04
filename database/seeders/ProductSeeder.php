<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [];

        // Iterar sobre las subcategorías existentes
        $subcategories = DB::table('subcategories')->get();

        foreach ($subcategories as $subcategory) {
            for ($i = 1; $i <= 5; $i++) {
                $products[] = [
                    'subcategory_id' => $subcategory->id,
                    'name' => $subcategory->name . " Producto $i",
                    'description' => "Descripción del producto $i en la subcategoría {$subcategory->name}",
                    'price' => random_int(100, 1000) / 10, // Precio aleatorio entre 10 y 100
                    'stock' => random_int(10, 50), // Stock aleatorio entre 10 y 50
                    'visible' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }

        // Insertar productos en la base de datos
        DB::table('products')->insert($products);
    }
}

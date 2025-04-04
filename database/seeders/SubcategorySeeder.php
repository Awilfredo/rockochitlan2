<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SubcategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $subcategories = [
            // Subcategorías para Bebidas (ID: 1)
            ['category_id' => 1, 'name' => 'Jugos Naturales', 'description' => 'Jugos hechos con frutas frescas.'],
            ['category_id' => 1, 'name' => 'Refrescos', 'description' => 'Bebidas gaseosas en diferentes sabores.'],
            ['category_id' => 1, 'name' => 'Agua Mineral', 'description' => 'Agua con gas para una experiencia refrescante.'],
            ['category_id' => 1, 'name' => 'Cerveza', 'description' => 'Cerveza artesanal y comercial.'],
            ['category_id' => 1, 'name' => 'Vino', 'description' => 'Variedad de vinos tintos, blancos y rosados.'],
            ['category_id' => 1, 'name' => 'Café', 'description' => 'Café preparado en diferentes estilos.'],
            ['category_id' => 1, 'name' => 'Té', 'description' => 'Tés herbales y tradicionales.'],
            ['category_id' => 1, 'name' => 'Bebidas Energéticas', 'description' => 'Bebidas para revitalizar tu energía.'],
            ['category_id' => 1, 'name' => 'Batidos', 'description' => 'Smoothies y batidos de frutas.'],
            ['category_id' => 1, 'name' => 'Licores', 'description' => 'Licores y cócteles variados.'],

            // Subcategorías para Comida (ID: 2)
            ['category_id' => 2, 'name' => 'Entradas', 'description' => 'Pequeñas porciones para iniciar la comida.'],
            ['category_id' => 2, 'name' => 'Sopas', 'description' => 'Variedad de sopas y caldos.'],
            ['category_id' => 2, 'name' => 'Platos Principales', 'description' => 'Comidas completas para el almuerzo o la cena.'],
            ['category_id' => 2, 'name' => 'Postres', 'description' => 'Dulces para terminar la comida.'],
            ['category_id' => 2, 'name' => 'Ensaladas', 'description' => 'Frescas y saludables combinaciones de vegetales.'],
            ['category_id' => 2, 'name' => 'Comida Rápida', 'description' => 'Hamburguesas, papas fritas y más.'],
            ['category_id' => 2, 'name' => 'Pastas', 'description' => 'Deliciosas recetas con diferentes tipos de pasta.'],
            ['category_id' => 2, 'name' => 'Pizzas', 'description' => 'Pizzas con una gran variedad de ingredientes.'],
            ['category_id' => 2, 'name' => 'Mariscos', 'description' => 'Platos preparados con productos del mar.'],
            ['category_id' => 2, 'name' => 'Carnes', 'description' => 'Cortes de carne cocinados a la perfección.'],
        ];

        DB::table('subcategories')->insert($subcategories);
    }
}

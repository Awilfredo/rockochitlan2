<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('categories')->insert([
            [
                'name' => 'Bebidas',
                'description' => 'Explora nuestra categoría de bebidas, diseñada para satisfacer todos los gustos y ocasiones. Aquí encontrarás una amplia variedad de opciones, desde refrescantes jugos naturales y gaseosas hasta energizantes, aguas saborizadas y deliciosas infusiones. Perfectas para acompañar tus comidas, disfrutar en reuniones o simplemente para refrescarte en cualquier momento del día. ¡Descubre tu favorita y mantente hidratado con estilo!',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Snacks',
                'description' => 'Aperitivos y bocadillos para cualquier ocasión.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}

<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PageContentsSeeder extends Seeder {
    /**
    * Run the database seeds.
    */

    public function run(): void {
        $now = Carbon::now();

        DB::table( 'page_contents' )->insert( [
            [
                'key' => 'home_title',
                'content' => 'RESTAURANTE BAR ROCKOCHITLAN',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'key' => 'home_description',
                'content' => 'Ven y vive una gran experiencia con nuestros exquisitos platos y las mejores cervezas acompañado de la buena Música. Trae a toda tu familia y amigos para vivir un momento maravilloso, lleno de sensaciones al paladar.',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'key' => 'about_title',
                'content' => 'Sobre Nosotros',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'key' => 'about_description',
                'content' => 'Nuestra historia comienza con la pasión por la tecnología...',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'key' => 'contact_title',
                'content' => 'Contáctanos',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'key' => 'contact_description',
                'content' => 'Puedes escribirnos a contacto@ejemplo.com o llamarnos al 123-456-789.',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'key' => 'adreess',
                'content' => 'Calle Principal 123, Ciudad',
                'created_at' => $now,
                'updated_at' => $now,
            ], [
                'key' => 'phone',
                'content' => '123-456-789',
                'created_at' => $now,
                'updated_at' => $now,
            ], [
                'key' => 'email',
                'content' => 'example@email.com',
                'created_at' => $now,
                'updated_at' => $now, ]
            ] );
        }
    }

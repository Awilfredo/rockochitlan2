<?php

namespace Database\Seeders;

use App\Models\PageContent;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Contracts\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Wilfredo Cruz',
        //     'email' => 'admin@rockochitlan.com',
        // ]);

        $this->call([
            //CategorySeeder::class,
            //SubcategorySeeder::class,
            //ProductSeeder::class,
            UserSeeder::class,
            PageContentsSeeder::class,
        ]);
    }
}

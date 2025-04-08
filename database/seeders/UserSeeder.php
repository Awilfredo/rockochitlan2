<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    public function run()
    {
        // Crear roles si no existen
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $userRole = Role::firstOrCreate(['name' => 'user']);

        // Crear permisos si no existen
        $viewPermission = Permission::firstOrCreate(['name' => 'view']);
        $editPermission = Permission::firstOrCreate(['name' => 'edit']);
        
        // Crear un usuario administrador
        $adminUser = User::create([
            'name' => 'Admin User',
            'email' => 'admin@rockochitlan.com',
            'password' => Hash::make('ObiJuanKenobi94*'),
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
        ]);

        // Asignar el rol de admin al usuario
        $adminUser->assignRole($adminRole);

        // Asignar permisos al rol de admin
        $adminRole->givePermissionTo($viewPermission, $editPermission);

        // // Crear un usuario normal
        // $normalUser = User::create([
        //     'name' => 'Normal User',
        //     'email' => 'user@rockochitlan.com',
        //     'password' => Hash::make('password123'),
        //     'email_verified_at' => now(),
        //     'remember_token' => Str::random(10),
        // ]);

        // // Asignar el rol de user al usuario normal
        // $normalUser->assignRole($userRole);
    }
}

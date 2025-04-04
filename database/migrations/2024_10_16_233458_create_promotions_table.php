<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('promotions', function (Blueprint $table) {
            $table->id(); // ID de la promoción
            $table->foreignId('product_id')->constrained()->onDelete('cascade'); // Relación con el producto
            $table->string('title'); // Título de la promoción
            $table->text('description')->nullable(); // Descripción de la promoción
            $table->decimal('discount_percentage', 5, 2); // Porcentaje de descuento
            $table->date('start_date'); // Fecha de inicio
            $table->date('end_date'); // Fecha de finalización
            $table->timestamps(); // Timestamps para created_at y updated_a
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('promotions');
    }
};

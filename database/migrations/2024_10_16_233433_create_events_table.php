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
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->date('start_date'); // Fecha de inicio del evento
            $table->date('end_date')->nullable(); // Fecha de fin del evento (opcional)
            $table->time('start_time');
            $table->time('end_time')->nullable();
            $table->string('location')->nullable(); // Ubicación del evento
            $table->string('image')->nullable();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Organizador del evento
            $table->boolean('is_public')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};

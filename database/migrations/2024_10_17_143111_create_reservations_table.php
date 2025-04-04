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
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete(); // Opcional si quieres vincular a usuarios registrados
            $table->string('name'); // Nombre del cliente
            $table->string('email')->nullable(); // Correo electrónico
            $table->string('phone'); // Teléfono
            $table->dateTime('reservation_date'); // Fecha y hora de la reservación
            $table->integer('guest_number'); // Número de invitados
            $table->text('special_request')->nullable(); // Peticiones especiales
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};

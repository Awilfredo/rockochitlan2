<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateImagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('images', function (Blueprint $table) {
            $table->id();
            $table->string('file_path'); // Ruta del archivo
            $table->string('section'); // Identificador de la sección (carousel, portada, galería, etc.)
            $table->string('alt_text')->nullable(); // Texto alternativo para accesibilidad
            $table->integer('position')->default(1); // Orden en la sección
            $table->timestamps(); // created_at y updated_at
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('images');
    }
}

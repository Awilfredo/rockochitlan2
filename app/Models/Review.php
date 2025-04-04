<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model {
    use HasFactory;
    protected $fillable = [
        'user_id',
        'producto_id', // Cambiado de menu_item_id a producto_id
        'rating',
        'comment',
    ];

    public function user() {
        return $this->belongsTo( User::class );
    }

    public function producto() {
        return $this->belongsTo( Product::class );
        // Cambiado de MenuItem a Producto
    }
}

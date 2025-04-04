<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'price', 'stock', 'visible', 'subcategory_id', 'image'];

    public function subcategory()
    {
        return $this->belongsTo(Subcategory::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    /**
     * Relación polimórfica para obtener los "likes" del producto.
     */
    public function likes()
    {
        return $this->morphMany(Like::class, 'likeable');
    }

    /**
     * Relación para obtener los usuarios que han dado "like" al producto.
     */
    public function likedByUsers()
    {
        return $this->likes()->with('user');
    }

    /**
     * Método para contar los "likes" de un producto.
     */
    public function countLikes()
    {
        return $this->likes()->count();
    }

    /**
     * Método para contar cuántos usuarios han dado "like" al producto.
     */
    public function countLikedByUsers()
    {
        return $this->likes()->distinct('user_id')->count('user_id');
    }
}

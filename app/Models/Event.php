<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;
    protected $fillable = ['title', 'user_id', 'description', 'start_date', 'end_date','start_time', 'end_time', 'location', 'image',  'is_public'];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

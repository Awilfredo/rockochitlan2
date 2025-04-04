<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'email',
        'phone',           // Changed from phone_number to phone
        'reservation_date',
        'guest_number',
        'special_request',
        'user_id'         // Added user_id
    ];

    /**
     * Si deseas vincular las reservaciones a usuarios registrados
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

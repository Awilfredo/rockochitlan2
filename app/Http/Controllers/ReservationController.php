<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReservationController extends Controller {
    /**
    * Display a listing of the resource.
    */

    public function index() {
        $reservation = Reservation::all();
        return Inertia::render('Reservations/Index', ['reservations' => $reservation]);
    }

    /**
    * Show the form for creating a new resource.
    */

    public function create() {
        //
    }

    /**
    * Store a newly created resource in storage.
    */

    public function store(Request $request) {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|email',
            'phone' => 'required|string|max:15',
            'reservation_date' => 'required|date|after_or_equal:today',
            'guest_number' => 'required|integer|min:1|max:10',
            'special_request' => 'nullable|string|max:255',
            'user_id' => 'nullable|exists:users,id'
        ]);

        try {
            $validated['reservation_date'] = \Carbon\Carbon::parse($validated['reservation_date']);
            $reservation = Reservation::create($validated);

            return redirect()->back()->with('success', 'Reservación creada exitosamente');

        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Error al crear la reservación']);
        }
    }

    /**
    * Display the specified resource.
    */

    public function show( Reservation $reservation) {
        return Inertia::render('Reservations/Show', ['reservation' => $reservation]);
    }

    /**
    * Show the form for editing the specified resource.
    */

    public function edit( string $id ) {
        //
    }

    /**
    * Update the specified resource in storage.
    */

    public function update( Request $request, string $id ) {
        //
    }

    /**
    * Remove the specified resource from storage.
    */

    public function destroy( Reservation $reservation) {
        $reservation->delete();
        return redirect()->route('reservations.index')->with('success', 'Reservación eliminada exitosamente');
    }
}

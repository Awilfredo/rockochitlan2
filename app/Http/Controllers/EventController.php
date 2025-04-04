<?php

namespace App\Http\Controllers;

use App\Models\Event as ModelsEvent;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EventController extends Controller {
    /**
    * Display a listing of the resource.
    */

    public function index() {
        //dd('index funcionando');
        $events = ModelsEvent::all();
        return Inertia::render( 'Events/Index', [
            'events' => $events,
        ] );
    }

    /**
    * Show the form for creating a new resource.
    */

    public function create() {
        return Inertia::render( 'Events/Create' );
        //
    }

    /**
    * Store a newly created resource in storage.
    */

    public function store( Request $request ) {
        $request->validate( [
            'title' => 'required|max:255',
            'description' => 'required',
            'user_id' => 'required|integer',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'nullable|date_format:H:i',
            'location' => 'required|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
        ] );
        $event = new ModelsEvent();
        $event->title = $request->title;
        $event->description = $request->description;
        $event->user_id = $request->user_id;
        $event->start_date = $request->start_date;
        $event->end_date = $request->end_date;
        $event->start_time = $request->start_time;
        $event->end_time = $request->end_time;
        $event->location = $request->location;
        if ( $request->hasFile( 'image' ) ) {
            $image = $request->file( 'image' );
            $imagePath = $image->storeAs( 'images/events', 'event_'. time() . '.' . $image->getClientOriginalExtension(), 'public' );
            $event->image = $imagePath;
        }
        $event->save();
        return redirect()->route( 'events.index' );
    }

    /**
    * Display the specified resource.
    */

    public function show(ModelsEvent $event) {
        return Inertia::render('Events/Show', [
            'event' => $event->load('user')
        ]);
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

    public function destroy( string $id ) {
        //
    }
}

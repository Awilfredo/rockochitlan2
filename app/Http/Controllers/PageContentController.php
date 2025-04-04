<?php

namespace App\Http\Controllers;

use App\Models\PageContent;
use Illuminate\Http\Request;

class PageContentController extends Controller {
    public function index() {
        $contents = PageContent::all();
        return inertia( 'PageContents/Index', compact( 'contents' ) );
    }

    public function edit( PageContent $pageContent ) {
        return inertia( 'PageContents/Edit', [ 'content' => $pageContent ] );
    }

    public function update( Request $request, PageContent $pageContent ) {
        $request->validate( [
            'content' => 'required|string',
        ] );

        $pageContent->update( [
            'content' => $request->input( 'content' ),
        ] );

        return redirect()->route( 'page-contents.index' )->with( 'success', 'Contenido actualizado correctamente.' );
    }
}


<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\PageContentController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\SubcategoryController;
use App\Models\Event;
use App\Models\Image;
use App\Models\PageContent;
use App\Models\Product;
use App\Models\Reservation;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $featuredProducts = Product::where('featured', true)->get();
    $lastProducts = Product::latest()->take(4)->get(); // Obtener los últimos 4 productos
    $events = Event::where('end_date', '>=', now())->take(3)->get(); // Obtener los próximos 3 eventos
    $pageContents = PageContent::all();
    $banners = Image::where('section', 'banner')->get();
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'featured' => $featuredProducts,
        'events' => $events,
        'products' => $lastProducts,
        'pageContents' => $pageContents,
        'banners' => $banners,
    ]);
})->name('home');

Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('/dashboard', function () {
        $users = User::count();
        $reservations = Reservation::count();
        $products = Product::count();
        $events = Event::count();
        return Inertia::render('Dashboard', compact('users', 'reservations', 'products', 'events'));
        //return Inertia::render('Dashboard');
    })->name('dashboard');
    // Products
    Route::get('/products/create', [ProductController::class, 'create'])->name('products.create');
    Route::post('/products', [ProductController::class, 'store'])->name('products.store');
    Route::get('/products/{product}/edit', [ProductController::class, 'edit'])->name('products.edit');
    Route::put('/products/{product}/feature', [ProductController::class, 'feature'])->name('products.feature');
    Route::put('/products/{product}/hide', [ProductController::class, 'hide'])->name('products.hide');
    Route::put('/products/{product}', [ProductController::class, 'update'])->name('products.update'); 
    Route::delete('/products/{product}', [ProductController::class, 'destroy'])->name('products.destroy');
    // Events
    Route::get('/events/create', [EventController::class, 'create'])->name('events.create');
    Route::post('/events', [EventController::class, 'store'])->name('events.store');
    // Subcategories
    Route::post('/subcategories/store', [SubcategoryController::class, 'store'])->name('subcategories.store');
    //reservations
    Route::get('/reservations', [ReservationController::class, 'index'])->name('reservations.index');
    Route::get('/reservations/{reservation}', [ReservationController::class, 'show'])->name('reservations.show');
    Route::get('/reservations/{reservation}/edit', [ReservationController::class, 'edit'])->name('reservations.edit');
    Route::put('/reservations/{reservation}', [ReservationController::class, 'update'])->name('reservations.update');
    Route::put('/reservations/{reservation}/approve', [ReservationController::class, 'approve'])->name('reservations.approve');
    Route::put('/reservations/{reservation}/reject', [ReservationController::class, 'reject'])->name('reservations.reject');
    Route::delete('/reservations/{reservation}', [ReservationController::class, 'destroy'])->name('reservations.destroy');
    //images
    Route::get('/images/create', [ImageController::class, 'create'])->name('images.create');
    Route::post('/images', [ImageController::class, 'store'])->name('images.store');
    Route::get('/images', [ImageController::class, 'index'])->name('images.index');
    Route::get('/images/{image}', [ImageController::class, 'show'])->name('images.show');
    Route::delete('/images/{image}', [ImageController::class, 'destroy'])->name('images.destroy'); 
    //page_contents
    Route::get('/page-contents', [PageContentController::class, 'index'])->name('page-contents.index');
    Route::get('/page-contents/{pageContent}/edit', [PageContentController::class, 'edit'])->name('page-contents.edit');
    Route::put('/page-contents/{pageContent}', [PageContentController::class, 'update'])->name('page-contents.update');

    Route::get('/categories/edit', [CategoryController::class, 'edit'])->name('categories.edit');
    Route::post('/categories', [CategoryController::class, 'storeCategory'])->name('categories.store');
    Route::put('/categories/{category}', [CategoryController::class, 'updateCategory'])->name('categories.update');
    Route::delete('/categories/{category}', [CategoryController::class, 'destroyCategory'])->name('categories.destroy');
    
    Route::post('/subcategories', [CategoryController::class, 'storeSubcategory'])->name('subcategories.store');
    Route::put('/subcategories/{subcategory}', [CategoryController::class, 'updateSubcategory'])->name('subcategories.update');
    Route::delete('/subcategories/{subcategory}', [CategoryController::class, 'destroySubcategory'])->name('subcategories.destroy');

});


Route::get('/products', [ProductController::class, 'index'])->name('products.index');
Route::get('/products/{product}', [ProductController::class, 'show'])->name('products.show');
Route::get('/events', [EventController::class, 'index'])->name('events.index');
Route::get('/events/{event}', [EventController::class,'show'])->name('events.show');
//Route::get('/catalog', [CatalogController::class, 'getCatalog'])->name('catalog');

Route::post('reservations', [ReservationController::class, 'store'])->name('reservations.store');
Route::get('reservations/create', [ReservationController::class, 'create'])->name('reservations.create');

Route::post('products/{product}/like', [LikeController::class, 'likeProduct']);
Route::delete('products/{product}/like', [LikeController::class, 'unlikeProduct']);

// Likes para posts
Route::post('posts/{post}/like', [LikeController::class, 'likePost']);
Route::delete('posts/{post}/like', [LikeController::class, 'unlikePost']);

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});



require __DIR__.'/auth.php';

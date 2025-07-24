<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\{
    CategoryController,
    ProductController,
    ComboPackController
};


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Categories API Routes
Route::prefix('categories')->group(function () {
    // Get all categories with products count
    Route::get('/', [CategoryController::class, 'index']);
    
    // Create new category
    Route::post('/', [CategoryController::class, 'store']);
    
    // Get single category with products
    Route::get('/{id}', [CategoryController::class, 'show']);
    
    // Update category
    Route::put('/{id}', [CategoryController::class, 'update']);
    Route::patch('/{id}', [CategoryController::class, 'update']);
    
    // Delete category
    Route::delete('/{id}', [CategoryController::class, 'destroy']);
    
    // Get products by category
    Route::get('/{id}/products', [CategoryController::class, 'show']); // Uses same show method
});

// Products API Routes
Route::prefix('products')->group(function () {
    // Get all products (with optional filters)
    Route::get('/', [ProductController::class, 'index']);
    
    // Create new product
    Route::post('/', [ProductController::class, 'store']);
    
    // Get single product with category and combo packs
    Route::get('/{id}', [ProductController::class, 'show']);
    
    // Update product
    Route::put('/{id}', [ProductController::class, 'update']);
    Route::patch('/{id}', [ProductController::class, 'update']);
    
    // Delete product
    Route::delete('/{id}', [ProductController::class, 'destroy']);
    
    // Search products
    Route::get('/search/{query}', [ProductController::class, 'index']); // Uses index with search param
});

// Combo Packs API Routes
Route::prefix('combo-packs')->group(function () {
    // Get all combo packs with products
    Route::get('/', [ComboPackController::class, 'index']);
    
    // Create new combo pack
    Route::post('/', [ComboPackController::class, 'store']);
    
    // Get single combo pack with products
    Route::get('/{id}', [ComboPackController::class, 'show']);
    
    // Update combo pack
    Route::put('/{id}', [ComboPackController::class, 'update']);
    Route::patch('/{id}', [ComboPackController::class, 'update']);
    
    // Delete combo pack
    Route::delete('/{id}', [ComboPackController::class, 'destroy']);
    
    // Get products in a combo pack
    Route::get('/{id}/products', [ComboPackController::class, 'show']); // Uses same show method
});

// Alternatively, you can use apiResource for basic CRUD routes:
// Route::apiResource('categories', CategoryController::class);
// Route::apiResource('products', ProductController::class);
// Route::apiResource('combo-packs', ComboPackController::class);

// Health Check
Route::get('/status', function () {
    return response()->json(['status' => 'API is running']);
});

Route::get('/ping', function() {
    return response()->json([
        'status' => 'success',
        'message' => 'API is working',
        'timestamp' => now()
    ]);
});
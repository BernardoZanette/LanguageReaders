<?php

use App\Http\Controllers\CardsController;
use Illuminate\Support\Facades\Route;

Route::get('/api/cards', [CardsController::class, 'index']);

Route::post('/api/cards', [CardsController::class, 'store']);

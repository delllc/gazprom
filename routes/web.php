<?php

use App\Mail\PasswordResetMail;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('/preview-password-reset', function () {
    return new PasswordResetMail('test-token-123');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

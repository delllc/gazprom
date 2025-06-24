<?php

use App\Http\Controllers\NotebookController;
use App\Http\Controllers\Pages\DashboardController;
use App\Http\Controllers\Pages\DocumentsController;
use App\Http\Controllers\Pages\EmployeesController;
use App\Http\Controllers\Search\SearchController;
use App\Mail\PasswordResetMail;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('auth/login');
})->name('home');

Route::get('/employees', [EmployeesController::class, 'index'])->name('employees');
Route::get('/document', [DocumentsController::class, 'index'])->name('documents');

Route::get('/search', [SearchController::class, 'index'])->name('search');

Route::get('/notebook', [NotebookController::class, 'notebook'])->name('notebook');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
});

Route::get('/preview-password-reset', function () {
    return new PasswordResetMail('test-token-123');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

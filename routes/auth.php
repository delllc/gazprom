<?php

use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\AdminNotificationController;
use App\Http\Controllers\ArticlesController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\NotificationsController;
use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('register', [UserController::class, 'create'])
        ->name('register');

    Route::post('register', [UserController::class, 'store']);

    Route::get('login', [AuthenticatedSessionController::class, 'create'])
        ->name('login');

    Route::post('login', [AuthenticatedSessionController::class, 'store']);

    Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])
        ->name('password.request');

    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])
        ->name('password.email');

    Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])
        ->name('password.reset');

    Route::post('reset-password', [NewPasswordController::class, 'store'])
        ->name('password.store');
});

Route::middleware('auth')->group(function () {
    Route::get('verify-email', EmailVerificationPromptController::class)
        ->name('verification.notice');

    Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)
        ->middleware(['signed', 'throttle:6,1'])
        ->name('verification.verify');

    Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
        ->middleware('throttle:6,1')
        ->name('verification.send');

    Route::get('confirm-password', [ConfirmablePasswordController::class, 'show'])
        ->name('password.confirm');

    Route::post('confirm-password', [ConfirmablePasswordController::class, 'store']);

    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');

    // Notify
    Route::get('/notifications', [NotificationsController::class, 'index']);
    Route::patch('/notifications/{notification}/read', [NotificationsController::class, 'markAsRead']);
    Route::get('/notifications/unread-count', [NotificationsController::class, 'unreadCount']);


    Route::apiResource('events', EventController::class);
    Route::post('/events', [EventController::class, 'store']);
    Route::get('/events/{event}/participants', [EventController::class, 'getParticipants']);
    Route::get('/events/{event}/participants/all', [EventController::class, 'getAllParticipants']);


    Route::get('/tasks', [TaskController::class, 'tasks'])->name('tasks');
    Route::apiResource('users', UserController::class);
    Route::apiResource('documents', DocumentController::class);
    Route::apiResource('media', MediaController::class)->middleware('admin');
    Route::apiResource('articles', ArticlesController::class);

    Route::get('/news', [NewsController::class, 'index']);
    Route::get('/news/{id}', [NewsController::class, 'show']);

    Route::apiResource('documents', DocumentController::class);
});

Route::prefix('admin')->middleware(['auth', 'admin'])->group(function () {
    Route::post('/users', [UserController::class, 'create']);
    Route::post('/notify', [AdminNotificationController::class, 'massNotify']);
});

Route::post('/password-reset-request', [PasswordResetController::class, 'requestReset']);
Route::post('/reset-password', [PasswordResetController::class, 'reset']);

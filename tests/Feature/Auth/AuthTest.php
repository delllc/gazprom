<?php

use App\Mail\PasswordResetMail;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Notification;

beforeEach(function () {
    Mail::fake();
    Notification::fake();
});

//uses(RefreshDatabase::class); // Очищает базу перед каждым тестом


it('admin can create new user', function () {
    // 1. Подготовка
    $admin = User::factory()->create(['role' => 'admin']);

    // Генерируем уникальные тестовые данные
    $testEmail = 'test_'.time().'@example.com'; // Уникальный email
    $testUsername = 'testuser_'.time(); // Уникальный username

    // 2. Действие
    $response = $this->actingAs($admin)
        ->postJson('/admin/users', [
            'name' => 'Test User',
            'email' => $testEmail, // Используем динамический email
            'username' => $testUsername, // Используем динамический username
            'password' => 'Password123!',
            'role' => 'employee',
            'phone' => '9' . rand(100000000, 999999999) // Всегда уникальный 10-значный номер
        ]);

    // 3. Проверки
    $response->assertStatus(201)
        ->assertJson([
            'message' => 'User created successfully'
        ]);

    // Проверяем БД с ТЕМИ ЖЕ ДАННЫМИ, что и отправляли
    $this->assertDatabaseHas('users', [
        'email' => $testEmail, // Используем переменную, а не жесткий email
        'username' => $testUsername, // Используем переменную
        'role' => 'employee',
    ]);

    // Проверка, что письмо не отправлялось
    Mail::assertNothingSent();
});

it('non-admin cannot create user', function () {
    $user = User::factory()->create(['role' => 'employee']);

    $response = $this->actingAs($user)
        ->postJson('/admin/users', [
            'name' => 'Test User',
            'email' => 'tes123t@example.com',
            'username' => 'testuser',
            'password' => 'Password123!'
        ]);

    $response->assertStatus(403);
    Mail::assertNothingSent();
});

it('validates user creation data', function () {
    $admin = User::factory()->create(['role' => 'admin']);

    $response = $this->actingAs($admin)
        ->postJson('/admin/users', [
            'name' => '',
            'email' => 'invalid-email',
            'password' => 'short'
        ]);

    $response->assertStatus(422)
        ->assertJsonValidationErrors([
            'name', 'email', 'password'
        ]);
});

it('sends password reset email', function() {
    $user = User::factory()->create();

    $response = $this->postJson('/password-reset-request', [
        'email' => $user->email
    ]);

    $response->assertStatus(200);

    Mail::assertSent(PasswordResetMail::class, function ($mail) use ($user) {
        return $mail->hasTo($user->email);
    });
});

<?php

namespace Tests\Unit\Models;

use App\Models\Notifications;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class NotificationsTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_has_correct_fillable_fields()
    {
        $fillable = [
            'user_id',
            'type',
            'message',
            'is_read',
            'notifiable_type',
            'notifiable_id'
        ];
        $this->assertEquals($fillable, (new Notifications())->getFillable());
    }

    /** @test */
    public function it_belongs_to_user()
    {
        $user = User::factory()->create();
        $notification = Notifications::factory()->create(['user_id' => $user->id]);

        $this->assertInstanceOf(User::class, $notification->user);
        $this->assertEquals($user->id, $notification->user->id);
    }

    /** @test */
    public function it_can_morph_to_notifiable()
    {
        // Создаем тестовую модель для полиморфной связи
        $testModel = new class extends Model {
            protected $table = 'test_models';
            protected $guarded = [];
        };

        // Создаем таблицу для тестовой модели
        \Schema::create('test_models', function ($table) {
            $table->id();
            $table->timestamps();
        });

        $testModel->save(); // Сохраняем, чтобы получить ID

        $notification = Notifications::factory()->create([
            'notifiable_type' => get_class($testModel),
            'notifiable_id' => $testModel->id
        ]);

        $this->assertInstanceOf(get_class($testModel), $notification->notifiable);
        $this->assertEquals($testModel->id, $notification->notifiable->id);
    }
}

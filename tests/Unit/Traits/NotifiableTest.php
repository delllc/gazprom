<?php


namespace Tests\Unit\Traits;

use App\Models\Notifications;
use App\Models\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class NotifiableTest extends TestCase
{
    use RefreshDatabase;

    protected $testModel;

    protected function setUp(): void
    {
        parent::setUp();

        // Создаем тестовую модель, использующую трейт
        $this->testModel = new class extends \Illuminate\Database\Eloquent\Model {
            use \App\Traits\Notifiable;
            protected $table = 'test_notifiable_models';
        };

        \Schema::create('test_notifiable_models', function ($table) {
            $table->id();
            $table->timestamps();
        });

        $this->testModel->save(); // Сохраняем, чтобы был ID
    }

    /** @test */
    public function it_can_notify_single_user()
    {
        $user = User::factory()->create();

        $this->testModel->notifyUsers(
            'document',
            'Test message',
            $user->id
        );

        $this->assertDatabaseHas('notifications', [
            'user_id' => $user->id,
            'type' => 'document',
            'message' => 'Test message',
            'notifiable_type' => get_class($this->testModel),
            'notifiable_id' => $this->testModel->id,
            'is_read' => false
        ]);
    }

    /** @test */
    public function it_can_notify_multiple_users()
    {
        $users = User::factory()->count(3)->create();

        $this->testModel->notifyUsers(
            'event',
            'Test message',
            $users->pluck('id')->toArray()
        );

        $this->assertCount(3, Notifications::all());
    }

    /** @test */
    public function it_can_mark_all_notifications_as_read()
    {
        $user = User::factory()->create();

        $this->testModel->notifyUsers('document', 'msg', $user->id);
        $this->testModel->notifyUsers('document', 'msg', $user->id);

        $this->testModel->markNotificationsAsRead();

        $this->assertEquals(
            2,
            Notifications::where('is_read', true)->count()
        );
    }
}

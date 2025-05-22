<?php


namespace Tests\Unit\Models;

use App\Models\Notifications;
use App\Models\User;
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
            'ts_read',
            'notifiable_type',
            'notifiable_id'
        ];
        $this->assertEquals($fillable, (new Notifications())->getFillable());
    }

    /** @test */
    public function it_belongs_to_user()
    {
        $notification = Notifications::factory()
            ->for(User::factory())
            ->create();

        $this->assertInstanceOf(User::class, $notification->user);
    }

    /** @test */
    public function it_can_morph_to_notifiable()
    {
        $model = new class extends \Illuminate\Database\Eloquent\Model {
        };
        $model->save();

        $notification = Notifications::factory()->create([
            'notifiable_type' => get_class($model),
            'notifiable_id' => $model->id
        ]);

        $this->assertNotNull($notification->notifiable);
    }
}

<?php


namespace Tests\Feature;

use App\Models\Notifications;
use App\Models\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class NotificationsControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function authenticated_user_can_get_their_notifications()
    {
        $user = User::factory()->create();
        $notifications = Notifications::factory()
            ->count(25)
            ->create(['user_id' => $user->id, 'type' => 'document', 'message' => 'Test notify']);

        $response = $this->actingAs($user)
            ->getJson('/notifications');

        $response->assertOk()
            ->assertJsonCount(20) // Проверяем limit 20
            ->assertJsonFragment([
                'message' => 'Test notify'
            ]);
    }

    /** @test */
    public function notifications_are_ordered_by_created_at_desc()
    {
        $user = User::factory()->create();
        $oldNotification = Notifications::factory()->create([
            'user_id' => $user->id,
            'created_at' => now()->subDay()
        ]);
        $newNotification = Notifications::factory()->create([
            'user_id' => $user->id,
            'created_at' => now()
        ]);

        $response = $this->actingAs($user)
            ->getJson('/notifications');

        $response->assertJsonPath('0.id', $newNotification->id);
    }

    /** @test */
    public function user_can_mark_notification_as_read()
    {
        $user = User::factory()->create();
        $notification = Notifications::factory()->create([
            'user_id' => $user->id,
            'is_read' => false
        ]);

        $response = $this->actingAs($user)
            ->postJson("/notifications/{$notification->id}/read");

        $response->assertNoContent();
        $this->assertDatabaseHas('notifications', [
            'id' => $notification->id,
            'is_read' => true
        ]);
    }

    /** @test */
    public function guest_cannot_access_notifications()
    {
        $this->getJson('/notifications')->assertUnauthorized();
    }
}

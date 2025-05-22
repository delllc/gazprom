<?php

namespace Tests\Feature;

use App\Models\Documents;
use App\Models\Notifications;
use App\Models\User;
use Tests\TestCase;

class AdminNotificationTest extends TestCase
{
    public function test_admin_can_send_mass_notification()
    {
        $admin = User::factory()->admin()->create();
        $document = Documents::factory()->create();

        $response = $this->actingAs($admin)
            ->postJson('/admin/notify', [
                'message' => 'Document changed',
                'change_type' => 'document',
                'notifiable_id' => $document->id,
                'notifiable_type' => 'App\Models\Documents'
            ]);

        $response->assertOk();
        $this->assertDatabaseHas('notifications', [
            'notifiable_type' => 'App\Models\Documents',
            'notifiable_id' => $document->id,
        ]);
    }
}

<?php

namespace Tests\Feature;

use App\Models\Notifications;
use App\Models\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class DocumentsControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_creates_notification_when_document_created()
    {
        $user = User::factory()->create();
        $assignedUser = User::factory()->create();

        $response = $this->actingAs($user)
            ->postJson('/documents', [
                'name' => 'Test Document',
                'title' => 'Test Doc',
                'type' => 'contract',
                'file_path' => 'documents/test.pdf',
                'status' => 'draft',
                'assigned_user_id' => $assignedUser->id,
                'uploaded_by' => $user->id
            ]);

        $response->assertCreated();

        $documentId = $response->json('id');

        $this->assertDatabaseHas('notifications', [
            'notifiable_type' => 'App\Models\Documents',
            'notifiable_id' => $documentId
        ]);


    }
}

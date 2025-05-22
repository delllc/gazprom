<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Documents;
use App\Models\News;
use App\Models\User;
use Illuminate\Support\Str;

class SearchTest extends TestCase
{

    public function test_global_search_returns_all_results()
    {
        // 1. Создаем тестовые данные с ОДИНАКОВЫМ поисковым запросом
        $searchTerm = 'LaravelTestQuery'; // Уникальный термин для всех записей
        $assignedUser = User::factory()->create();

        $document = Documents::factory()->create([
            'name' => "Document about {$searchTerm}",
            'type' => "vaction",
            'assigned_user_id' => $assignedUser->id,
            'uploaded_by' => $assignedUser->id
        ]);

        $news = News::factory()->create([
            'title' => "News {$searchTerm} update",
            'content' => "Latest news about {$searchTerm}"
        ]);

        $user = User::factory()->create([
            'name' => "User {$searchTerm}",
            'email' => "{$searchTerm}@example.com",
            'username' => strtolower($searchTerm)
        ]);

        // 2. Выполняем поиск по нашему термину
        $response = $this->getJson("/search?query={$searchTerm}");

        // 3. Проверяем структуру и количество результатов
        $response->assertStatus(200)
            ->assertJsonStructure([
                'documents' => [['id', 'name']],
                'news' => [['id', 'title']],
                'users' => [['id', 'name']]
            ])
            ->assertJsonCount(1, 'documents')
            ->assertJsonCount(1, 'news')
            ->assertJsonCount(1, 'users');
    }


    public function test_search_requires_query_parameter()
    {
        $response = $this->getJson('/search');

        $response->assertStatus(400)
            ->assertJson(['message' => 'Search query is required']);
    }

    public function test_search_returns_empty_for_no_results()
    {
        $response = $this->getJson('/search?query=nonexistent');

        $response->assertStatus(200)
            ->assertJson([
                'documents' => [],
                'news' => [],
                'users' => []
            ]);
    }
}

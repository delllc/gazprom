<?php

namespace Database\Factories;

use App\Models\Documents;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

class DocumentsFactory extends Factory
{

    protected $model = Documents::class;

    public function definition()
    {
        return [
            'name' => $this->faker->word,
            'title' => $this->faker->sentence,
            'type' => $this->faker->randomElement(['contract', 'report', 'invoice']),
            'assigned_user_id' => User::factory(),
            'uploaded_by' => User::factory(),
            'file_path' => 'documents/'.$this->faker->uuid.'.pdf',
            'status' => $this->faker->randomElement(['draft', 'published', 'archived'])
        ];
    }

    // Состояния для разных типов документов
    public function general()
    {
        return $this->state([
            'type' => 'general',
        ]);
    }

    public function normative()
    {
        return $this->state([
            'type' => 'normative',
        ]);
    }

    public function style()
    {
        return $this->state([
            'type' => 'styles',
        ]);
    }
}

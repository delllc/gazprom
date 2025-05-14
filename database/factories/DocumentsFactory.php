<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

class DocumentsFactory extends Factory
{
    public function definition()
    {
        return [
            'name' => $this->faker->sentence(3),
            'type' => $this->faker->randomElement(['vaction', 'normative', 'style']),
            'file_path' => 'documents/'.$this->faker->uuid().'.pdf',
            'uploaded_by' => User::factory(),
            'created_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
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

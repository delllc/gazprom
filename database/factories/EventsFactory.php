<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class EventsFactory extends Factory
{
    protected $model = \App\Models\Events::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(3),
            'description' => $this->faker->sentence(3),
            'start_date' => $this->faker->dateTimeBetween('now', '+1 year'),
            'location' => $this->faker->address(),
        ];
    }
}

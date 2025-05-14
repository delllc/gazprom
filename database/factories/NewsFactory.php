<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

class NewsFactory extends Factory
{
    public function definition()
    {
        return [
            'title' => $this->faker->sentence(5),
            'short_description' => $this->faker->sentence(10),
            'content' => $this->faker->paragraphs(3, true),
            'image' => $this->faker->optional()->imageUrl(800, 600),
            'author_id' => User::factory(),
            'published_at' => $this->faker->dateTimeBetween('-1 month', 'now')

        ];
    }

}

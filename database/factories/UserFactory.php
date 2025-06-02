<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'email' => fake()->unique()->safeEmail(),
            'password' => static::$password ??= Hash::make('password'),
            'username' => $this->faker->unique()->userName,
            'phone' => $this->faker->unique()->numerify('79#########'),
            'role' => 'employee',
            'departament' => $this->faker->optional()->randomElement(['IT', 'HR', 'Finance']),
            'position' => $this->faker->optional()->jobTitle,
            'remember_token' => Str::random(10),
        ];
    }

    public function admin()
    {
        return $this->state([
            'role' => 'admin',
        ]);
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}

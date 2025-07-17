<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        DB::table('user_roles')->insert([
            ['id' => 1, 'role' => 'Admin'],
            ['id' => 2, 'role' => 'Member']
        ]);

        // ✅ Seed task statuses
        DB::table('task_statuses')->insert([
            ['id' => 1, 'status' => 'Pending'],
            ['id' => 2, 'status' => 'To Do'],
            ['id' => 3, 'status' => 'In Progress'],
            ['id' => 4, 'status' => 'Done']
        ]);

        // ✅ Seed task priorities
        DB::table('priorities')->insert([
            ['id' => 1, 'priority' => 'Low'],
            ['id' => 2, 'priority' => 'Medium'],
            ['id' => 3, 'priority' => 'High']
        ]);

    }
}

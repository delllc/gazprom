<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
      Schema::table('notifications', function (Blueprint $table) {
          $table->enum('type', ['document', 'event', 'admin_alert'])->nullable(false);
      });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};

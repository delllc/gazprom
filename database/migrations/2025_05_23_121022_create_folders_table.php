<?php


use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFoldersTable extends Migration
{
    public function up()
    {
        Schema::create('folders', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->foreignId('parent_id')->nullable()->constrained('folders')->cascadeOnDelete();
            $table->foreignId('created_by')->constrained('users');
            $table->boolean('is_system')->default(false);
            $table->unsignedInteger('_lft');
            $table->unsignedInteger('_rgt');
            $table->timestamps();
            $table->softDeletes();

            $table->index(['_lft', '_rgt', 'parent_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('folders');
    }
}

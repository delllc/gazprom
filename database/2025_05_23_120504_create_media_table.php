<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{


    public function up()
    {
        Schema::create('media', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('path');
            $table->string('mime_type');
            $table->unsignedInteger('size');
            $table->foreignId('folder_id')->constrained()->cascadeOnDelete();
            $table->foreignId('uploaded_by')->constrained('users');
            $table->json('metadata')->nullable();
            $table->boolean('is_public')->default(false);
            $table->morphs('mediable');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('media');
    }
};

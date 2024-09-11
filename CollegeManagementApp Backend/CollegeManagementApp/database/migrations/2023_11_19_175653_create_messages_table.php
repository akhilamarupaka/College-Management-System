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
        Schema::create('messages', function (Blueprint $table) {
            $table->id("message_ID");
            $table->unsignedBigInteger('sender_ID');
            $table->unsignedBigInteger('receiver_ID');
            $table->text('content')->nullable();
            $table->timestamp('created_at')->useCurrent();

            $table->foreign('sender_ID')->references('User_ID')->on('c_users');
            $table->foreign('receiver_ID')->references('User_ID')->on('c_users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};

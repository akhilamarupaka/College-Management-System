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
        Schema::create('user_activities', function (Blueprint $table) {
            $table->id('Activity_ID');
            $table->unsignedBigInteger('User_ID');
            $table->string('ActivityName', 255)->nullable(false);
            $table->dateTime('ActivityDate')->nullable(false);
            $table->text('Description')->nullable();

            $table->foreign('User_ID')->references('User_ID')->on('c_users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_activities');
    }
};

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
        Schema::create('c_users', function (Blueprint $table) {
            $table->id('User_ID');
            $table->string('Username', 255);
            $table->string('Password_Hashed', 255);
            $table->string('Email', 255);
            $table->enum('User_role', ['Student', 'Instructor', 'Administrator', 'Quality Assurance Officer']);
            $table->string('FirstName', 255)->nullable();
            $table->string('LastName', 255)->nullable();
            $table->string('Address', 255)->nullable();
            $table->string('Phone_number', 100)->nullable();
            $table->string('Password_reset_token', 255)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('c_users');
    }
};

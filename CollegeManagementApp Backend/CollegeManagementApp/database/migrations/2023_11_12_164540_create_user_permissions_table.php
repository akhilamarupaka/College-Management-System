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
        Schema::create('user_permissions', function (Blueprint $table) {
            $table->id('USER_PERMISSIONS_ID');
            $table->enum('User_role', ['Student', 'Instructor', 'Administrator', 'Quality Assurance Officer'])->nullable(false);
            $table->unsignedBigInteger('User_ID');
            $table->unsignedBigInteger('PERMISSION_ID');
            $table->string('USER_PERMISSIONS_STRING', 1024)->nullable();

            $table->foreign('User_ID')->references('User_ID')->on('c_users');
            $table->foreign('PERMISSION_ID')->references('PERMISSION_ID')->on('permissions_lists');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_permissions');
    }
};

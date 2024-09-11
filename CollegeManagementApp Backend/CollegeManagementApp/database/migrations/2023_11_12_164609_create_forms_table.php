<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */

     /*
     CREATE TABLE forms (
        Form_ID INT AUTO_INCREMENT PRIMARY KEY,
        Form_Name VARCHAR(255) NOT NULL,
        Course_ID INT, -- Foreign Key links forms to specific courses
        FOREIGN KEY (Course_ID) REFERENCES Courses(Course_ID)
    );
     */
    public function up(): void
    {
        Schema::create('forms', function (Blueprint $table) {
            $table->id('Form_ID');
            $table->string('Form_Name', 255)->nullable(false);
            $table->unsignedBigInteger('Course_ID')->nullable();
            $table->foreign('Course_ID')->references('Course_ID')->on('courses');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('forms');
    }
};

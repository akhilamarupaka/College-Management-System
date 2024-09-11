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
    CREATE TABLE course_policy (
        Policy_ID INT AUTO_INCREMENT PRIMARY KEY,
        Course_ID INT,
        Course_Name VARCHAR(255) NOT NULL,
        Policy_Title VARCHAR(255) NOT NULL,
        Policy_Description TEXT NOT NULL,
        FOREIGN KEY (Course_ID) REFERENCES Courses(Course_ID)
    );

    */
    public function up(): void
    {
        Schema::create('course_policies', function (Blueprint $table) {
            $table->id('Policy_ID');
            $table->unsignedBigInteger('Course_ID');
            $table->string('Course_Name');
            $table->string('Policy_Title');
            $table->text('Policy_Description');

            $table->foreign('Course_ID')->references('Course_ID')->on('courses');
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('course_policies');
    }
};

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
    CREATE TABLE Courses (
        Course_ID INT AUTO_INCREMENT PRIMARY KEY,
        Course_Name VARCHAR(255) NOT NULL,
        Course_Code VARCHAR(255) NOT NULL,
        Course_Description TEXT,
        
        Program_ID INT, -- Foreign Key to programs table
        Instructor_ID INT, -- Foreign Key Users table
        FOREIGN KEY (Program_ID) REFERENCES Programs(Program_ID),
        FOREIGN KEY (Instructor_ID) REFERENCES Users(User_ID)
    );
    */
    public function up(): void
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->id("Course_ID");
            $table->string('Course_Name');
            $table->string('Course_Code');
            $table->text('Course_Description')->nullable();
            $table->unsignedBigInteger('Program_ID')->nullable();
            $table->unsignedBigInteger('Instructor_ID')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};

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
    CREATE TABLE Student_Enrollment_Information (
        Enrollment_ID INT AUTO_INCREMENT PRIMARY KEY,
        Enrollment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        Student_ID INT, -- Foreign Key links students to specific course enrollment (Users Table)
        Course_ID INT, -- Foreign Key links students to specific course enrollment (Courses Table)
        FOREIGN KEY (Course_ID) REFERENCES Courses(Course_ID),
        FOREIGN KEY (Student_ID) REFERENCES Users(User_ID)
    );
     */
    public function up(): void
    {
        Schema::create('student_enrollment_information', function (Blueprint $table) {
            $table->id("Enrollment_ID");
            $table->timestamp('Enrollment_date');
            $table->unsignedBigInteger('Student_ID')->nullable();
            $table->unsignedBigInteger('Course_ID')->nullable();

            $table->foreign('Student_ID')->references('User_ID')->on('c_users');
            $table->foreign('Course_ID')->references('Course_ID')->on('courses');    
            $table->timestamps();                                                                                                    
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_enrollment_information');
    }
};

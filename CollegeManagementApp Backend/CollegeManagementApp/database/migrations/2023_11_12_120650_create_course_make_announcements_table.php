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
    CREATE TABLE Course_make_announcements( 
        Announcement_ID INT PRIMARY KEY AUTO_INCREMENT, 
        Course_ID INT NOT NULL, 
        Instructor_ID INT, 
        Announcement_Title VARCHAR(255) NOT NULL, 
        Announcement_Description VARCHAR(255) NOT NULL, 
        Announcement_PDF LONGBLOB, 
        FOREIGN KEY (Course_ID) REFERENCES Courses(Course_ID), 
        FOREIGN KEY (Instructor_ID) REFERENCES Users(User_ID) 
    );
    */
    
    public function up(): void
    {
        Schema::create('course_make_announcements', function (Blueprint $table) {
            $table->id('Announcement_ID');
            $table->unsignedBigInteger('Course_ID');
            $table->unsignedBigInteger('Instructor_ID')->nullable();
            $table->string('Announcement_Title');
            $table->string('Announcement_Description');
            $table->binary('Announcement_PDF')->nullable();

            $table->foreign('Course_ID')->references('Course_ID')->on('courses');
            $table->foreign('Instructor_ID')->references('User_ID')->on('c_users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('course_make_announcements');
    }
};

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
    CREATE TABLE Course_Material ( 
        Material_ID INT PRIMARY KEY AUTO_INCREMENT, 
        Instructor_ID INT, 
        Course_ID INT NOT NULL, 
        Material_Title VARCHAR(255) NOT NULL, 
        Material_Description VARCHAR(255) NOT NULL, 
        Material_PDF LONGBLOB,  
        FOREIGN KEY (Course_ID) REFERENCES Courses(Course_ID), 
        FOREIGN KEY (Instructor_ID) REFERENCES Users(User_ID) 
    );

     */
    public function up(): void
{
    Schema::create('course_materials', function (Blueprint $table) {
        $table->id('Material_ID');
        $table->unsignedBigInteger('Instructor_ID');
        $table->unsignedBigInteger('Course_ID');
        $table->string('Material_Title');
        $table->string('Material_Description');
        $table->binary('Material_PDF')->nullable();

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
        Schema::dropIfExists('course_materials');
    }
};

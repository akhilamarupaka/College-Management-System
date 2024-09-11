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
    CREATE TABLE Exam_Results (
        Result_ID INT AUTO_INCREMENT PRIMARY KEY,
        Course_ID INT, -- Foreign Key to link results to exams table
        Exam_ID INT,
        Student_ID INT, -- Foreign Key to link students to their results(Users table)
        Score INT, 
        Grade CHAR(1) CHECK (Grade REGEXP '^[A-D]$|^F$') NOT NULL,
        FOREIGN KEY (Exam_ID) REFERENCES Exams(Exam_ID),
        FOREIGN KEY (Student_ID) REFERENCES Users(User_ID)
    );
    */
    public function up(): void
    {
        Schema::create('exam_results', function (Blueprint $table) {
            $table->id("Result_ID");
            $table->unsignedBigInteger('Course_ID');
            $table->unsignedBigInteger('Exam_ID');
            $table->unsignedBigInteger('Student_ID');
            $table->integer('Score');
            $table->char('Grade', 1)->check("Grade REGEXP '^[A-D]$|^F$'")->nullable();

            $table->foreign('Course_ID')->references('Course_ID')->on('courses');
            $table->foreign('Exam_ID')->references('Exam_ID')->on('exams');
            $table->foreign('Student_ID')->references('User_ID')->on('c_users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('exam_results');
    }
};

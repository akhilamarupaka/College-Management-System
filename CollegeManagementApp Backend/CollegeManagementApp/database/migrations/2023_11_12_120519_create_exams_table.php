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
    CREATE TABLE Exams (
    Exam_ID INT AUTO_INCREMENT PRIMARY KEY,
    Exam_Title VARCHAR(255) NOT NULL,
    Course_ID INT, -- Foreign Key links exams to specific courses
    Exam_Description TEXT,
    Exam_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    Exam_Max_Score INT NOT NULL, 
    Exam_file LONGBLOB,
    Exam_file_name VARCHAR(255),
    Instructor_ID INT, -- Foreign Key links exams to instructors (Users table)
    FOREIGN KEY (Course_ID) REFERENCES Courses(Course_ID),
    FOREIGN KEY (Instructor_ID) REFERENCES Users(User_ID)
);
    */
    public function up(): void
    {
        Schema::create('exams', function (Blueprint $table) {
            $table->id("Exam_ID");
            $table->string('Exam_Title');
            $table->unsignedBigInteger('Course_ID')->nullable();
            $table->text('Exam_Description');
            $table->timestamp('Exam_date');
            $table->integer('Exam_Max_Score');
            //$table->binary('Exam_file')->nullable();
            $table->text('Exam_file_name');
            $table->unsignedBigInteger('Instructor_ID')->nullable();

            $table->foreign('Course_ID')->references('Course_ID')->on('courses');
            $table->foreign('Instructor_ID')->references('User_ID')->on('c_users');
            $table->timestamps();

        });
        DB::statement('ALTER TABLE exams ADD COLUMN Exam_file LONGBLOB NULL');

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('exams');
    }
};

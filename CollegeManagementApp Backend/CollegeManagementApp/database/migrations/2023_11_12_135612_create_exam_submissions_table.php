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
     
    CREATE TABLE Exam_Submissions (
        ExamSubmission_ID INT AUTO_INCREMENT PRIMARY KEY,
        Exam_ID INT NOT NULL,
        Student_ID INT NOT NULL,
        File_Name VARCHAR(255) NOT NULL,
        File_Data BLOB NOT NULL,
        Submission_Time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    
    */
    public function up(): void
    {
        Schema::create('exam_submissions', function (Blueprint $table) {
            $table->id('ExamSubmission_ID');
            $table->unsignedBigInteger('Exam_ID');
            $table->unsignedBigInteger('Student_ID');
            $table->string('File_Name');
            $table->binary('File_Data');
            $table->timestamp('Submission_Time');

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
        Schema::dropIfExists('exam_submissions');
    }
};

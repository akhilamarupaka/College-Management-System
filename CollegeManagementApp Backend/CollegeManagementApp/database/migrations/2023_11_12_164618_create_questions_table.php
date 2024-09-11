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
    CREATE TABLE questions (
        Question_ID INT AUTO_INCREMENT PRIMARY KEY,
        Form_ID INT, -- Foreign Key links questions to a form
        Question_Text TEXT NOT NULL,
        FOREIGN KEY (Form_ID) REFERENCES forms(Form_ID)
    );
    */
    public function up(): void
    {
        Schema::create('questions', function (Blueprint $table) {
            $table->id('Question_ID');
            $table->unsignedBigInteger('Form_ID');
            $table->text('Question_Text')->nullable(false);
            $table->foreign('Form_ID')->references('Form_ID')->on('forms');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('questions');
    }
};

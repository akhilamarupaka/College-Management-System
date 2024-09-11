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
    
    CREATE TABLE modules (
        MODULE_ID INT AUTO_INCREMENT PRIMARY KEY,
        COURSE_ID INT,
        MODULE_NAME VARCHAR(255) NOT NULL,
        MODULE_DESCRIPTION VARCHAR(1024),
        MODULE_FILE LONGBLOB,
        MODULE_FILE_NAME VARCHAR(255),
        FOREIGN KEY (COURSE_ID) REFERENCES COURSES(COURSE_ID)
    );
     
    */
    
     public function up(): void
    {
        Schema::create('modules', function (Blueprint $table) {
            $table->id('MODULE_ID');
            $table->unsignedBigInteger('COURSE_ID');
            $table->string('MODULE_NAME');
            $table->text('MODULE_DESCRIPTION')->nullable();
            //$table->binary('MODULE_FILE')->nullable();
            $table->string('MODULE_FILE_NAME')->nullable();

            $table->foreign('COURSE_ID')->references('Course_ID')->on('courses');
    

            $table->timestamps();

        });
        DB::statement('ALTER TABLE modules ADD COLUMN MODULE_FILE LONGBLOB NULL');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('modules');
    }
};

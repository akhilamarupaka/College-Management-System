<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePermissionsTable extends Migration
{

    public function up()
    {
        Schema::create('permissions', function (Blueprint $table) {
            $table->increments('pid');
            $table->enum('role', ['Student', 'Instructor', 'Administrator', 'QAO']);
            $table->string('permissions_string', 1024)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('permissions');
    }
}

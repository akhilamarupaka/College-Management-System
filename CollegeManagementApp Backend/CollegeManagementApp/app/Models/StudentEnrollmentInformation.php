<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentEnrollmentInformation extends Model
{
    use HasFactory;

    protected $primaryKey = 'Enrollment_ID';

    protected $fillable = [
        'Enrollment_date',
        'Course_ID',
        'Student_ID',
    ];

}

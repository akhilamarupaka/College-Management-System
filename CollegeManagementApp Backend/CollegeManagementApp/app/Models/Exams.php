<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Exams extends Model
{
    use HasFactory;

    protected $primaryKey = 'Exam_ID';

    protected $fillable = [
        'Exam_Title',
        'Exam_Description',
        'Exam_Max_Score',
    ];

}
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Courses extends Model
{
    use HasFactory;

    protected $primaryKey = 'Course_ID';

    protected $fillable = [
        'Course_Name',
        'Course_Code',
        'Course_Description',
    ];

    // Define the relationship with ExamResult model
    public function examResults()
    {
        return $this->hasMany(ExamResults::class, 'Course_ID');
    }
}

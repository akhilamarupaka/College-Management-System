<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExamSubmissions extends Model
{
    use HasFactory;

    
    protected $primaryKey = 'ExamSubmission_ID';

    protected $fillable = [
        'File_Name',
    ];


}

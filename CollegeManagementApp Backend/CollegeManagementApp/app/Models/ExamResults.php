<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExamResults extends Model
{
    use HasFactory;

    protected $primaryKey = 'Result_ID';

    protected $fillable = [
        'Score',
    ];
    

}

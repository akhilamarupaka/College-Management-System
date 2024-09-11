<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CUsers extends Model
{
    use HasFactory;

    protected $primaryKey = 'User_ID';

    protected $fillable = [
        'name',
        'email',
        'phone',
    ];
    
}

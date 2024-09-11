<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Modules extends Model
{
    use HasFactory;

    protected $primaryKey = 'MODULE_ID';

    protected $fillable = [
        'MODULE_NAME',
        'MODULE_DESCRIPTION',
    ];
    
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CourseMakeAnnouncements extends Model
{
    use HasFactory;

    protected $primaryKey = 'Announcement_ID';

    protected $fillable = [
        'Announcement_Title',
        'Announcement_Description',
    ];

}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $table = 'messages'; // Specify the table name if different from the default

    protected $primaryKey = 'message_ID';

    protected $fillable = [
        'sender_ID',
        'receiver_ID',
        'content',
        'created_at',
        'updated_at',
    ];

}

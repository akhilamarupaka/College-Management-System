<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Permission extends Model
{
    protected $table = 'permissions';
    protected $primaryKey = 'pid';
    protected $fillable = ['role', 'permissions_string'];
    // If you're not using timestamps in your 'permissions' table, set $timestamps to false
    public $timestamps = true;
}
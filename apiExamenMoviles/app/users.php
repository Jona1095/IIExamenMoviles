<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

header("Access-Control-Allow-Origin: *");

class users extends Model
{
    
    public $timestamps = false;
    protected $table = 'users';
}

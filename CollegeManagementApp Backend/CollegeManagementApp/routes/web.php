<?php
 
use Illuminate\Support\Facades\Route;
 
Route::get('/dao/get/reports', [App\Http\Controllers\DAOController::class, 'getReports']);
?>

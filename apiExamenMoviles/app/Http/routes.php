<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::resource('users','usersController');

Route::post('login','usersController@login');

Route::post('Ctransaction', 'transactionController@createTransaction');

Route::put('Etransaction/{id}', 'transactionController@editTransaction');

Route::put('CStransaction/{id}', 'transactionController@editStatusTransaction');

Route::get('Otransaction/{user}', 'transactionController@obtenerTransaction');

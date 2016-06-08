<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\users;


use Illuminate\Support\Facades\Input;   

class UsersController extends Controller
{
    public function index()
	{
		
		$users  = users::all();
  
        return response()->json(array('users' => $users));
	}
 
	public function create(Request $request)
	{
		
 
	}
 
	public function store()
	{        
		$user=new users;
        $user->name=Input::get('name');
        $user->email=Input::get('email');
        $user->password=Input::get('password');
        $user->debit=Input::get('debit');
        $user->save();
        return response()->json($user);
	}
    
	public function show($id)
	{
		
	}
 
	
	public function edit($id)
	{
		
	}
 
	public function update($id)
	{
		$user=users::find($id);
        $user->name=Input::get('name');
        $user->email=Input::get('email');
        $user->password=Input::get('password');
        $user->debit=Input::get('debit');
        $user->save();
        return response()->json($user);
	}
 
	public function destroy($id)
	{
		
	}
    
    public function login(){
        
        $user = new users;
        $user->email=Input::get('email');
        $user->password=Input::get('password');
        $user->debit = "";
        $user->name = "";
        
        $userBus = users::where('email', $user->email)->where('password', $user->password)->first();
        
        return response()->json($userBus);
        
    }
}

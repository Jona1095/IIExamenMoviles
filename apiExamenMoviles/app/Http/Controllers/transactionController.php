<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\transaction;

use App\users;

use Illuminate\Support\Facades\Input;

class transactionController extends Controller
{
    public function createTransaction()
	{        
		$transaction=new transaction;
        $transaction->date=Input::get('date');
        $transaction->type=Input::get('type');
        $transaction->rode=Input::get('rode');
        $transaction->status=Input::get('status');
        $transaction->idUser=Input::get('idUser');
        $transaction->save();
        return response()->json($transaction);
	}
    
    public function editTransaction($id)
	{     
        $item = transaction::findOrFail($id);
        //$transaction=new transaction;
        $item->date=Input::get('date');
        $item->type=Input::get('type');
        $item->rode=Input::get('rode');
        $item->status=Input::get('status');
        $item->save();
        return response()->json($item);
	}
    
    
    
        
    public function editStatusTransaction($id)
	{     
        $item = transaction::findOrFail($id);
        
        if($item->status == 'Active')
        {
            $item->status = 'Inactive';
            $item->save();
            return response()->json($item);
        }
        $item->status = 'Active';
        $item->save();
        return response()->json($item);
	}
    
    public function obtenerTransaction($id)
	{     
        
        $transactions = transaction::where('idUser', $id)->get();
        
        
        return response()->json($transactions);
        
        
        
	}
}
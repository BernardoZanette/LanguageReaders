<?php

namespace App\Http\Controllers;

use App\Models\Card;
use Illuminate\Http\Request;

class CardsController extends Controller
{
    public function index() {
        return Card::all();
    }

    public function store(Request $request) {
        $dados = $request->validate([
            'word' => 'required',
            'translation' => 'required',
            'lang' => 'required'
        ]);
        $newCard = Card::create($dados);

        return $newCard;
    }

    public function delete($id) {
        try {
            $card = Card::findOrFail($id);
            $card->delete();
    
            return response()->json(['message' => 'Card deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error deleting card', 'error' => $e->getMessage()], 500);
        }
    }
}

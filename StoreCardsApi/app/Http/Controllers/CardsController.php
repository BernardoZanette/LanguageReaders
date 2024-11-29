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
        ]);
        $newCard = Card::create($dados);

        return $newCard;
    }
}

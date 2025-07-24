<?php

namespace App\Http\Controllers\API;

use App\Models\Cart;
use App\Models\CartItem;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class CartController extends Controller
{
    public function show(Request $request)
    {
        $cart = $request->user()->cart()->with('items.product')->first();

        return response()->json([
            'cart' => $cart
        ]);
    }

    public function addItem(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $cart = $request->user()->cart()->firstOrCreate();

        $item = $cart->items()->updateOrCreate(
            ['product_id' => $request->product_id],
            ['quantity' => $request->quantity]
        );

        return response()->json([
            'message' => 'Item added to cart',
            'cart' => $cart->load('items.product'),
        ]);
    }

    public function removeItem(CartItem $item, Request $request)
    {
        if ($item->cart->client_id !== $request->user()->id) {
            abort(403);
        }

        $item->delete();

        return response()->json([
            'message' => 'Item removed from cart',
            'cart' => $request->user()->cart()->with('items.product')->first(),
        ]);
    }

    public function updateItem(CartItem $item, Request $request)
    {
        if ($item->cart->client_id !== $request->user()->id) {
            abort(403);
        }

        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $item->update(['quantity' => $request->quantity]);

        return response()->json([
            'message' => 'Cart item updated',
            'cart' => $request->user()->cart()->with('items.product')->first(),
        ]);
    }

    public function clear(Request $request)
    {
        $cart = $request->user()->cart;

        if ($cart) {
            $cart->items()->delete();
        }

        return response()->json([
            'message' => 'Cart cleared',
            'cart' => $cart->load('items.product'),
        ]);
    }
}

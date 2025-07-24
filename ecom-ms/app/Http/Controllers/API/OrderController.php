<?php

namespace App\Http\Controllers\API;

use App\Models\Order;
use App\Models\Cart;
use App\Models\OrderItem;
use App\Models\OrderLog;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class OrderController extends Controller
{
    public function checkout(Request $request)
    {
        $client = $request->user();
        $cart = $client->cart;

        if (!$cart || $cart->items->isEmpty()) {
            return response()->json(['message' => 'Cart is empty'], 400);
        }

        $order = Order::create([
            'client_id' => $client->id,
            'order_number' => 'ORD-' . strtoupper(uniqid()),
            'total_amount' => $cart->items->sum(function ($item) {
                return $item->product->price * $item->quantity;
            }),
            'status' => 'pending',
            'shipping_address' => $request->shipping_address,
            'billing_address' => $request->billing_address ?? $request->shipping_address,
            'payment_method' => $request->payment_method,
            'payment_status' => 'pending',
        ]);

        foreach ($cart->items as $item) {
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $item->product_id,
                'quantity' => $item->quantity,
                'price' => $item->product->price,
                'total' => $item->product->price * $item->quantity,
            ]);
        }

        OrderLog::create([
            'order_id' => $order->id,
            'status' => 'pending',
            'notes' => 'Order created',
        ]);

        $cart->items()->delete();

        return response()->json([
            'message' => 'Order placed successfully',
            'order' => $order->load('items.product'),
        ]);
    }

    public function index(Request $request)
    {
        $orders = $request->user()->orders()->with('items.product', 'logs')->latest()->get();

        return response()->json([
            'orders' => $orders
        ]);
    }

    public function show(Order $order, Request $request)
    {
        if ($order->client_id !== $request->user()->id) {
            abort(403);
        }

        return response()->json([
            'order' => $order->load('items.product', 'logs')
        ]);
    }
}
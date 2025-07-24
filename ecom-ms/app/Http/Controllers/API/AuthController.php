<?php

namespace App\Http\Controllers\API;

use App\Models\Client;
use App\Models\Cart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Str;
use Illuminate\Routing\Controller;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:clients',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $client = Client::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        // Create a cart for the new client
        $client->cart()->create();

        event(new Registered($client));

        $token = $client->createToken('auth_token')->plainTextToken;
        $sessionToken = Str::random(60);

        return response()->json([
            'access_token' => $token,
            'session_token' => $sessionToken,
            'token_type' => 'Bearer',
            'client' => $client,
        ]);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (!Auth::guard('client')->attempt($request->only('email', 'password'))) {
            return response()->json([
                'message' => 'Invalid login details'
            ], 401);
        }

        $client = Client::where('email', $request['email'])->firstOrFail();
        $token = $client->createToken('auth_token')->plainTextToken;
        $sessionToken = Str::random(60);

        return response()->json([
            'access_token' => $token,
            'session_token' => $sessionToken,
            'token_type' => 'Bearer',
            'client' => $client->load(['cart.items.product', 'orders.items']),
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }

    public function me(Request $request)
    {
        return response()->json([
            'client' => $request->user()->load(['cart.items.product', 'orders.items'])
        ]);
    }
}

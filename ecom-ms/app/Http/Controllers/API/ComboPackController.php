<?php
// app/Http/Controllers/API/ComboPackController.php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\ComboPack;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class ComboPackController extends Controller
{
    public function index(Request $request)
    {
        $query = ComboPack::with('products');

        // Search by name or description
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%$search%")
                  ->orWhere('description', 'like', "%$search%")
                  ->orWhere('combo_code', 'like', "%$search%");
            });
        }

        // Filter by status
        if ($request->has('is_active')) {
            $query->where('is_active', $request->is_active);
        }

        $comboPacks = $query->paginate($request->per_page ?? 15);

        return response()->json($comboPacks);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'combo_code' => 'required|unique:combo_packs,combo_code',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'discount_price' => 'nullable|numeric|min:0',
            'is_active' => 'boolean',
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'products' => 'required|array',
            'products.*.id' => 'required|exists:products,id',
            'products.*.quantity' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $data = $validator->validated();

        // Handle images upload
        if ($request->hasFile('images')) {
            $imagePaths = [];
            foreach ($request->file('images') as $image) {
                $imagePaths[] = $image->store('combo_packs', 'public');
            }
            $data['images'] = $imagePaths;
        }

        DB::beginTransaction();

        try {
            $comboPack = ComboPack::create($data);

            // Attach products with quantities
            $productsToAttach = [];
            foreach ($request->products as $product) {
                $productsToAttach[$product['id']] = ['quantity' => $product['quantity']];
            }
            $comboPack->products()->sync($productsToAttach);

            DB::commit();

            return response()->json($comboPack->load('products'), 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Failed to create combo pack: ' . $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        $comboPack = ComboPack::with('products')->findOrFail($id);
        return response()->json($comboPack);
    }

    public function update(Request $request, $id)
    {
        $comboPack = ComboPack::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'combo_code' => 'sometimes|required|unique:combo_packs,combo_code,'.$id,
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'sometimes|required|numeric|min:0',
            'discount_price' => 'nullable|numeric|min:0',
            'is_active' => 'boolean',
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'products' => 'sometimes|required|array',
            'products.*.id' => 'required|exists:products,id',
            'products.*.quantity' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $data = $validator->validated();

        // Handle images upload
        if ($request->hasFile('images')) {
            // Delete old images if they exist
            if ($comboPack->images) {
                foreach ($comboPack->images as $oldImage) {
                    \Storage::disk('public')->delete($oldImage);
                }
            }

            $imagePaths = [];
            foreach ($request->file('images') as $image) {
                $imagePaths[] = $image->store('combo_packs', 'public');
            }
            $data['images'] = $imagePaths;
        }

        DB::beginTransaction();

        try {
            $comboPack->update($data);

            // Update products if provided
            if ($request->has('products')) {
                $productsToAttach = [];
                foreach ($request->products as $product) {
                    $productsToAttach[$product['id']] = ['quantity' => $product['quantity']];
                }
                $comboPack->products()->sync($productsToAttach);
            }

            DB::commit();

            return response()->json($comboPack->load('products'));
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Failed to update combo pack: ' . $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        $comboPack = ComboPack::findOrFail($id);
        
        // Delete images if they exist
        if ($comboPack->images) {
            foreach ($comboPack->images as $image) {
                \Storage::disk('public')->delete($image);
            }
        }

        $comboPack->delete();

        return response()->json(null, 204);
    }
}
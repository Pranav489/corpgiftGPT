<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ComboPack extends Model
{
     use HasFactory, SoftDeletes;

    protected $fillable = [
        'combo_code',
        'name',
        'slug',
        'description',
        'price',
        'discount_price',
        'images',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'images' => 'array',
    ];

    public function products()
    {
        return $this->belongsToMany(Product::class)
            ->withPivot('quantity')
            ->withTimestamps();
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($comboPack) {
            $comboPack->slug = \Str::slug($comboPack->name);
            
            // Generate combo code if not provided
            if (empty($comboPack->combo_code)) {
                $comboPack->combo_code = 'COMBO-' . strtoupper(uniqid());
            }
        });

        static::updating(function ($comboPack) {
            $comboPack->slug = \Str::slug($comboPack->name);
        });
    }

    // Calculate total price based on included products
    public function calculateTotalPrice()
    {
        return $this->products->sum(function ($product) {
            return $product->pivot->quantity * $product->price;
        });
    }
}

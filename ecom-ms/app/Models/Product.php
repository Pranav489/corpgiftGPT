<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
     use HasFactory, SoftDeletes;

    protected $fillable = [
        'product_code',
        'category_id',
        'name',
        'slug',
        'description',
        'price',
        'cost_price',
        'stock_quantity',
        'min_stock_threshold',
        'sku',
        'barcode',
        'is_active',
        'is_featured',
        'images',
        'specifications'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'is_featured' => 'boolean',
        'images' => 'array',
        'specifications' => 'array',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function comboPacks()
    {
        return $this->belongsToMany(ComboPack::class)
            ->withPivot('quantity')
            ->withTimestamps();
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($product) {
            $product->slug = \Str::slug($product->name);
            
            // Generate product code if not provided
            if (empty($product->product_code)) {
                $product->product_code = 'PROD-' . strtoupper(uniqid());
            }
        });

        static::updating(function ($product) {
            $product->slug = \Str::slug($product->name);
        });
    }
}

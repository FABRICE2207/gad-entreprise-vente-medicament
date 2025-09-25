'use client';

import React from 'react';
import Image from 'next/image';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { Plus, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, getItemQuantity } = useCart();
  const quantity = getItemQuantity(product.id);

  const handleAddToCart = () => {
    addToCart(product);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      <div className="relative overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={250}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Badge className="absolute top-2 left-2 bg-green-600">
          {product.category}
        </Badge>
        {product.stock < 10 && (
          <Badge variant="destructive" className="absolute top-2 right-2">
            Stock limité
          </Badge>
        )}
      </div>
      
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="space-y-2">
          <div className="text-2xl font-bold text-green-600">
            {formatPrice(product.price)}
          </div>
          
          {product.benefits && product.benefits.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {product.benefits.slice(0, 2).map((benefit, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {benefit}
                </Badge>
              ))}
              {product.benefits.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{product.benefits.length - 2} autres
                </Badge>
              )}
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={handleAddToCart}
          className="w-full bg-green-600 hover:bg-green-700 transition-colors"
          disabled={product.stock === 0}
        >
          {product.stock === 0 ? (
            'Rupture de stock'
          ) : quantity > 0 ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Ajouté ({quantity})
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 mr-2" />
              Ajouter au panier
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
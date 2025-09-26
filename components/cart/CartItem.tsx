"use client";

import React from "react";
import Image from "next/image";
import { CartItem as CartItemType } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Header } from "../layout/Header";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XOF",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(product.id);
    } else {
      updateQuantity(product.id, newQuantity);
    }
  };

  return (
    <Card className="mb-4">
  <CardContent className="p-4">
    <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
      {/* Image */}
      <div className="w-full md:w-auto">
        <Image
          src={product.image}
          alt={product.name}
          width={500} // grande taille par défaut
          height={300}
          className="w-full h-40 md:w-20 md:h-20 rounded-lg object-cover"
        />
      </div>

      {/* Infos produit */}
      <div className="flex-grow">
        <h3 className="font-semibold text-gray-900">{product.name}</h3>
        <p className="text-gray-600 text-sm">{product.category}</p>
        <div className="text-lg font-bold text-green-600 mt-1">
          {formatPrice(product.price)}
        </div>
      </div>

      {/* Gestion quantité + prix */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full md:w-auto space-y-3 md:space-y-0 md:space-x-6">
        {/* Quantité */}
        <div className="flex items-center justify-center md:justify-start space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuantityChange(quantity - 1)}
          >
            <Minus className="w-4 h-4" />
          </Button>
          <span className="px-3 py-1 bg-gray-100 rounded text-center min-w-[3rem]">
            {quantity}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuantityChange(quantity + 1)}
            disabled={quantity >= product.stock}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {/* Prix total + suppression */}
        <div className="flex flex-col items-center md:items-end">
          <div className="font-bold text-lg">
            {formatPrice(product.price * quantity)}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => removeFromCart(product.id)}
            className="text-red-600 hover:text-red-800 hover:bg-red-50 mt-1 md:mt-0"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  </CardContent>
</Card>


  );
}

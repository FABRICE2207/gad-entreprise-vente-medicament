'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { CartItem } from '@/components/cart/CartItem';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function CartPage() {
  const { items, total, clearCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (items.length === 0) {
    return (
      <>
        <Header/>
        <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Votre panier est vide
          </h1>
          <p className="text-gray-600 mb-8">
            Découvrez notre sélection de remèdes traditionnels
          </p>
          <Link href="/products">
            <Button className="bg-green-600 hover:bg-green-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continuer vos achats
            </Button>
          </Link>
        </div>
      </div>
        <Footer/>
      </>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Votre Panier
        </h1>
        <p className="text-gray-600">
          {items.length} produit{items.length !== 1 ? 's' : ''} dans votre panier
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {items.map((item) => (
              <CartItem key={item.product.id} item={item} />
            ))}
          </div>
          
          <div className="mt-6 flex justify-between">
            <Link href="/products">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Continuer vos achats
              </Button>
            </Link>
            
            <Button variant="outline" onClick={clearCart}>
              Vider le panier
            </Button>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Résumé de la commande</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span>{item.product.name} x{item.quantity}</span>
                    <span>{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total</span>
                  <span className="text-green-600">{formatPrice(total)}</span>
                </div>
              </div>
              
              <Link href="/checkout">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-lg py-3">
                  Procéder au paiement
                </Button>
              </Link>
              
              <p className="text-xs text-gray-500 text-center">
                Livraison gratuite pour toute commande au-dessus de 50,000 FCFA
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
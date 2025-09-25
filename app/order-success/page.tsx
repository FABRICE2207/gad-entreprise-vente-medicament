import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Home, Package } from 'lucide-react';

export default function OrderSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto text-center">
        <Card>
          <CardContent className="p-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Commande confirmée !
            </h1>
            
            <p className="text-gray-600 mb-8">
              Votre commande a été reçue et est en cours de traitement. 
              Vous recevrez une confirmation par email avec les détails de livraison.
            </p>
            
            <div className="bg-green-50 rounded-lg p-6 mb-8">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Package className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-green-800">Livraison estimée</span>
              </div>
              <p className="text-green-700">2-5 jours ouvrables</p>
            </div>
            
            <div className="space-y-4">
              <Link href="/" className="block">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <Home className="w-4 h-4 mr-2" />
                  Retour à l'accueil
                </Button>
              </Link>
              
              <Link href="/products" className="block">
                <Button variant="outline" className="w-full">
                  Continuer vos achats
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
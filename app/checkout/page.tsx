import React from 'react';
import { CheckoutForm } from '@/components/checkout/CheckoutForm';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function CheckoutPage() {
  return (
    <>
    <Header/>
      <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Finaliser votre commande
            </h1>
            <p className="text-gray-600">
              Veuillez remplir vos informations de livraison
            </p>
          </div>

          <CheckoutForm />
      </div>
    <Footer/>
    </>
  );
}
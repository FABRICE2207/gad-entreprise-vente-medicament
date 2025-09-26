'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ProductCard } from '@/components/products/ProductCard';
import { products } from '@/data/products';
import { 
  Leaf, 
  Shield, 
  Heart, 
  Star, 
  ArrowRight, 
  CheckCircle,
  Truck,
  Phone
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function Home() {
  const featuredProducts = products.slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <Header/>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 to-green-100 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                Vente de médicament
                <span className="text-green-600 block">Traditionnelle</span>
                chez Dame Gnahoré
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Découvrez nos remèdes traditionnels authentiques, 
                préparés avec soin selon les méthodes ancestrales 
                pour votre bien-être naturel.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/products">
                  <Button className="bg-green-600 hover:bg-green-700 text-lg px-8 py-3">
                    <Leaf className="w-5 h-5 mr-2" />
                    Découvrir nos produits
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" className="text-lg px-8 py-3">
                    En savoir plus
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative z-10">
                <Image
                  src="/dame-gnaore.jpg"
                  alt="Médecine traditionnelle"
                  width={500}
                  height={400}
                  className="rounded-2xl shadow-2xl object-cover"
                />
              </div>
              <div className="absolute -top-6 -right-6 w-full h-full bg-green-200 rounded-2xl -z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pourquoi choisir GAD Entreprise ?
            </h2>
            <p className="text-xl text-gray-600">
              Notre engagement pour votre santé naturelle
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Produits Authentiques
                </h3>
                <p className="text-gray-600">
                  Nos remèdes sont préparés selon les méthodes traditionnelles 
                  ancestrales, garantissant leur authenticité et leur efficacité.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors">
                  <Heart className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Bien-être Naturel
                </h3>
                <p className="text-gray-600">
                  Nous privilégions les solutions naturelles pour prendre soin 
                  de votre santé sans effets secondaires indésirables.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors">
                  <Star className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Expertise Reconnue
                </h3>
                <p className="text-gray-600">
                  Fort de nombreuses années d'expérience, nous sommes reconnus 
                  pour la qualité et l'efficacité de nos produits.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nos Produits Phares
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Découvrez notre sélection de remèdes traditionnels les plus populaires
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center">
            <Link href="/products">
              <Button className="bg-green-600 hover:bg-green-700 text-lg px-8 py-3">
                Voir tous nos produits
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-4">
              <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Qualité Garantie</h3>
                <p className="text-gray-600">Produits testés et approuvés</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Truck className="w-8 h-8 text-green-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Livraison Rapide</h3>
                <p className="text-gray-600">Partout en Côte d'Ivoire</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Phone className="w-8 h-8 text-green-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Support 24/7</h3>
                <p className="text-gray-600">Nous sommes là pour vous aider</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer/>
    </div>
  );
}
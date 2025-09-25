import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Leaf, Heart, Shield, Users, Award, Clock } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function AboutPage() {
  return (
    <div>
      {/* Header */}
      <Header />
        <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              À propos de 
              <span className="text-green-600 block">GAD Entreprise</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Depuis plus de 20 ans, GAD Entreprise s'engage à promouvoir la médecine traditionnelle 
              et à offrir des solutions naturelles pour le bien-être et la santé de nos clients.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Notre mission est de préserver et de transmettre les savoirs ancestraux tout en 
              garantissant la qualité et l'authenticité de nos produits.
            </p>
          </div>
          <div className="relative">
            <Image
              src="https://images.pexels.com/photos/4021883/pexels-photo-4021883.jpeg"
              alt="À propos de GAD Entreprise"
              width={500}
              height={400}
              className="rounded-2xl object-cover w-full"
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Nos Valeurs
          </h2>
          <p className="text-xl text-gray-600">
            Ce qui guide notre action au quotidien
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Leaf className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Naturel & Authentique
              </h3>
              <p className="text-gray-600">
                Nous privilégions les ingrédients naturels et les méthodes de préparation traditionnelles.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Bien-être Global
              </h3>
              <p className="text-gray-600">
                Notre approche holistique vise à traiter la personne dans sa globalité.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Qualité & Sécurité
              </h3>
              <p className="text-gray-600">
                Tous nos produits sont testés et répondent aux plus hauts standards de qualité.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="mb-16 bg-green-50 rounded-2xl p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">10,000+</div>
            <div className="text-gray-600">Clients satisfaits</div>
          </div>
          
          <div>
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">20+</div>
            <div className="text-gray-600">Années d'expérience</div>
          </div>
          
          <div>
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">24/7</div>
            <div className="text-gray-600">Support client</div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Notre Engagement
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Chez GAD Entreprise, nous nous engageons à vous offrir des produits de qualité 
            supérieure, issus de la médecine traditionnelle africaine. Notre équipe d'experts 
            travaille sans relâche pour vous garantir des remèdes efficaces et sûrs.
          </p>
        </div>
      </section>
    </div>
      {/* Footer */}
      <Footer />
    </div>    
  );
}
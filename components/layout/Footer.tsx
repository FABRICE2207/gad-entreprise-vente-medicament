import React from 'react';
import Link from 'next/link';
import { Leaf, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-green-400">GAD ENTREPRISE</h3>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              Spécialiste en médecine traditionnelle, nous offrons des solutions naturelles 
              pour votre bien-être et votre santé.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-green-400">Liens rapides</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-300 hover:text-green-400 transition-colors">Accueil</Link></li>
              <li><Link href="/products" className="text-gray-300 hover:text-green-400 transition-colors">Produits</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-green-400 transition-colors">À propos</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-green-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-green-400">Nos spécialités</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Médecine traditionnelle</li>
              <li>Plantes médicinales</li>
              <li>Soins naturels</li>
              <li>Bien-être holistique</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-green-400">Contacts</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-green-400" />
                <span className="text-gray-300 text-sm">+225 07 00 39 40 40 / 07 09 87 33 56</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-green-400" />
                <span className="text-gray-300 text-sm">contact@gad-entreprise.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-green-400" />
                <span className="text-gray-300 text-sm">Abidjan, Cocody</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 GAD Entreprise. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
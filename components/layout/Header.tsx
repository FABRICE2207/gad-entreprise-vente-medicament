'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingCart, User, Leaf, Menu } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

export function Header() {
  const { items } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const NavLinks = () => (
    <>
      <Link href="/" className="hover:text-green-600 transition-colors">
        Accueil
      </Link>
      <Link href="/products" className="hover:text-green-600 transition-colors">
        Produits
      </Link>
      <Link href="/about" className="hover:text-green-600 transition-colors">
        À propos
      </Link>
      <Link href="/contact" className="hover:text-green-600 transition-colors">
        Contact
      </Link>
    </>
  );

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-20 h-20">
            <img src="/LOGO GAD.png" alt="" />
              {/* <Leaf className="w-8 h-8 text-white" /> */}
            </div>
            {/* <div>
              <h1 className="text-2xl font-bold text-green-600">GAD</h1>
              <p className="text-xs text-gray-600">ENTREPRISE</p>
            </div> */}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <NavLinks />
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="relative hover:text-green-600 transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            
            <Link href="/admin" className="hover:text-green-600 transition-colors">
              <User className="w-6 h-6" />
            </Link>
            
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <nav className="flex flex-col space-y-4 mt-6">
                  <NavLinks />
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
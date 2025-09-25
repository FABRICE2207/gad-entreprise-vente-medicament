'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartProvider } from '@/contexts/CartContext';
import { AdminProvider } from '@/contexts/AdminContext';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <title>GAD Entreprise - Médecine Traditionnelle</title>
        <meta name="description" content="Spécialiste en médecine traditionnelle - Remèdes naturels authentiques pour votre bien-être" />
      </head>
      <body className={inter.className}>
        <AdminProvider>
          <CartProvider>
            <div className="min-h-screen flex flex-col">
              <main className="flex-grow">
                {children}
              </main>
            </div>
          </CartProvider>
        </AdminProvider>
      </body>
    </html>
  );
}
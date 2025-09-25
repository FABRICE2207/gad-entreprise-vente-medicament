'use client';

import React, { useState } from 'react';
import { ProductCard } from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { products, categories } from '@/data/products';
import { Search, Filter } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'Tous' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {/* Header */}
      <Header/>
        <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nos Produits
          </h1>
          <p className="text-xl text-gray-600">
            Découvrez notre gamme complète de remèdes traditionnels
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Rechercher un produit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Categories */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            <Filter className="w-5 h-5 text-gray-600 flex-shrink-0" />
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap ${
                  selectedCategory === category 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'hover:bg-green-50'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-gray-600">
            {filteredProducts.length} produit{filteredProducts.length !== 1 ? 's' : ''} trouvé{filteredProducts.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Aucun produit trouvé pour cette recherche.
            </p>
            <Button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('Tous');
              }}
              variant="outline"
              className="mt-4"
            >
              Réinitialiser les filtres
            </Button>
          </div>
        )}
        </div>
      {/* Footer */}
      <Footer/>
    </>
  );
}
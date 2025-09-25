'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Product } from '@/types';
import { products as initialProducts, categories } from '@/data/products';
import { Plus, Edit, Trash2, Package } from 'lucide-react';
import Image from 'next/image';

const productSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  description: z.string().min(10, 'La description doit contenir au moins 10 caractères'),
  price: z.number().min(1, 'Le prix doit être supérieur à 0'),
  image: z.string().url('URL d\'image valide requise'),
  category: z.string().min(1, 'Catégorie requise'),
  stock: z.number().min(0, 'Le stock ne peut pas être négatif'),
  benefits: z.string().optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

export function ProductManagement() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const onSubmit = (data: ProductFormData) => {
    const benefitsArray = data.benefits 
      ? data.benefits.split(',').map(b => b.trim()).filter(b => b.length > 0)
      : [];

    if (editingProduct) {
      // Update existing product
      const updatedProduct: Product = {
        ...editingProduct,
        name: data.name,
        description: data.description,
        price: data.price,
        image: data.image,
        category: data.category,
        stock: data.stock,
        benefits: benefitsArray,
      };

      setProducts(prev => 
        prev.map(p => p.id === editingProduct.id ? updatedProduct : p)
      );
    } else {
      // Add new product
      const newProduct: Product = {
        id: Date.now().toString(),
        name: data.name,
        description: data.description,
        price: data.price,
        image: data.image,
        category: data.category,
        stock: data.stock,
        benefits: benefitsArray,
      };

      setProducts(prev => [...prev, newProduct]);
    }

    reset();
    setEditingProduct(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setValue('name', product.name);
    setValue('description', product.description);
    setValue('price', product.price);
    setValue('image', product.image);
    setValue('category', product.category);
    setValue('stock', product.stock);
    setValue('benefits', product.benefits?.join(', ') || '');
    setIsDialogOpen(true);
  };

  const handleDelete = (productId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      setProducts(prev => prev.filter(p => p.id !== productId));
    }
  };

  const handleAddNew = () => {
    reset();
    setEditingProduct(null);
    setIsDialogOpen(true);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Package className="w-5 h-5 mr-2" />
            Gestion des Produits
          </CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleAddNew} className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Ajouter un produit
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingProduct ? 'Modifier le produit' : 'Ajouter un nouveau produit'}
                </DialogTitle>
              </DialogHeader>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nom du produit *</Label>
                    <Input
                      id="name"
                      {...register('name')}
                      className={errors.name ? 'border-red-500' : ''}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="category">Catégorie *</Label>
                    <Select onValueChange={(value) => setValue('category', value)}>
                      <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Sélectionner une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.filter(cat => cat !== 'Tous').map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.category && (
                      <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    {...register('description')}
                    rows={3}
                    className={errors.description ? 'border-red-500' : ''}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">Prix (FCFA) *</Label>
                    <Input
                      id="price"
                      type="number"
                      {...register('price', { valueAsNumber: true })}
                      className={errors.price ? 'border-red-500' : ''}
                    />
                    {errors.price && (
                      <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="stock">Stock *</Label>
                    <Input
                      id="stock"
                      type="number"
                      {...register('stock', { valueAsNumber: true })}
                      className={errors.stock ? 'border-red-500' : ''}
                    />
                    {errors.stock && (
                      <p className="text-red-500 text-sm mt-1">{errors.stock.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="image">URL de l'image *</Label>
                  <Input
                    id="image"
                    {...register('image')}
                    placeholder="https://example.com/image.jpg"
                    className={errors.image ? 'border-red-500' : ''}
                  />
                  {errors.image && (
                    <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="benefits">Bénéfices (séparés par des virgules)</Label>
                  <Textarea
                    id="benefits"
                    {...register('benefits')}
                    placeholder="Améliore la digestion, Purifie le corps, Réduit les ballonnements"
                    rows={2}
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Annuler
                  </Button>
                  <Button type="submit" className="bg-green-600 hover:bg-green-700">
                    {editingProduct ? 'Mettre à jour' : 'Ajouter'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {products.map((product) => (
            <div key={product.id} className="border rounded-lg p-4 bg-white">
              <div className="flex items-start space-x-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={80}
                  height={80}
                  className="rounded-lg object-cover"
                />
                
                <div className="flex-grow">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {product.name}
                      </h3>
                      <Badge className="mb-2">{product.category}</Badge>
                      <p className="text-gray-600 text-sm mb-2">
                        {product.description}
                      </p>
                      {product.benefits && product.benefits.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-2">
                          {product.benefits.slice(0, 3).map((benefit, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {benefit}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600 mb-1">
                        {formatPrice(product.price)}
                      </div>
                      <div className="text-sm text-gray-600">
                        Stock: {product.stock}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(product)}
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Modifier
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:text-red-800 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Supprimer
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {products.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Aucun produit disponible
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
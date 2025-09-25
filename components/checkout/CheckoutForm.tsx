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
import { useCart } from '@/contexts/CartContext';
import { useAdmin } from '@/contexts/AdminContext';
import { Customer, Order } from '@/types';
import { useRouter } from 'next/navigation';

const checkoutSchema = z.object({
  firstName: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  lastName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Adresse email invalide'),
  phone: z.string().min(10, 'Numéro de téléphone invalide'),
  street: z.string().min(5, 'Adresse complète requise'),
  city: z.string().min(2, 'Ville requise'),
  postalCode: z.string().min(2, 'Code postal requis'),
  country: z.string().default('Côte d\'Ivoire'),
  notes: z.string().optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export function CheckoutForm() {
  const { items, total, clearCart } = useCart();
  const { addOrder } = useAdmin();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const onSubmit = async (data: CheckoutFormData) => {
    setIsSubmitting(true);
    
    try {
      const customer: Customer = {
        id: Date.now().toString(),
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        address: {
          street: data.street,
          city: data.city,
          postalCode: data.postalCode,
          country: data.country,
        }
      };

      const order: Order = {
        id: Date.now().toString(),
        customer,
        items: items,
        total,
        status: 'pending',
        createdAt: new Date().toISOString(),
        notes: data.notes,
      };

      addOrder(order);
      clearCart();
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      router.push('/order-success');
    } catch (error) {
      console.error('Erreur lors de la commande:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Votre panier est vide.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Informations de livraison</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">Prénom *</Label>
                <Input
                  id="firstName"
                  {...register('firstName')}
                  className={errors.firstName ? 'border-red-500' : ''}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="lastName">Nom *</Label>
                <Input
                  id="lastName"
                  {...register('lastName')}
                  className={errors.lastName ? 'border-red-500' : ''}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="phone">Téléphone *</Label>
              <Input
                id="phone"
                {...register('phone')}
                placeholder="+225 07 12 34 56 78"
                className={errors.phone ? 'border-red-500' : ''}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="street">Adresse complète *</Label>
              <Input
                id="street"
                {...register('street')}
                className={errors.street ? 'border-red-500' : ''}
              />
              {errors.street && (
                <p className="text-red-500 text-sm mt-1">{errors.street.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">Ville *</Label>
                <Input
                  id="city"
                  {...register('city')}
                  className={errors.city ? 'border-red-500' : ''}
                />
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="postalCode">Code postal *</Label>
                <Input
                  id="postalCode"
                  {...register('postalCode')}
                  className={errors.postalCode ? 'border-red-500' : ''}
                />
                {errors.postalCode && (
                  <p className="text-red-500 text-sm mt-1">{errors.postalCode.message}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="country">Pays</Label>
              <Input
                id="country"
                {...register('country')}
                defaultValue="Côte d'Ivoire"
              />
            </div>

            <div>
              <Label htmlFor="notes">Notes (optionnel)</Label>
              <Textarea
                id="notes"
                {...register('notes')}
                placeholder="Instructions spéciales pour la livraison..."
                rows={3}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Traitement en cours...' : `Confirmer la commande (${formatPrice(total)})`}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Résumé de la commande</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {items.map(item => (
              <div key={item.product.id} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-sm text-gray-600">Qté: {item.quantity}</p>
                </div>
                <p className="font-semibold">{formatPrice(item.product.price * item.quantity)}</p>
              </div>
            ))}
            
            <div className="border-t pt-4">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total</span>
                <span className="text-green-600">{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
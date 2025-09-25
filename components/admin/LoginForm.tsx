'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAdmin } from '@/contexts/AdminContext';
import { LogIn, Leaf } from 'lucide-react';
import Link from 'next/link';

const loginSchema = z.object({
  username: z.string().min(1, 'Nom d\'utilisateur requis'),
  password: z.string().min(1, 'Mot de passe requis'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const { login } = useAdmin();
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError('');
    
    try {
      const success = await login(data.username, data.password);
      if (!success) {
        setError('Nom d\'utilisateur ou mot de passe incorrect');
      }
    } catch (err) {
      setError('Une erreur est survenue lors de la connexion');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
              <Leaf className="w-10 h-10 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-green-600">
            Administration GAD
          </CardTitle>
          <p className="text-gray-600">Connectez-vous pour accéder au dashboard</p>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert className="mb-4 border-red-200 bg-red-50">
              <AlertDescription className="text-red-800">{error}</AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="username">Nom d'utilisateur</Label>
              <Input
                id="username"
                {...register('username')}
                className={errors.username ? 'border-red-500' : ''}
                placeholder="admin"
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                {...register('password')}
                className={errors.password ? 'border-red-500' : ''}
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={isLoading}
            >
              {isLoading ? (
                'Connexion...'
              ) : (
                <>
                  <LogIn className="w-4 h-4 mr-2" />
                  Se connecter
                </>
              )}
            </Button>
          </form>
          
          <div className="mt-4 text-center text-sm text-gray-600">
            <p>
              <Link href="/">Retour sur le site</Link>
            </p>
            <p>Identifiants par défaut :</p>
            <p><strong>Utilisateur :</strong> admin</p>
            <p><strong>Mot de passe :</strong> admin123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
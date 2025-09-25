'use client';

import React from 'react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAdmin } from '@/contexts/AdminContext';
import { ProductManagement } from './ProductManagement';
import { OrderManagement } from './OrderManagement';
import { OrderCalendar } from './OrderCalendar';
import { 
  ShoppingBag, 
  DollarSign, 
  Clock, 
  Users, 
  Package, 
  TrendingUp,
  LogOut,
  BarChart3,
  Calendar,
  Settings
} from 'lucide-react';

export function Dashboard() {
  const { admin, stats, orders, logout, updateOrderStatus } = useAdmin();
  const [activeTab, setActiveTab] = useState('overview');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'processing': return 'En traitement';
      case 'shipped': return 'Expédiée';
      case 'delivered': return 'Livrée';
      case 'cancelled': return 'Annulée';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard Administration</h1>
              <p className="text-gray-600">Bienvenue, {admin?.username}</p>
            </div>
            <Button variant="outline" onClick={logout}>
              <LogOut className="w-4 h-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Vue d'ensemble</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center space-x-2">
              <Package className="w-4 h-4" />
              <span>Commandes</span>
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>Produits</span>
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Calendrier</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Commandes</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
                    </div>
                    <ShoppingBag className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Chiffre d'affaires</p>
                      <p className="text-2xl font-bold text-gray-900">{formatPrice(stats.totalRevenue)}</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">En attente</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.pendingOrders}</p>
                    </div>
                    <Clock className="w-8 h-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Clients</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalCustomers}</p>
                    </div>
                    <Users className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Orders Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="w-5 h-5 mr-2" />
                  Commandes récentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.slice(0, 5).map((order) => (
                    <div key={order.id} className="border rounded-lg p-4 bg-white">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            Commande #{order.id}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {order.customer.firstName} {order.customer.lastName}
                          </p>
                        </div>
                        <Badge className={getStatusColor(order.status)}>
                          {getStatusText(order.status)}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Email:</p>
                          <p className="font-medium">{order.customer.email}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Téléphone:</p>
                          <p className="font-medium">{order.customer.phone}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Total:</p>
                          <p className="font-bold text-green-600">{formatPrice(order.total)}</p>
                        </div>
                      </div>

                      <div className="flex space-x-2 mt-4">
                        {order.status === 'pending' && (
                          <Button 
                            size="sm" 
                            onClick={() => updateOrderStatus(order.id, 'processing')}
                          >
                            Traiter
                          </Button>
                        )}
                        {order.status === 'processing' && (
                          <Button 
                            size="sm" 
                            onClick={() => updateOrderStatus(order.id, 'shipped')}
                          >
                            Expédier
                          </Button>
                        )}
                        {order.status === 'shipped' && (
                          <Button 
                            size="sm" 
                            onClick={() => updateOrderStatus(order.id, 'delivered')}
                          >
                            Marquer livrée
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}

                  {orders.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      Aucune commande pour le moment
                    </div>
                  )}
                  
                  {orders.length > 5 && (
                    <div className="text-center pt-4">
                      <Button 
                        variant="outline" 
                        onClick={() => setActiveTab('orders')}
                      >
                        Voir toutes les commandes
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <OrderManagement />
          </TabsContent>

          <TabsContent value="products">
            <ProductManagement />
          </TabsContent>

          <TabsContent value="calendar">
            <OrderCalendar />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
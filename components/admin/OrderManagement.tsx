'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAdmin } from '@/contexts/AdminContext';
import { Order } from '@/types';
import { Search, Eye, Package2, Filter } from 'lucide-react';

export function OrderManagement() {
  const { orders, updateOrderStatus } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

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

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Package2 className="w-5 h-5 mr-2" />
          Gestion des Commandes
        </CardTitle>
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Rechercher par ID, nom ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-600" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="processing">En traitement</SelectItem>
                <SelectItem value="shipped">Expédiée</SelectItem>
                <SelectItem value="delivered">Livrée</SelectItem>
                <SelectItem value="cancelled">Annulée</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div key={order.id} className="border rounded-lg p-4 bg-white hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <h3 className="font-semibold text-gray-900">
                    Commande #{order.id}
                  </h3>
                  <Badge className={getStatusColor(order.status)}>
                    {getStatusText(order.status)}
                  </Badge>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-green-600">
                    {formatPrice(order.total)}
                  </span>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Détails
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Détails de la commande #{order.id}</DialogTitle>
                      </DialogHeader>
                      
                      {selectedOrder && (
                        <div className="space-y-6">
                          {/* Customer Info */}
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">Informations client</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-gray-600">Nom complet:</p>
                                <p className="font-medium">
                                  {selectedOrder.customer.firstName} {selectedOrder.customer.lastName}
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-600">Email:</p>
                                <p className="font-medium">{selectedOrder.customer.email}</p>
                              </div>
                              <div>
                                <p className="text-gray-600">Téléphone:</p>
                                <p className="font-medium">{selectedOrder.customer.phone}</p>
                              </div>
                              <div>
                                <p className="text-gray-600">Date de commande:</p>
                                <p className="font-medium">{formatDate(selectedOrder.createdAt)}</p>
                              </div>
                            </div>
                          </div>

                          {/* Delivery Address */}
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">Adresse de livraison</h4>
                            <div className="bg-gray-50 p-3 rounded-lg text-sm">
                              <p>{selectedOrder.customer.address.street}</p>
                              <p>{selectedOrder.customer.address.city}, {selectedOrder.customer.address.postalCode}</p>
                              <p>{selectedOrder.customer.address.country}</p>
                            </div>
                          </div>

                          {/* Order Items */}
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">Articles commandés</h4>
                            <div className="space-y-2">
                              {selectedOrder.items.map((item, index) => (
                                <div key={index} className="flex justify-between items-center py-2 border-b">
                                  <div>
                                    <p className="font-medium">{item.product.name}</p>
                                    <p className="text-sm text-gray-600">Quantité: {item.quantity}</p>
                                  </div>
                                  <p className="font-semibold">
                                    {formatPrice(item.product.price * item.quantity)}
                                  </p>
                                </div>
                              ))}
                              <div className="flex justify-between items-center pt-2 font-bold text-lg">
                                <span>Total:</span>
                                <span className="text-green-600">{formatPrice(selectedOrder.total)}</span>
                              </div>
                            </div>
                          </div>

                          {/* Notes */}
                          {selectedOrder.notes && (
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-3">Notes</h4>
                              <div className="bg-yellow-50 p-3 rounded-lg text-sm">
                                <p className="italic">{selectedOrder.notes}</p>
                              </div>
                            </div>
                          )}

                          {/* Status Update */}
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">Mettre à jour le statut</h4>
                            <div className="flex space-x-2">
                              {selectedOrder.status === 'pending' && (
                                <Button 
                                  size="sm" 
                                  onClick={() => updateOrderStatus(selectedOrder.id, 'processing')}
                                  className="bg-blue-600 hover:bg-blue-700"
                                >
                                  Traiter
                                </Button>
                              )}
                              {selectedOrder.status === 'processing' && (
                                <Button 
                                  size="sm" 
                                  onClick={() => updateOrderStatus(selectedOrder.id, 'shipped')}
                                  className="bg-purple-600 hover:bg-purple-700"
                                >
                                  Expédier
                                </Button>
                              )}
                              {selectedOrder.status === 'shipped' && (
                                <Button 
                                  size="sm" 
                                  onClick={() => updateOrderStatus(selectedOrder.id, 'delivered')}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  Marquer livrée
                                </Button>
                              )}
                              {selectedOrder.status !== 'cancelled' && selectedOrder.status !== 'delivered' && (
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => updateOrderStatus(selectedOrder.id, 'cancelled')}
                                  className="text-red-600 hover:text-red-800 hover:bg-red-50"
                                >
                                  Annuler
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Client:</p>
                  <p className="font-medium">
                    {order.customer.firstName} {order.customer.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Email:</p>
                  <p className="font-medium">{order.customer.email}</p>
                </div>
                <div>
                  <p className="text-gray-600">Date:</p>
                  <p className="font-medium">{formatDate(order.createdAt)}</p>
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

          {filteredOrders.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              {orders.length === 0 
                ? 'Aucune commande pour le moment'
                : 'Aucune commande ne correspond aux critères de recherche'
              }
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
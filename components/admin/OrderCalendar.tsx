'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAdmin } from '@/contexts/AdminContext';
import { Order } from '@/types';
import { Calendar, ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';

export function OrderCalendar() {
  const { orders } = useAdmin();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

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

  // Get orders for a specific date
  const getOrdersForDate = (date: Date): Order[] => {
    return orders.filter(order => {
      const orderDate = new Date(order.createdAt);
      return (
        orderDate.getDate() === date.getDate() &&
        orderDate.getMonth() === date.getMonth() &&
        orderDate.getFullYear() === date.getFullYear()
      );
    });
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const currentDateObj = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      const dayOrders = getOrdersForDate(currentDateObj);
      days.push({
        date: new Date(currentDateObj),
        isCurrentMonth: currentDateObj.getMonth() === month,
        orders: dayOrders,
        orderCount: dayOrders.length,
        totalRevenue: dayOrders.reduce((sum, order) => sum + order.total, 0)
      });
      currentDateObj.setDate(currentDateObj.getDate() + 1);
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();
  const selectedDateOrders = selectedDate ? getOrdersForDate(selectedDate) : [];

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <CalendarDays className="w-5 h-5 mr-2" />
          Calendrier des Commandes
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateMonth('prev')}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          
          <h3 className="text-xl font-semibold">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateMonth('next')}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 mb-4">
          {/* Day headers */}
          {dayNames.map(day => (
            <div key={day} className="p-2 text-center font-medium text-gray-600 text-sm">
              {day}
            </div>
          ))}
          
          {/* Calendar days */}
          {calendarDays.map((day, index) => (
            <div
              key={index}
              className={`
                p-2 min-h-[80px] border rounded cursor-pointer transition-colors
                ${day.isCurrentMonth ? 'bg-white hover:bg-gray-50' : 'bg-gray-100 text-gray-400'}
                ${day.orderCount > 0 ? 'border-green-200 bg-green-50' : 'border-gray-200'}
              `}
              onClick={() => day.orderCount > 0 && setSelectedDate(day.date)}
            >
              <div className="text-sm font-medium mb-1">
                {day.date.getDate()}
              </div>
              
              {day.orderCount > 0 && (
                <div className="space-y-1">
                  <div className="text-xs bg-green-600 text-white px-1 py-0.5 rounded">
                    {day.orderCount} cmd{day.orderCount > 1 ? 's' : ''}
                  </div>
                  <div className="text-xs text-green-700 font-medium">
                    {formatPrice(day.totalRevenue)}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Selected Date Orders Dialog */}
        {selectedDate && selectedDateOrders.length > 0 && (
          <Dialog open={!!selectedDate} onOpenChange={() => setSelectedDate(null)}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  Commandes du {selectedDate.toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-600">
                        {selectedDateOrders.length}
                      </div>
                      <div className="text-sm text-gray-600">
                        Commande{selectedDateOrders.length > 1 ? 's' : ''}
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">
                        {formatPrice(selectedDateOrders.reduce((sum, order) => sum + order.total, 0))}
                      </div>
                      <div className="text-sm text-gray-600">Chiffre d'affaires</div>
                    </div>
                  </div>
                </div>

                {selectedDateOrders.map((order) => (
                  <div key={order.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">Commande #{order.id}</h4>
                      <Badge className={getStatusColor(order.status)}>
                        {getStatusText(order.status)}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Client:</p>
                        <p className="font-medium">
                          {order.customer.firstName} {order.customer.lastName}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Total:</p>
                        <p className="font-bold text-green-600">
                          {formatPrice(order.total)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-2 text-sm text-gray-600">
                      <p>Email: {order.customer.email}</p>
                      <p>Téléphone: {order.customer.phone}</p>
                      <p>
                        Heure: {new Date(order.createdAt).toLocaleTimeString('fr-FR', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Calendar Legend */}
        <div className="mt-6 flex items-center justify-center space-x-6 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-50 border border-green-200 rounded"></div>
            <span>Jours avec commandes</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-white border border-gray-200 rounded"></div>
            <span>Jours sans commandes</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
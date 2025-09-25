'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Admin, Order, DashboardStats } from '@/types';

interface AdminContextType {
  admin: Admin | null;
  isAuthenticated: boolean;
  orders: Order[];
  stats: DashboardStats;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  addOrder: (order: Order) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Mock admin data
const mockAdmin: Admin = {
  id: '1',
  username: 'admin',
  email: 'admin@gad-enterprise.com'
};

// Mock orders data
const mockOrders: Order[] = [
  {
    id: '1',
    customer: {
      id: '1',
      firstName: 'Jean',
      lastName: 'Dupont',
      email: 'jean.dupont@email.com',
      phone: '+225 07 12 34 56 78',
      address: {
        street: '123 Rue de la Paix',
        city: 'Abidjan',
        postalCode: '01 BP 1234',
        country: 'Côte d\'Ivoire'
      }
    },
    items: [],
    total: 75000,
    status: 'pending',
    createdAt: new Date().toISOString(),
    notes: 'Livraison urgente demandée'
  }
];

export function AdminProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  const isAuthenticated = admin !== null;

  const login = async (username: string, password: string): Promise<boolean> => {
    // Mock authentication
    if (username === 'admin' && password === 'admin123') {
      setAdmin(mockAdmin);
      return true;
    }
    return false;
  };

  const logout = () => {
    setAdmin(null);
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => 
      prev.map(order => 
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  const addOrder = (order: Order) => {
    setOrders(prev => [...prev, order]);
  };

  const stats: DashboardStats = {
    totalOrders: orders.length,
    totalRevenue: orders.reduce((sum, order) => sum + order.total, 0),
    pendingOrders: orders.filter(order => order.status === 'pending').length,
    totalCustomers: new Set(orders.map(order => order.customer.email)).size,
    topProducts: []
  };

  return (
    <AdminContext.Provider value={{
      admin,
      isAuthenticated,
      orders,
      stats,
      login,
      logout,
      updateOrderStatus,
      addOrder
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
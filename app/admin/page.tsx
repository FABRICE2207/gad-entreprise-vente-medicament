'use client';

import React from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { LoginForm } from '@/components/admin/LoginForm';
import { Dashboard } from '@/components/admin/Dashboard';

export default function AdminPage() {
  const { isAuthenticated } = useAdmin();

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return <Dashboard />;
}
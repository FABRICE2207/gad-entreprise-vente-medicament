export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  benefits: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
}

export interface Order {
  id: string;
  customer: Customer;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  deliveryDate?: string;
  notes?: string;
}

export interface Admin {
  id: string;
  username: string;
  email: string;
}

export interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  totalCustomers: number;
  topProducts: Array<{
    product: Product;
    sales: number;
  }>;
}
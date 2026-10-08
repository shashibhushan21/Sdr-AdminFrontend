export interface OrderItem {
  name: string;
  qty: number;
  isVeg: boolean;
  price: number;
}

export type OrderStatus = 'placed' | 'preparing' | 'out_for_delivery' | 'delivered';

export interface Order {
  id: string;
  pnr: string;
  customerName: string;
  mobile: string;
  items: OrderItem[];
  total: number;
  station: string;
  stationCode: string;
  coach: string;
  seat: string;
  status: OrderStatus;
  paymentMethod: 'UPI' | 'COD';
  paymentStatus: 'Paid' | 'Pending';
  time: string;
  trainNo: string;
}

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  isVeg: boolean;
  isAvailable: boolean;
  ordersCount: number;
  rating: number;
}

export interface Voucher {
  code: string;
  desc: string;
  minOrder: number;
  valid: string;
}

export interface Station {
  name: string;
  code: string;
  runners: number;
  trainsToday: number;
  status: string;
}

export interface OrderItem {
  name: string;
  qty: number;
  isVeg: boolean;
  price: number;
}

export type OrderStatus = 'placed' | 'confirmed' | 'preparing' | 'ready' | 'out_for_delivery' | 'delivered' | 'cancelled';

export type PaymentMethod = 'UPI' | 'COD' | 'Card';

export interface Order {
  id: string;
  pnr: string;
  customerName: string;
  mobile: string;
  altName?: string;
  altMobile?: string;
  items: OrderItem[];
  subtotal: number;
  gst: number;
  deliveryFee: number;
  discount?: number;
  total: number;
  station: string;
  stationCode: string;
  coach: string;
  seat: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: 'Paid' | 'Pending';
  time: string;
  trainNo: string;
  trainName: string;
  specialInstructions?: string;
  assignedRunner?: string;
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
  prepTimeMinutes: number;
  description?: string;
  tags?: string[];
}

export interface Voucher {
  id: string;
  code: string;
  desc: string;
  minOrder: number;
  discountType: 'percentage' | 'flat';
  discountValue: number;
  valid: 'Active' | 'Expired';
  badgeText?: string;
}

export interface Station {
  name: string;
  code: string;
  state: string;
  runnersCount: number;
  trainsToday: number;
  avgHaltMinutes: number;
  status: 'Active Hub' | 'High Traffic' | 'Offline';
}

export interface DeliveryRunner {
  id: string;
  name: string;
  phone: string;
  stationCode: string;
  stationName: string;
  status: 'Available' | 'On Delivery' | 'Off Duty';
  deliveriesCompleted: number;
  currentTrainNo?: string;
}

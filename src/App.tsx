import React, { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { DashboardTab } from './components/dashboard/DashboardTab';
import { OrdersTab } from './components/orders/OrdersTab';
import { MenuTab } from './components/menu/MenuTab';
import { VouchersTab } from './components/vouchers/VouchersTab';
import { StationsTab } from './components/stations/StationsTab';
import { OrderDetailsModal } from './components/popups/OrderDetailsModal';
import { AddDishModal } from './components/popups/AddDishModal';
import { AddVoucherModal } from './components/popups/AddVoucherModal';
import type { Order, MenuItem, Voucher, OrderStatus } from './types/admin';

const INITIAL_ORDERS: Order[] = [
  {
    id: 'SDR-ORD-4435-6678',
    pnr: '2456789012',
    customerName: 'Rajesh Sharma',
    mobile: '+91 98765 43210',
    altName: 'Sunita Sharma',
    altMobile: '+91 98765 99887',
    items: [
      { name: 'SDR Maharaja Special Thali', qty: 1, isVeg: true, price: 350 },
      { name: 'Cold Drink (300ml)', qty: 1, isVeg: true, price: 70 },
    ],
    subtotal: 420,
    gst: 21,
    deliveryFee: 30,
    total: 471,
    station: 'Agra Cantt',
    stationCode: 'AGC',
    coach: 'C3',
    seat: '24',
    status: 'preparing',
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    time: '10m ago',
    trainNo: '12002',
    trainName: 'Shatabdi Express',
    specialInstructions: 'Please ensure thali is packed extra hot with extra tissue paper.',
    assignedRunner: 'Ramesh Singh (+91 98765 11223)',
  },
  {
    id: 'SDR-ORD-4435-6679',
    pnr: '4512389014',
    customerName: 'Priya Verma',
    mobile: '+91 98123 45678',
    items: [
      { name: 'Executive Train Meal Thali', qty: 2, isVeg: true, price: 280 },
      { name: 'Sweet Lassi', qty: 2, isVeg: true, price: 60 },
    ],
    subtotal: 680,
    gst: 34,
    deliveryFee: 30,
    total: 744,
    station: 'Agra Cantt',
    stationCode: 'AGC',
    coach: 'B1',
    seat: '12',
    status: 'placed',
    paymentMethod: 'COD',
    paymentStatus: 'Pending',
    time: '18m ago',
    trainNo: '12626',
    trainName: 'Kerala Express',
    specialInstructions: 'Deliver to window seat 12 directly.',
  },
  {
    id: 'SDR-ORD-4435-6680',
    pnr: '8812341109',
    customerName: 'Amit Patel',
    mobile: '+91 99887 76655',
    items: [{ name: 'Special Amritsari Kulcha Thali', qty: 1, isVeg: true, price: 240 }],
    subtotal: 240,
    gst: 12,
    deliveryFee: 30,
    total: 282,
    station: 'Agra Cantt',
    stationCode: 'AGC',
    coach: 'S4',
    seat: '56',
    status: 'out_for_delivery',
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    time: '25m ago',
    trainNo: '12423',
    trainName: 'Rajdhani Express',
    assignedRunner: 'Sunil Sharma (+91 99887 55667)',
  },
  {
    id: 'SDR-ORD-4435-6681',
    pnr: '1298472819',
    customerName: 'Suresh Gupta',
    mobile: '+91 97654 32109',
    items: [{ name: 'Paneer Butter Masala Combo', qty: 3, isVeg: true, price: 290 }],
    subtotal: 870,
    gst: 43.5,
    deliveryFee: 30,
    total: 943.5,
    station: 'Agra Cantt',
    stationCode: 'AGC',
    coach: 'A2',
    seat: '08',
    status: 'delivered',
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    time: '45m ago',
    trainNo: '12001',
    trainName: 'Vande Bharat Exp',
  },
];

const INITIAL_MENU: MenuItem[] = [
  { id: 'm1', name: 'SDR Maharaja Special Thali', category: 'Thalis', price: 350, isVeg: true, isAvailable: true, ordersCount: 142, rating: 4.9, prepTimeMinutes: 20, description: 'Paneer butter masala, dal makhani, 4 butter rotis, jeera rice, gulab jamun & sweet lassi', tags: ['Maharaja Special', 'Best Seller'] },
  { id: 'm2', name: 'Executive Train Meal Thali', category: 'Thalis', price: 280, isVeg: true, isAvailable: true, ordersCount: 98, rating: 4.8, prepTimeMinutes: 15, description: 'Kadhai paneer, yellow dal tadka, 3 rotis, steamed rice & pickle', tags: ['Executive Choice'] },
  { id: 'm3', name: 'Special Amritsari Kulcha Thali', category: 'Thalis', price: 240, isVeg: true, isAvailable: true, ordersCount: 76, rating: 4.7, prepTimeMinutes: 15, description: '2 stuffed Amritsari kulchas, pindi chole, imli pyaz chutney & raita', tags: ['Punjab Special'] },
  { id: 'm4', name: 'Paneer Butter Masala Combo', category: 'Combos', price: 290, isVeg: true, isAvailable: true, ordersCount: 110, rating: 4.9, prepTimeMinutes: 15, description: 'Rich paneer butter masala with 2 garlic naans or jeera rice bowl', tags: ['Fast Prep'] },
  { id: 'm5', name: 'Chole Bhature Express Bowl', category: 'Quick Bites', price: 180, isVeg: true, isAvailable: false, ordersCount: 64, rating: 4.6, prepTimeMinutes: 10, description: '2 fluffy bhatures with authentic spiced chole and fried green chillies', tags: ['Quick Snack'] },
];

export function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'menu' | 'vouchers' | 'stations'>('dashboard');
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(INITIAL_MENU);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Popups & Modal States
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedOrderPopup, setSelectedOrderPopup] = useState<Order | null>(null);
  const [showAddDishModal, setShowAddDishModal] = useState(false);
  const [showAddVoucherModal, setShowAddVoucherModal] = useState(false);
  const [vouchers, setVouchers] = useState<Voucher[]>([
    { id: 'v1', code: 'TRAIN10', desc: '10% OFF on all Thali orders', minOrder: 300, discountType: 'percentage', discountValue: 10, valid: 'Active', badgeText: 'Popular' },
    { id: 'v2', code: 'SDRFIRST', desc: 'Flat ₹50 OFF on first train order', minOrder: 250, discountType: 'flat', discountValue: 50, valid: 'Active', badgeText: 'New User' },
    { id: 'v3', code: 'MAHARAJA', desc: '15% OFF on Maharaja Special Thali', minOrder: 500, discountType: 'percentage', discountValue: 15, valid: 'Active' },
  ]);

  const [newDish, setNewDish] = useState({ name: '', category: 'Thalis', price: 250, isVeg: true, prepTimeMinutes: 15 });
  const [newVoucher, setNewVoucher] = useState({ code: '', desc: '', minOrder: 200, discountType: 'flat' as const, discountValue: 50 });

  const filteredOrders = orders.filter((ord) => {
    const matchesSearch =
      ord.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ord.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ord.pnr.includes(searchTerm) ||
      ord.trainNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ord.trainName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ord.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    if (selectedOrderPopup && selectedOrderPopup.id === orderId) {
      setSelectedOrderPopup((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const toggleMenuAvailability = (id: string) => {
    setMenuItems((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isAvailable: !m.isAvailable } : m))
    );
  };

  const handleAddDish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDish.name) return;
    const dishToAdd: MenuItem = {
      id: `m${Date.now()}`,
      name: newDish.name,
      category: newDish.category,
      price: Number(newDish.price),
      isVeg: newDish.isVeg,
      isAvailable: true,
      ordersCount: 0,
      rating: 5.0,
      prepTimeMinutes: Number(newDish.prepTimeMinutes) || 15,
    };
    setMenuItems((prev) => [dishToAdd, ...prev]);
    setShowAddDishModal(false);
    setNewDish({ name: '', category: 'Thalis', price: 250, isVeg: true, prepTimeMinutes: 15 });
  };

  const handleAddVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVoucher.code) return;
    setVouchers((prev) => [
      {
        id: `v${Date.now()}`,
        code: newVoucher.code.toUpperCase(),
        desc: newVoucher.desc || 'Promo Discount',
        minOrder: Number(newVoucher.minOrder),
        discountType: newVoucher.discountType,
        discountValue: Number(newVoucher.discountValue),
        valid: 'Active',
      },
      ...prev,
    ]);
    setShowAddVoucherModal(false);
    setNewVoucher({ code: '', desc: '', minOrder: 200, discountType: 'flat', discountValue: 50 });
  };

  return (
    <div className="flex min-h-screen bg-[#f8f6f0] text-slate-800 font-sans selection:bg-orange-600 selection:text-white">
      {/* SIDEBAR NAVIGATION */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        pendingOrdersCount={orders.filter((o) => o.status !== 'delivered' && o.status !== 'cancelled').length}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* HEADER BAR */}
        <Header
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onRefresh={() => setOrders([...INITIAL_ORDERS])}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        {/* BODY CANVAS */}
        <div className="p-3 sm:p-5 overflow-y-auto flex-1 space-y-4 sm:space-y-5">
          {activeTab === 'dashboard' && (
            <DashboardTab
              orders={orders}
              onNavigateOrders={() => setActiveTab('orders')}
              onOpenDetails={(ord) => setSelectedOrderPopup(ord)}
            />
          )}

          {activeTab === 'orders' && (
            <OrdersTab
              filteredOrders={filteredOrders}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              viewMode={viewMode}
              setViewMode={setViewMode}
              onUpdateStatus={updateOrderStatus}
              onOpenDetails={(ord) => setSelectedOrderPopup(ord)}
            />
          )}

          {activeTab === 'menu' && (
            <MenuTab
              menuItems={menuItems}
              onToggleAvailability={toggleMenuAvailability}
              onOpenAddModal={() => setShowAddDishModal(true)}
            />
          )}

          {activeTab === 'vouchers' && (
            <VouchersTab
              vouchers={vouchers}
              onOpenAddModal={() => setShowAddVoucherModal(true)}
            />
          )}

          {activeTab === 'stations' && <StationsTab />}
        </div>
      </main>

      {/* MODAL POPUPS */}
      {selectedOrderPopup && (
        <OrderDetailsModal
          order={selectedOrderPopup}
          onClose={() => setSelectedOrderPopup(null)}
          onUpdateStatus={updateOrderStatus}
        />
      )}

      {showAddDishModal && (
        <AddDishModal
          newDish={newDish}
          setNewDish={setNewDish}
          onClose={() => setShowAddDishModal(false)}
          onSubmit={handleAddDish}
        />
      )}

      {showAddVoucherModal && (
        <AddVoucherModal
          newVoucher={newVoucher}
          setNewVoucher={setNewVoucher}
          onClose={() => setShowAddVoucherModal(false)}
          onSubmit={handleAddVoucher}
        />
      )}
    </div>
  );
}

export default App;

import React from 'react';
import { TrendingUp, DollarSign, Award, Clock, MapPin, Receipt } from 'lucide-react';

export const AnalyticsTab: React.FC = () => {
  const topDishes = [
    { name: 'SDR Maharaja Special Thali', category: 'Thalis', orders: 142, revenue: 49700 },
    { name: 'Executive Train Meal Thali', category: 'Thalis', orders: 98, revenue: 27440 },
    { name: 'Paneer Butter Masala Combo', category: 'Combos', orders: 110, revenue: 31900 },
    { name: 'Special Amritsari Kulcha Thali', category: 'Thalis', orders: 76, revenue: 18240 },
    { name: 'Chole Bhature Express Bowl', category: 'Quick Bites', orders: 64, revenue: 11520 },
  ];

  const stationRevenue = [
    { station: 'Platform 1 (Shatabdi & Rajdhani)', orders: 64, revenue: 22400, percent: '52%' },
    { station: 'Platform 2 & 3 (Express & Mail)', orders: 42, revenue: 13860, percent: '32%' },
    { station: 'Platform 4 & 5 (South Bound Trains)', orders: 22, revenue: 6590, percent: '16%' },
  ];

  return (
    <div className="space-y-6">
      {/* Financial Overview Banner */}
      <div className="admin-card border-0 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="admin-title-md">Agra Cantt Sales & Revenue</h2>
            <p className="admin-subtitle">Daily sales breakdown, GST, and platform delivery fees</p>
          </div>
          <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-md flex items-center gap-1">
            <TrendingUp size={14} /> +18.4% Revenue Growth
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="bg-[#f8f6f0] p-4 rounded-lg space-y-1">
            <span className="text-slate-500 text-xs font-semibold uppercase flex items-center gap-1.5">
              <DollarSign size={14} className="text-orange-600" /> Total Gross Sales
            </span>
            <p className="font-mono font-extrabold text-2xl text-slate-900">₹42,850</p>
            <p className="text-[11px] text-slate-500">128 meal orders delivered</p>
          </div>

          <div className="bg-[#f8f6f0] p-4 rounded-lg space-y-1">
            <span className="text-slate-500 text-xs font-semibold uppercase flex items-center gap-1.5">
              <Receipt size={14} className="text-blue-600" /> GST Collected (5%)
            </span>
            <p className="font-mono font-extrabold text-2xl text-blue-700">₹2,142</p>
            <p className="text-[11px] text-slate-500">5% GST on food sales</p>
          </div>

          <div className="bg-[#f8f6f0] p-4 rounded-lg space-y-1">
            <span className="text-slate-500 text-xs font-semibold uppercase flex items-center gap-1.5">
              <Clock size={14} className="text-emerald-600" /> Delivery Fee Pool
            </span>
            <p className="font-mono font-extrabold text-2xl text-emerald-700">₹3,840</p>
            <p className="text-[11px] text-slate-500">₹30 platform seat delivery</p>
          </div>

          <div className="bg-[#f8f6f0] p-4 rounded-lg space-y-1">
            <span className="text-slate-500 text-xs font-semibold uppercase flex items-center gap-1.5">
              <Award size={14} className="text-purple-600" /> Net Kitchen Sales
            </span>
            <p className="font-mono font-extrabold text-2xl text-purple-700">₹36,868</p>
            <p className="text-[11px] text-slate-500">After taxes & fees</p>
          </div>
        </div>
      </div>

      {/* Two Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Selling Dishes */}
        <div className="admin-card border-0 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="admin-title-md flex items-center gap-2">
              <Award size={18} className="text-orange-600" /> Top Dishes Sold
            </h3>
            <span className="text-xs text-slate-500 font-medium">By Order Volume</span>
          </div>

          <div className="space-y-3">
            {topDishes.map((dish, idx) => (
              <div key={idx} className="bg-[#f8f6f0] p-3 rounded-lg flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <span className="font-bold text-slate-900 block">{dish.name}</span>
                  <span className="text-slate-500 text-[11px]">{dish.category} · {dish.orders} orders</span>
                </div>
                <span className="font-mono font-bold text-orange-600 text-sm">
                  ₹{dish.revenue.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Station Platform Sales Breakdown */}
        <div className="admin-card border-0 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="admin-title-md flex items-center gap-2">
              <MapPin size={18} className="text-orange-600" /> Agra Cantt Platform Breakdown
            </h3>
            <span className="text-xs text-slate-500 font-medium">Agra Cantt Hub</span>
          </div>

          <div className="space-y-3">
            {stationRevenue.map((st, idx) => (
              <div key={idx} className="bg-[#f8f6f0] p-3 rounded-lg space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                  <span>{st.station}</span>
                  <span className="font-mono text-emerald-700">₹{st.revenue.toLocaleString()} ({st.percent})</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-orange-600 h-full rounded-full" style={{ width: st.percent }} />
                </div>
                <div className="text-[11px] text-slate-500 font-medium">
                  {st.orders} food orders delivered to platform seats
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

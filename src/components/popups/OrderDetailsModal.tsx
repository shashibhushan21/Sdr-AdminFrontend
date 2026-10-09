import React from 'react';
import { X, User, Phone, MapPin, ShoppingBag } from 'lucide-react';
import type { Order, OrderStatus } from '../../types/admin';

interface OrderDetailsModalProps {
  order: Order;
  onClose: () => void;
  onUpdateStatus: (id: string, status: OrderStatus) => void;
}

export const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  order,
  onClose,
  onUpdateStatus,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white w-full max-w-lg rounded-xl p-6 space-y-5 max-h-[90vh] overflow-y-auto shadow-xl animate-in fade-in zoom-in-95 duration-150 border border-slate-200/80">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <span className="font-mono font-bold text-orange-600 text-lg block">{order.id}</span>
            <span className="text-xs text-slate-500 font-medium">
              PNR: <span className="font-mono text-slate-800">{order.pnr}</span> · {order.trainNo}
            </span>
          </div>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-slate-700 bg-slate-100 border border-slate-200/80 p-2 rounded-md transition cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4 text-xs">
          {/* Passenger & Delivery Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-lg bg-[#f8f6f0] border border-slate-200/60">
            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1.5 uppercase">
                <User size={13} className="text-orange-600" /> Passenger
              </span>
              <span className="font-bold text-slate-900 text-sm block">{order.customerName}</span>
              <span className="block text-slate-600 font-mono text-xs flex items-center gap-1">
                <Phone size={11} /> {order.mobile}
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1.5 uppercase">
                <MapPin size={13} className="text-orange-600" /> Delivery Station
              </span>
              <span className="font-bold text-orange-700 text-sm block">{order.station} ({order.stationCode})</span>
              <span className="block text-slate-700 font-medium text-xs">
                Coach <span className="text-slate-900 font-bold">{order.coach}</span>, Seat <span className="text-slate-900 font-bold">{order.seat}</span>
              </span>
            </div>
          </div>

          {/* Complete Itemized Dishes List */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5 uppercase tracking-wider">
              <ShoppingBag size={14} className="text-orange-600" /> Full Itemized Dishes Breakdown
            </span>
            <div className="p-4 rounded-lg bg-[#f8f6f0] border border-slate-200/60 space-y-2.5">
              {order.items.map((it, idx) => (
                <div key={idx} className="flex justify-between items-center text-slate-800 text-xs font-medium">
                  <span>
                    <span className="text-orange-600 font-bold">{it.qty}×</span> {it.name}
                  </span>
                  <span className="font-mono font-bold text-slate-900">₹{it.price * it.qty}</span>
                </div>
              ))}
              <div className="pt-3 border-t border-slate-200/80 flex justify-between items-center text-sm font-bold text-slate-900">
                <span>Total Amount Paid ({order.paymentMethod})</span>
                <span className="font-mono font-extrabold text-emerald-700 text-base">₹{order.total}</span>
              </div>
            </div>
          </div>

          {/* Fulfillment Status Toggle Buttons */}
          <div className="space-y-2 pt-1">
            <span className="text-xs font-semibold text-slate-700 block">Update Fulfillment Status</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['placed', 'preparing', 'out_for_delivery', 'delivered'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => onUpdateStatus(order.id, st)}
                  className={`py-2 rounded-md text-xs font-semibold transition cursor-pointer text-center ${
                    order.status === st
                      ? 'bg-orange-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 border border-slate-200/60'
                  }`}
                >
                  {st === 'out_for_delivery' ? 'Delivery' : st.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 flex justify-end">
          <button onClick={onClose} className="admin-btn-secondary cursor-pointer px-5 py-2 text-xs">
            Close Popup
          </button>
        </div>
      </div>
    </div>
  );
};



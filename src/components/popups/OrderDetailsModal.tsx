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
      <div className="bg-white w-full max-w-lg rounded-xl p-6 space-y-5 max-h-[90vh] overflow-y-auto shadow-xl animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <span className="font-mono font-bold text-orange-600 text-lg block">{order.id}</span>
            <span className="text-xs text-slate-500 font-medium">
              PNR: <span className="font-mono text-slate-800">{order.pnr}</span> · Train {order.trainNo} {order.trainName && `(${order.trainName})`}
            </span>
          </div>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-slate-700 bg-slate-100 p-2 rounded-md transition cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4 text-xs">
          {/* Passenger & Delivery Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-lg bg-[#f8f6f0]">
            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1.5 uppercase">
                <User size={13} className="text-orange-600" /> Passenger Details
              </span>
              <span className="font-bold text-slate-900 text-sm block">{order.customerName}</span>
              <span className="block text-slate-600 font-mono text-xs flex items-center gap-1">
                <Phone size={11} /> {order.mobile}
              </span>
              {order.altMobile && (
                <span className="block text-slate-500 text-[11px]">
                  Alt: {order.altName ? `${order.altName} (` : ''}{order.altMobile}{order.altName ? ')' : ''}
                </span>
              )}
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1.5 uppercase">
                <MapPin size={13} className="text-orange-600" /> Train Coach & Seat Delivery
              </span>
              <span className="font-bold text-orange-700 text-sm block">{order.station} ({order.stationCode})</span>
              <span className="block text-slate-700 font-medium text-xs">
                Coach <span className="text-slate-900 font-bold">{order.coach}</span>, Seat <span className="text-slate-900 font-bold">{order.seat}</span>
              </span>
              {order.assignedRunner && (
                <span className="block text-emerald-700 font-semibold text-[11px]">
                  Runner: {order.assignedRunner}
                </span>
              )}
            </div>
          </div>

          {order.specialInstructions && (
            <div className="p-3 bg-amber-50 rounded-lg text-amber-900 text-xs">
              <span className="font-bold block">Special Cooking / Packing Instructions:</span>
              <p className="mt-0.5 font-medium">{order.specialInstructions}</p>
            </div>
          )}

          {/* Complete Itemized Dishes List */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5 uppercase tracking-wider">
              <ShoppingBag size={14} className="text-orange-600" /> Itemized Bill Breakdown
            </span>
            <div className="p-4 rounded-lg bg-[#f8f6f0] space-y-2">
              {order.items.map((it, idx) => (
                <div key={idx} className="flex justify-between items-center text-slate-800 text-xs font-medium">
                  <span>
                    <span className="text-orange-600 font-bold">{it.qty}×</span> {it.name}
                  </span>
                  <span className="font-mono font-bold text-slate-900">₹{it.price * it.qty}</span>
                </div>
              ))}
              
              <div className="pt-2 border-t border-slate-200/80 space-y-1 text-slate-600">
                <div className="flex justify-between items-center text-xs">
                  <span>Item Subtotal</span>
                  <span className="font-mono">₹{order.subtotal || order.total}</span>
                </div>
                {order.gst ? (
                  <div className="flex justify-between items-center text-xs">
                    <span>GST (5%)</span>
                    <span className="font-mono">₹{order.gst}</span>
                  </div>
                ) : null}
                {order.deliveryFee ? (
                  <div className="flex justify-between items-center text-xs">
                    <span>Train Seat Delivery Fee</span>
                    <span className="font-mono">₹{order.deliveryFee}</span>
                  </div>
                ) : null}
              </div>

              <div className="pt-2 border-t border-slate-300 flex justify-between items-center text-sm font-bold text-slate-900">
                <span>Total Amount ({order.paymentMethod} - {order.paymentStatus})</span>
                <span className="font-mono font-extrabold text-emerald-700 text-base">₹{order.total}</span>
              </div>
            </div>
          </div>

          {/* Customer Live Tracking Stepper Sync */}
          <div className="p-4 rounded-lg bg-[#f8f6f0] space-y-3">
            <span className="text-xs font-bold text-slate-800 flex items-center justify-between uppercase tracking-wider">
              <span>User Side Live Stepper Sync</span>
              <span className="text-orange-600 font-mono text-[11px] font-bold">Stage: {order.status.replace(/_/g, ' ')}</span>
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px]">
              {[
                { status: 'placed', title: '1. Order Received', subtitle: 'Order received' },
                { status: 'confirmed', title: '2. Confirmed', subtitle: 'Kitchen said yes!' },
                { status: 'preparing', title: '3. Preparing', subtitle: 'Chef is cooking' },
                { status: 'ready', title: '4. Ready', subtitle: 'Packed and sealed' },
                { status: 'out_for_delivery', title: '5. Out for Delivery', subtitle: 'On the way to coach' },
                { status: 'delivered', title: '6. Delivered', subtitle: 'Enjoy your meal!' },
              ].map((step) => {
                const isActive = order.status === step.status;
                return (
                  <button
                    key={step.status}
                    type="button"
                    onClick={() => onUpdateStatus(order.id, step.status as OrderStatus)}
                    className={`p-2 rounded-lg text-left transition cursor-pointer border ${
                      isActive
                        ? 'bg-orange-600 text-white border-orange-600 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-orange-300'
                    }`}
                  >
                    <span className="font-bold block text-[11px]">{step.title}</span>
                    <span className={`text-[10px] block ${isActive ? 'text-orange-100' : 'text-slate-400'}`}>
                      "{step.subtitle}"
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Fulfillment Status Action Buttons */}
          <div className="space-y-2 pt-1">
            <span className="text-xs font-semibold text-slate-700 block">Quick Status Action</span>
            <div className="flex items-center gap-2 flex-wrap">
              {(['placed', 'confirmed', 'preparing', 'ready', 'out_for_delivery', 'delivered', 'cancelled'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => onUpdateStatus(order.id, st)}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold transition cursor-pointer text-center ${
                    order.status === st
                      ? 'bg-orange-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                  }`}
                >
                  {st === 'out_for_delivery' ? 'Delivery' : st.replace(/_/g, ' ')}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 flex justify-end">
          <button onClick={onClose} className="admin-btn-secondary cursor-pointer px-5 py-2 text-xs">
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};



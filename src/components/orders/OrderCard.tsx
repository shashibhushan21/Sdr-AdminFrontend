import React from 'react';
import { Eye, User, MapPin, ChevronRight } from 'lucide-react';
import type { Order, OrderStatus } from '../../types/admin';

interface OrderCardProps {
  order: Order;
  onUpdateStatus: (id: string, status: OrderStatus) => void;
  onOpenDetails: (order: Order) => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({
  order,
  onUpdateStatus,
  onOpenDetails,
}) => {
  const getBadgeClass = (status: OrderStatus) => {
    switch (status) {
      case 'delivered':
        return 'admin-badge-delivered';
      case 'out_for_delivery':
        return 'admin-badge-delivery';
      case 'preparing':
        return 'admin-badge-preparing';
      default:
        return 'admin-badge-placed';
    }
  };

  const totalItemsCount = order.items.reduce((acc, item) => acc + item.qty, 0);
  const primaryItemName = order.items[0]?.name || 'Food Order';
  const remainingCount = order.items.length - 1;

  return (
    <div className="admin-card space-y-3 border-0 transition-shadow duration-200 hover:shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between pb-2">
        <div>
          <span className="font-mono font-bold text-orange-600 text-sm block">{order.id}</span>
          <span className="text-xs text-slate-500 font-medium">
            PNR: <span className="font-mono text-slate-700">{order.pnr}</span> · {order.trainNo}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className={getBadgeClass(order.status)}>
            {order.status.replace('_', ' ')}
          </span>
          <button
            onClick={() => onOpenDetails(order)}
            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition cursor-pointer"
            title="View Details Popup"
          >
            <Eye size={15} />
          </button>
        </div>
      </div>

      {/* Passenger & Delivery info */}
      <div className="flex items-center justify-between text-xs py-1">
        <div className="flex items-center gap-1.5 text-slate-800 font-semibold">
          <User size={14} className="text-slate-400" />
          <span>{order.customerName}</span>
          <span className="text-slate-400 font-mono font-normal">({order.mobile})</span>
        </div>
        <div className="flex items-center gap-1 text-slate-600 font-medium">
          <MapPin size={13} className="text-orange-600" />
          <span>{order.station}</span>
          <span className="text-slate-400">· {order.coach}/{order.seat}</span>
        </div>
      </div>

      {/* Concise Dish Summary Card Trigger (Show Less Content on Card, Click to Expand) */}
      <div 
        onClick={() => onOpenDetails(order)}
        className="bg-[#f8f6f0] hover:bg-[#f1eee4] p-2.5 rounded-xl flex items-center justify-between text-xs cursor-pointer transition-colors"
      >
        <div className="truncate pr-2">
          <span className="font-bold text-slate-900 block truncate">
            {totalItemsCount} {totalItemsCount === 1 ? 'Item' : 'Items'}: {order.items[0]?.qty}× {primaryItemName}
          </span>
          {remainingCount > 0 && (
            <span className="text-[11px] text-slate-500 font-medium block">
              + {remainingCount} more dish{remainingCount > 1 ? 'es' : ''}
            </span>
          )}
        </div>
        <span className="text-orange-600 font-semibold text-xs shrink-0 flex items-center gap-0.5">
          Details <ChevronRight size={14} />
        </span>
      </div>

      {/* Footer Actions & Bill */}
      <div className="pt-2 flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-baseline gap-1.5">
          <span className="text-xs text-slate-500 font-medium">Bill:</span>
          <span className="font-mono font-extrabold text-emerald-700 text-base">₹{order.total}</span>
        </div>
        <div className="flex items-center gap-1 flex-wrap">
          {(['placed', 'preparing', 'out_for_delivery', 'delivered'] as const).map((st) => (
            <button
              key={st}
              onClick={() => onUpdateStatus(order.id, st)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition cursor-pointer ${
                order.status === st
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              {st === 'out_for_delivery' ? 'Delivery' : st}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};



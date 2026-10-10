import React from 'react';
import { MetricCard } from './MetricCard';
import { OrderCard } from '../orders/OrderCard';
import { ArrowRight } from 'lucide-react';
import type { Order } from '../../types/admin';

interface DashboardTabProps {
  orders: Order[];
  onNavigateOrders: () => void;
  onOpenDetails: (order: Order) => void;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({
  orders,
  onNavigateOrders,
  onOpenDetails,
}) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* 4 Essential Metric Cards - 2x2 Grid on Mobile, 1x4 on Desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
        <MetricCard
          title="Today's Sales"
          value="₹42,850"
          desc="vs yesterday"
        />
        <MetricCard
          title="Total Orders"
          value="128"
          desc="34 live in kitchen"
        />
        <MetricCard
          title="Agra Cantt"
          value="18 Trains"
          desc="Platform delivery"
        />
        <MetricCard
          title="Avg Delivery"
          value="14 Mins"
          desc="Seat delivery time"
        />
      </div>

      {/* Clean Streamlined Live Orders Feed */}
      <div className="space-y-3 sm:space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2">
          <div>
            <h3 className="admin-title-md">Live Orders Stream</h3>
            <p className="admin-subtitle">Real-time train seat food orders</p>
          </div>
          <button
            onClick={onNavigateOrders}
            className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 cursor-pointer transition-colors self-start sm:self-auto"
          >
            <span>View All Board</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {orders.slice(0, 4).map((ord) => (
            <OrderCard
              key={ord.id}
              order={ord}
              onUpdateStatus={() => { }}
              onOpenDetails={onOpenDetails}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

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
    <div className="space-y-6">
      {/* 4 Essential Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Today's Revenue"
          value="₹42,850"
          trend="+18.4%"
          desc="vs yesterday (₹36,190)"
        />
        <MetricCard
          title="Total Food Orders"
          value="128"
          trend="+14.2%"
          desc="94 delivered, 34 in progress"
        />
        <MetricCard
          title="Agra Cantt Halts"
          value="18 Trains"
          trend="AGC Station"
          desc="Platform delivery active"
        />
        <MetricCard
          title="Avg Delivery Time"
          value="14 Mins"
          trend="-2 mins"
          desc="at platform seat position"
        />
      </div>

      {/* Clean Streamlined Live Orders Feed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="admin-title-md">Live Orders Stream</h3>
            <p className="admin-subtitle">Real-time train food orders (Click details to view full item list)</p>
          </div>
          <button
            onClick={onNavigateOrders}
            className="text-xs font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>View All Board</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {orders.slice(0, 4).map((ord) => (
            <OrderCard
              key={ord.id}
              order={ord}
              onUpdateStatus={() => {}}
              onOpenDetails={onOpenDetails}
            />
          ))}
        </div>
      </div>
    </div>
  );
};



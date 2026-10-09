import React from 'react';
import { Grid, List } from 'lucide-react';
import { OrderCard } from './OrderCard';
import type { Order, OrderStatus } from '../../types/admin';

interface OrdersTabProps {
  filteredOrders: Order[];
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  viewMode: 'grid' | 'table';
  setViewMode: (mode: 'grid' | 'table') => void;
  onUpdateStatus: (id: string, status: OrderStatus) => void;
  onOpenDetails: (order: Order) => void;
}

export const OrdersTab: React.FC<OrdersTabProps> = ({
  filteredOrders,
  statusFilter,
  setStatusFilter,
  viewMode,
  setViewMode,
  onUpdateStatus,
  onOpenDetails,
}) => {
  return (
    <div className="space-y-4">
      {/* Filter & View Switcher Bar */}
      <div className="admin-card flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-4 border-0 sticky top-0 z-10 bg-white shadow-sm p-3 sm:p-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="admin-title-md">Live Food Orders Board</h2>
            <span className="bg-orange-600 text-white text-xs font-bold px-2.5 py-0.5 rounded-md shadow-xs">
              {filteredOrders.length} Orders
            </span>
          </div>
          <p className="admin-subtitle">Update kitchen preparation and platform seat delivery status</p>
        </div>

        <div className="flex items-center gap-3 flex-wrap w-full md:w-auto">
          {/* Status Filters Pills */}
          <div className="flex items-center gap-1 bg-[#f8f6f0] p-1 rounded-md max-w-full overflow-x-auto">
            {['all', 'placed', 'confirmed', 'preparing', 'ready', 'out_for_delivery', 'delivered'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  statusFilter === st
                    ? 'bg-orange-600 text-white'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {st === 'all' ? 'All Orders' : st.replace(/_/g, ' ')}
              </button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 bg-[#f8f6f0] p-1 rounded-md shrink-0">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-all cursor-pointer ${
                viewMode === 'grid' ? 'bg-orange-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Grid View"
            >
              <Grid size={16} />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md transition-all cursor-pointer ${
                viewMode === 'table' ? 'bg-orange-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Table View"
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* GRID VIEW */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredOrders.map((ord) => (
            <OrderCard
              key={ord.id}
              order={ord}
              onUpdateStatus={onUpdateStatus}
              onOpenDetails={onOpenDetails}
            />
          ))}
        </div>
      ) : (
        /* TABLE VIEW WITH INLINE STATUS UPDATER */
        <div className="admin-card p-0 overflow-hidden border-0">
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700 min-w-[850px] table-auto border-collapse">
              <thead className="bg-[#f8f6f0] text-slate-600 uppercase text-[10px] font-bold">
                <tr>
                  <th className="py-3.5 px-4 whitespace-nowrap w-44">Order ID & PNR</th>
                  <th className="py-3.5 px-4 whitespace-nowrap w-36">Passenger</th>
                  <th className="py-3.5 px-4 whitespace-nowrap min-w-[200px]">Dishes</th>
                  <th className="py-3.5 px-4 whitespace-nowrap w-36">Station & Seat</th>
                  <th className="py-3.5 px-4 whitespace-nowrap w-20">Total</th>
                  <th className="py-3.5 px-4 whitespace-nowrap min-w-[220px]">Quick Status Action</th>
                  <th className="py-3.5 px-4 text-right whitespace-nowrap w-24">Details</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {filteredOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-amber-50/30 transition">
                    <td className="py-3.5 px-4 whitespace-nowrap font-mono">
                      <span className="font-bold text-orange-600 text-xs whitespace-nowrap block">
                        {ord.id}
                      </span>
                      <span className="text-[11px] text-slate-500 font-sans whitespace-nowrap block">
                        PNR: {ord.pnr}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="font-bold text-slate-900 whitespace-nowrap block">{ord.customerName}</span>
                      <span className="text-[11px] text-slate-500 font-mono whitespace-nowrap block">{ord.mobile}</span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 font-medium whitespace-nowrap">
                      <span className="whitespace-nowrap inline-block max-w-[220px] truncate">
                        {ord.items.map((i) => `${i.qty}× ${i.name}`).join(', ')}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="font-bold text-slate-800 whitespace-nowrap block">{ord.station}</span>
                      <span className="text-[11px] text-slate-500 whitespace-nowrap block">
                        Coach {ord.coach}, Seat {ord.seat}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-emerald-700 font-mono whitespace-nowrap text-sm">
                      ₹{ord.total}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        {(['placed', 'preparing', 'out_for_delivery', 'delivered'] as const).map((st) => (
                          <button
                            key={st}
                            onClick={() => onUpdateStatus(ord.id, st)}
                            className={`px-2 py-1 rounded-md text-[10px] font-semibold transition cursor-pointer ${
                              ord.status === st
                                ? 'bg-orange-600 text-white shadow-xs'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            {st === 'out_for_delivery' ? 'Delivery' : st}
                          </button>
                        ))}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => onOpenDetails(ord)}
                        className="admin-btn-secondary py-1 px-2.5 text-xs whitespace-nowrap cursor-pointer"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};



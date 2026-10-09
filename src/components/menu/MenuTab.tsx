import React from 'react';
import { Plus, Star } from 'lucide-react';
import type { MenuItem } from '../../types/admin';

interface MenuTabProps {
  menuItems: MenuItem[];
  onToggleAvailability: (id: string) => void;
  onOpenAddModal: () => void;
}

export const MenuTab: React.FC<MenuTabProps> = ({
  menuItems,
  onToggleAvailability,
  onOpenAddModal,
}) => {
  return (
    <div className="space-y-5">
      <div className="admin-card flex items-center justify-between border-0">
        <div>
          <h2 className="admin-title-md">Menu & Item Availability</h2>
          <p className="admin-subtitle">Manage dish pricing and live in-stock kitchen toggles</p>
        </div>
        <button
          onClick={onOpenAddModal}
          className="admin-btn-primary flex items-center gap-1.5 cursor-pointer"
        >
          <Plus size={15} /> Add New Dish
        </button>
      </div>

      {/* Dish Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {menuItems.map((item) => (
          <div key={item.id} className="admin-card space-y-3.5 border-0 transition-shadow duration-200 hover:shadow-md">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${item.isVeg ? 'bg-emerald-500' : 'bg-red-500'}`} title={item.isVeg ? 'Vegetarian' : 'Non-Veg'} />
                  <h3 className="font-bold text-sm text-slate-900">{item.name}</h3>
                </div>
                <span className="text-xs text-slate-500 font-medium block pt-0.5">{item.category}</span>
              </div>
              <span className="font-mono font-bold text-sm text-orange-700 bg-orange-50 border border-orange-200/60 px-2.5 py-1 rounded-md">
                ₹{item.price}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
              <span className="text-slate-600 font-medium flex items-center gap-1">
                <Star size={13} className="text-amber-500 fill-amber-500" />
                <span>{item.rating}</span>
                <span className="text-slate-400">({item.ordersCount} orders)</span>
              </span>

              <button
                onClick={() => onToggleAvailability(item.id)}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition cursor-pointer ${
                  item.isAvailable
                    ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200/60'
                    : 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200/60'
                }`}
              >
                {item.isAvailable ? 'In Stock' : 'Out of Stock'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};



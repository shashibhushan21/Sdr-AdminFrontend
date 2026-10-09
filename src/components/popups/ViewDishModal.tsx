import React from 'react';
import { X, Star, Clock, Utensils } from 'lucide-react';
import type { MenuItem } from '../../types/admin';

interface ViewDishModalProps {
  dish: MenuItem;
  onClose: () => void;
  onEdit: (dish: MenuItem) => void;
  onToggleAvailability: (id: string) => void;
}

export const ViewDishModal: React.FC<ViewDishModalProps> = ({
  dish,
  onClose,
  onEdit,
  onToggleAvailability,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="bg-white w-full max-w-md rounded-xl p-5 space-y-4 shadow-xl text-slate-800 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 p-1.5 rounded-md transition cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Dish Hero Image & Main Details */}
        <div className="flex items-start gap-4 pr-6">
          <img
            src={dish.image || '/veg/veg_thali.jpg'}
            alt={dish.name}
            className="w-20 h-20 object-cover rounded-xl bg-slate-100 shrink-0 border border-slate-200/80 shadow-xs"
          />

          <div className="min-w-0 flex-1 space-y-1">
            <div className="flex items-center gap-1.5">
              <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${dish.isVeg ? 'bg-emerald-600' : 'bg-red-600'}`} />
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{dish.category}</span>
            </div>

            <h3 className="font-bold text-base text-slate-900 leading-snug">{dish.name}</h3>

            <div className="flex items-center gap-2 pt-1">
              <span className="font-mono font-extrabold text-base text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded-md border border-orange-200/60">
                ₹{dish.price}
              </span>
              <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold ${
                dish.isAvailable ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
              }`}>
                {dish.isAvailable ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          </div>
        </div>

        {/* Dish Key Metrics Bar */}
        <div className="grid grid-cols-3 gap-2 bg-[#f8f6f0] p-2.5 rounded-lg text-center">
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-slate-400 font-semibold uppercase">Rating</span>
            <span className="flex items-center gap-1 font-bold text-slate-800 text-xs mt-0.5">
              <Star size={13} className="text-amber-500 fill-amber-500" />
              {dish.rating || 4.5}
            </span>
          </div>

          <div className="flex flex-col items-center border-x border-slate-200">
            <span className="text-[10px] text-slate-400 font-semibold uppercase">Prep Time</span>
            <span className="flex items-center gap-1 font-bold text-slate-800 text-xs mt-0.5">
              <Clock size={13} className="text-slate-500" />
              {dish.prepTimeMinutes || 15} Mins
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-[10px] text-slate-400 font-semibold uppercase">Total Orders</span>
            <span className="flex items-center gap-1 font-bold text-slate-800 text-xs mt-0.5">
              <Utensils size={13} className="text-slate-500" />
              {dish.ordersCount || 0}
            </span>
          </div>
        </div>

        {/* Dish Description / About Item */}
        {dish.description && (
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-slate-700 block uppercase tracking-wider">About Dish</span>
            <p className="bg-[#f8f6f0] p-3 rounded-lg text-xs text-slate-600 leading-relaxed font-medium">
              {dish.description}
            </p>
          </div>
        )}

        {/* Modal Actions */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <button
            onClick={() => {
              onToggleAvailability(dish.id);
            }}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition cursor-pointer shadow-xs ${
              dish.isAvailable ? 'bg-rose-600 text-white hover:bg-rose-700' : 'bg-emerald-600 text-white hover:bg-emerald-700'
            }`}
          >
            Mark {dish.isAvailable ? 'Out of Stock' : 'In Stock'}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onEdit(dish);
              }}
              className="admin-btn-primary cursor-pointer px-4 py-2 text-xs"
            >
              Edit Dish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

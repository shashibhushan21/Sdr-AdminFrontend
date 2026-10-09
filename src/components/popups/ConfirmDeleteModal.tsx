import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import type { MenuItem } from '../../types/admin';

interface ConfirmDeleteModalProps {
  dish: MenuItem;
  onClose: () => void;
  onConfirm: (id: string) => void;
}

export const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  dish,
  onClose,
  onConfirm,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="bg-white w-full max-w-sm rounded-xl p-5 space-y-4 shadow-xl text-slate-800 relative">
        <button
          onClick={onClose}
          className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 p-1.5 rounded-md transition cursor-pointer"
        >
          <X size={16} />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
            <AlertTriangle size={20} />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900">Delete Menu Item?</h3>
            <p className="text-xs text-slate-500">This action cannot be undone.</p>
          </div>
        </div>

        <div className="bg-[#f8f6f0] p-3 rounded-lg flex items-center gap-3 border border-slate-200/60">
          <img
            src={dish.image || '/veg/veg_thali.jpg'}
            alt={dish.name}
            className="w-10 h-10 object-cover rounded-md bg-white border border-slate-200"
          />
          <div className="min-w-0 flex-1">
            <h4 className="font-bold text-xs text-slate-900 truncate">{dish.name}</h4>
            <p className="text-[11px] text-slate-500 font-medium">₹{dish.price} • {dish.category}</p>
          </div>
        </div>

        <p className="text-xs text-slate-600 font-medium leading-relaxed">
          Are you sure you want to delete this item from your train food catalog?
        </p>

        <div className="pt-2 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="admin-btn-secondary text-xs px-3.5 py-2 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm(dish.id);
              onClose();
            }}
            className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs px-4 py-2 rounded-md shadow-xs transition cursor-pointer"
          >
            Yes, Delete Item
          </button>
        </div>
      </div>
    </div>
  );
};

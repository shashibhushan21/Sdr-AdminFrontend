import React from 'react';
import { X } from 'lucide-react';

interface AddDishModalProps {
  newDish: { name: string; category: string; price: number; isVeg: boolean };
  setNewDish: (dish: any) => void;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const AddDishModal: React.FC<AddDishModalProps> = ({
  newDish,
  setNewDish,
  onClose,
  onSubmit,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="bg-white w-full max-w-md rounded-xl p-6 space-y-4 shadow-xl border border-slate-200/80 text-slate-800">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-lg text-slate-900">Add New Menu Dish</h3>
            <p className="text-xs text-slate-500 font-medium">Add a dish to train food catalog</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 p-2 rounded-md transition cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4 text-xs font-medium">
          <div>
            <label className="admin-label block mb-1">Dish Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Special Paneer Thali"
              value={newDish.name}
              onChange={(e) => setNewDish({ ...newDish, name: e.target.value })}
              className="admin-input w-full"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="admin-label block mb-1">Category</label>
              <select
                value={newDish.category}
                onChange={(e) => setNewDish({ ...newDish, category: e.target.value })}
                className="admin-input w-full cursor-pointer"
              >
                <option value="Thalis">Thalis</option>
                <option value="Combos">Combos</option>
                <option value="Quick Bites">Quick Bites</option>
                <option value="Beverages">Beverages</option>
              </select>
            </div>

            <div>
              <label className="admin-label block mb-1">Price (₹)</label>
              <input
                type="number"
                required
                value={newDish.price}
                onChange={(e) => setNewDish({ ...newDish, price: Number(e.target.value) })}
                className="admin-input w-full font-semibold"
              />
            </div>
          </div>

          <div className="flex items-center gap-2.5 pt-1">
            <input
              type="checkbox"
              id="isVeg"
              checked={newDish.isVeg}
              onChange={(e) => setNewDish({ ...newDish, isVeg: e.target.checked })}
              className="w-4 h-4 rounded-md text-emerald-600 focus:ring-0 bg-slate-100 border-0 cursor-pointer"
            />
            <label htmlFor="isVeg" className="font-semibold text-slate-700 cursor-pointer select-none">
              100% Pure Vegetarian Dish
            </label>
          </div>

          <div className="pt-3 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="admin-btn-secondary cursor-pointer px-4 py-2.5"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="admin-btn-primary cursor-pointer px-5 py-2.5"
            >
              Add Dish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


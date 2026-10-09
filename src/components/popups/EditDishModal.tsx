import React from 'react';
import { X, Image as ImageIcon, Trash2 } from 'lucide-react';
import type { MenuItem } from '../../types/admin';

interface EditDishModalProps {
  editingDish: MenuItem;
  setEditingDish: React.Dispatch<React.SetStateAction<MenuItem | null>>;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onDelete: (id: string) => void;
}

const IMAGE_PRESETS = [
  { label: 'Veg Thali', path: '/veg/veg_thali.jpg' },
  { label: 'Paneer Tikka', path: '/food/paneer_tikka.png' },
  { label: 'Chole Bhature', path: '/food/chole_bhature.png' },
  { label: 'Dal Makhani', path: '/food/dal_makhani.png' },
  { label: 'Biryani', path: '/food/biryani.png' },
  { label: 'Samosa / Snacks', path: '/food/samosa.png' },
  { label: 'Beverages', path: '/categories/beverages.png' },
  { label: 'Sweets', path: '/veg/indian_sweets.jpg' },
];

export const EditDishModal: React.FC<EditDishModalProps> = ({
  editingDish,
  setEditingDish,
  onClose,
  onSubmit,
  onDelete,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="bg-white w-full max-w-lg rounded-xl p-6 space-y-4 shadow-xl text-slate-800 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-lg text-slate-900">Edit Menu Dish</h3>
            <p className="text-xs text-slate-500 font-medium">Update pricing, image, description or availability</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 p-2 rounded-md transition cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4 text-xs font-medium">
          {/* Dish Name */}
          <div>
            <label className="admin-label block mb-1">Dish Name</label>
            <input
              type="text"
              required
              placeholder="e.g. SDR Maharaja Special Thali"
              value={editingDish.name}
              onChange={(e) => setEditingDish({ ...editingDish, name: e.target.value })}
              className="admin-input w-full font-semibold"
            />
          </div>

          {/* Category & Price & Rating & Prep Time */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="admin-label block mb-1">Category</label>
              <select
                value={editingDish.category}
                onChange={(e) => setEditingDish({ ...editingDish, category: e.target.value })}
                className="admin-input w-full cursor-pointer text-xs"
              >
                <option value="Thalis">Thalis</option>
                <option value="Combos">Combos</option>
                <option value="Quick Bites">Quick Bites</option>
                <option value="Mains">Mains</option>
                <option value="Breads">Breads</option>
                <option value="Beverages">Beverages</option>
                <option value="Desserts">Desserts</option>
              </select>
            </div>

            <div>
              <label className="admin-label block mb-1">Price (₹)</label>
              <input
                type="number"
                required
                value={editingDish.price}
                onChange={(e) => setEditingDish({ ...editingDish, price: Number(e.target.value) })}
                className="admin-input w-full font-bold text-xs"
              />
            </div>

            <div>
              <label className="admin-label block mb-1">Rating (★)</label>
              <input
                type="number"
                step="0.1"
                min="1.0"
                max="5.0"
                required
                value={editingDish.rating || 4.5}
                onChange={(e) => setEditingDish({ ...editingDish, rating: Number(e.target.value) })}
                className="admin-input w-full font-bold text-xs"
              />
            </div>

            <div>
              <label className="admin-label block mb-1">Prep (Mins)</label>
              <input
                type="number"
                required
                value={editingDish.prepTimeMinutes || 15}
                onChange={(e) => setEditingDish({ ...editingDish, prepTimeMinutes: Number(e.target.value) })}
                className="admin-input w-full font-semibold text-xs"
              />
            </div>
          </div>

          {/* About Item / Description */}
          <div>
            <label className="admin-label block mb-1">About Item (Description)</label>
            <textarea
              rows={2}
              placeholder="List items, ingredients or meal description"
              value={editingDish.description || ''}
              onChange={(e) => setEditingDish({ ...editingDish, description: e.target.value })}
              className="admin-input w-full font-normal resize-none"
            />
          </div>

          {/* Item Image Selection */}
          <div className="space-y-2">
            <label className="admin-label flex items-center gap-1.5">
              <ImageIcon size={14} className="text-orange-600" />
              <span>Select Item Image</span>
            </label>

            <div className="grid grid-cols-4 gap-2">
              {IMAGE_PRESETS.map((p) => (
                <button
                  type="button"
                  key={p.path}
                  onClick={() => setEditingDish({ ...editingDish, image: p.path })}
                  className={`p-1.5 rounded-lg border flex flex-col items-center gap-1 cursor-pointer transition ${
                    editingDish.image === p.path
                      ? 'border-orange-600 bg-orange-50/50 ring-2 ring-orange-500/20'
                      : 'border-slate-200 bg-[#f8f6f0] hover:bg-slate-200/50'
                  }`}
                >
                  <img src={p.path} alt={p.label} className="w-10 h-10 object-cover rounded-md" />
                  <span className="text-[10px] font-semibold text-slate-700 truncate w-full text-center">{p.label}</span>
                </button>
              ))}
            </div>

            <div className="pt-1 space-y-2">
              <div>
                <label className="text-[11px] text-slate-500 font-medium block mb-1">Upload image file from device:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setEditingDish({ ...editingDish, image: reader.result as string });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="w-full text-xs text-slate-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-orange-100 file:text-orange-700 hover:file:bg-orange-200 cursor-pointer bg-[#f8f6f0] p-1.5 rounded-lg"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-500 font-medium block mb-1">Or enter custom image URL:</label>
                <input
                  type="text"
                  placeholder="https://example.com/dish.jpg"
                  value={editingDish.image || ''}
                  onChange={(e) => setEditingDish({ ...editingDish, image: e.target.value })}
                  className="admin-input w-full font-mono text-[11px]"
                />
              </div>
            </div>
          </div>

          {/* Pure Veg Checkbox */}
          <div className="flex items-center gap-2.5 pt-1">
            <input
              type="checkbox"
              id="editIsVeg"
              checked={editingDish.isVeg}
              onChange={(e) => setEditingDish({ ...editingDish, isVeg: e.target.checked })}
              className="w-4 h-4 rounded-md text-emerald-600 focus:ring-0 bg-slate-100 border-0 cursor-pointer"
            />
            <label htmlFor="editIsVeg" className="font-semibold text-slate-700 cursor-pointer select-none">
              100% Pure Vegetarian Dish
            </label>
          </div>

          {/* Submit Actions & Delete Dish */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2.5">
            <button
              type="button"
              onClick={() => onDelete(editingDish.id)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-md bg-rose-600 text-white hover:bg-rose-700 text-xs font-bold transition cursor-pointer shadow-xs"
            >
              <Trash2 size={15} /> Delete Dish
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="admin-btn-secondary cursor-pointer px-4 py-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="admin-btn-primary cursor-pointer px-5 py-2"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Plus, Star, Clock, Utensils, Search, Pencil, Trash2 } from 'lucide-react';
import type { MenuItem } from '../../types/admin';

interface MenuTabProps {
  menuItems: MenuItem[];
  onToggleAvailability: (id: string) => void;
  onOpenAddModal: () => void;
  onOpenEditModal: (dish: MenuItem) => void;
  onDeleteDish: (id: string) => void;
}

export const MenuTab: React.FC<MenuTabProps> = ({
  menuItems,
  onToggleAvailability,
  onOpenAddModal,
  onOpenEditModal,
  onDeleteDish,
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'Thalis', 'Combos', 'Quick Bites', 'Mains', 'Beverages'];

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(search.toLowerCase()));
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-5">
      {/* Header & Controls */}
      <div className="admin-card flex flex-col md:flex-row md:items-center justify-between gap-4 border-0">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="admin-title-md">Menu & Item Catalog</h2>
            <span className="bg-orange-600 text-white text-xs font-bold px-2.5 py-0.5 rounded-md">
              {menuItems.length} Dishes
            </span>
          </div>
          <p className="admin-subtitle">Manage dish pricing, food images, item descriptions & kitchen availability</p>
        </div>

        <div className="flex items-center gap-3 flex-wrap w-full md:w-auto">
          {/* Search */}
          <div className="relative w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input
              type="text"
              placeholder="Search Dish..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#f8f6f0] text-slate-800 text-xs rounded-md pl-9 pr-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-orange-500/20 font-medium"
            />
          </div>

          <button
            onClick={onOpenAddModal}
            className="admin-btn-primary flex items-center gap-1.5 cursor-pointer text-xs"
          >
            <Plus size={15} /> Add New Dish
          </button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1 bg-white p-1.5 rounded-xl overflow-x-auto shadow-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition ${
              selectedCategory === cat
                ? 'bg-orange-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {cat === 'all' ? 'All Dishes' : cat}
          </button>
        ))}
      </div>

      {/* Dish Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => (
          <div key={item.id} className="admin-card flex flex-col justify-between space-y-3 border-0 relative group">
            <div className="space-y-3">
              {/* Dish Header & Image */}
              <div className="flex items-start gap-3">
                <img
                  src={item.image || '/veg/veg_thali.jpg'}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg bg-slate-100 shrink-0 border border-slate-100"
                />

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-1">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${item.isVeg ? 'bg-emerald-600' : 'bg-red-600'}`} title={item.isVeg ? '100% Pure Veg' : 'Non-Veg'} />
                      <h3 className="font-bold text-sm text-slate-900 truncate">{item.name}</h3>
                    </div>

                    {/* Quick Edit & Delete Action Buttons */}
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => onOpenEditModal(item)}
                        className="p-1 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-md transition cursor-pointer"
                        title="Edit Dish"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => onDeleteDish(item.id)}
                        className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition cursor-pointer"
                        title="Delete Dish"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-slate-500 font-medium">{item.category}</span>
                    <span className="font-mono font-bold text-sm text-slate-900 bg-[#f8f6f0] px-2 py-0.5 rounded-md">
                      ₹{item.price}
                    </span>
                  </div>
                </div>
              </div>

              {/* About Item / Description */}
              {item.description && (
                <div className="bg-[#f8f6f0] p-2.5 rounded-lg text-[11px] text-slate-600 leading-snug font-medium">
                  <span className="font-bold text-slate-800 block text-[10px] uppercase text-orange-700 mb-0.5">About Item:</span>
                  {item.description}
                </div>
              )}
            </div>

            {/* Footer Stats & Availability Toggle */}
            <div className="flex items-center justify-between text-xs pt-2.5 border-t border-slate-100">
              <div className="flex items-center gap-3 text-slate-500 font-medium text-[11px]">
                <span className="flex items-center gap-1">
                  <Star size={13} className="text-amber-500 fill-amber-500" />
                  <span className="font-bold text-slate-700">{item.rating}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={12} className="text-slate-400" />
                  <span>{item.prepTimeMinutes || 15}m</span>
                </span>
                <span className="flex items-center gap-1">
                  <Utensils size={12} className="text-slate-400" />
                  <span>{item.ordersCount}</span>
                </span>
              </div>

              <button
                onClick={() => onToggleAvailability(item.id)}
                className={`px-3 py-1 rounded-md text-xs font-bold transition cursor-pointer shadow-xs ${
                  item.isAvailable
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                    : 'bg-rose-600 text-white hover:bg-rose-700'
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



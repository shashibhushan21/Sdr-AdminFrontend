import React from 'react';
import { Search, Bell, ShieldCheck, RefreshCw, Menu } from 'lucide-react';

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onRefresh: () => void;
  setMobileMenuOpen: (open: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchTerm,
  setSearchTerm,
  onRefresh,
  setMobileMenuOpen,
}) => {
  return (
    <header className="h-16 bg-white px-4 sm:px-6 flex items-center justify-between sticky top-0 z-20 shadow-xs">
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger Drawer Trigger */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
          aria-label="Open Navigation Menu"
        >
          <Menu size={18} />
        </button>

        {/* Search Input */}
        <div className="relative w-48 sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
          <input
            type="text"
            placeholder="Search Order, PNR, Customer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#f8f6f0] text-slate-800 text-xs rounded-xl pl-10 pr-3 py-2 focus:outline-none focus:bg-white focus:ring-2 focus:ring-orange-500/50 transition-all placeholder:text-slate-400 font-medium border-0"
          />
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <ShieldCheck size={14} className="text-emerald-600" />
          Live Sync Active
        </span>
        <button
          onClick={onRefresh}
          className="p-2 rounded-xl bg-[#f8f6f0] hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition cursor-pointer"
          title="Refresh Data"
        >
          <RefreshCw size={16} />
        </button>
        <button className="p-2 rounded-xl bg-[#f8f6f0] hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition cursor-pointer relative">
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-orange-600" />
        </button>
      </div>
    </header>
  );
};



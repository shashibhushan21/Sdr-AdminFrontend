import React from 'react';
import { Search, Bell, RefreshCw, Menu } from 'lucide-react';

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
    <header className="h-14 bg-[#f8f6f0] px-3 sm:px-6 flex items-center justify-between sticky top-0 z-20 shrink-0 border-b border-slate-200/40">
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger Drawer Trigger */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden p-2 rounded-md bg-white hover:bg-slate-100 text-slate-700 transition cursor-pointer shadow-xs"
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
            className="w-full bg-white text-slate-800 text-xs rounded-md pl-10 pr-3 py-2 shadow-xs focus:outline-none focus:ring-2 focus:ring-orange-500/30 transition-all placeholder:text-slate-400 font-medium border-0"
          />
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        <button
          onClick={onRefresh}
          className="p-2 rounded-md bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition cursor-pointer shadow-xs"
          title="Refresh Data"
        >
          <RefreshCw size={16} />
        </button>
        <button className="p-2 rounded-md bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition cursor-pointer relative shadow-xs">
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-orange-600" />
        </button>
      </div>
    </header>
  );
};



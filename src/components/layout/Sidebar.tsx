import React from 'react';
import {
  LayoutDashboard,
  ShoppingBag,
  UtensilsCrossed,
  Ticket,
  MapPin,
  X
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
  pendingOrdersCount: number;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  pendingOrdersCount,
  mobileMenuOpen,
  setMobileMenuOpen,
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    {
      id: 'orders',
      label: 'Live Food Orders',
      icon: ShoppingBag,
      count: pendingOrdersCount,
    },
    { id: 'menu', label: 'Menu & Inventory', icon: UtensilsCrossed },
    { id: 'vouchers', label: 'Vouchers & Offers', icon: Ticket },
    { id: 'stations', label: 'Agra Delivery Hub', icon: MapPin },
  ];

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex w-64 bg-[#f8f6f0] flex-col justify-between shrink-0 sticky top-0 h-screen z-30">
        <div>
          {/* Brand Header */}
          <div className="p-4 flex items-center gap-3 mb-2">
            <img 
              src="/logo.jpg" 
              alt="Shripati Dwarkadhish Logo" 
              className="w-11 h-11 object-contain rounded-full bg-white shadow-xs shrink-0"
            />
            <div className="min-w-0">
              <h1 className="font-bold text-sm text-slate-900 leading-tight truncate">Shripati Dwarkadhish</h1>
              <p className="text-[11px] font-semibold text-orange-600">Train Food Admin</p>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="p-3 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-md text-xs font-semibold transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-orange-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={17} className={isActive ? 'text-white' : 'text-slate-500'} />
                    <span>{item.label}</span>
                  </div>
                  {item.count ? (
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        isActive ? 'bg-white/20 text-white' : 'bg-orange-100 text-orange-700'
                      }`}
                    >
                      {item.count}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Hub Badge */}
        <div className="p-4">
          <div className="bg-white rounded-lg p-3 flex items-center gap-3 shadow-xs">
            <div className="w-8 h-8 rounded-md bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
              AG
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-900 truncate">Agra Hub Admin</p>
              <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live Sync Active
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* MOBILE SIDEBAR DRAWER POPUP */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-slate-900/60 backdrop-blur-xs flex">
          <div className="w-64 bg-[#f8f6f0] h-full flex flex-col justify-between p-4 shadow-xl animate-in slide-in-from-left duration-200">
            <div>
              <div className="flex items-center justify-between pb-4">
                <div className="flex items-center gap-2.5">
                  <img 
                    src="/logo.jpg" 
                    alt="Shripati Dwarkadhish Logo" 
                    className="w-9 h-9 object-contain rounded-full bg-white shadow-xs"
                  />
                  <span className="font-bold text-sm text-slate-900">SDR Admin</span>
                </div>
                <button 
                  onClick={() => setMobileMenuOpen(false)} 
                  className="text-slate-400 hover:text-slate-700 bg-white p-1.5 rounded-md transition cursor-pointer shadow-xs"
                >
                  <X size={18} />
                </button>
              </div>

              <nav className="py-4 space-y-1.5">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-md text-xs font-semibold cursor-pointer ${
                        isActive ? 'bg-orange-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200/60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={17} />
                        <span>{item.label}</span>
                      </div>
                      {item.count ? (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-orange-100 text-orange-700">
                          {item.count}
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="bg-white rounded-lg p-3 text-xs font-semibold text-slate-700 shadow-xs">
              Agra Hub Connected
            </div>
          </div>
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}
    </>
  );
};



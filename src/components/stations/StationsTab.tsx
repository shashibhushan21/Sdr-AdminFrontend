import React from 'react';
import { MapPin, Users, Train } from 'lucide-react';

export const StationsTab: React.FC = () => {
  const platforms = [
    { name: 'Platform 1 (VIP & Shatabdi)', code: 'AGC-P1', runnersCount: 3, trainsToday: 8, avgHaltMinutes: 10, status: 'Active Point' },
    { name: 'Platform 2 & 3 (Express Hub)', code: 'AGC-P2/3', runnersCount: 2, trainsToday: 6, avgHaltMinutes: 15, status: 'Active Point' },
    { name: 'Platform 4 & 5 (South Express)', code: 'AGC-P4/5', runnersCount: 2, trainsToday: 4, avgHaltMinutes: 12, status: 'Active Point' },
    { name: 'Main Kitchen Dispatch (Agra)', code: 'AGC-MAIN', runnersCount: 1, trainsToday: 18, avgHaltMinutes: 0, status: 'Central Kitchen' },
  ];

  return (
    <div className="space-y-5">
      <div className="admin-card border-0">
        <h2 className="admin-title-md">Agra Cantt (AGC) Delivery Points</h2>
        <p className="admin-subtitle">Train seat food delivery coverage & assigned runners for Agra Cantt station</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {platforms.map((st, i) => (
          <div key={i} className="admin-card space-y-3 border-0">
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-xs text-white bg-orange-600 px-2.5 py-1 rounded-md">
                {st.code}
              </span>
              <span className="admin-badge-delivered">
                {st.status}
              </span>
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                <MapPin size={15} className="text-orange-600 shrink-0" />
                {st.name}
              </h3>
              <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                <Users size={13} className="text-slate-400 shrink-0" />
                {st.runnersCount} Dedicated Runners
              </p>
            </div>
            <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 font-medium">
              <span className="flex items-center gap-1.5 text-slate-500">
                <Train size={13} className="text-orange-600 shrink-0" />
                Train Halts Today
              </span>
              <span className="font-mono font-bold text-orange-700">{st.trainsToday} Trains</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};



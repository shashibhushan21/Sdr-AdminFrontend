import React from 'react';
import { MapPin, Users, Train } from 'lucide-react';
import type { Station } from '../../types/admin';

export const StationsTab: React.FC = () => {
  const stations: Station[] = [
    { name: 'Agra Cantt', code: 'AGC', runners: 6, trainsToday: 18, status: 'Active Hub' },
    { name: 'Mathura Jn', code: 'MTJ', runners: 4, trainsToday: 12, status: 'Active Hub' },
    { name: 'New Delhi', code: 'NDLS', runners: 10, trainsToday: 28, status: 'Active Hub' },
    { name: 'Gwalior Jn', code: 'GWL', runners: 3, trainsToday: 8, status: 'Active Hub' },
  ];

  return (
    <div className="space-y-5">
      <div className="admin-card border-0">
        <h2 className="admin-title-md">Station Logistics & Delivery Hubs</h2>
        <p className="admin-subtitle">IRCTC station halt coverage & active runner teams</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stations.map((st, i) => (
          <div key={i} className="admin-card space-y-3 border-0 transition-shadow duration-200 hover:shadow-md">
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-sm text-orange-700 bg-orange-50 px-2.5 py-1 rounded-lg">
                {st.code}
              </span>
              <span className="admin-badge-delivered">
                {st.status}
              </span>
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-1.5">
                <MapPin size={15} className="text-orange-600" />
                {st.name}
              </h3>
              <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                <Users size={13} className="text-slate-400" />
                {st.runners} Platform Runners
              </p>
            </div>
            <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 font-medium">
              <span className="flex items-center gap-1.5 text-slate-500">
                <Train size={13} className="text-orange-600" />
                Halts Today
              </span>
              <span className="font-mono font-bold text-orange-700">{st.trainsToday} Trains</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};



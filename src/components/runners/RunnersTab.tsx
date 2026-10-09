import React, { useState } from 'react';
import { Phone, MapPin, CheckCircle, Clock, Search, ShieldCheck } from 'lucide-react';
import type { DeliveryRunner } from '../../types/admin';

const INITIAL_RUNNERS: DeliveryRunner[] = [
  {
    id: 'r1',
    name: 'Ramesh Singh',
    phone: '+91 98765 11223',
    stationCode: 'AGC-P1',
    stationName: 'Agra Cantt (PF-1)',
    status: 'On Delivery',
    deliveriesCompleted: 14,
    currentTrainNo: '12002 Shatabdi Exp (C3/24)',
  },
  {
    id: 'r2',
    name: 'Deepak Kumar',
    phone: '+91 98123 33445',
    stationCode: 'AGC-P2/3',
    stationName: 'Agra Cantt (PF-2/3)',
    status: 'Available',
    deliveriesCompleted: 9,
  },
  {
    id: 'r3',
    name: 'Sunil Sharma',
    phone: '+91 99887 55667',
    stationCode: 'AGC-P1',
    stationName: 'Agra Cantt (PF-1)',
    status: 'On Delivery',
    deliveriesCompleted: 22,
    currentTrainNo: '12423 Rajdhani Exp (S4/56)',
  },
  {
    id: 'r4',
    name: 'Vikas Verma',
    phone: '+91 97654 77889',
    stationCode: 'AGC-P4/5',
    stationName: 'Agra Cantt (PF-4/5)',
    status: 'Available',
    deliveriesCompleted: 6,
  },
  {
    id: 'r5',
    name: 'Manoj Tiwari',
    phone: '+91 98989 12345',
    stationCode: 'AGC-P1',
    stationName: 'Agra Cantt (PF-1)',
    status: 'Available',
    deliveriesCompleted: 18,
  },
  {
    id: 'r6',
    name: 'Ajay Yadav',
    phone: '+91 97112 88990',
    stationCode: 'AGC-MAIN',
    stationName: 'Agra Cantt (Kitchen)',
    status: 'Off Duty',
    deliveriesCompleted: 11,
  },
];

export const RunnersTab: React.FC = () => {
  const [runners] = useState<DeliveryRunner[]>(INITIAL_RUNNERS);
  const [search, setSearch] = useState('');
  const [stationFilter, setStationFilter] = useState('all');

  const filteredRunners = runners.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.phone.includes(search) ||
      r.stationName.toLowerCase().includes(search.toLowerCase());
    const matchesStation = stationFilter === 'all' || r.stationCode === stationFilter;
    return matchesSearch && matchesStation;
  });

  const getStatusBadge = (status: DeliveryRunner['status']) => {
    switch (status) {
      case 'On Delivery':
        return 'bg-blue-600 text-white';
      case 'Available':
        return 'bg-emerald-600 text-white';
      case 'Off Duty':
        return 'bg-slate-500 text-white';
    }
  };

  return (
    <div className="space-y-5">
      {/* Header & Controls */}
      <div className="admin-card flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-0">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="admin-title-md">Agra Cantt Delivery Runners</h2>
            <span className="bg-orange-600 text-white text-xs font-bold px-2.5 py-0.5 rounded-md">
              {runners.length} Platform Runners
            </span>
          </div>
          <p className="admin-subtitle">Platform team assignment and live train seat delivery tracking for Agra Cantt</p>
        </div>

        <div className="flex items-center gap-3 flex-wrap w-full md:w-auto">
          {/* Search Runner */}
          <div className="relative w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input
              type="text"
              placeholder="Search Runner..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#f8f6f0] text-slate-800 text-xs rounded-md pl-9 pr-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-orange-500/20 font-medium"
            />
          </div>

          {/* Station Platform Filter */}
          <div className="flex items-center gap-1 bg-[#f8f6f0] p-1 rounded-md">
            {[
              { id: 'all', label: 'All Platforms' },
              { id: 'AGC-P1', label: 'PF-1' },
              { id: 'AGC-P2/3', label: 'PF-2/3' },
              { id: 'AGC-P4/5', label: 'PF-4/5' },
            ].map((st) => (
              <button
                key={st.id}
                onClick={() => setStationFilter(st.id)}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold cursor-pointer ${
                  stationFilter === st.id ? 'bg-orange-600 text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Runner Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRunners.map((runner) => (
          <div key={runner.id} className="admin-card space-y-3.5 border-0">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-orange-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
                  {runner.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">{runner.name}</h3>
                  <p className="text-xs text-slate-500 font-mono flex items-center gap-1 pt-0.5">
                    <Phone size={12} className="text-slate-400" /> {runner.phone}
                  </p>
                </div>
              </div>

              <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${getStatusBadge(runner.status)}`}>
                {runner.status}
              </span>
            </div>

            {/* Station & Current Delivery details */}
            <div className="bg-[#f8f6f0] p-2.5 rounded-lg space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 flex items-center gap-1 font-medium">
                  <MapPin size={13} className="text-orange-600" /> Station Hub
                </span>
                <span className="font-bold text-slate-800">{runner.stationName} ({runner.stationCode})</span>
              </div>

              {runner.currentTrainNo ? (
                <div className="flex items-center justify-between text-blue-700 font-medium">
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> Active Delivery
                  </span>
                  <span className="font-mono text-[11px] font-bold">{runner.currentTrainNo}</span>
                </div>
              ) : (
                <div className="flex items-center justify-between text-emerald-700 font-medium">
                  <span className="flex items-center gap-1">
                    <ShieldCheck size={12} /> Duty Status
                  </span>
                  <span className="text-[11px]">Ready for Next Train</span>
                </div>
              )}
            </div>

            {/* Footer Stats */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
              <span className="flex items-center gap-1 text-slate-500 font-medium">
                <CheckCircle size={13} className="text-emerald-600" /> Deliveries Today
              </span>
              <span className="font-mono font-bold text-slate-900">{runner.deliveriesCompleted} Orders</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

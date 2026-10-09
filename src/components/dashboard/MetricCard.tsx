import React from 'react';

interface MetricCardProps {
  title: string;
  value: string;
  trend?: string;
  desc?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  trend,
  desc,
}) => {
  return (
    <div className="admin-card p-3.5 sm:p-4 space-y-1.5 border-0 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between gap-1">
        <span className="text-[11px] sm:text-xs text-slate-500 font-bold uppercase tracking-wider truncate">{title}</span>
        {trend && (
          <span className="text-[10px] sm:text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border-0 shrink-0">
            {trend}
          </span>
        )}
      </div>

      <div className="font-extrabold text-lg sm:text-2xl text-slate-900 tracking-tight">{value}</div>
      {desc && <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium truncate">{desc}</p>}
    </div>
  );
};

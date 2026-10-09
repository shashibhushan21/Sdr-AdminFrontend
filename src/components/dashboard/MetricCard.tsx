import React from 'react';

interface MetricCardProps {
  title: string;
  value: string;
  trend: string;
  badgeBg?: string;
  desc: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  trend,
  desc,
}) => {
  const isPositive = trend.startsWith('+');
  return (
    <div className="admin-card space-y-3 border-0">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{title}</span>
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-extrabold shadow-xs ${
            isPositive
              ? 'bg-emerald-600 text-white'
              : 'bg-orange-600 text-white'
          }`}
        >
          {trend}
        </span>
      </div>
      <div>
        <h3 className="font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight font-mono">{value}</h3>
        <p className="text-xs text-slate-500 font-medium mt-1">{desc}</p>
      </div>
    </div>
  );
};



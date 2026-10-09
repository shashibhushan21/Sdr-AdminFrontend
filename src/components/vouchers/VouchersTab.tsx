import React from 'react';
import { Plus, Tag } from 'lucide-react';
import type { Voucher } from '../../types/admin';

interface VouchersTabProps {
  vouchers: Voucher[];
  onOpenAddModal: () => void;
}

export const VouchersTab: React.FC<VouchersTabProps> = ({
  vouchers,
  onOpenAddModal,
}) => {
  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Title Card */}
      <div className="admin-card flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-0 p-3.5 sm:p-4">
        <div>
          <h2 className="admin-title-md">Vouchers & Promo Codes</h2>
          <p className="admin-subtitle">Active discount coupons for train orders</p>
        </div>
        <button
          onClick={onOpenAddModal}
          className="admin-btn-primary flex items-center justify-center gap-1.5 cursor-pointer text-xs py-1.5 px-3 shrink-0 self-start sm:self-auto shadow-xs"
        >
          <Plus size={15} /> Create Voucher
        </button>
      </div>

      {/* Vouchers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {vouchers.map((v, i) => (
          <div key={i} className="admin-card p-3.5 space-y-2.5 border-0">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 font-mono font-bold text-xs text-white bg-orange-600 px-2.5 py-1 rounded-md shadow-xs">
                <Tag size={13} />
                {v.code}
              </span>
              <span className="admin-badge-delivered text-[10px]">
                {v.valid}
              </span>
            </div>
            <p className="text-xs font-semibold text-slate-800 leading-snug">{v.desc}</p>
            <p className="text-[11px] text-slate-500 font-mono">Min Order: ₹{v.minOrder}</p>
          </div>
        ))}
      </div>
    </div>
  );
};



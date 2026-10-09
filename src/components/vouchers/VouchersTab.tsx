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
    <div className="space-y-5">
      <div className="admin-card flex items-center justify-between border-0">
        <div>
          <h2 className="admin-title-md">Vouchers & Promo Codes</h2>
          <p className="admin-subtitle">Active discount coupons for train orders</p>
        </div>
        <button
          onClick={onOpenAddModal}
          className="admin-btn-primary flex items-center gap-1.5 cursor-pointer"
        >
          <Plus size={15} /> Create Voucher
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {vouchers.map((v, i) => (
          <div key={i} className="admin-card space-y-3 border-0">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 font-mono font-bold text-sm text-white bg-orange-600 px-2.5 py-1 rounded-md shadow-xs">
                <Tag size={14} />
                {v.code}
              </span>
              <span className="admin-badge-delivered">
                {v.valid}
              </span>
            </div>
            <p className="text-xs font-semibold text-slate-800">{v.desc}</p>
            <p className="text-[11px] text-slate-500 font-mono">Min Order: ₹{v.minOrder}</p>
          </div>
        ))}
      </div>
    </div>
  );
};



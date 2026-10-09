import React from 'react';
import { X } from 'lucide-react';

interface AddVoucherModalProps {
  newVoucher: { code: string; desc: string; minOrder: number };
  setNewVoucher: (v: any) => void;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const AddVoucherModal: React.FC<AddVoucherModalProps> = ({
  newVoucher,
  setNewVoucher,
  onClose,
  onSubmit,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="bg-white w-full max-w-md rounded-xl p-6 space-y-4 shadow-xl text-slate-800">
        <div className="flex items-center justify-between pb-2">
          <div>
            <h3 className="font-bold text-lg text-slate-900">Create New Voucher</h3>
            <p className="text-xs text-slate-500 font-medium">Add promo codes for train passenger orders</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 p-2 rounded-md transition cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4 text-xs font-medium">
          <div>
            <label className="admin-label block mb-1">Coupon Code</label>
            <input
              type="text"
              required
              placeholder="e.g. FESTIVE20"
              value={newVoucher.code}
              onChange={(e) => setNewVoucher({ ...newVoucher, code: e.target.value })}
              className="admin-input w-full uppercase font-mono tracking-wider font-bold"
            />
          </div>

          <div>
            <label className="admin-label block mb-1">Description</label>
            <input
              type="text"
              placeholder="e.g. 20% OFF on orders above ₹400"
              value={newVoucher.desc}
              onChange={(e) => setNewVoucher({ ...newVoucher, desc: e.target.value })}
              className="admin-input w-full"
            />
          </div>

          <div>
            <label className="admin-label block mb-1">Min Order Value (₹)</label>
            <input
              type="number"
              value={newVoucher.minOrder}
              onChange={(e) => setNewVoucher({ ...newVoucher, minOrder: Number(e.target.value) })}
              className="admin-input w-full font-semibold"
            />
          </div>

          <div className="pt-3 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="admin-btn-secondary cursor-pointer px-4 py-2.5"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="admin-btn-primary cursor-pointer px-5 py-2.5"
            >
              Create Code
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


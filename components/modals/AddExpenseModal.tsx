"use client";

import React, { useState } from "react";
import { X, FileSpreadsheet } from "lucide-react";
import { useSchoolStore } from "@/lib/store";

interface AddExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddExpenseModal({ isOpen, onClose }: AddExpenseModalProps) {
  const { addExpense, currentUser } = useSchoolStore();
  const [formData, setFormData] = useState({
    title: "",
    category: "Maintenance" as "Maintenance" | "Utilities" | "Payroll" | "Supplies" | "Lab Equipment",
    amount: 150,
    date: new Date().toISOString().split("T")[0],
    paymentMethod: "Bank Transfer",
    approvedBy: currentUser.name,
    status: "Approved" as "Approved" | "Pending",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.amount) return;

    addExpense(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-[#0F172A]/50 backdrop-blur-xs" onClick={onClose} />
      <div className="relative bg-white rounded-2xl border border-[#CDD4DD] shadow-2xl max-w-md w-full p-6 z-10 animate-in zoom-in-95">
        <div className="flex items-center justify-between pb-4 border-b border-[#CDD4DD]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#90C2E7]/25 text-[#22819A] flex items-center justify-center">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#0F172A]">Record Campus Expense</h2>
              <p className="text-xs text-[#0F172A]/60">Add voucher to campus accounting ledger</p>
            </div>
          </div>
          <button onClick={onClose} className="text-[#0F172A]/50 hover:text-[#0F172A] p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-xs">
          <div>
            <label className="block font-semibold text-[#0F172A] mb-1">Expense Title / Description</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Science Fair Project Materials"
              className="w-full px-3 py-2 text-sm bg-[#FEF7F8] border border-[#CDD4DD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22819A]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-[#0F172A] mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value as "Maintenance" | "Utilities" | "Payroll" | "Supplies" | "Lab Equipment",
                  })
                }
                className="w-full px-3 py-2 text-sm bg-[#FEF7F8] border border-[#CDD4DD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22819A]"
              >
                <option value="Maintenance">Maintenance</option>
                <option value="Utilities">Utilities</option>
                <option value="Payroll">Payroll</option>
                <option value="Supplies">Supplies</option>
                <option value="Lab Equipment">Lab Equipment</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-[#0F172A] mb-1">Amount ($)</label>
              <input
                type="number"
                required
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                className="w-full px-3 py-2 text-sm bg-[#FEF7F8] border border-[#CDD4DD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22819A]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-[#0F172A] mb-1">Payment Method</label>
              <select
                value={formData.paymentMethod}
                onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-[#FEF7F8] border border-[#CDD4DD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22819A]"
              >
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Corporate Card">Corporate Card</option>
                <option value="Petty Cash">Petty Cash</option>
                <option value="ACH Direct">ACH Direct</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-[#0F172A] mb-1">Date</label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-[#FEF7F8] border border-[#CDD4DD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22819A]"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-[#CDD4DD] flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-[#0F172A]/70 hover:bg-[#FEF7F8] rounded-lg border border-[#CDD4DD]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-semibold text-white bg-[#22819A] hover:bg-[#1b687c] rounded-lg shadow-xs transition-colors"
            >
              Record Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

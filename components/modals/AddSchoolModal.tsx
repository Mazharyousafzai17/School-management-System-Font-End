"use client";

import React, { useState } from "react";
import { X, Building2, CheckCircle2 } from "lucide-react";
import { useSchoolStore } from "@/lib/store";
import { School } from "@/types";

interface AddSchoolModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddSchoolModal({ isOpen, onClose }: AddSchoolModalProps) {
  const { addSchool } = useSchoolStore();
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    domain: "",
    adminName: "",
    adminEmail: "",
    plan: "Pro" as "Starter" | "Pro" | "Enterprise",
    maxStudents: 1500,
    mrr: 2400,
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.adminEmail) return;

    addSchool({
      ...formData,
      status: "Active",
      studentCount: 0,
      renewalDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-[#0F172A]/50 backdrop-blur-xs" onClick={onClose} />

      <div className="relative bg-white rounded-2xl border border-[#CDD4DD] shadow-2xl max-w-lg w-full p-6 z-10 animate-in zoom-in-95">
        <div className="flex items-center justify-between pb-4 border-b border-[#CDD4DD]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#90C2E7]/25 text-[#22819A] flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#0F172A]">Add New School Tenant</h2>
              <p className="text-xs text-[#0F172A]/60">Provision campus database & subscription tier</p>
            </div>
          </div>
          <button onClick={onClose} className="text-[#0F172A]/50 hover:text-[#0F172A] p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-[#0F172A] mb-1">School / Institution Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Cambridge Oak International School"
              className="w-full px-3 py-2 text-sm bg-[#FEF7F8] border border-[#CDD4DD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22819A]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1">Campus Code</label>
              <input
                type="text"
                required
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                placeholder="COI-701"
                className="w-full px-3 py-2 text-sm bg-[#FEF7F8] border border-[#CDD4DD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22819A]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1">Subdomain</label>
              <div className="flex items-center">
                <input
                  type="text"
                  required
                  value={formData.domain}
                  onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                  placeholder="cambridge"
                  className="w-full px-3 py-2 text-sm bg-[#FEF7F8] border border-[#CDD4DD] rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#22819A]"
                />
                <span className="px-2 py-2 text-xs bg-slate-100 border border-l-0 border-[#CDD4DD] rounded-r-lg text-[#0F172A]/60">
                  .edusphere.io
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1">Principal / Admin Name</label>
              <input
                type="text"
                required
                value={formData.adminName}
                onChange={(e) => setFormData({ ...formData, adminName: e.target.value })}
                placeholder="Dr. Arthur Sterling"
                className="w-full px-3 py-2 text-sm bg-[#FEF7F8] border border-[#CDD4DD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22819A]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1">Admin Email Address</label>
              <input
                type="email"
                required
                value={formData.adminEmail}
                onChange={(e) => setFormData({ ...formData, adminEmail: e.target.value })}
                placeholder="principal@cambridge.edu"
                className="w-full px-3 py-2 text-sm bg-[#FEF7F8] border border-[#CDD4DD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22819A]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1">Subscription Package</label>
              <select
                value={formData.plan}
                onChange={(e) => {
                  const plan = e.target.value as "Starter" | "Pro" | "Enterprise";
                  const mrr = plan === "Starter" ? 950 : plan === "Pro" ? 2400 : 4500;
                  const maxStudents = plan === "Starter" ? 800 : plan === "Pro" ? 2000 : 3500;
                  setFormData({ ...formData, plan, mrr, maxStudents });
                }}
                className="w-full px-3 py-2 text-sm bg-[#FEF7F8] border border-[#CDD4DD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22819A]"
              >
                <option value="Starter">Starter ($950/mo)</option>
                <option value="Pro">Pro ($2,400/mo)</option>
                <option value="Enterprise">Enterprise ($4,500/mo)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1">Max Student Capacity</label>
              <input
                type="number"
                value={formData.maxStudents}
                onChange={(e) => setFormData({ ...formData, maxStudents: Number(e.target.value) })}
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
              Provision School
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function ViewSchoolModal({
  school,
  isOpen,
  onClose,
}: {
  school: School | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen || !school) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-[#0F172A]/50 backdrop-blur-xs" onClick={onClose} />
      <div className="relative bg-white rounded-2xl border border-[#CDD4DD] shadow-2xl max-w-md w-full p-6 z-10 animate-in zoom-in-95">
        <div className="flex items-center justify-between pb-3 border-b border-[#CDD4DD]">
          <h2 className="text-base font-bold text-[#0F172A]">Tenant Information</h2>
          <button onClick={onClose} className="text-[#0F172A]/50 hover:text-[#0F172A] p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-3 text-sm">
          <div className="p-3.5 bg-[#FEF7F8] rounded-xl border border-[#CDD4DD]">
            <h3 className="font-bold text-[#0F172A] text-base">{school.name}</h3>
            <p className="text-xs text-[#22819A] font-medium mt-0.5">{school.domain}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-2.5 bg-slate-50 rounded-lg border border-[#CDD4DD]/70">
              <span className="text-[#0F172A]/60 block font-medium">Campus Code</span>
              <span className="font-bold text-[#0F172A] text-sm">{school.code}</span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-[#CDD4DD]/70">
              <span className="text-[#0F172A]/60 block font-medium">Subscription</span>
              <span className="font-bold text-[#22819A] text-sm">{school.plan} Tier</span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-[#CDD4DD]/70">
              <span className="text-[#0F172A]/60 block font-medium">Enrolled Students</span>
              <span className="font-bold text-[#0F172A] text-sm">{school.studentCount} / {school.maxStudents}</span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-[#CDD4DD]/70">
              <span className="text-[#0F172A]/60 block font-medium">MRR Contribution</span>
              <span className="font-bold text-emerald-600 text-sm">${school.mrr}/mo</span>
            </div>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-[#CDD4DD] text-xs">
            <div className="flex justify-between">
              <span className="text-[#0F172A]/60">Administrator:</span>
              <span className="font-semibold text-[#0F172A]">{school.adminName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#0F172A]/60">Email:</span>
              <span className="font-semibold text-[#0F172A]">{school.adminEmail}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#0F172A]/60">Renewal Date:</span>
              <span className="font-semibold text-[#0F172A]">{school.renewalDate}</span>
            </div>
          </div>
        </div>

        <div className="mt-5 pt-3 border-t border-[#CDD4DD] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-white bg-[#22819A] hover:bg-[#1b687c] rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

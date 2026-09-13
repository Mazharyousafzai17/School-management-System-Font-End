"use client";

import React, { useState } from "react";
import {
  Settings,
  Shield,
  CreditCard,
  Mail,
  Bell,
  Save,
  CheckCircle2,
  Lock,
} from "lucide-react";

export default function SystemSettingsPage() {
  const [saved, setSaved] = useState(false);

  const [platformName, setPlatformName] = useState("EduSphere LMS Enterprise");
  const [supportEmail, setSupportEmail] = useState("support@edusphere.io");
  const [trialDays, setTrialDays] = useState(30);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  // Payment Gateway toggles
  const [stripeEnabled, setStripeEnabled] = useState(true);
  const [paypalEnabled, setPaypalEnabled] = useState(true);
  const [wireTransferEnabled, setWireTransferEnabled] = useState(true);

  // Notifications
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-[#0F172A] tracking-tight">System Settings</h2>
          <p className="text-xs text-[#0F172A]/60">Configure global platform parameters & payment gateway integrations</p>
        </div>
        {saved && (
          <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 animate-in fade-in">
            <CheckCircle2 className="w-3.5 h-3.5" /> Settings Saved Successfully
          </span>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        {/* Global Platform Parameters */}
        <div className="bg-white rounded-xl border border-[#CDD4DD] p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#CDD4DD]">
            <Settings className="w-4 h-4 text-[#22819A]" />
            <h3 className="text-sm font-bold text-[#0F172A]">Platform Configuration</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-[#0F172A] mb-1">Platform Brand Name</label>
              <input
                type="text"
                value={platformName}
                onChange={(e) => setPlatformName(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-[#FEF7F8] border border-[#CDD4DD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22819A]"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#0F172A] mb-1">Global Support Email</label>
              <input
                type="email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-[#FEF7F8] border border-[#CDD4DD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22819A]"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#0F172A] mb-1">Default Trial Duration (Days)</label>
              <input
                type="number"
                value={trialDays}
                onChange={(e) => setTrialDays(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm bg-[#FEF7F8] border border-[#CDD4DD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22819A]"
              />
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg border border-[#CDD4DD] bg-[#FEF7F8]">
              <div>
                <span className="font-semibold text-[#0F172A] block">Platform Maintenance Mode</span>
                <span className="text-[11px] text-[#0F172A]/60 block">Restricts tenant logins during schema migrations</span>
              </div>
              <input
                type="checkbox"
                checked={maintenanceMode}
                onChange={(e) => setMaintenanceMode(e.target.checked)}
                className="w-4 h-4 text-[#22819A] rounded border-[#CDD4DD] focus:ring-[#22819A]"
              />
            </div>
          </div>
        </div>

        {/* Payment Gateway Toggles */}
        <div className="bg-white rounded-xl border border-[#CDD4DD] p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#CDD4DD]">
            <CreditCard className="w-4 h-4 text-[#22819A]" />
            <h3 className="text-sm font-bold text-[#0F172A]">Payment Gateways & Merchant Processing</h3>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-xl border border-[#CDD4DD] bg-[#FEF7F8] flex items-center justify-between">
              <div>
                <span className="font-bold text-[#0F172A] block text-sm">Stripe Payment Gateway</span>
                <span className="text-[11px] text-[#0F172A]/60">Supports automated recurring debit cards, SEPA, and Apple Pay</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={stripeEnabled}
                  onChange={(e) => setStripeEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#22819A]" />
              </label>
            </div>

            <div className="p-4 rounded-xl border border-[#CDD4DD] bg-[#FEF7F8] flex items-center justify-between">
              <div>
                <span className="font-bold text-[#0F172A] block text-sm">PayPal Commerce Platform</span>
                <span className="text-[11px] text-[#0F172A]/60">Global cross-border invoice settlements</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={paypalEnabled}
                  onChange={(e) => setPaypalEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#22819A]" />
              </label>
            </div>

            <div className="p-4 rounded-xl border border-[#CDD4DD] bg-[#FEF7F8] flex items-center justify-between">
              <div>
                <span className="font-bold text-[#0F172A] block text-sm">Offline Bank Wire & Challan Reconciliation</span>
                <span className="text-[11px] text-[#0F172A]/60">Direct bank transfer with manual finance team verification</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={wireTransferEnabled}
                  onChange={(e) => setWireTransferEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#22819A]" />
              </label>
            </div>
          </div>
        </div>

        {/* Action Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#22819A] hover:bg-[#1b687c] text-white font-semibold text-sm shadow-xs transition-colors"
          >
            <Save className="w-4 h-4" /> Save System Parameters
          </button>
        </div>
      </form>
    </div>
  );
}

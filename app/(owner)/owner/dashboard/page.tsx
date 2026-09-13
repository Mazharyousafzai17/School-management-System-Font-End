"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Building2,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  ArrowRight,
  Server,
  Activity,
  Layers,
  Sparkles,
  PlusCircle,
  ShieldCheck,
  Globe,
  Radio,
} from "lucide-react";
import { MetricCard } from "@/components/shared/MetricCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { useSchoolStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";

export default function OwnerDashboardPage() {
  const { schools } = useSchoolStore();
  const [selectedMonth, setSelectedMonth] = useState<number>(5); // Default to Sep

  const totalSchools = schools.length + 120; // 124 for realistic platform scale
  const activeSubscriptions = 118;
  const platformRevenue = 248500;

  const revenueData = [
    { month: "Apr", val: 140, mrr: "$140,000", growth: "+14.2%" },
    { month: "May", val: 165, mrr: "$165,000", growth: "+17.8%" },
    { month: "Jun", val: 180, mrr: "$180,000", growth: "+9.1%" },
    { month: "Jul", val: 205, mrr: "$205,000", growth: "+13.9%" },
    { month: "Aug", val: 228, mrr: "$228,000", growth: "+11.2%" },
    { month: "Sep (Current)", val: 248.5, mrr: "$248,500", growth: "+18.7%" },
  ];

  const activePoint = revenueData[selectedMonth];

  return (
    <div className="space-y-6">
      {/* Top Banner with Platform Telemetry */}
      <div className="p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[var(--gradient-from)] to-[var(--gradient-to)] flex items-center justify-center text-white shadow-md shadow-[var(--shadow-color)] shrink-0">
            <ShieldCheck className="w-7 h-7 text-white/80" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-[var(--text-main)] font-heading">
                Multi-Tenant Cloud Control
              </h2>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Cluster Healthy
              </span>
            </div>
            <p className="text-sm text-[var(--text-muted)] mt-1">
              Alexander Vance • Platform Architecture & Multi-Campus Global Operations
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-[#FEF7F8] border border-[#CDD4DD] rounded-xl text-xs text-[#0F172A]/70">
            <Globe className="w-3.5 h-3.5 text-[#22819A]" />
            <span>Multi-Region CDN: <strong>4 Clusters Active</strong></span>
          </div>
          <Link
            href="/owner/schools"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#22819A] text-white text-sm font-bold hover:bg-[#1b687c] transition-all shadow-xs"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Provision School</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Schools"
          value={totalSchools}
          icon={Building2}
          change={{ value: "+8.4% this month", isPositive: true }}
          subtitle="4 new onboardings pending"
        />
        <MetricCard
          title="Active Subscriptions"
          value={activeSubscriptions}
          icon={CheckCircle2}
          change={{ value: "+12.1%", isPositive: true }}
          subtitle="95.2% retention rate"
        />
        <MetricCard
          title="Platform Revenue"
          value={formatCurrency(platformRevenue)}
          icon={DollarSign}
          change={{ value: "+18.7% MRR", isPositive: true }}
          subtitle="Annual ARR $2.98M"
        />
        <MetricCard
          title="System Health"
          value="99.98%"
          icon={Server}
          change={{ value: "Operational", isPositive: true }}
          subtitle="4 Global AWS/GCP regions"
        />
      </div>

      {/* Revenue Graph & Tier Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Growth Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#CDD4DD] p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#CDD4DD]/70 gap-2">
              <div>
                <h3 className="text-base font-extrabold text-[#0F172A] font-heading flex items-center gap-2">
                  <span>Monthly Recurring Revenue (MRR)</span>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    +18.7% QoQ
                  </span>
                </h3>
                <p className="text-xs text-[#0F172A]/60 mt-0.5">
                  Subscription invoicing trend across 124 licensed institutional tenants
                </p>
              </div>

              {/* Active selection pill */}
              <div className="flex items-center gap-2 text-xs bg-[#FEF7F8] px-3 py-1.5 rounded-xl border border-[#CDD4DD]">
                <span className="font-semibold text-[#0F172A]">{activePoint.month}:</span>
                <span className="font-extrabold text-[#22819A]">{activePoint.mrr}</span>
                <span className="text-emerald-700 font-bold">({activePoint.growth})</span>
              </div>
            </div>

            {/* Interactive SVG / Bar Chart */}
            <div className="pt-8 pb-4">
              <div className="h-52 flex items-end justify-between gap-3 sm:gap-4 px-2">
                {revenueData.map((bar, i) => {
                  const isSelected = selectedMonth === i;
                  return (
                    <button
                      key={i}
                      onClick={() => setSelectedMonth(i)}
                      className="flex-1 flex flex-col items-center gap-2.5 h-full justify-end group cursor-pointer focus:outline-none"
                    >
                      <span
                        className={`text-[11px] font-bold transition-all ${
                          isSelected
                            ? "text-[#22819A] scale-110"
                            : "text-[#0F172A]/50 group-hover:text-[#22819A]"
                        }`}
                      >
                        ${bar.val}k
                      </span>
                      <div className="w-full max-w-[54px] h-full flex items-end bg-[#FEF7F8] rounded-t-xl overflow-hidden p-1 border border-[#CDD4DD]/40">
                        <div
                          className={`w-full rounded-t-lg transition-all duration-300 ${
                            isSelected
                              ? "bg-gradient-to-t from-[#22819A] to-[#90C2E7] shadow-md shadow-[#22819A]/30"
                              : "bg-gradient-to-t from-[#22819A]/75 to-[#90C2E7]/75 group-hover:from-[#22819A] group-hover:to-[#90C2E7]"
                          }`}
                          style={{ height: `${(bar.val / 260) * 100}%` }}
                        />
                      </div>
                      <span
                        className={`text-xs font-bold transition-colors ${
                          isSelected
                            ? "text-[#22819A] underline decoration-2 underline-offset-4"
                            : "text-[#0F172A]/70 group-hover:text-[#0F172A]"
                        }`}
                      >
                        {bar.month.split(" ")[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#CDD4DD]/70 flex flex-wrap items-center justify-between gap-2 text-xs text-[#0F172A]/70">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#22819A]" /> Enterprise & Pro Plans (88%)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#90C2E7]" /> Starter Tier (12%)
              </span>
            </div>
            <Link
              href="/owner/money"
              className="font-bold text-[#22819A] hover:underline flex items-center gap-1"
            >
              <span>Detailed Financials</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Subscription Plan Breakdown */}
        <div className="bg-white rounded-2xl border border-[#CDD4DD] p-6 shadow-xs flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-extrabold text-[#0F172A] font-heading">
                Subscription Mix
              </h3>
              <span className="text-xs font-bold text-[#22819A] bg-[#90C2E7]/20 px-2.5 py-0.5 rounded-full">
                Active Licenses
              </span>
            </div>
            <p className="text-xs text-[#0F172A]/60 mb-5">
              Breakdown by campus enterprise tier
            </p>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-[#0F172A]">Enterprise ($4,500/mo)</span>
                  <span className="font-bold text-[#22819A]">48 campuses (41%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#FEF7F8] border border-[#CDD4DD]/60 overflow-hidden">
                  <div className="h-full bg-[#22819A] rounded-full" style={{ width: "41%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-[#0F172A]">Pro Tier ($2,400/mo)</span>
                  <span className="font-bold text-[#22819A]">56 campuses (47%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#FEF7F8] border border-[#CDD4DD]/60 overflow-hidden">
                  <div className="h-full bg-[#90C2E7] rounded-full" style={{ width: "47%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-[#0F172A]">Starter Tier ($950/mo)</span>
                  <span className="font-bold text-[#22819A]">14 campuses (12%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#FEF7F8] border border-[#CDD4DD]/60 overflow-hidden">
                  <div className="h-full bg-slate-400 rounded-full" style={{ width: "12%" }} />
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-[#FEF7F8] rounded-xl border border-[#CDD4DD] text-xs">
            <div className="flex items-center gap-2 font-bold text-[#0F172A] mb-1.5">
              <Activity className="w-4 h-4 text-[#22819A]" /> High Conversion Signal
            </div>
            <p className="text-[#0F172A]/70 text-[11px] leading-relaxed">
              Silverdale Montessori trial has exceeded 80% student capacity limit. Automated upgrade recommendation triggered.
            </p>
          </div>
        </div>
      </div>

      {/* Tenant Directory Quick View */}
      <div className="bg-white rounded-2xl border border-[#CDD4DD] p-6 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-[#CDD4DD]/70 mb-4">
          <div>
            <h3 className="text-base font-extrabold text-[#0F172A] font-heading">
              Recent Provisioned School Tenants
            </h3>
            <p className="text-xs text-[#0F172A]/60">Live status of isolated multi-tenant campus portals</p>
          </div>
          <Link
            href="/owner/schools"
            className="inline-flex items-center gap-1 text-xs font-bold text-[#22819A] hover:underline"
          >
            <span>View All Campuses</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#FEF7F8] border-b border-[#CDD4DD] text-[#0F172A]/70 font-semibold uppercase">
                <th className="py-2.5 px-3">School Name</th>
                <th className="py-2.5 px-3">Subdomain</th>
                <th className="py-2.5 px-3">Package</th>
                <th className="py-2.5 px-3">Capacity</th>
                <th className="py-2.5 px-3">MRR</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#CDD4DD]/60">
              {schools.slice(0, 4).map((s) => (
                <tr key={s.id} className="hover:bg-[#FEF7F8]/60 transition-colors">
                  <td className="py-3 px-3 font-bold text-[#0F172A]">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#90C2E7]/25 text-[#22819A] flex items-center justify-center font-bold">
                        {s.name.charAt(0)}
                      </div>
                      <div>
                        <span className="block font-bold text-sm">{s.name}</span>
                        <span className="text-[10px] text-[#0F172A]/50 font-normal">
                          Admin: {s.adminName}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-[#22819A] font-semibold">{s.domain}</td>
                  <td className="py-3 px-3">
                    <StatusBadge status={s.plan} />
                  </td>
                  <td className="py-3 px-3 font-medium text-[#0F172A]">
                    {s.studentCount} / {s.maxStudents}
                  </td>
                  <td className="py-3 px-3 font-extrabold text-emerald-700 text-sm">
                    ${s.mrr}/mo
                  </td>
                  <td className="py-3 px-3">
                    <StatusBadge status={s.status} />
                  </td>
                  <td className="py-3 px-3 text-right">
                    <Link
                      href="/owner/schools"
                      className="px-3 py-1.5 rounded-lg border border-[#CDD4DD] bg-white hover:bg-[#90C2E7]/20 text-[#22819A] font-bold text-xs transition-colors shadow-2xs"
                    >
                      Manage
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


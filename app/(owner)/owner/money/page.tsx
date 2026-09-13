"use client";

import React, { useState } from "react";
import {
  Wallet,
  DollarSign,
  TrendingUp,
  Download,
  CreditCard,
  FileCheck,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import { MetricCard } from "@/components/shared/MetricCard";
import { DataTable, Column } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { useSchoolStore } from "@/lib/store";
import { Invoice } from "@/types";
import { formatCurrency } from "@/lib/utils";

export default function MoneyManagementPage() {
  const { invoices } = useSchoolStore();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch =
      inv.invoiceNo.toLowerCase().includes(search.toLowerCase()) ||
      inv.schoolName.toLowerCase().includes(search.toLowerCase()) ||
      inv.plan.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || inv.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const columns: Column<Invoice>[] = [
    {
      header: "Invoice ID",
      cell: (inv) => (
        <span className="font-mono font-semibold text-xs text-[#22819A]">
          {inv.invoiceNo}
        </span>
      ),
    },
    {
      header: "School Tenant",
      accessorKey: "schoolName",
      className: "font-semibold text-[#0F172A]",
    },
    {
      header: "Plan Tier",
      accessorKey: "plan",
    },
    {
      header: "Billing Amount",
      cell: (inv) => (
        <span className="font-bold text-emerald-700">
          {formatCurrency(inv.amount)}
        </span>
      ),
    },
    {
      header: "Cycle",
      accessorKey: "billingCycle",
    },
    {
      header: "Issued",
      accessorKey: "issueDate",
    },
    {
      header: "Due Date",
      accessorKey: "dueDate",
    },
    {
      header: "Status",
      cell: (inv) => <StatusBadge status={inv.status} />,
    },
    {
      header: "Receipt",
      className: "text-right",
      cell: (inv) => (
        <button
          onClick={() => alert(`Simulating PDF download for ${inv.invoiceNo}`)}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-[#CDD4DD] bg-[#FEF7F8] hover:bg-[#90C2E7]/25 text-[#22819A] text-xs font-semibold"
        >
          <Download className="w-3 h-3" /> PDF
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Financial KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Monthly Recurring (MRR)"
          value="$248,500"
          icon={Wallet}
          change={{ value: "+18.7% vs last month", isPositive: true }}
          subtitle="Annualized Run-Rate $2.98M"
        />
        <MetricCard
          title="Total Invoiced (YTD)"
          value="$1,890,200"
          icon={DollarSign}
          change={{ value: "98.4% collected", isPositive: true }}
          subtitle="3 invoices outstanding"
        />
        <MetricCard
          title="Average ARPU"
          value="$2,105 / mo"
          icon={CreditCard}
          change={{ value: "+6.2%", isPositive: true }}
          subtitle="Per campus average"
        />
        <MetricCard
          title="Subscription Churn"
          value="0.85%"
          icon={TrendingUp}
          change={{ value: "-0.4% improvement", isPositive: true }}
          subtitle="Industry benchmark 2.1%"
        />
      </div>

      {/* Revenue Breakdown & Payment Gateway Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-[#CDD4DD] p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-[#0F172A]">Platform Cash Flow & Inflow Analysis</h2>
              <p className="text-xs text-[#0F172A]/60">Breakdown between automatic credit card debits and wire transfers</p>
            </div>
            <span className="text-xs font-semibold text-[#22819A] bg-[#90C2E7]/20 px-2.5 py-1 rounded-full">
              Q3 2026 Fiscal
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-[#FEF7F8] border border-[#CDD4DD]/70">
              <span className="text-xs text-[#0F172A]/60 block font-medium">Stripe Auto-Recurring</span>
              <span className="text-2xl font-bold text-[#0F172A] block mt-1">$182,400</span>
              <span className="text-[11px] text-emerald-600 font-semibold block mt-1">73.4% of total billing</span>
            </div>
            <div className="p-4 rounded-xl bg-[#FEF7F8] border border-[#CDD4DD]/70">
              <span className="text-xs text-[#0F172A]/60 block font-medium">Bank Wire Transfer</span>
              <span className="text-2xl font-bold text-[#0F172A] block mt-1">$58,200</span>
              <span className="text-[11px] text-[#22819A] font-semibold block mt-1">23.4% of total billing</span>
            </div>
            <div className="p-4 rounded-xl bg-[#FEF7F8] border border-[#CDD4DD]/70">
              <span className="text-xs text-[#0F172A]/60 block font-medium">Pending Processing</span>
              <span className="text-2xl font-bold text-amber-600 block mt-1">$7,900</span>
              <span className="text-[11px] text-[#0F172A]/60 block mt-1">Due in 5 days</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#CDD4DD] p-5 shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-bold text-[#0F172A] mb-1">Billing Integrations</h2>
            <p className="text-xs text-[#0F172A]/60 mb-4">Payment gateway synchronization</p>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg border border-[#CDD4DD] bg-[#FEF7F8] flex items-center justify-between">
                <div>
                  <span className="font-semibold text-[#0F172A] block">Stripe Connect SaaS</span>
                  <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Webhook Connected
                  </span>
                </div>
                <span className="text-[11px] font-bold text-[#22819A]">Active</span>
              </div>

              <div className="p-3 rounded-lg border border-[#CDD4DD] bg-[#FEF7F8] flex items-center justify-between">
                <div>
                  <span className="font-semibold text-[#0F172A] block">PayPal Commerce</span>
                  <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> IPN Listening
                  </span>
                </div>
                <span className="text-[11px] font-bold text-[#22819A]">Active</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#CDD4DD] text-[11px] text-[#0F172A]/60 flex items-center justify-between">
            <span>Next billing run: <strong>Oct 01, 2026</strong></span>
            <span className="text-[#22819A] font-semibold">124 invoices</span>
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-[#0F172A]">Platform Invoices & Billing Records</h2>
        <DataTable
          columns={columns}
          data={filteredInvoices}
          searchPlaceholder="Search invoices by number, school, or tier..."
          searchQuery={search}
          onSearchChange={setSearch}
          filterLabel="Status"
          selectedFilter={statusFilter}
          onFilterChange={setStatusFilter}
          filterOptions={[
            { label: "Paid", value: "paid" },
            { label: "Processing", value: "processing" },
            { label: "Overdue", value: "overdue" },
          ]}
          pageSize={5}
        />
      </div>
    </div>
  );
}

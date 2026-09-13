"use client";

import React, { useState } from "react";
import { Plus, FileSpreadsheet, DollarSign, TrendingDown, Layers } from "lucide-react";
import { MetricCard } from "@/components/shared/MetricCard";
import { DataTable, Column } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { AddExpenseModal } from "@/components/modals/AddExpenseModal";
import { useSchoolStore } from "@/lib/store";
import { Expense } from "@/types";
import { formatCurrency } from "@/lib/utils";

export default function ExpensesPage() {
  const { expenses } = useSchoolStore();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isAddOpen, setIsAddOpen] = useState(false);

  const totalExpenseAmount = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  const filteredExpenses = expenses.filter((e) => {
    const matchesSearch =
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.paymentMethod.toLowerCase().includes(search.toLowerCase()) ||
      e.approvedBy.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || e.category.toLowerCase() === categoryFilter.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const columns: Column<Expense>[] = [
    {
      header: "Expense Description",
      cell: (e) => (
        <div>
          <div className="font-bold text-[#0F172A]">{e.title}</div>
          <div className="text-[11px] text-[#0F172A]/50">
            Authorized by: {e.approvedBy}
          </div>
        </div>
      ),
    },
    {
      header: "Category",
      cell: (e) => (
        <span className="font-semibold text-xs px-2 py-0.5 rounded bg-slate-100 border border-[#CDD4DD]">
          {e.category}
        </span>
      ),
    },
    {
      header: "Amount",
      cell: (e) => (
        <span className="font-bold text-xs text-rose-700">
          {formatCurrency(e.amount)}
        </span>
      ),
    },
    {
      header: "Date",
      accessorKey: "date",
    },
    {
      header: "Payment Method",
      accessorKey: "paymentMethod",
    },
    {
      header: "Status",
      cell: (e) => <StatusBadge status={e.status} />,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-[#0F172A] tracking-tight">
            Campus Operational Expenses & Disbursements
          </h2>
          <p className="text-xs text-[#0F172A]/60">
            Track campus maintenance, utilities, lab consumables, and faculty payroll
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#22819A] hover:bg-[#1b687c] text-white text-xs font-semibold shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" /> Record New Expense
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard
          title="Total Monthly Disbursements"
          value={formatCurrency(totalExpenseAmount)}
          icon={DollarSign}
          change={{ value: "Within 4.2% budget margin", isPositive: true }}
          subtitle="August - September cycle"
        />
        <MetricCard
          title="Faculty & Staff Payroll"
          value="$48,200"
          icon={Layers}
          subtitle="86 instructional & admin personnel"
        />
        <MetricCard
          title="Facility & Lab Overheads"
          value="$7,680"
          icon={TrendingDown}
          subtitle="HVAC, fiber connection, chemistry stocks"
        />
      </div>

      <DataTable
        columns={columns}
        data={filteredExpenses}
        searchPlaceholder="Search expense description, approver, or method..."
        searchQuery={search}
        onSearchChange={setSearch}
        filterLabel="Category"
        selectedFilter={categoryFilter}
        onFilterChange={setCategoryFilter}
        filterOptions={[
          { label: "Maintenance", value: "maintenance" },
          { label: "Utilities", value: "utilities" },
          { label: "Payroll", value: "payroll" },
          { label: "Supplies", value: "supplies" },
          { label: "Lab Equipment", value: "lab equipment" },
        ]}
        pageSize={6}
      />

      <AddExpenseModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />
    </div>
  );
}

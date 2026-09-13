"use client";

import React, { useState } from "react";
import { Plus, Eye, CheckCircle2, Receipt, Download, Printer } from "lucide-react";
import { DataTable, Column } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { CreateChallanModal, ViewChallanModal } from "@/components/modals/FeeModals";
import { useSchoolStore } from "@/lib/store";
import { useToast } from "@/components/providers/ToastProvider";
import { FeeChallan } from "@/types";

export default function FeesManagementPage() {
  const { challans, students, markChallanPaid } = useSchoolStore();
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedChallan, setSelectedChallan] = useState<FeeChallan | null>(null);

  const filteredChallans = challans.filter((c) => {
    const matchesSearch =
      c.challanNo.toLowerCase().includes(search.toLowerCase()) ||
      c.studentName.toLowerCase().includes(search.toLowerCase()) ||
      c.rollNo.toLowerCase().includes(search.toLowerCase()) ||
      c.grade.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || c.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const columns: Column<FeeChallan>[] = [
    {
      header: "Challan #",
      cell: (c) => (
        <span className="font-mono font-bold text-xs text-[#22819A]">
          {c.challanNo}
        </span>
      ),
    },
    {
      header: "Student Name",
      cell: (c) => (
        <div>
          <div className="font-bold text-[#0F172A]">{c.studentName}</div>
          <div className="text-[11px] text-[#0F172A]/50">
            {c.grade} - Section {c.section} • Roll #{c.rollNo}
          </div>
        </div>
      ),
    },
    {
      header: "Total Payable",
      cell: (c) => (
        <span className="font-bold text-xs text-[#0F172A]">
          ${c.totalAmount}.00
        </span>
      ),
    },
    {
      header: "Issue Date",
      accessorKey: "issueDate",
    },
    {
      header: "Due Date",
      cell: (c) => (
        <span className={`font-medium ${c.status === "Overdue" ? "text-rose-600 font-bold" : ""}`}>
          {c.dueDate}
        </span>
      ),
    },
    {
      header: "Status",
      cell: (c) => <StatusBadge status={c.status} />,
    },
    {
      header: "Payment Method",
      cell: (c) => (
        <span className="text-xs text-[#0F172A]/70">
          {c.paymentMethod || "—"}
        </span>
      ),
    },
    {
      header: "Actions",
      className: "text-right",
      cell: (c) => (
        <div className="flex items-center justify-end gap-1.5">
          <button
            onClick={() => setSelectedChallan(c)}
            title="View 3-Part Challan Voucher"
            className="p-1.5 rounded-md border border-[var(--border-color)] bg-[var(--card-subtle)] hover:bg-[var(--primary-light)] text-[var(--primary)] transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
          {c.status !== "Paid" && (
            <button
              onClick={() => {
                markChallanPaid(c.id, "Cash Desk Clearance");
                toast.success(
                  "Fee Challan Paid",
                  `Voucher #${c.challanNo} for ${c.studentName} marked as Paid ($${c.totalAmount})`
                );
              }}
              title="Mark Paid"
              className="px-2.5 py-1 rounded-md border border-emerald-300 dark:border-emerald-800/80 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-xs font-bold transition-colors cursor-pointer"
            >
              Collect
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-[#0F172A] tracking-tight">
            Fee Collection Register & Challan Generation
          </h2>
          <p className="text-xs text-[#0F172A]/60">
            Generate student term fee vouchers, reconcile receipts, and track arrears
          </p>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#22819A] hover:bg-[#1b687c] text-white text-xs font-semibold shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" /> Issue New Fee Challan
        </button>
      </div>

      <DataTable
        columns={columns}
        data={filteredChallans}
        searchPlaceholder="Search challans by number, student name, roll #..."
        searchQuery={search}
        onSearchChange={setSearch}
        filterLabel="Status"
        selectedFilter={statusFilter}
        onFilterChange={setStatusFilter}
        filterOptions={[
          { label: "Paid", value: "paid" },
          { label: "Pending", value: "pending" },
          { label: "Overdue", value: "overdue" },
        ]}
        pageSize={6}
        exportFilename="fee-challans-register"
      />

      <CreateChallanModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        students={students}
      />

      <ViewChallanModal
        challan={selectedChallan}
        isOpen={!!selectedChallan}
        onClose={() => setSelectedChallan(null)}
      />
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { Plus, Eye, Edit, Trash2, PowerOff, Building2 } from "lucide-react";
import { DataTable, Column } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { AddSchoolModal, ViewSchoolModal } from "@/components/modals/AddSchoolModal";
import { useSchoolStore } from "@/lib/store";
import { School } from "@/types";

export default function SchoolsManagementPage() {
  const { schools, updateSchool, deleteSchool } = useSchoolStore();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [planFilter, setPlanFilter] = useState("all");

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [viewSchool, setViewSchool] = useState<School | null>(null);

  const filteredSchools = schools.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.code.toLowerCase().includes(search.toLowerCase()) ||
      s.domain.toLowerCase().includes(search.toLowerCase()) ||
      s.adminEmail.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "all" || s.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesPlan = planFilter === "all" || s.plan.toLowerCase() === planFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesPlan;
  });

  const handleToggleStatus = (school: School) => {
    const nextStatus = school.status === "Active" ? "Suspended" : "Active";
    updateSchool(school.id, { status: nextStatus });
  };

  const columns: Column<School>[] = [
    {
      header: "School & Campus",
      cell: (school) => (
        <div>
          <div className="font-bold text-[#0F172A]">{school.name}</div>
          <div className="text-[11px] text-[#22819A] font-medium">{school.domain}</div>
        </div>
      ),
    },
    {
      header: "Campus Code",
      cell: (school) => (
        <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 border border-[#CDD4DD]">
          {school.code}
        </span>
      ),
    },
    {
      header: "Administrator",
      cell: (school) => (
        <div>
          <div className="font-medium text-[#0F172A]">{school.adminName}</div>
          <div className="text-[11px] text-[#0F172A]/50">{school.adminEmail}</div>
        </div>
      ),
    },
    {
      header: "Package",
      cell: (school) => <StatusBadge status={school.plan} />,
    },
    {
      header: "Capacity",
      cell: (school) => (
        <div className="text-xs">
          <span className="font-semibold text-[#0F172A]">{school.studentCount}</span>
          <span className="text-[#0F172A]/50"> / {school.maxStudents}</span>
        </div>
      ),
    },
    {
      header: "MRR",
      cell: (school) => (
        <span className="font-bold text-emerald-700">${school.mrr}/mo</span>
      ),
    },
    {
      header: "Status",
      cell: (school) => <StatusBadge status={school.status} />,
    },
    {
      header: "Actions",
      className: "text-right",
      cell: (school) => (
        <div className="flex items-center justify-end gap-1.5">
          <button
            onClick={() => setViewSchool(school)}
            title="View Details"
            className="p-1.5 rounded-md border border-[var(--border-color)] bg-[var(--card-subtle)] hover:bg-[var(--primary-light)] text-[var(--primary)] transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => handleToggleStatus(school)}
            title={school.status === "Active" ? "Suspend Tenant" : "Activate Tenant"}
            className="p-1.5 rounded-md border border-amber-200 dark:border-amber-800/80 bg-amber-50/80 dark:bg-amber-950/60 hover:bg-amber-100 dark:hover:bg-amber-900/60 text-amber-700 dark:text-amber-300 transition-colors cursor-pointer"
          >
            <PowerOff className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => {
              if (confirm(`Are you sure you want to remove tenant ${school.name}?`)) {
                deleteSchool(school.id);
              }
            }}
            title="Delete School"
            className="p-1.5 rounded-md border border-rose-200 dark:border-rose-800/80 bg-rose-50/80 dark:bg-rose-950/60 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-300 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-[#0F172A] tracking-tight">
            Multi-Tenant Campus Directory
          </h2>
          <p className="text-xs text-[#0F172A]/60">
            Provision, monitor, and configure school tenant instances across the platform
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#22819A] hover:bg-[#1b687c] text-white text-xs font-semibold shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" /> Add School Tenant
        </button>
      </div>

      <DataTable
        columns={columns}
        data={filteredSchools}
        searchPlaceholder="Search school by name, code, domain, or email..."
        searchQuery={search}
        onSearchChange={setSearch}
        filterLabel="Status"
        selectedFilter={statusFilter}
        onFilterChange={setStatusFilter}
        filterOptions={[
          { label: "Active", value: "active" },
          { label: "Trial", value: "trial" },
          { label: "Suspended", value: "suspended" },
        ]}
        pageSize={6}
      />

      <AddSchoolModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />
      <ViewSchoolModal school={viewSchool} isOpen={!!viewSchool} onClose={() => setViewSchool(null)} />
    </div>
  );
}

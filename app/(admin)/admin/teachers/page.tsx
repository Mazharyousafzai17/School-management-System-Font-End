"use client";

import React, { useState } from "react";
import { Plus, Edit, BookOpen, Mail, Phone, UserCheck } from "lucide-react";
import { DataTable, Column } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { AddTeacherDrawer } from "@/components/modals/AddTeacherDrawer";
import { useSchoolStore } from "@/lib/store";
import { Teacher } from "@/types";

export default function TeachersDirectoryPage() {
  const { teachers } = useSchoolStore();
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  const filteredTeachers = teachers.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.empId.toLowerCase().includes(search.toLowerCase()) ||
      t.department.toLowerCase().includes(search.toLowerCase()) ||
      t.email.toLowerCase().includes(search.toLowerCase()) ||
      t.assignedClasses.some((c) =>
        `${c.grade} ${c.section} ${c.subject}`.toLowerCase().includes(search.toLowerCase())
      );

    const matchesDept =
      departmentFilter === "all" ||
      t.department.toLowerCase().includes(departmentFilter.toLowerCase());

    return matchesSearch && matchesDept;
  });

  const handleEditTeacher = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setIsDrawerOpen(true);
  };

  const handleAddTeacher = () => {
    setSelectedTeacher(null);
    setIsDrawerOpen(true);
  };

  const columns: Column<Teacher>[] = [
    {
      header: "Employee ID",
      cell: (t) => (
        <span className="font-mono font-bold text-xs text-indigo-600 dark:text-indigo-400 px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
          {t.empId}
        </span>
      ),
    },
    {
      header: "Faculty Name",
      cell: (t) => (
        <div>
          <div className="font-bold text-[var(--foreground)]">{t.name}</div>
          <div className="text-[11px] text-[var(--foreground-muted)]">{t.designation}</div>
        </div>
      ),
    },
    {
      header: "Department",
      cell: (t) => (
        <span className="font-semibold text-xs text-[var(--foreground)]">
          {t.department}
        </span>
      ),
    },
    {
      header: "Assigned Classes Flow",
      cell: (t) => (
        <div className="flex flex-wrap gap-1 max-w-xs">
          {t.assignedClasses.map((c, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[var(--background)] border border-[var(--border)] text-indigo-600 dark:text-indigo-400"
            >
              <BookOpen className="w-2.5 h-2.5" />
              {c.grade}-{c.section}: {c.subject}
            </span>
          ))}
        </div>
      ),
    },
    {
      header: "Contact",
      cell: (t) => (
        <div className="text-xs">
          <div className="text-[var(--foreground)] font-medium">{t.email}</div>
          <div className="text-[11px] text-[var(--foreground-muted)]">{t.phone}</div>
        </div>
      ),
    },
    {
      header: "Status",
      cell: (t) => <StatusBadge status={t.status} />,
    },
    {
      header: "Action",
      className: "text-right",
      cell: (t) => (
        <button
          onClick={() => handleEditTeacher(t)}
          title="Edit Instructor Workload"
          className="p-1.5 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:bg-indigo-500/10 hover:text-indigo-600 text-[var(--foreground-muted)] transition-colors"
        >
          <Edit className="w-3.5 h-3.5" />
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-black text-[var(--foreground)] tracking-tight">
            Faculty Directory & Teaching Workload Mapping
          </h2>
          <p className="text-xs text-[var(--foreground-muted)]">
            Assigned classes flow (e.g. Usman Ali → Grade 10-A Math, Grade 9-B Physics), department rosters, and instant CSV export
          </p>
        </div>

        <button
          onClick={handleAddTeacher}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" /> Add / Map Instructor
        </button>
      </div>

      <DataTable
        columns={columns}
        data={filteredTeachers}
        searchPlaceholder="Search faculty by name, employee ID, department, or mapped class..."
        searchQuery={search}
        onSearchChange={setSearch}
        filterLabel="Department"
        selectedFilter={departmentFilter}
        onFilterChange={setDepartmentFilter}
        filterOptions={[
          { label: "Mathematics", value: "math" },
          { label: "Chemistry", value: "chemistry" },
          { label: "Humanities", value: "humanities" },
          { label: "Computer Science", value: "computer" },
          { label: "Biological Sciences", value: "bio" },
        ]}
        pageSize={6}
        exportFilename="faculty-workload-directory"
        enableExport={true}
        enablePrint={true}
      />

      <AddTeacherDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        teacherToEdit={selectedTeacher}
      />
    </div>
  );
}

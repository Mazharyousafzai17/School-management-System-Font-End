"use client";

import React, { useState } from "react";
import {
  Plus,
  ClipboardList,
  Calendar,
  CheckCircle2,
  FileText,
  Clock,
  Paperclip,
  Users,
  Award,
} from "lucide-react";
import { DataTable, Column } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import {
  CreateAssignmentModal,
  ReviewSubmissionsModal,
} from "@/components/modals/AssignmentModals";
import { useSchoolStore } from "@/lib/store";
import { Assignment } from "@/types";

export default function TeacherAssignmentsPage() {
  const { assignments, submissions } = useSchoolStore();
  const [search, setSearch] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);

  const filteredAssignments = assignments.filter(
    (a) =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.subject.toLowerCase().includes(search.toLowerCase()) ||
      a.grade.toLowerCase().includes(search.toLowerCase())
  );

  const columns: Column<Assignment>[] = [
    {
      header: "Assignment Title & Topic",
      cell: (asg) => (
        <div>
          <div className="font-bold text-[#0F172A]">{asg.title}</div>
          <div className="text-[11px] text-[#0F172A]/60 max-w-sm truncate mt-0.5">
            {asg.description}
          </div>
        </div>
      ),
    },
    {
      header: "Class & Subject",
      cell: (asg) => (
        <div>
          <span className="font-semibold text-xs text-[#0F172A] block">{asg.subject}</span>
          <span className="text-[11px] text-[#22819A]">
            {asg.grade} - Sec {asg.section}
          </span>
        </div>
      ),
    },
    {
      header: "Due Deadline",
      cell: (asg) => (
        <span className="font-semibold text-xs text-rose-600 flex items-center gap-1">
          <Clock className="w-3 h-3" /> {asg.dueDate}
        </span>
      ),
    },
    {
      header: "Max Marks",
      cell: (asg) => (
        <span className="font-bold text-xs text-[#0F172A]">{asg.maxMarks}</span>
      ),
    },
    {
      header: "Submissions Progress",
      cell: (asg) => {
        const subCount = submissions.filter((s) => s.assignmentId === asg.id).length;
        const total = asg.totalStudents || 28;
        return (
          <div className="w-36">
            <div className="flex justify-between text-[11px] mb-1">
              <span className="font-semibold text-[var(--text-main)]">{subCount} turned in</span>
              <span className="text-[var(--text-muted)]">/{total}</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-700/80 border border-[var(--border-color)] overflow-hidden">
              <div
                className="h-full bg-[var(--primary)] rounded-full"
                style={{ width: `${Math.min(100, (subCount / total) * 100)}%` }}
              />
            </div>
          </div>
        );
      },
    },
    {
      header: "Attachment",
      cell: (asg) =>
        asg.attachmentName ? (
          <span className="text-xs text-[var(--primary)] font-medium flex items-center gap-1">
            <Paperclip className="w-3 h-3" /> {asg.attachmentName}
          </span>
        ) : (
          <span className="text-xs text-[var(--text-muted)] opacity-60">None</span>
        ),
    },
    {
      header: "Action",
      className: "text-right",
      cell: (asg) => (
        <button
          onClick={() => setSelectedAssignment(asg)}
          className="px-3 py-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--card-subtle)] hover:bg-[var(--primary-light)] text-[var(--primary)] text-xs font-semibold shadow-xs transition-colors cursor-pointer"
        >
          Review Submissions
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-[#0F172A] tracking-tight">
            Assignments & Coursework Tasks
          </h2>
          <p className="text-xs text-[#0F172A]/60">
            Publish student assignments, monitor submissions pipeline, and grade coursework
          </p>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#22819A] hover:bg-[#1b687c] text-white text-xs font-semibold shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" /> Create New Assignment
        </button>
      </div>

      <DataTable
        columns={columns}
        data={filteredAssignments}
        searchPlaceholder="Search assignment title, class, or subject..."
        searchQuery={search}
        onSearchChange={setSearch}
        pageSize={6}
      />

      <CreateAssignmentModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />

      <ReviewSubmissionsModal
        assignment={selectedAssignment}
        isOpen={!!selectedAssignment}
        onClose={() => setSelectedAssignment(null)}
      />
    </div>
  );
}

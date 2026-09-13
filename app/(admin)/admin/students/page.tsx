"use client";

import React, { useState } from "react";
import { UserPlus, Eye, Edit3, Trash2, Filter, IdCard } from "lucide-react";
import { DataTable, Column } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { AddStudentModal, StudentDetailModal } from "@/components/modals/AddStudentModal";
import { StudentIDCardModal } from "@/components/modals/StudentIDCardModal";
import { useSchoolStore } from "@/lib/store";
import { Student } from "@/types";

export default function StudentsDirectoryPage() {
  const { students, updateStudent } = useSchoolStore();
  const [search, setSearch] = useState("");
  const [gradeFilter, setGradeFilter] = useState("all");
  const [sectionFilter, setSectionFilter] = useState("all");

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [idCardStudent, setIdCardStudent] = useState<Student | null>(null);

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(search.toLowerCase()) ||
      s.parentName.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase());

    const matchesGrade = gradeFilter === "all" || s.grade.toLowerCase() === gradeFilter.toLowerCase();
    const matchesSection = sectionFilter === "all" || s.section.toLowerCase() === sectionFilter.toLowerCase();

    return matchesSearch && matchesGrade && matchesSection;
  });

  const columns: Column<Student>[] = [
    {
      header: "Roll #",
      cell: (s) => (
        <span className="font-mono font-bold text-xs text-[#22819A] px-2 py-0.5 rounded bg-[#90C2E7]/20 border border-[#90C2E7]/30">
          #{s.rollNo}
        </span>
      ),
    },
    {
      header: "Student Name",
      cell: (s) => (
        <div>
          <div className="font-bold text-[#0F172A]">{s.name}</div>
          <div className="text-[11px] text-[#0F172A]/50">{s.email}</div>
        </div>
      ),
    },
    {
      header: "Class & Section",
      cell: (s) => (
        <span className="font-semibold text-xs text-[#0F172A]">
          {s.grade} - Section {s.section}
        </span>
      ),
    },
    {
      header: "Parent / Guardian",
      cell: (s) => (
        <div>
          <div className="font-medium text-[#0F172A]">{s.parentName}</div>
          <div className="text-[11px] text-[#0F172A]/50">{s.parentPhone}</div>
        </div>
      ),
    },
    {
      header: "Attendance",
      cell: (s) => (
        <span className="font-semibold text-xs text-emerald-700">
          {s.attendanceRate}%
        </span>
      ),
    },
    {
      header: "GPA",
      cell: (s) => (
        <span className="font-bold text-xs text-[#22819A]">
          {s.gpa.toFixed(2)}
        </span>
      ),
    },
    {
      header: "Status",
      cell: (s) => <StatusBadge status={s.status} />,
    },
    {
      header: "Actions",
      className: "text-right",
      cell: (s) => (
        <div className="flex items-center justify-end gap-1.5">
          <button
            onClick={() => setIdCardStudent(s)}
            title="Generate Student ID Badge"
            className="p-1.5 rounded-md border border-[var(--border-color)] bg-[var(--card-subtle)] hover:bg-[var(--primary-light)] text-[var(--primary)] transition-colors cursor-pointer"
          >
            <IdCard className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setSelectedStudent(s)}
            title="View Student Dossier"
            className="p-1.5 rounded-md border border-[var(--border-color)] bg-[var(--card-subtle)] hover:bg-[var(--primary-light)] text-[var(--primary)] transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
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
            Student Directory & Admission Pipeline
          </h2>
          <p className="text-xs text-[#0F172A]/60">
            Manage student records, section mappings, and admission dossiers
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#22819A] hover:bg-[#1b687c] text-white text-xs font-semibold shadow-xs transition-colors"
        >
          <UserPlus className="w-4 h-4" /> New Student Admission
        </button>
      </div>

      {/* Grade Filters */}
      <div className="flex items-center gap-2 flex-wrap text-xs">
        <span className="font-semibold text-[#0F172A]/70 mr-1">Filter by Class:</span>
        {["all", "Grade 9", "Grade 10", "Grade 11", "Grade 12"].map((gr) => (
          <button
            key={gr}
            onClick={() => setGradeFilter(gr)}
            className={`px-3 py-1 rounded-lg border text-xs font-medium transition-colors ${
              gradeFilter.toLowerCase() === gr.toLowerCase()
                ? "bg-[#22819A] text-white border-[#22819A]"
                : "bg-white text-[#0F172A] border-[#CDD4DD] hover:bg-[#FEF7F8]"
            }`}
          >
            {gr === "all" ? "All Grades" : gr}
          </button>
        ))}
      </div>

      <DataTable
        columns={columns}
        data={filteredStudents}
        searchPlaceholder="Search student by name, roll no, email, or parent..."
        searchQuery={search}
        onSearchChange={setSearch}
        pageSize={8}
        exportFilename="students-directory"
      />

      <AddStudentModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />
      <StudentDetailModal
        student={selectedStudent}
        isOpen={!!selectedStudent}
        onClose={() => setSelectedStudent(null)}
      />
      <StudentIDCardModal
        student={idCardStudent}
        onClose={() => setIdCardStudent(null)}
      />
    </div>
  );
}

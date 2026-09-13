"use client";

import React, { useState } from "react";
import { Users, Eye, BookOpen } from "lucide-react";
import { DataTable, Column } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { StudentDetailModal } from "@/components/modals/AddStudentModal";
import { useSchoolStore } from "@/lib/store";
import { Student } from "@/types";

export default function TeacherStudentsPage() {
  const { students } = useSchoolStore();
  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // Filter students under Usman's assigned classes: Grade 10-A, Grade 10-B, Grade 9-B
  const myStudents = students.filter(
    (s) =>
      (s.grade === "Grade 10" && s.section === "A") ||
      (s.grade === "Grade 10" && s.section === "B") ||
      (s.grade === "Grade 9" && s.section === "B")
  );

  const filteredStudents = myStudents.filter((s) => {
    const classTag = `${s.grade}-${s.section}`.toLowerCase();
    const matchesClass = selectedClass === "all" || classTag === selectedClass.toLowerCase();

    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase());

    return matchesClass && matchesSearch;
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
      header: "Enrolled Section",
      cell: (s) => (
        <span className="font-semibold text-xs text-[#0F172A]">
          {s.grade} - Section {s.section}
        </span>
      ),
    },
    {
      header: "Attendance Rate",
      cell: (s) => (
        <span className="font-semibold text-xs text-emerald-700">
          {s.attendanceRate}%
        </span>
      ),
    },
    {
      header: "Subject GPA",
      cell: (s) => (
        <span className="font-bold text-xs text-[#22819A]">
          {s.gpa.toFixed(2)}
        </span>
      ),
    },
    {
      header: "Parent Contact",
      cell: (s) => (
        <div className="text-xs">
          <div className="text-[#0F172A]">{s.parentName}</div>
          <div className="text-[11px] text-[#0F172A]/50">{s.parentPhone}</div>
        </div>
      ),
    },
    {
      header: "Action",
      className: "text-right",
      cell: (s) => (
        <button
          onClick={() => setSelectedStudent(s)}
          title="View Dossier"
          className="p-1.5 rounded-md border border-[#CDD4DD] bg-[#FEF7F8] hover:bg-[#90C2E7]/25 text-[#22819A]"
        >
          <Eye className="w-3.5 h-3.5" />
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-[#0F172A] tracking-tight">
            Assigned Student Rosters
          </h2>
          <p className="text-xs text-[#0F172A]/60">
            Pupils currently enrolled across your assigned class sections (Grade 10-A, 10-B, Grade 9-B)
          </p>
        </div>
      </div>

      {/* Class Section Filter Tabs */}
      <div className="flex items-center gap-2 flex-wrap text-xs">
        <span className="font-semibold text-[#0F172A]/70 mr-1">Filter Class:</span>
        {[
          { label: "All Assigned Classes", value: "all" },
          { label: "Grade 10-A (Mathematics)", value: "grade 10-a" },
          { label: "Grade 10-B (Mathematics)", value: "grade 10-b" },
          { label: "Grade 9-B (Physics)", value: "grade 9-b" },
        ].map((item) => (
          <button
            key={item.value}
            onClick={() => setSelectedClass(item.value)}
            className={`px-3 py-1 rounded-lg border text-xs font-medium transition-colors ${
              selectedClass === item.value
                ? "bg-[#22819A] text-white border-[#22819A]"
                : "bg-white text-[#0F172A] border-[#CDD4DD] hover:bg-[#FEF7F8]"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <DataTable
        columns={columns}
        data={filteredStudents}
        searchPlaceholder="Search student by name, roll no..."
        searchQuery={search}
        onSearchChange={setSearch}
        pageSize={8}
      />

      <StudentDetailModal
        student={selectedStudent}
        isOpen={!!selectedStudent}
        onClose={() => setSelectedStudent(null)}
      />
    </div>
  );
}

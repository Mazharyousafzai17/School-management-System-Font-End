"use client";

import React from "react";
import {
  BookOpen,
  Award,
  GraduationCap,
  Clock,
  User,
  CheckCircle2,
  Calendar,
  Sparkles,
} from "lucide-react";
import { useSchoolStore } from "@/lib/store";

export default function StudentAcademicPage() {
  const { students } = useSchoolStore();
  const student = students.find((s) => s.id === "std-1") || students[0];

  const enrolledCourses = [
    { code: "MTH-101", title: "Advanced Pure & Applied Mathematics", credits: 4, teacher: "Usman Ali", room: "Hall A-102", gradeStanding: "A+ (94%)" },
    { code: "PHY-102", title: "Classical Mechanics & Thermodynamics", credits: 4, teacher: "Usman Ali", room: "Lab Phys-1", gradeStanding: "A (89%)" },
    { code: "CHM-103", title: "Organic & Physical Chemistry", credits: 4, teacher: "Dr. Sarah Khan", room: "Lab Chem-1", gradeStanding: "A (88%)" },
    { code: "CSC-104", title: "Algorithms & Python Data Structures", credits: 3, teacher: "Ayesha Rehman", room: "Lab CS-2", gradeStanding: "A+ (96%)" },
    { code: "ENG-105", title: "World Literature & Rhetoric", credits: 3, teacher: "Farhan Siddiqui", room: "Hall A-102", gradeStanding: "B+ (84%)" },
    { code: "BIO-106", title: "Cellular Biology & Genetics", credits: 3, teacher: "David Sterling", room: "Lab Bio-1", gradeStanding: "A (91%)" },
  ];

  const academicHistory = [
    { term: "Academic Year 2025-2026 (Grade 9)", gpa: "3.92 / 4.0", standing: "Principal's Honor Roll (Rank 2)", creditsCompleted: 24 },
    { term: "Academic Year 2024-2025 (Grade 8)", gpa: "3.88 / 4.0", standing: "High Distinction with Merit", creditsCompleted: 22 },
    { term: "Academic Year 2023-2024 (Grade 7)", gpa: "3.85 / 4.0", standing: "Distinction in Sciences", creditsCompleted: 20 },
  ];

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h2 className="text-lg font-bold text-[#0F172A] tracking-tight">
          Academic Information & Enrollment Dossier
        </h2>
        <p className="text-xs text-[#0F172A]/60">
          Enrolled courses, credit hours, subject faculty, and multi-year academic transcript history
        </p>
      </div>

      {/* Program Summary Card */}
      <div className="bg-white rounded-2xl border border-[#CDD4DD] p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#CDD4DD]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#22819A] text-white flex items-center justify-center font-bold">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#0F172A]">
                Secondary School Certificate (SSC) • STEM Track
              </h3>
              <p className="text-xs text-[#0F172A]/60">
                Grade 10 - Section A • Official Roll #{student.rollNo}
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs text-[#0F172A]/60 block">Cumulative GPA</span>
            <span className="text-2xl font-extrabold text-[#22819A]">{student.gpa} / 4.0</span>
          </div>
        </div>

        {/* Current Enrolled Courses */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-[#22819A]" />
              Current Enrolled Courses ({enrolledCourses.length} Subjects • 21 Credits)
            </h4>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              In Good Academic Standing
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#FEF7F8] border-b border-[#CDD4DD] text-[#0F172A]/70 font-semibold uppercase">
                  <th className="py-2.5 px-3">Course Code & Title</th>
                  <th className="py-2.5 px-3 text-center">Credit Hours</th>
                  <th className="py-2.5 px-3">Instructor</th>
                  <th className="py-2.5 px-3">Room</th>
                  <th className="py-2.5 px-3 text-right">Current Standing</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#CDD4DD]/60">
                {enrolledCourses.map((c) => (
                  <tr key={c.code} className="hover:bg-[#FEF7F8]/60">
                    <td className="py-3 px-3">
                      <span className="font-bold text-[#0F172A] block">{c.title}</span>
                      <span className="font-mono text-[10px] text-[#22819A]">{c.code}</span>
                    </td>
                    <td className="py-3 px-3 text-center font-bold text-[#0F172A]">
                      {c.credits}
                    </td>
                    <td className="py-3 px-3 text-[#0F172A] font-medium">
                      {c.teacher}
                    </td>
                    <td className="py-3 px-3 text-[#0F172A]/60">
                      {c.room}
                    </td>
                    <td className="py-3 px-3 text-right font-bold text-[#22819A]">
                      {c.gradeStanding}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Academic History Timeline */}
        <div className="mt-8 pt-6 border-t border-[#CDD4DD] space-y-3">
          <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider flex items-center gap-1.5">
            <Award className="w-4 h-4 text-[#22819A]" />
            Previous Academic Terms & Transcript History
          </h4>

          <div className="space-y-2.5">
            {academicHistory.map((hist, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl border border-[#CDD4DD] bg-[#FEF7F8] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
              >
                <div>
                  <span className="font-bold text-[#0F172A] block">{hist.term}</span>
                  <span className="text-[11px] text-emerald-700 font-semibold">{hist.standing}</span>
                </div>
                <div className="flex items-center gap-4 text-xs font-semibold">
                  <span>{hist.creditsCompleted} Credits Earned</span>
                  <span className="px-2.5 py-1 rounded-lg bg-white border border-[#CDD4DD] text-[#22819A] font-bold">
                    GPA {hist.gpa}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

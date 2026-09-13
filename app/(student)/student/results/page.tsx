"use client";

import React, { useState } from "react";
import {
  Award,
  Download,
  Printer,
  Sparkles,
  TrendingUp,
  FileCheck,
  CheckCircle2,
  Star,
} from "lucide-react";
import { MetricCard } from "@/components/shared/MetricCard";
import { ReportCardModal } from "@/components/modals/ReportCardModal";
import { useSchoolStore } from "@/lib/store";

export default function StudentResultsPage() {
  const { students, examResults } = useSchoolStore();
  const student = students.find((s) => s.id === "std-1") || students[0];
  const [isReportCardOpen, setIsReportCardOpen] = useState(false);

  const studentResults = examResults.filter((r) => r.studentId === "std-1");

  const totalScore = studentResults.reduce((acc, curr) => acc + curr.marksObtained, 0);
  const totalPossible = studentResults.reduce((acc, curr) => acc + curr.totalMarks, 0);
  const percentage = totalPossible > 0 ? ((totalScore / totalPossible) * 100).toFixed(1) : "0";

  return (
    <div className="space-y-6">
      {/* Honors Recognition Banner */}
      <div className="p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[var(--gradient-from)] to-[var(--gradient-to)] flex items-center justify-center text-white shadow-md shadow-[var(--shadow-color)] shrink-0">
            <Star className="w-7 h-7 text-amber-300 fill-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-[var(--text-main)] font-heading">
                Academic Distinction Honors Roll
              </h2>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                ★ 1st Rank in Section 10-A
              </span>
            </div>
            <p className="text-sm text-[var(--text-muted)] mt-1">
              Ayan Ahmed (Roll #1042) • Spring Term Comprehensive Examinations Result
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsReportCardOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#22819A] hover:bg-[#1b687c] text-white text-sm font-bold shadow-xs transition-all cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>View Verified Report Card</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Term GPA"
          value="3.84 / 4.0"
          icon={Award}
          change={{ value: "Grade Distinction", isPositive: true }}
          subtitle="Spring Comprehensive Finals"
        />
        <MetricCard
          title="Overall Percentage"
          value={`${percentage}%`}
          icon={TrendingUp}
          change={{ value: "+2.4% vs midterm", isPositive: true }}
          subtitle={`${totalScore} of ${totalPossible} marks`}
        />
        <MetricCard
          title="Highest Subject Score"
          value="96 / 100"
          icon={Sparkles}
          subtitle="Computer Science & Python"
        />
        <MetricCard
          title="Status & Verification"
          value="Verified"
          icon={FileCheck}
          change={{ value: "Controller Signed", isPositive: true }}
          subtitle="Apex Examination Board"
        />
      </div>

      {/* Detailed Marks Breakdown Table */}
      <div className="bg-white rounded-2xl border border-[#CDD4DD] shadow-xs overflow-hidden">
        <div className="p-6 border-b border-[#CDD4DD] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#90C2E7]/25 text-[#22819A] flex items-center justify-center shadow-2xs">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-[#0F172A] font-heading">
                Subject-by-Subject Academic Assessment
              </h3>
              <p className="text-xs text-[#0F172A]/60 mt-0.5">
                Grade 10 - Section A • Instructor evaluation & marks audit
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsReportCardOpen(true)}
            className="inline-flex items-center gap-1.5 text-xs text-[#22819A] font-bold hover:underline"
          >
            <Printer className="w-3.5 h-3.5" /> Full Transcript
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#FEF7F8] border-b border-[#CDD4DD] text-[#0F172A]/70 font-semibold uppercase">
                <th className="py-3.5 px-5">Examination Subject</th>
                <th className="py-3.5 px-4 text-center">Marks Earned</th>
                <th className="py-3.5 px-4 text-center">Total Marks</th>
                <th className="py-3.5 px-4 text-center">Score Bar</th>
                <th className="py-3.5 px-4 text-center">Letter Grade</th>
                <th className="py-3.5 px-4 text-center">Grade Point</th>
                <th className="py-3.5 px-5">Faculty Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#CDD4DD]/60">
              {studentResults.map((row) => {
                const pct = ((row.marksObtained / row.totalMarks) * 100).toFixed(1);
                return (
                  <tr key={row.id} className="hover:bg-[#FEF7F8]/60 transition-colors">
                    <td className="py-4 px-5 font-bold text-[#0F172A] text-sm">
                      {row.examTitle.split(":")[1]?.trim() || row.examTitle}
                    </td>
                    <td className="py-4 px-4 text-center font-extrabold text-[#0F172A] text-sm">
                      {row.marksObtained}
                    </td>
                    <td className="py-4 px-4 text-center text-[#0F172A]/60">
                      {row.totalMarks}
                    </td>
                    <td className="py-4 px-4 text-center min-w-[120px]">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 rounded-full bg-[#FEF7F8] border border-[#CDD4DD]/60 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#22819A] to-[#90C2E7] rounded-full"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="text-[11px] font-bold text-[#0F172A]/70 w-8 text-right">
                          {pct}%
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span
                        className={`inline-flex items-center px-3 py-0.5 rounded-full font-extrabold text-xs border ${
                          row.gradeLetter.startsWith("A")
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-blue-50 text-blue-700 border-blue-200"
                        }`}
                      >
                        {row.gradeLetter}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center font-black text-[#22819A] text-sm">
                      {row.gpa.toFixed(1)}
                    </td>
                    <td className="py-4 px-5 text-[#0F172A]/75 text-xs">
                      {row.remarks}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <ReportCardModal
        isOpen={isReportCardOpen}
        onClose={() => setIsReportCardOpen(false)}
        student={student}
        results={studentResults}
      />
    </div>
  );
}


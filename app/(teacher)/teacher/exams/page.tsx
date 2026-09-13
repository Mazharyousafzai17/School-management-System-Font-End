"use client";

import React, { useState } from "react";
import { Award, Save, CheckCircle2, Calculator, UploadCloud, Info } from "lucide-react";
import { useSchoolStore } from "@/lib/store";
import { ExamResult } from "@/types";

export default function TeacherExamsPage() {
  const { examResults } = useSchoolStore();
  const [selectedExam, setSelectedExam] = useState("Spring Comprehensive Term Finals: Mathematics");
  const [resultsState, setResultsState] = useState<ExamResult[]>(examResults);
  const [savedNotice, setSavedNotice] = useState(false);

  const calculateGrade = (marks: number, total: number) => {
    const pct = (marks / total) * 100;
    if (pct >= 90) return { letter: "A+", gpa: 4.0 };
    if (pct >= 85) return { letter: "A", gpa: 3.8 };
    if (pct >= 80) return { letter: "A-", gpa: 3.6 };
    if (pct >= 75) return { letter: "B+", gpa: 3.3 };
    if (pct >= 70) return { letter: "B", gpa: 3.0 };
    if (pct >= 65) return { letter: "B-", gpa: 2.7 };
    if (pct >= 60) return { letter: "C+", gpa: 2.3 };
    if (pct >= 50) return { letter: "C", gpa: 2.0 };
    return { letter: "F", gpa: 0.0 };
  };

  const handleMarkChange = (studentId: string, marks: number) => {
    setResultsState((prev) =>
      prev.map((r) => {
        if (r.studentId === studentId) {
          const { letter, gpa } = calculateGrade(marks, r.totalMarks);
          return {
            ...r,
            marksObtained: marks,
            gradeLetter: letter,
            gpa,
          };
        }
        return r;
      })
    );
  };

  const handleSaveAndSubmit = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-[#0F172A] tracking-tight">
            Examination Marks Entry & Grade Calculation
          </h2>
          <p className="text-xs text-[#0F172A]/60">
            Real-time automatic letter grade and GPA computation with administrative approval submission
          </p>
        </div>

        <div className="flex items-center gap-2">
          {savedNotice && (
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5 animate-in fade-in">
              <CheckCircle2 className="w-3.5 h-3.5" /> Marks Uploaded & Sent for Approval
            </span>
          )}
          <button
            onClick={handleSaveAndSubmit}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#22819A] hover:bg-[#1b687c] text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <UploadCloud className="w-3.5 h-3.5" /> Submit to Exam Controller
          </button>
        </div>
      </div>

      {/* Selectors & Legend */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="bg-white rounded-xl border border-[#CDD4DD] p-4 shadow-xs">
          <label className="block font-semibold text-[#0F172A]/70 uppercase mb-1">
            Target Examination
          </label>
          <select
            value={selectedExam}
            onChange={(e) => setSelectedExam(e.target.value)}
            className="w-full px-3 py-2 bg-[#FEF7F8] border border-[#CDD4DD] rounded-lg font-semibold text-[#0F172A]"
          >
            <option value="Spring Comprehensive Term Finals: Mathematics">
              Spring Comprehensive Term Finals: Mathematics
            </option>
            <option value="Fall Midterm Examination 2026: Physics">
              Fall Midterm Examination 2026: Physics
            </option>
          </select>
        </div>

        <div className="bg-white rounded-xl border border-[#CDD4DD] p-4 shadow-xs">
          <span className="block font-semibold text-[#0F172A]/70 uppercase mb-1">
            Subject & Maximum Marks
          </span>
          <div className="flex items-center justify-between text-xs font-bold text-[#0F172A] mt-1">
            <span>Mathematics (Grade 10-A)</span>
            <span className="text-[#22819A]">100 Total Marks</span>
          </div>
          <span className="text-[11px] text-[#0F172A]/60 block mt-1">Passing requirement: 50%</span>
        </div>

        <div className="bg-white rounded-xl border border-[#CDD4DD] p-4 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#90C2E7]/25 text-[#22819A] flex items-center justify-center shrink-0">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-xs text-[#0F172A] block">Auto Grade Engine</span>
            <span className="text-[11px] text-[#0F172A]/60 block">
              Grading scale: A+ (≥90%), A (≥85%), B+ (≥75%), B (≥70%), C (≥50%)
            </span>
          </div>
        </div>
      </div>

      {/* Grade Calculation Table */}
      <div className="bg-white rounded-xl border border-[#CDD4DD] shadow-xs overflow-hidden">
        <div className="p-4 border-b border-[#CDD4DD] bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-[#22819A]" />
            <h3 className="font-bold text-sm text-[#0F172A]">
              Marks Ledger ({resultsState.length} Candidates)
            </h3>
          </div>
          <span className="text-xs text-[#0F172A]/60">
            Edit marks directly below to see real-time grade & GPA re-calculation
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#FEF7F8] border-b border-[#CDD4DD] text-[#0F172A]/70 font-semibold uppercase">
                <th className="py-3 px-4">Roll #</th>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Marks Obtained (/100)</th>
                <th className="py-3 px-4">Percentage</th>
                <th className="py-3 px-4">Letter Grade</th>
                <th className="py-3 px-4">Grade Point (GPA)</th>
                <th className="py-3 px-4">Examiner Remark</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#CDD4DD]/60">
              {resultsState.map((res) => {
                const pct = ((res.marksObtained / res.totalMarks) * 100).toFixed(1);
                return (
                  <tr key={res.id} className="hover:bg-[#FEF7F8]/60">
                    <td className="py-3 px-4 font-mono font-bold text-[#22819A]">
                      #{res.rollNo}
                    </td>
                    <td className="py-3 px-4 font-bold text-[#0F172A]">
                      {res.studentName}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5">
                        <input
                          type="number"
                          min={0}
                          max={100}
                          value={res.marksObtained}
                          onChange={(e) =>
                            handleMarkChange(res.studentId, Number(e.target.value))
                          }
                          className="w-20 px-2.5 py-1 text-xs font-bold text-[#0F172A] bg-[#FEF7F8] border border-[#CDD4DD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22819A]"
                        />
                        <span className="text-[#0F172A]/50">/ 100</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-semibold text-[#0F172A]">
                      {pct}%
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                          res.gradeLetter.startsWith("A")
                            ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
                            : res.gradeLetter.startsWith("B")
                            ? "bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800"
                            : "bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800"
                        }`}
                      >
                        {res.gradeLetter}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-bold text-[var(--primary)]">
                      {res.gpa.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-[#0F172A]/70 italic">
                      {res.remarks}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

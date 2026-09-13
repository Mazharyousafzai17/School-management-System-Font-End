"use client";

import React from "react";
import { X, Printer, Award, Sparkles, CheckCircle2, Shield, Star } from "lucide-react";
import { Student, ExamResult } from "@/types";

interface ReportCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student;
  results: ExamResult[];
}

export function ReportCardModal({
  isOpen,
  onClose,
  student,
  results,
}: ReportCardModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const totalMarksEarned = results.reduce((acc, curr) => acc + curr.marksObtained, 0);
  const totalMaxMarks = results.reduce((acc, curr) => acc + curr.totalMarks, 0);
  const overallPercentage = totalMaxMarks > 0 ? ((totalMarksEarned / totalMaxMarks) * 100).toFixed(1) : "0";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-[#0F172A]/60 backdrop-blur-xs no-print" onClick={onClose} />

      <div className="relative bg-white rounded-3xl border border-[#CDD4DD] shadow-2xl max-w-3xl w-full p-6 sm:p-8 z-10 animate-in zoom-in-95 max-h-[94vh] overflow-y-auto">
        {/* Modal Controls */}
        <div className="flex items-center justify-between pb-5 border-b border-[#CDD4DD] no-print">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#90C2E7]/25 text-[#22819A] flex items-center justify-center shadow-2xs">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-[#0F172A] font-heading">
                Official Academic Transcript & Report Card
              </h2>
              <p className="text-xs text-[#0F172A]/60">
                Verified semester evaluation sheet for Fall Term 2026
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#22819A] text-white hover:bg-[#1b687c] text-xs font-bold shadow-xs transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" /> Print / Save PDF
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-[#0F172A]/60 hover:text-[#0F172A] hover:bg-[#FEF7F8] border border-[#CDD4DD] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Transcript Document */}
        <div className="mt-6 p-6 sm:p-8 bg-white border-2 border-[#CDD4DD] rounded-2xl text-xs space-y-6 relative overflow-hidden">
          {/* Subtle Background Watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
            <Award className="w-96 h-96 text-[#22819A]" />
          </div>

          {/* Institution Header */}
          <div className="text-center pb-5 border-b-2 border-[#22819A] relative">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#22819A] to-[#1b687c] text-white shadow-md shadow-[#22819A]/20 mb-2">
              <Sparkles className="w-7 h-7 text-[#90C2E7]" />
            </div>
            <h1 className="text-2xl font-black text-[#0F172A] uppercase tracking-wider font-heading">
              Apex International Academy
            </h1>
            <p className="text-xs text-[#0F172A]/65 mt-0.5 font-medium">
              Accredited International Baccalaureate & STEM Excellence Center • Campus ID: APX-9821
            </p>
            <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#90C2E7]/25 border border-[#90C2E7]/40 text-[#22819A] text-[11px] font-extrabold uppercase tracking-wider">
              <Star className="w-3.5 h-3.5 fill-[#22819A]" /> Official Term Grade Sheet • Academic Session 2025-2026
            </div>
          </div>

          {/* Student Demographics Banner & GPA Dial */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-4 bg-[#FEF7F8] rounded-xl border border-[#CDD4DD]">
            <div className="sm:col-span-3 grid grid-cols-2 gap-3 text-[11px]">
              <div>
                <span className="text-[#0F172A]/60 block font-medium">Student Full Name:</span>
                <strong className="text-[#0F172A] text-sm font-bold block">{student.name}</strong>
              </div>
              <div>
                <span className="text-[#0F172A]/60 block font-medium">Roll Number & Section:</span>
                <strong className="text-[#0F172A] text-sm font-bold block">
                  #{student.rollNo} • {student.grade} - Section {student.section}
                </strong>
              </div>
              <div>
                <span className="text-[#0F172A]/60 block font-medium">Academic Program:</span>
                <strong className="text-[#0F172A] font-semibold block">O-Level / High School STEM</strong>
              </div>
              <div>
                <span className="text-[#0F172A]/60 block font-medium">Class Teacher:</span>
                <strong className="text-[#22819A] font-semibold block">Prof. Usman Ali</strong>
              </div>
            </div>

            {/* GPA Dial */}
            <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-white border border-[#CDD4DD] text-center">
              <span className="text-[10px] uppercase tracking-wider font-bold text-[#0F172A]/60">
                Grade Point Average
              </span>
              <span className="text-2xl font-black text-[#22819A] leading-tight font-heading">
                {student.gpa}
              </span>
              <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-full mt-0.5">
                Scale 4.0 (A+)
              </span>
            </div>
          </div>

          {/* Grades Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-[#CDD4DD] text-[11px]">
              <thead>
                <tr className="bg-[#FEF7F8] border-b border-[#CDD4DD] font-extrabold text-[#0F172A] uppercase tracking-tight">
                  <th className="py-2.5 px-3 border-r border-[#CDD4DD]">Course / Examination Subject</th>
                  <th className="py-2.5 px-3 border-r border-[#CDD4DD] text-center">Marks Earned</th>
                  <th className="py-2.5 px-3 border-r border-[#CDD4DD] text-center">Max Marks</th>
                  <th className="py-2.5 px-3 border-r border-[#CDD4DD] text-center">Grade</th>
                  <th className="py-2.5 px-3 border-r border-[#CDD4DD] text-center">GPA</th>
                  <th className="py-2.5 px-3">Faculty Remark</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#CDD4DD]">
                {results.map((r, i) => (
                  <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
                    <td className="py-2.5 px-3 font-bold text-[#0F172A] border-r border-[#CDD4DD]">
                      {r.examTitle.split(":")[1]?.trim() || r.examTitle}
                    </td>
                    <td className="py-2.5 px-3 text-center font-extrabold text-[#0F172A] border-r border-[#CDD4DD]">
                      {r.marksObtained}
                    </td>
                    <td className="py-2.5 px-3 text-center text-[#0F172A]/60 border-r border-[#CDD4DD]">
                      {r.totalMarks}
                    </td>
                    <td className="py-2.5 px-3 text-center font-black text-[#22819A] border-r border-[#CDD4DD]">
                      <span className="px-2 py-0.5 rounded bg-[#90C2E7]/25 text-[#22819A]">
                        {r.gradeLetter}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-center font-bold text-[#0F172A] border-r border-[#CDD4DD]">
                      {r.gpa.toFixed(1)}
                    </td>
                    <td className="py-2.5 px-3 text-[#0F172A]/75 text-[10px] font-medium">
                      {r.remarks}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Performance Summary Banner */}
          <div className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-xl bg-[#90C2E7]/20 border border-[#90C2E7] gap-3">
            <div>
              <span className="text-xs font-bold text-[#0F172A] block">Cumulative Academic Standing:</span>
              <p className="text-[11px] text-[#0F172A]/70 mt-0.5">
                Total Score: <strong className="text-[#0F172A]">{totalMarksEarned} / {totalMaxMarks}</strong> ({overallPercentage}%) • Class Rank: <strong>1st Position</strong>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1.5 bg-[#22819A] text-white rounded-full font-bold text-xs shadow-2xs">
                Term Standing: Summa Cum Laude (A+)
              </span>
            </div>
          </div>

          {/* Official Signatures & Seal */}
          <div className="pt-6 grid grid-cols-3 gap-6 text-center text-[10px] text-[#0F172A]/70">
            <div className="border-t border-[#CDD4DD] pt-2 font-medium">
              <span className="block font-bold text-[#0F172A]">Usman Ali</span>
              Class Teacher / Faculty Incharge
            </div>
            <div className="border-t border-[#CDD4DD] pt-2 font-medium">
              <span className="block font-bold text-[#0F172A]">Dr. Arshad Khan</span>
              Examination Controller
            </div>
            <div className="border-t border-[#CDD4DD] pt-2 font-medium">
              <span className="block font-bold text-[#0F172A]">Dr. Eleanor Wright</span>
              Campus Principal & Director
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


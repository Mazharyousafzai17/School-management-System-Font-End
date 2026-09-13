"use client";

import React, { useState } from "react";
import {
  CheckSquare,
  CheckCircle2,
  Save,
  Users,
  Calendar,
  Sparkles,
  Clock,
} from "lucide-react";
import { useSchoolStore } from "@/lib/store";
import { StatusBadge } from "@/components/shared/StatusBadge";

export default function TeacherAttendancePage() {
  const { attendance, updateAttendance, bulkMarkAttendance } = useSchoolStore();
  const [selectedClass, setSelectedClass] = useState("Grade 10-A");
  const [date, setDate] = useState("2026-09-06");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [grade, section] = selectedClass.split("-");

  const classAttendance = attendance.filter(
    (a) => a.grade === grade && a.section === section
  );

  const presentCount = classAttendance.filter((r) => r.status === "Present").length;
  const absentCount = classAttendance.filter((r) => r.status === "Absent").length;
  const leaveCount = classAttendance.filter((r) => r.status === "Leave").length;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleMarkAll = (status: "Present" | "Absent" | "Leave") => {
    bulkMarkAttendance(date, grade, section, status);
    showToast(`All students marked as ${status}`);
  };

  const handleSave = () => {
    showToast("Attendance register synchronized successfully with school administration.");
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-[#0F172A] tracking-tight">
            Class Attendance Quick-Roll Call
          </h2>
          <p className="text-xs text-[#0F172A]/60">
            Quick bulk toggle (Present, Absent, Leave) for your assigned classes
          </p>
        </div>

        <div className="flex items-center gap-2">
          {toastMessage && (
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5 animate-in fade-in">
              <CheckCircle2 className="w-3.5 h-3.5" /> {toastMessage}
            </span>
          )}
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#22819A] hover:bg-[#1b687c] text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <Save className="w-3.5 h-3.5" /> Submit to Office
          </button>
        </div>
      </div>

      {/* Control Panel */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-[#CDD4DD] p-4 shadow-xs">
          <label className="block text-xs font-semibold text-[#0F172A]/70 uppercase mb-1">
            Assigned Class
          </label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-[#FEF7F8] border border-[#CDD4DD] rounded-lg font-semibold text-[#0F172A]"
          >
            <option value="Grade 10-A">Grade 10-A (Mathematics)</option>
            <option value="Grade 10-B">Grade 10-B (Mathematics)</option>
            <option value="Grade 9-B">Grade 9-B (Physics)</option>
          </select>
        </div>

        <div className="bg-white rounded-xl border border-[#CDD4DD] p-4 shadow-xs">
          <label className="block text-xs font-semibold text-[#0F172A]/70 uppercase mb-1">
            Roll Call Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-[#FEF7F8] border border-[#CDD4DD] rounded-lg text-[#0F172A]"
          />
        </div>

        <div className="bg-white rounded-xl border border-[#CDD4DD] p-4 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#0F172A]/70 uppercase block">Quick Action</span>
            <span className="text-[11px] text-[#0F172A]/60 block mt-0.5">Bulk mark all roster</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handleMarkAll("Present")}
              className="px-2.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-xs font-bold"
            >
              All Present
            </button>
            <button
              onClick={() => handleMarkAll("Absent")}
              className="px-2.5 py-1.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 text-xs font-bold"
            >
              All Absent
            </button>
          </div>
        </div>
      </div>

      {/* Student List with Quick 1-Click Toggles */}
      <div className="bg-white rounded-xl border border-[#CDD4DD] shadow-xs overflow-hidden">
        <div className="p-4 border-b border-[#CDD4DD] bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#22819A]" />
            <h3 className="font-bold text-sm text-[#0F172A]">
              Attendance Sheet ({selectedClass}) • {classAttendance.length} Students
            </h3>
          </div>
          <div className="flex items-center gap-3 text-xs font-semibold">
            <span className="text-emerald-700">{presentCount} Present</span>
            <span className="text-rose-700">{absentCount} Absent</span>
            <span className="text-amber-700">{leaveCount} Leave</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#FEF7F8] border-b border-[#CDD4DD] text-[#0F172A]/70 font-semibold uppercase">
                <th className="py-3 px-4">Roll #</th>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Current Status</th>
                <th className="py-3 px-4 text-right">Quick Toggle (Present / Absent / Leave)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#CDD4DD]/60">
              {classAttendance.map((row) => (
                <tr key={row.id} className="hover:bg-[#FEF7F8]/60">
                  <td className="py-3 px-4 font-mono font-bold text-[#22819A]">
                    #{row.rollNo}
                  </td>
                  <td className="py-3 px-4 font-bold text-[#0F172A]">
                    {row.studentName}
                  </td>
                  <td className="py-3 px-4">
                    <StatusBadge status={row.status} />
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button
                        onClick={() => updateAttendance(row.id, "Present")}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                          row.status === "Present"
                            ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30 scale-105"
                            : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 hover:text-emerald-700 dark:hover:text-emerald-300 border border-[#CDD4DD]"
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Present
                      </button>
                      <button
                        onClick={() => updateAttendance(row.id, "Absent")}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                          row.status === "Absent"
                            ? "bg-rose-600 text-white shadow-md shadow-rose-600/30 scale-105"
                            : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-rose-50 dark:hover:bg-rose-950/50 hover:text-rose-700 dark:hover:text-rose-300 border border-[#CDD4DD]"
                        }`}
                      >
                        <span className="w-4 h-4 flex items-center justify-center font-black">✕</span>
                        Absent
                      </button>
                      <button
                        onClick={() => updateAttendance(row.id, "Leave")}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                          row.status === "Leave"
                            ? "bg-amber-500 text-white shadow-md shadow-amber-500/30 scale-105"
                            : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-amber-50 dark:hover:bg-amber-950/50 hover:text-amber-700 dark:hover:text-amber-300 border border-[#CDD4DD]"
                        }`}
                      >
                        <Clock className="w-3.5 h-3.5" />
                        Leave
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

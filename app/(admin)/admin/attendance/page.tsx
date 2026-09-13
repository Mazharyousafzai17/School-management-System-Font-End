"use client";

import React, { useState } from "react";
import {
  CalendarCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Save,
  Users,
  Calendar,
  Download,
  CheckCheck,
} from "lucide-react";
import { useSchoolStore } from "@/lib/store";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { useToast } from "@/components/providers/ToastProvider";

export default function AttendancePage() {
  const { attendance, updateAttendance, bulkMarkAttendance } = useSchoolStore();
  const toast = useToast();
  const [selectedGrade, setSelectedGrade] = useState("Grade 10");
  const [selectedSection, setSelectedSection] = useState("A");
  const [selectedDate, setSelectedDate] = useState("2026-09-06");

  const filteredRecords = attendance.filter(
    (a) => a.grade === selectedGrade && a.section === selectedSection
  );

  const presentCount = filteredRecords.filter((r) => r.status === "Present").length;
  const absentCount = filteredRecords.filter((r) => r.status === "Absent").length;
  const leaveCount = filteredRecords.filter((r) => r.status === "Leave").length;
  const totalCount = filteredRecords.length;
  const presentPercent = totalCount > 0 ? ((presentCount / totalCount) * 100).toFixed(1) : "0";

  const handleMarkAllPresent = () => {
    bulkMarkAttendance(selectedDate, selectedGrade, selectedSection, "Present");
    toast.success(
      "Roll-Call Updated",
      `All ${filteredRecords.length} students in ${selectedGrade} - Sec ${selectedSection} marked Present.`
    );
  };

  const handleSaveAttendance = () => {
    toast.success(
      "Register Saved Successfully",
      `Daily attendance confirmed for ${selectedGrade} - Section ${selectedSection} on ${selectedDate}.`
    );
  };

  const handleExportCSV = () => {
    if (filteredRecords.length === 0) {
      toast.info("No Records", "There are no attendance records to export for this class.");
      return;
    }

    const headers = ["Roll #", "Student Name", "Class", "Section", "Date", "Status", "Remarks"];
    const rows = filteredRecords.map((r) => [
      `"${r.rollNo}"`,
      `"${r.studentName}"`,
      `"${r.grade}"`,
      `"${r.section}"`,
      `"${r.date}"`,
      `"${r.status}"`,
      `"${r.remarks || 'None'}"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `attendance_${selectedGrade}_${selectedSection}_${selectedDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success("Attendance Exported", `Downloaded CSV for ${selectedGrade}-${selectedSection}.`);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-black text-[var(--foreground)] tracking-tight">
            Daily Campus Attendance & Roll-Call Ledger
          </h2>
          <p className="text-xs text-[var(--foreground-muted)]">
            Conduct daily section roll-call, mark absences, export CSV logs, and view class statistics
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--foreground-muted)]/10 text-[var(--foreground)] text-xs font-semibold shadow-xs transition-colors"
            title="Download CSV report"
          >
            <Download className="w-3.5 h-3.5 text-indigo-500" /> Export CSV
          </button>
          <button
            onClick={handleMarkAllPresent}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold shadow-xs transition-colors"
          >
            <CheckCheck className="w-3.5 h-3.5" /> Mark All Present
          </button>
          <button
            onClick={handleSaveAttendance}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition-colors"
          >
            <Save className="w-3.5 h-3.5" /> Save Register
          </button>
        </div>
      </div>

      {/* Selector Toolbar & Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-4 shadow-xs flex flex-col justify-between">
          <label className="text-[11px] font-bold text-[var(--foreground-muted)] uppercase tracking-wider block mb-1.5">
            Target Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-[var(--background)] border border-[var(--border)] rounded-xl text-[var(--foreground)] focus:ring-2 focus:ring-indigo-500/30 outline-none"
          />
        </div>

        <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-4 shadow-xs flex flex-col justify-between">
          <label className="text-[11px] font-bold text-[var(--foreground-muted)] uppercase tracking-wider block mb-1.5">
            Class & Grade
          </label>
          <select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-[var(--background)] border border-[var(--border)] rounded-xl text-[var(--foreground)] focus:ring-2 focus:ring-indigo-500/30 outline-none font-medium"
          >
            <option value="Grade 9">Grade 9</option>
            <option value="Grade 10">Grade 10</option>
            <option value="Grade 11">Grade 11</option>
            <option value="Grade 12">Grade 12</option>
          </select>
        </div>

        <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-4 shadow-xs flex flex-col justify-between">
          <label className="text-[11px] font-bold text-[var(--foreground-muted)] uppercase tracking-wider block mb-1.5">
            Section
          </label>
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-[var(--background)] border border-[var(--border)] rounded-xl text-[var(--foreground)] focus:ring-2 focus:ring-indigo-500/30 outline-none font-medium"
          >
            <option value="A">Section A</option>
            <option value="B">Section B</option>
            <option value="C">Section C</option>
          </select>
        </div>

        <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-4 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-[var(--foreground-muted)] uppercase tracking-wider block">
              Present Ratio
            </span>
            <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400 block mt-0.5">
              {presentPercent}%
            </span>
          </div>
          <div className="text-right text-xs font-semibold space-y-0.5">
            <span className="block text-emerald-600 dark:text-emerald-400">{presentCount} Present</span>
            <span className="block text-rose-600 dark:text-rose-400">{absentCount} Absent</span>
            <span className="block text-amber-600 dark:text-amber-400">{leaveCount} Leave</span>
          </div>
        </div>
      </div>

      {/* Roll Call Student Register */}
      <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] shadow-xs overflow-hidden">
        <div className="p-4 border-b border-[var(--border)] bg-[var(--card)] flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[var(--foreground)]">
                Roll Call Sheet: {selectedGrade} - Section {selectedSection} ({selectedDate})
              </h3>
              <p className="text-[11px] text-[var(--foreground-muted)]">
                {filteredRecords.length} students enrolled in this section
              </p>
            </div>
          </div>
          <span className="text-[11px] text-[var(--foreground-muted)]">
            Click quick buttons <span className="font-bold text-emerald-600">P</span> / <span className="font-bold text-rose-600">A</span> / <span className="font-bold text-amber-600">L</span> to change status
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[var(--background)]/60 border-b border-[var(--border)] text-[var(--foreground-muted)] font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Roll #</th>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Attendance Status</th>
                <th className="py-3 px-4">Remarks / Excuse</th>
                <th className="py-3 px-4 text-right">Quick Toggle Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]/70">
              {filteredRecords.length > 0 ? (
                filteredRecords.map((rec) => (
                  <tr key={rec.id} className="hover:bg-[var(--foreground-muted)]/5 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                      #{rec.rollNo}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-[var(--foreground)]">
                      {rec.studentName}
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={rec.status} />
                    </td>
                    <td className="py-3.5 px-4 text-[var(--foreground-muted)] italic text-[11px]">
                      {rec.remarks || "No remarks logged"}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            updateAttendance(rec.id, "Present");
                            toast.info("Status Set", `${rec.studentName} marked Present`);
                          }}
                          className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                            rec.status === "Present"
                              ? "bg-emerald-600 text-white shadow-xs scale-105"
                              : "bg-[var(--background)] text-[var(--foreground-muted)] hover:bg-emerald-500/15 hover:text-emerald-600 border border-[var(--border)]"
                          }`}
                          title="Mark Present"
                        >
                          P
                        </button>
                        <button
                          onClick={() => {
                            updateAttendance(rec.id, "Absent");
                            toast.info("Status Set", `${rec.studentName} marked Absent`);
                          }}
                          className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                            rec.status === "Absent"
                              ? "bg-rose-600 text-white shadow-xs scale-105"
                              : "bg-[var(--background)] text-[var(--foreground-muted)] hover:bg-rose-500/15 hover:text-rose-600 border border-[var(--border)]"
                          }`}
                          title="Mark Absent"
                        >
                          A
                        </button>
                        <button
                          onClick={() => {
                            updateAttendance(rec.id, "Leave");
                            toast.info("Status Set", `${rec.studentName} marked Leave`);
                          }}
                          className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                            rec.status === "Leave"
                              ? "bg-amber-500 text-white shadow-xs scale-105"
                              : "bg-[var(--background)] text-[var(--foreground-muted)] hover:bg-amber-500/15 hover:text-amber-600 border border-[var(--border)]"
                          }`}
                          title="Mark Leave"
                        >
                          L
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-[var(--foreground-muted)]">
                    No students mapped to {selectedGrade} - Section {selectedSection}.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

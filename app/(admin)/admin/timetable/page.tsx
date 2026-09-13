"use client";

import React, { useState } from "react";
import {
  CalendarDays,
  Clock,
  MapPin,
  User,
  Filter,
  Info,
  X,
} from "lucide-react";
import { useSchoolStore } from "@/lib/store";
import { TimetableSlot } from "@/types";

export default function TimetablePage() {
  const { timetable } = useSchoolStore();
  const [selectedGrade, setSelectedGrade] = useState("Grade 10");
  const [selectedSection, setSelectedSection] = useState("A");
  const [activeSlot, setActiveSlot] = useState<TimetableSlot | null>(null);

  const days: ("Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday")[] = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];

  const periods = [
    { period: 1, time: "08:00 - 08:50" },
    { period: 2, time: "08:50 - 09:40" },
    { period: 3, time: "09:40 - 10:30" },
    { period: 0, time: "10:30 - 11:00", isBreak: true, label: "Morning Recess & Snack Break" },
    { period: 4, time: "11:00 - 11:50" },
    { period: 5, time: "11:50 - 12:40" },
    { period: 6, time: "12:40 - 13:30" },
    { period: 7, time: "13:30 - 14:15" },
  ];

  const getSlot = (day: string, periodNumber: number) => {
    return timetable.find(
      (slot) =>
        slot.day === day &&
        slot.period === periodNumber &&
        slot.grade === selectedGrade &&
        slot.section === selectedSection
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-[#0F172A] tracking-tight">
            Period-by-Period Interactive Schedule Matrix
          </h2>
          <p className="text-xs text-[#0F172A]/60">
            Weekly class schedule, lecture rooms, and instructor assignments
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-[#CDD4DD]">
            <span className="font-semibold text-[#0F172A]/70">Class:</span>
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="bg-transparent font-bold text-[#22819A] focus:outline-none"
            >
              <option value="Grade 9">Grade 9</option>
              <option value="Grade 10">Grade 10</option>
              <option value="Grade 11">Grade 11</option>
              <option value="Grade 12">Grade 12</option>
            </select>
          </div>

          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-[#CDD4DD]">
            <span className="font-semibold text-[#0F172A]/70">Section:</span>
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="bg-transparent font-bold text-[#22819A] focus:outline-none"
            >
              <option value="A">Section A</option>
              <option value="B">Section B</option>
            </select>
          </div>
        </div>
      </div>

      {/* Interactive Matrix Grid */}
      <div className="bg-white rounded-xl border border-[#CDD4DD] shadow-xs overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="bg-[#FEF7F8] border-b border-[#CDD4DD] text-xs font-semibold text-[#0F172A]/80 uppercase">
              <th className="py-3 px-3 w-32 border-r border-[#CDD4DD]">Period / Time</th>
              {days.map((day) => (
                <th key={day} className="py-3 px-3 border-r border-[#CDD4DD] last:border-r-0 text-center">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#CDD4DD]">
            {periods.map((p, pIdx) => {
              if (p.isBreak) {
                return (
                  <tr key={pIdx} className="bg-amber-50/60 dark:bg-amber-950/40 border-y border-[#CDD4DD]">
                    <td className="py-2.5 px-3 border-r border-[#CDD4DD] font-semibold text-[11px] text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                      {p.time}
                    </td>
                    <td colSpan={5} className="py-2.5 px-4 text-center font-bold text-xs text-amber-800 dark:text-amber-300 tracking-wide uppercase">
                      ☕ {p.label}
                    </td>
                  </tr>
                );
              }

              return (
                <tr key={pIdx} className="hover:bg-[#FEF7F8]/40 transition-colors">
                  <td className="py-3 px-3 border-r border-[#CDD4DD] align-top bg-[#FEF7F8]/50">
                    <span className="font-bold text-xs text-[#0F172A] block">
                      Period {p.period}
                    </span>
                    <span className="text-[10px] text-[#0F172A]/60 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3 text-[#22819A]" /> {p.time}
                    </span>
                  </td>

                  {days.map((day) => {
                    const slot = getSlot(day, p.period);
                    const getSlotColor = (subj: string) => {
                      if (subj.includes("Math")) return "border-l-4 border-l-[#22819A] bg-[#22819A]/10 text-[#0F172A] hover:border-[#22819A]";
                      if (subj.includes("Phys")) return "border-l-4 border-l-sky-500 bg-sky-50/80 dark:bg-sky-950/50 text-sky-950 dark:text-sky-200 hover:border-sky-500";
                      if (subj.includes("Chem")) return "border-l-4 border-l-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/50 text-emerald-950 dark:text-emerald-200 hover:border-emerald-500";
                      if (subj.includes("Comp") || subj.includes("Robot")) return "border-l-4 border-l-indigo-500 bg-indigo-50/80 dark:bg-indigo-950/50 text-indigo-950 dark:text-indigo-200 hover:border-indigo-500";
                      if (subj.includes("Eng") || subj.includes("Debat")) return "border-l-4 border-l-amber-500 bg-amber-50/80 dark:bg-amber-950/50 text-amber-950 dark:text-amber-200 hover:border-amber-500";
                      if (subj.includes("Bio")) return "border-l-4 border-l-teal-500 bg-teal-50/80 dark:bg-teal-950/50 text-teal-950 dark:text-teal-200 hover:border-teal-500";
                      return "border-l-4 border-l-[var(--secondary)] bg-[var(--card-subtle)] hover:bg-[var(--card-bg)] text-[var(--text-main)]";
                    };

                    return (
                      <td
                        key={day}
                        className="py-3 px-2.5 border-r border-[#CDD4DD] last:border-r-0 align-top"
                      >
                        {slot ? (
                          <div
                            onClick={() => setActiveSlot(slot)}
                            className={`p-3 rounded-xl border border-[#CDD4DD] shadow-2xs hover:shadow-md transition-all duration-200 cursor-pointer group ${getSlotColor(slot.subject)}`}
                          >
                            <span className="font-extrabold text-sm block truncate group-hover:text-[#22819A] transition-colors">
                              {slot.subject}
                            </span>
                            <span className="text-xs font-semibold text-[#0F172A]/70 flex items-center gap-1 mt-1.5 truncate">
                              <User className="w-3.5 h-3.5 text-[#22819A]" /> {slot.teacherName}
                            </span>
                            <span className="text-[11px] font-medium text-[#0F172A]/55 flex items-center gap-1 mt-1 truncate">
                              <MapPin className="w-3 h-3 text-[#90C2E7]" /> {slot.room}
                            </span>
                          </div>
                        ) : (
                          <div className="h-20 rounded-xl border border-dashed border-[#CDD4DD]/80 flex items-center justify-center text-xs text-[#0F172A]/40 font-medium">
                            Study Hall
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Slot Details Modal */}
      {activeSlot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-[#0F172A]/50 backdrop-blur-xs" onClick={() => setActiveSlot(null)} />
          <div className="relative bg-white rounded-2xl border border-[#CDD4DD] shadow-2xl max-w-sm w-full p-6 z-10 animate-in zoom-in-95 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#CDD4DD]">
              <h3 className="font-bold text-sm text-[#0F172A]">Timetable Slot Details</h3>
              <button onClick={() => setActiveSlot(null)} className="p-1 rounded text-[#0F172A]/50 hover:text-[#0F172A]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <div className="p-3 rounded-lg bg-[#FEF7F8] border border-[#CDD4DD]">
                <span className="text-base font-bold text-[#22819A] block">{activeSlot.subject}</span>
                <span className="text-[11px] text-[#0F172A]/60">
                  {activeSlot.day} • Period {activeSlot.period} ({activeSlot.startTime} - {activeSlot.endTime})
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-[#0F172A]/60">Instructor:</span>
                  <span className="font-semibold text-[#0F172A]">{activeSlot.teacherName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#0F172A]/60">Assigned Hall / Lab:</span>
                  <span className="font-semibold text-[#0F172A]">{activeSlot.room}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#0F172A]/60">Class Group:</span>
                  <span className="font-semibold text-[#0F172A]">{activeSlot.grade} - Section {activeSlot.section}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-[#CDD4DD] flex justify-end">
              <button
                onClick={() => setActiveSlot(null)}
                className="px-4 py-1.5 bg-[#22819A] text-white rounded-lg font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

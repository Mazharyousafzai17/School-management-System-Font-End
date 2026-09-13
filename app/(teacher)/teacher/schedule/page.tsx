"use client";

import React, { useState } from "react";
import {
  CalendarDays,
  Clock,
  MapPin,
  FileText,
  BookOpen,
  Sparkles,
} from "lucide-react";
import { useSchoolStore } from "@/lib/store";

export default function TeacherSchedulePage() {
  const { timetable } = useSchoolStore();
  const [selectedDay, setSelectedDay] = useState("Monday");

  // Usman Ali's timetable slots
  const mySlots = timetable.filter((s) => s.teacherId === "tch-1");

  const days: ("Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday")[] = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];

  const currentDaySlots = mySlots
    .filter((s) => s.day === selectedDay)
    .sort((a, b) => a.period - b.period);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-[#0F172A] tracking-tight">
            Personal Instructional Schedule
          </h2>
          <p className="text-xs text-[#0F172A]/60">
            Weekly class schedule with allocated rooms, lecture timings, and lesson protocols
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-white rounded-xl border border-[#CDD4DD]">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedDay === day
                  ? "bg-[#22819A] text-white shadow-xs"
                  : "text-[#0F172A]/70 hover:text-[#0F172A] hover:bg-[#FEF7F8]"
              }`}
            >
              {day.slice(0, 3)}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Day Timeline */}
      <div className="bg-white rounded-xl border border-[#CDD4DD] p-6 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-[#CDD4DD] mb-6">
          <div className="flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-[#22819A]" />
            <h3 className="font-bold text-base text-[#0F172A]">
              {selectedDay} Teaching Timeline
            </h3>
          </div>
          <span className="text-xs font-semibold text-[#22819A] px-2.5 py-1 rounded-full bg-[#90C2E7]/20 border border-[#90C2E7]/40">
            {currentDaySlots.length} Scheduled Lectures
          </span>
        </div>

        {currentDaySlots.length > 0 ? (
          <div className="space-y-4">
            {currentDaySlots.map((slot) => (
              <div
                key={slot.id}
                className="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--card-subtle)] hover:bg-[var(--card-bg)] hover:border-[var(--primary)] hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--primary)] text-white flex flex-col items-center justify-center font-bold shrink-0 shadow-xs">
                    <span className="text-[10px] uppercase opacity-80">Period</span>
                    <span className="text-sm leading-none mt-0.5">{slot.period}</span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-base text-[var(--text-main)]">{slot.subject}</h4>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[var(--card-bg)] border border-[var(--border-color)] text-[var(--primary)]">
                        {slot.grade} - Section {slot.section}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-[#0F172A]/70 mt-1.5 flex-wrap">
                      <span className="flex items-center gap-1 font-medium text-[#0F172A]">
                        <Clock className="w-3.5 h-3.5 text-[#22819A]" /> {slot.startTime} - {slot.endTime}
                      </span>
                      <span className="flex items-center gap-1 font-medium text-[#0F172A]">
                        <MapPin className="w-3.5 h-3.5 text-[#90C2E7]" /> {slot.room}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => alert(`Opening lesson plan notes for ${slot.subject} (${slot.grade}-${slot.section})`)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#CDD4DD] bg-white hover:bg-[#FEF7F8] text-[#22819A] font-semibold text-xs transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" /> Lesson Notes
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-[#0F172A]/50 text-sm">
            No scheduled lectures for {selectedDay}. Dedicated faculty office hours & grading day.
          </div>
        )}
      </div>
    </div>
  );
}

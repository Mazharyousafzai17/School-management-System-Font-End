"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  GraduationCap,
  Users,
  CalendarCheck,
  Receipt,
  ArrowRight,
  TrendingUp,
  UserPlus,
  CalendarDays,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  BookOpen,
  Award,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { MetricCard } from "@/components/shared/MetricCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { useSchoolStore } from "@/lib/store";

export default function AdminDashboardPage() {
  const { students, teachers, challans, attendance } = useSchoolStore();
  const [selectedDay, setSelectedDay] = useState<number | null>(4); // Default to Friday

  const totalStudents = 1420;
  const facultyCount = 86;
  const attendanceToday = 94.2;
  const feeCollected = 84200;

  const weeklyData = [
    { day: "Monday", short: "Mon", rate: 96.4, present: 1368, absent: 52 },
    { day: "Tuesday", short: "Tue", rate: 95.1, present: 1350, absent: 70 },
    { day: "Wednesday", short: "Wed", rate: 93.8, present: 1332, absent: 88 },
    { day: "Thursday", short: "Thu", rate: 94.9, present: 1347, absent: 73 },
    { day: "Friday (Today)", short: "Fri", rate: 94.2, present: 1338, absent: 82 },
  ];

  const activeDay = selectedDay !== null ? weeklyData[selectedDay] : weeklyData[4];

  return (
    <div className="space-y-6">
      {/* Top Welcome & Campus Health Banner */}
      <div className="p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[var(--gradient-from)] to-[var(--gradient-to)] flex items-center justify-center text-white shadow-md shadow-[var(--shadow-color)] shrink-0">
            <Sparkles className="w-7 h-7 text-white/80" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-[var(--text-main)] font-heading">
                Good afternoon, Dr. Eleanor Wright
              </h2>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                All Systems Operational
              </span>
            </div>
            <p className="text-sm text-[var(--text-muted)] mt-1">
              Apex International Academy • Academic Session 2025-2026 (Fall Semester)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/students"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#CDD4DD] text-sm font-bold text-[#0F172A] hover:border-[#22819A] hover:bg-[#FEF7F8] transition-all shadow-2xs"
          >
            <UserPlus className="w-4 h-4 text-[#22819A]" />
            <span>Admissions</span>
          </Link>
          <Link
            href="/admin/attendance"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#22819A] text-white text-sm font-bold hover:bg-[#1b687c] transition-all shadow-xs"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Take Roll-Call</span>
          </Link>
        </div>
      </div>

      {/* Campus Snapshot KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Enrolled Students"
          value={totalStudents.toLocaleString()}
          icon={GraduationCap}
          change={{ value: "+28 new admissions", isPositive: true }}
          subtitle="Grades 9 through 12"
        />
        <MetricCard
          title="Faculty & Teachers"
          value={facultyCount}
          icon={Users}
          change={{ value: "100% active roster", isPositive: true }}
          subtitle="5 academic departments"
        />
        <MetricCard
          title="Attendance Today"
          value={`${attendanceToday}%`}
          icon={CalendarCheck}
          change={{ value: "+1.2% vs yesterday", isPositive: true }}
          subtitle="1,338 present • 82 absent"
        />
        <MetricCard
          title="Term Fees Collected"
          value={`$${feeCollected.toLocaleString()}`}
          icon={Receipt}
          change={{ value: "88.5% collection rate", isPositive: true }}
          subtitle="Challan batch Sept 2026"
        />
      </div>

      {/* Charts & Interactive Operational Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance Visual Trends */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#CDD4DD] p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#CDD4DD]/70 gap-2">
              <div>
                <h3 className="text-base font-extrabold text-[#0F172A] font-heading flex items-center gap-2">
                  <span>Weekly Attendance Roll-Call Trend</span>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#90C2E7]/25 text-[#22819A]">
                    5-Day Cycle
                  </span>
                </h3>
                <p className="text-xs text-[#0F172A]/60 mt-0.5">
                  Click on any day bar to inspect detailed present & absent distribution
                </p>
              </div>

              {/* Day stats pill */}
              <div className="flex items-center gap-2 text-xs bg-[#FEF7F8] px-3 py-1.5 rounded-xl border border-[#CDD4DD]">
                <span className="font-semibold text-[#0F172A]">{activeDay.day}:</span>
                <span className="font-extrabold text-[#22819A]">{activeDay.rate}%</span>
                <span className="text-[#0F172A]/50">({activeDay.present} present)</span>
              </div>
            </div>

            {/* Rich Interactive Bar / Area Chart */}
            <div className="pt-8 pb-4">
              <div className="h-48 flex items-end justify-between gap-4 px-3">
                {weeklyData.map((bar, i) => {
                  const isSelected = selectedDay === i;
                  return (
                    <button
                      key={i}
                      onClick={() => setSelectedDay(i)}
                      className="flex-1 flex flex-col items-center gap-2.5 h-full justify-end group cursor-pointer focus:outline-none"
                    >
                      <span
                        className={`text-xs font-bold transition-colors ${
                          isSelected
                            ? "text-[#22819A] scale-110"
                            : "text-[#0F172A]/60 group-hover:text-[#22819A]"
                        }`}
                      >
                        {bar.rate}%
                      </span>
                      <div className="w-full max-w-[56px] h-full flex items-end bg-[#FEF7F8] rounded-t-xl overflow-hidden p-1 border border-[#CDD4DD]/40">
                        <div
                          className={`w-full rounded-t-lg transition-all duration-300 ${
                            isSelected
                              ? "bg-gradient-to-t from-[#22819A] to-[#90C2E7] shadow-md shadow-[#22819A]/30"
                              : "bg-gradient-to-t from-[#22819A]/70 to-[#90C2E7]/70 group-hover:from-[#22819A] group-hover:to-[#90C2E7]"
                          }`}
                          style={{ height: `${(bar.rate / 100) * 100}%` }}
                        />
                      </div>
                      <span
                        className={`text-xs font-bold transition-colors ${
                          isSelected
                            ? "text-[#22819A] underline decoration-2 underline-offset-4"
                            : "text-[#0F172A]/70 group-hover:text-[#0F172A]"
                        }`}
                      >
                        {bar.short}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#CDD4DD]/70 flex flex-wrap items-center justify-between gap-2 text-xs text-[#0F172A]/70">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#22819A]" /> Weekly Average: <strong>94.88%</strong>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#90C2E7]" /> Minimum Standard: 90.0%
              </span>
            </div>
            <Link
              href="/admin/attendance"
              className="font-bold text-[#22819A] hover:underline flex items-center gap-1"
            >
              <span>Full Attendance Logs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Academic Operations & Quick Shortcuts */}
        <div className="bg-white rounded-2xl border border-[#CDD4DD] p-6 shadow-xs flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-extrabold text-[#0F172A] font-heading">
                Operational Highlights
              </h3>
              <span className="text-xs font-bold text-[#22819A] bg-[#90C2E7]/20 px-2.5 py-0.5 rounded-full">
                Live Status
              </span>
            </div>

            {/* Micro Progress Bars */}
            <div className="space-y-3.5 mt-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-[#0F172A]">Term Syllabus Velocity</span>
                  <span className="font-bold text-[#22819A]">42.5% Completed</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#FEF7F8] border border-[#CDD4DD]/60 overflow-hidden">
                  <div className="h-full bg-[#22819A] rounded-full" style={{ width: "42.5%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-[#0F172A]">Faculty Workload Allocation</span>
                  <span className="font-bold text-emerald-700">100% Covered</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#FEF7F8] border border-[#CDD4DD]/60 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: "100%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-[#0F172A]">Fee Collection Clearance</span>
                  <span className="font-bold text-[#22819A]">88.5% Settled</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#FEF7F8] border border-[#CDD4DD]/60 overflow-hidden">
                  <div className="h-full bg-[#90C2E7] rounded-full" style={{ width: "88.5%" }} />
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 pt-5 border-t border-[#CDD4DD]/70 space-y-2.5">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#0F172A]/50 mb-2">
                Priority Shortcuts
              </h4>

              <Link
                href="/admin/students"
                className="group p-3 rounded-xl border border-[#CDD4DD] hover:border-[#22819A] hover:bg-[#FEF7F8] flex items-center justify-between transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#90C2E7]/25 text-[#22819A] flex items-center justify-center group-hover:bg-[#22819A] group-hover:text-white transition-colors">
                    <UserPlus className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-xs text-[#0F172A] block">Enrol New Student</span>
                    <span className="text-[11px] text-[#0F172A]/50">Admissions form & documents</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#0F172A]/40 group-hover:text-[#22819A] group-hover:translate-x-1 transition-all" />
              </Link>

              <Link
                href="/admin/fees"
                className="group p-3 rounded-xl border border-[#CDD4DD] hover:border-[#22819A] hover:bg-[#FEF7F8] flex items-center justify-between transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#90C2E7]/25 text-[#22819A] flex items-center justify-center group-hover:bg-[#22819A] group-hover:text-white transition-colors">
                    <Receipt className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-xs text-[#0F172A] block">Generate Challans</span>
                    <span className="text-[11px] text-[#0F172A]/50">Print 3-part bank vouchers</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#0F172A]/40 group-hover:text-[#22819A] group-hover:translate-x-1 transition-all" />
              </Link>

              <Link
                href="/admin/timetable"
                className="group p-3 rounded-xl border border-[#CDD4DD] hover:border-[#22819A] hover:bg-[#FEF7F8] flex items-center justify-between transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#90C2E7]/25 text-[#22819A] flex items-center justify-center group-hover:bg-[#22819A] group-hover:text-white transition-colors">
                    <CalendarDays className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-xs text-[#0F172A] block">7-Period Schedule</span>
                    <span className="text-[11px] text-[#0F172A]/50">Room & faculty allocation</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#0F172A]/40 group-hover:text-[#22819A] group-hover:translate-x-1 transition-all" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Admissions & Fee Challan Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Admissions */}
        <div className="bg-white rounded-2xl border border-[#CDD4DD] p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-[#CDD4DD]/70 mb-3">
            <div>
              <h3 className="text-base font-extrabold text-[#0F172A] font-heading">
                Recent Student Enrolments
              </h3>
              <p className="text-xs text-[#0F172A]/60">Newly verified pupil admissions</p>
            </div>
            <Link
              href="/admin/students"
              className="text-xs font-bold text-[#22819A] hover:underline flex items-center gap-1"
            >
              <span>View Directory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-[#CDD4DD]/60 text-xs">
            {students.slice(0, 4).map((s) => (
              <div key={s.id} className="py-3 flex items-center justify-between hover:bg-[#FEF7F8] px-2 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#90C2E7]/25 text-[#22819A] font-bold flex items-center justify-center text-xs">
                    {s.name.charAt(0)}
                  </div>
                  <div>
                    <span className="font-bold text-[#0F172A] block text-sm">{s.name}</span>
                    <span className="text-[11px] text-[#0F172A]/60">
                      {s.grade} - Section {s.section} • Roll #{s.rollNo} • GPA {s.gpa}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <StatusBadge status={s.status} />
                  <span className="block text-[10px] text-[#0F172A]/40 mt-1 font-medium">
                    {s.admissionDate}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fee Collection Snapshot */}
        <div className="bg-white rounded-2xl border border-[#CDD4DD] p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-[#CDD4DD]/70 mb-3">
            <div>
              <h3 className="text-base font-extrabold text-[#0F172A] font-heading">
                Pending Fee Challans
              </h3>
              <p className="text-xs text-[#0F172A]/60">Unsettled vouchers awaiting bank clearance</p>
            </div>
            <Link
              href="/admin/fees"
              className="text-xs font-bold text-[#22819A] hover:underline flex items-center gap-1"
            >
              <span>Manage Challans</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-[#CDD4DD]/60 text-xs">
            {challans.slice(0, 4).map((c) => (
              <div key={c.id} className="py-3 flex items-center justify-between hover:bg-[#FEF7F8] px-2 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 font-bold flex items-center justify-center text-xs border border-amber-200">
                    <Receipt className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-[#0F172A] block text-sm">{c.studentName}</span>
                    <span className="text-[11px] text-[#0F172A]/60">
                      {c.challanNo} • Due: <strong className="text-rose-600">{c.dueDate}</strong>
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-extrabold text-[#0F172A] block text-sm">${c.totalAmount}.00</span>
                  <StatusBadge status={c.status} className="mt-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


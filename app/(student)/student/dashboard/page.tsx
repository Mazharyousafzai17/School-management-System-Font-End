"use client";

import React, { useState } from "react";
import {
  Award,
  CalendarCheck,
  ClipboardList,
  BookOpen,
  Clock,
  MapPin,
  Calendar,
  Sparkles,
  Bell,
  Search,
  CheckCircle2,
  FileText,
} from "lucide-react";
import { MetricCard } from "@/components/shared/MetricCard";
import { DataTable, Column } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { useSchoolStore } from "@/lib/store";
import { Exam, TimetableSlot, Assignment, AttendanceRecord } from "@/types";

type ActiveTab = "Exam" | "Classes" | "Assignments" | "Attendance";

export default function StudentDashboardPage() {
  const { exams, timetable, assignments, attendance } = useSchoolStore();
  const [activeTab, setActiveTab] = useState<ActiveTab>("Exam");
  const [tabSearch, setTabSearch] = useState("");

  // Student specific data (Ayan Ahmed, Grade 10-A)
  const studentExams = exams;
  const studentTodayClasses = timetable.filter(
    (s) => s.day === "Friday" && s.grade === "Grade 10" && s.section === "A"
  );
  const studentAssignments = assignments.filter(
    (a) => a.grade === "Grade 10" && a.section === "A"
  );
  const studentAttendance = attendance.filter((a) => a.studentId === "std-1");

  // Announcements
  const announcements = [
    {
      title: "Science & Robotics Olympiad Registrations Open",
      date: "Sep 05, 2026",
      desc: "Inter-school robotics challenge submissions are due on Sep 22 in Makerspace Lab.",
      badge: "Competition",
    },
    {
      title: "Fall 2026 Midterm Date Sheet Published",
      date: "Sep 03, 2026",
      desc: "Comprehensive Midterm Examinations will commence from October 15, 2026.",
      badge: "Academic",
    },
  ];

  // 1. Exam Table Columns
  const examColumns: Column<Exam>[] = [
    {
      header: "Exam Subject",
      cell: (e) => (
        <div>
          <span className="font-bold text-[#0F172A] block">{e.subject}</span>
          <span className="text-[11px] text-[#0F172A]/60">{e.title}</span>
        </div>
      ),
    },
    {
      header: "Type",
      cell: (e) => (
        <span className="font-semibold text-xs px-2 py-0.5 rounded bg-[#90C2E7]/25 text-[#22819A]">
          {e.type}
        </span>
      ),
    },
    {
      header: "Date & Time",
      cell: (e) => (
        <span className="font-medium text-xs text-[#0F172A]">
          {e.date} • {e.time}
        </span>
      ),
    },
    {
      header: "Room",
      cell: (e) => (
        <span className="text-xs text-[#0F172A] flex items-center gap-1 font-medium">
          <MapPin className="w-3 h-3 text-[#22819A]" /> {e.room}
        </span>
      ),
    },
    {
      header: "Passing Scheme",
      cell: (e) => (
        <span className="font-bold text-xs text-[#0F172A]">
          {e.passingMarks} / {e.totalMarks} Marks
        </span>
      ),
    },
    {
      header: "Status",
      cell: (e) => <StatusBadge status={e.status} />,
    },
  ];

  // 2. Classes Table Columns
  const classColumns: Column<TimetableSlot>[] = [
    {
      header: "Period",
      cell: (s) => (
        <span className="font-bold text-xs text-[#22819A] px-2 py-0.5 rounded bg-[#90C2E7]/20 border border-[#90C2E7]/30">
          Period {s.period}
        </span>
      ),
    },
    {
      header: "Subject",
      accessorKey: "subject",
      className: "font-bold text-[#0F172A]",
    },
    {
      header: "Time Timing",
      cell: (s) => (
        <span className="font-medium text-xs text-[#0F172A] flex items-center gap-1">
          <Clock className="w-3 h-3 text-[#22819A]" /> {s.startTime} - {s.endTime}
        </span>
      ),
    },
    {
      header: "Instructor",
      accessorKey: "teacherName",
    },
    {
      header: "Room Allocation",
      cell: (s) => (
        <span className="text-xs font-semibold text-[#0F172A] flex items-center gap-1">
          <MapPin className="w-3 h-3 text-[#90C2E7]" /> {s.room}
        </span>
      ),
    },
    {
      header: "Schedule Status",
      cell: () => <StatusBadge status="Active" />,
    },
  ];

  // 3. Assignments Table Columns
  const assignmentColumns: Column<Assignment>[] = [
    {
      header: "Task Title",
      cell: (a) => (
        <div>
          <span className="font-bold text-[#0F172A] block">{a.title}</span>
          <span className="text-[11px] text-[#0F172A]/60 max-w-sm truncate block">{a.description}</span>
        </div>
      ),
    },
    {
      header: "Subject",
      accessorKey: "subject",
      className: "font-semibold text-[#22819A]",
    },
    {
      header: "Due Deadline",
      cell: (a) => (
        <span className="font-bold text-xs text-rose-600 flex items-center gap-1">
          <Clock className="w-3 h-3" /> {a.dueDate}
        </span>
      ),
    },
    {
      header: "Maximum Marks",
      cell: (a) => (
        <span className="font-bold text-xs text-[#0F172A]">{a.maxMarks}</span>
      ),
    },
    {
      header: "Status",
      cell: () => <StatusBadge status="Submitted" />,
    },
  ];

  // 4. Attendance Table Columns
  const attendanceColumns: Column<AttendanceRecord>[] = [
    {
      header: "Date",
      accessorKey: "date",
      className: "font-semibold text-[#0F172A]",
    },
    {
      header: "Class & Section",
      cell: (att) => (
        <span>{att.grade} - Section {att.section}</span>
      ),
    },
    {
      header: "Attendance Status",
      cell: (att) => <StatusBadge status={att.status} />,
    },
    {
      header: "Remarks / Record",
      cell: (att) => (
        <span className="text-xs text-[#0F172A]/70 italic">
          {att.remarks || "Regular session present"}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Academic KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Cumulative CGPA"
          value="3.84 / 4.0"
          icon={Award}
          change={{ value: "Rank 3 in Class", isPositive: true }}
          subtitle="Grade 10-A Honors"
        />
        <MetricCard
          title="Attendance Rate"
          value="96.5%"
          icon={CalendarCheck}
          change={{ value: "+0.8% this term", isPositive: true }}
          subtitle="48 of 50 days present"
        />
        <MetricCard
          title="Coursework Pending"
          value="1 Task"
          icon={ClipboardList}
          change={{ value: "Due in 4 days", isPositive: true }}
          subtitle="Mathematics problem set"
        />
        <MetricCard
          title="Next Examination"
          value="Math Midterm"
          icon={Calendar}
          subtitle="Oct 15, 2026 • 09:00 AM"
        />
      </div>

      {/* Announcements & Today's Timetable Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Campus Announcements */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#CDD4DD] p-6 lg:p-7 shadow-xs">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <Bell className="w-5 h-5 text-[#22819A]" />
              <h2 className="text-base lg:text-lg font-bold text-[#0F172A]">Campus Announcements & Noticeboard</h2>
            </div>
            <span className="text-xs font-bold text-[#22819A] bg-[#90C2E7]/25 px-3 py-1 rounded-full">Apex Academy News</span>
          </div>

          <div className="space-y-4">
            {announcements.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-[#CDD4DD] bg-[#FEF7F8]">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-[#0F172A]">{item.title}</span>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#90C2E7]/25 text-[#22819A] uppercase tracking-wider">
                    {item.badge}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#0F172A]/75 mt-1.5 leading-relaxed">{item.desc}</p>
                <span className="text-xs text-[#0F172A]/50 mt-2 block font-medium">{item.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Timetable Preview Card */}
        <div className="bg-white rounded-2xl border border-[#CDD4DD] p-6 lg:p-7 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base lg:text-lg font-bold text-[#0F172A]">Today&apos;s Schedule</h2>
              <span className="text-xs font-bold text-[#22819A]">Friday Routine</span>
            </div>

            <div className="space-y-3 text-sm">
              {studentTodayClasses.slice(0, 3).map((slot, i) => (
                <div key={i} className="p-3 rounded-xl border border-[#CDD4DD] bg-[#FEF7F8]">
                  <div className="flex justify-between font-bold text-[#0F172A]">
                    <span>{slot.subject}</span>
                    <span className="text-[#22819A] font-extrabold">P{slot.period}</span>
                  </div>
                  <div className="flex justify-between text-xs text-[#0F172A]/70 mt-1">
                    <span>{slot.startTime} - {slot.endTime}</span>
                    <span className="font-medium text-[#0F172A]">{slot.room}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-[#CDD4DD] text-center text-sm mt-4">
            <button
              onClick={() => setActiveTab("Classes")}
              className="text-[#22819A] font-bold hover:underline cursor-pointer"
            >
              View Full Period Matrix ↓
            </button>
          </div>
        </div>
      </div>

      {/* TOP FILTER TABS ON MAIN PAGE (Strictly as specified in the prompt) */}
      <div className="bg-white rounded-2xl border border-[#CDD4DD] shadow-xs p-6 lg:p-8 space-y-6">
        <div>
          <h2 className="text-lg lg:text-xl font-extrabold text-[#0F172A] tracking-tight">
            Academic Operations Hub
          </h2>
          <p className="text-sm text-[#0F172A]/70 mt-1">
            Switch between dynamic tabs to inspect exams, daily lectures, assignments, and attendance records
          </p>
        </div>

        {/* Top Filter Tabs: [Exam] | [Classes] | [Assignments] | [Attendance] */}
        <div className="flex items-center gap-3 p-2.5 bg-[#FEF7F8] rounded-2xl border border-[#CDD4DD] max-w-fit flex-wrap shadow-2xs">
          {(["Exam", "Classes", "Assignments", "Attendance"] as ActiveTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setTabSearch("");
              }}
              className={`px-8 py-3 rounded-xl text-sm sm:text-base font-black tracking-wide transition-all duration-150 cursor-pointer ${
                activeTab === tab
                  ? "bg-[var(--primary)] text-white shadow-md shadow-[var(--shadow-color)] ring-2 ring-[var(--secondary)]/60 scale-[1.02]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--card-bg)]"
              }`}
            >
              [{tab}]
            </button>
          ))}
        </div>


        {/* Tab Content Rendering dynamically with search & status badges */}
        <div className="pt-2">
          {activeTab === "Exam" && (
            <DataTable
              columns={examColumns}
              data={studentExams.filter((e) =>
                e.title.toLowerCase().includes(tabSearch.toLowerCase()) ||
                e.subject.toLowerCase().includes(tabSearch.toLowerCase())
              )}
              searchPlaceholder="Search exams, subjects..."
              searchQuery={tabSearch}
              onSearchChange={setTabSearch}
              pageSize={5}
            />
          )}

          {activeTab === "Classes" && (
            <DataTable
              columns={classColumns}
              data={studentTodayClasses.filter((c) =>
                c.subject.toLowerCase().includes(tabSearch.toLowerCase()) ||
                c.teacherName.toLowerCase().includes(tabSearch.toLowerCase())
              )}
              searchPlaceholder="Search class timetable..."
              searchQuery={tabSearch}
              onSearchChange={setTabSearch}
              pageSize={5}
            />
          )}

          {activeTab === "Assignments" && (
            <DataTable
              columns={assignmentColumns}
              data={studentAssignments.filter((a) =>
                a.title.toLowerCase().includes(tabSearch.toLowerCase()) ||
                a.subject.toLowerCase().includes(tabSearch.toLowerCase())
              )}
              searchPlaceholder="Search assignments..."
              searchQuery={tabSearch}
              onSearchChange={setTabSearch}
              pageSize={5}
            />
          )}

          {activeTab === "Attendance" && (
            <DataTable
              columns={attendanceColumns}
              data={studentAttendance.filter((a) =>
                a.date.toLowerCase().includes(tabSearch.toLowerCase())
              )}
              searchPlaceholder="Search attendance by date..."
              searchQuery={tabSearch}
              onSearchChange={setTabSearch}
              pageSize={5}
            />
          )}
        </div>
      </div>
    </div>
  );
}

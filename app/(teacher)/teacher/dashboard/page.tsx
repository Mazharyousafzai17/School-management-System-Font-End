"use client";

import React from "react";
import Link from "next/link";
import {
  CalendarDays,
  CheckSquare,
  ClipboardList,
  Award,
  Users,
  Clock,
  MapPin,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { MetricCard } from "@/components/shared/MetricCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { useSchoolStore } from "@/lib/store";

export default function TeacherDashboardPage() {
  const { assignments, submissions } = useSchoolStore();

  const pendingReviewsCount = submissions.filter((s) => s.status === "Submitted").length || 3;

  const todayClasses = [
    {
      period: 1,
      time: "08:00 - 08:50",
      subject: "Mathematics (Calculus)",
      grade: "Grade 10",
      section: "A",
      room: "Hall A-102",
      status: "Completed",
    },
    {
      period: 2,
      time: "08:50 - 09:40",
      subject: "Physics (Mechanics)",
      grade: "Grade 9",
      section: "B",
      room: "Lab Phys-1",
      status: "In Progress",
      isCurrent: true,
    },
    {
      period: 5,
      time: "11:50 - 12:40",
      subject: "Mathematics (Trigonometry)",
      grade: "Grade 10",
      section: "B",
      room: "Hall A-102",
      status: "Upcoming",
    },
    {
      period: 7,
      time: "13:30 - 14:15",
      subject: "Academic Mentorship & Guidance",
      grade: "Grade 10",
      section: "A",
      room: "Hall A-102",
      status: "Upcoming",
    },
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Today's Lectures"
          value="4 Periods"
          icon={CalendarDays}
          subtitle="2 Completed • 1 Live now"
        />
        <MetricCard
          title="Pending Reviews"
          value={pendingReviewsCount}
          icon={ClipboardList}
          change={{ value: "Need grading", isPositive: false }}
          subtitle="Assignments submitted"
        />
        <MetricCard
          title="Mapped Students"
          value="81"
          icon={Users}
          subtitle="Grade 10-A, 10-B, Grade 9-B"
        />
        <MetricCard
          title="Class Average Standing"
          value="89.4%"
          icon={Award}
          change={{ value: "+3.2% vs midterm", isPositive: true }}
          subtitle="Mathematics & Physics"
        />
      </div>

      {/* Today's Schedule & Quick Attendance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Classes */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-[#CDD4DD] p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-[#0F172A]">Today&apos;s Instructional Schedule (Friday)</h2>
              <p className="text-xs text-[#0F172A]/60">Lecture timeline, allocated classrooms, and period status</p>
            </div>
            <Link
              href="/teacher/schedule"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#22819A] hover:underline"
            >
              <span>Weekly Timetable</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {todayClasses.map((item, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  item.isCurrent
                    ? "bg-[#22819A]/10 border-[#22819A] shadow-xs"
                    : "bg-[#FEF7F8] border-[#CDD4DD]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xs ${
                      item.isCurrent
                        ? "bg-[#22819A] text-white"
                        : "bg-white border border-[#CDD4DD] text-[#0F172A]"
                    }`}
                  >
                    P{item.period}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm text-[#0F172A]">{item.subject}</h3>
                      {item.isCurrent && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#22819A] text-white animate-pulse">
                          Live Period
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-[#0F172A]/60 mt-0.5">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#22819A]" /> {item.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#90C2E7]" /> {item.room}
                      </span>
                      <span className="font-semibold text-[#0F172A]">
                        {item.grade}-{item.section}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <Link
                    href="/teacher/attendance"
                    className="px-3 py-1.5 rounded-lg border border-[#CDD4DD] bg-white hover:bg-[#FEF7F8] text-xs font-semibold text-[#0F172A]"
                  >
                    Take Roll-Call
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Review Submissions Drawer Card */}
        <div className="bg-white rounded-xl border border-[#CDD4DD] p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-bold text-[#0F172A]">Pending Homework Reviews</h2>
              <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                {pendingReviewsCount} Pending
              </span>
            </div>
            <p className="text-xs text-[#0F172A]/60 mb-4">
              Recently submitted student assignments waiting for your marks and feedback
            </p>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-lg border border-[#CDD4DD] bg-[#FEF7F8]">
                <div className="flex justify-between items-start">
                  <span className="font-bold text-[#0F172A]">Bilawal Shah</span>
                  <span className="text-[10px] text-[#0F172A]/50">Yesterday 9:00 PM</span>
                </div>
                <p className="text-[11px] text-[#22819A] mt-0.5">
                  Quadratic Equations & Parabolic Modeling
                </p>
                <span className="text-[10px] text-[#0F172A]/60 block mt-1">
                  Grade 10-A • Max Marks: 50
                </span>
              </div>

              <div className="p-3 rounded-lg border border-[#CDD4DD] bg-[#FEF7F8]">
                <div className="flex justify-between items-start">
                  <span className="font-bold text-[#0F172A]">Zainab Malik</span>
                  <span className="text-[10px] text-[#0F172A]/50">Today 9:12 AM</span>
                </div>
                <p className="text-[11px] text-[#22819A] mt-0.5">
                  Quadratic Equations & Parabolic Modeling
                </p>
                <span className="text-[10px] text-[#0F172A]/60 block mt-1">
                  Grade 10-A • Max Marks: 50
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#CDD4DD] mt-4">
            <Link
              href="/teacher/assignments"
              className="w-full py-2.5 rounded-xl bg-[#22819A] text-white text-xs font-semibold hover:bg-[#1b687c] transition-colors flex items-center justify-center gap-1.5 shadow-xs"
            >
              <span>Review All Submissions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

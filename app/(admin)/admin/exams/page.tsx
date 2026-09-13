"use client";

import React, { useState } from "react";
import { Plus, Award, Calendar, CheckCircle2, AlertCircle, Clock, MapPin } from "lucide-react";
import { DataTable, Column } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { useSchoolStore } from "@/lib/store";
import { Exam } from "@/types";

export default function ExamSchedulePage() {
  const { exams, addExam } = useSchoolStore();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    type: "Midterm" as "Midterm" | "Final" | "Quiz" | "Unit Test",
    subject: "Mathematics",
    grade: "Grade 10",
    date: "2026-10-25",
    time: "09:00 AM - 12:00 PM",
    duration: "3 Hours",
    room: "Exam Hall A",
    totalMarks: 100,
    passingMarks: 50,
    status: "Upcoming" as "Upcoming" | "Completed" | "Marks Pending" | "Published",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;

    addExam(formData);
    setIsCreateOpen(false);
  };

  const columns: Column<Exam>[] = [
    {
      header: "Exam Title & Subject",
      cell: (ex) => (
        <div>
          <div className="font-bold text-[#0F172A]">{ex.title}</div>
          <div className="text-[11px] text-[#22819A] font-medium">
            {ex.subject} • {ex.grade}
          </div>
        </div>
      ),
    },
    {
      header: "Exam Type",
      cell: (ex) => (
        <span className="font-semibold text-xs px-2.5 py-0.5 rounded-full bg-[#90C2E7]/20 text-[#22819A] border border-[#90C2E7]/40">
          {ex.type}
        </span>
      ),
    },
    {
      header: "Date & Time",
      cell: (ex) => (
        <div>
          <div className="font-semibold text-xs text-[#0F172A]">{ex.date}</div>
          <div className="text-[11px] text-[#0F172A]/50">{ex.time} ({ex.duration})</div>
        </div>
      ),
    },
    {
      header: "Hall / Room",
      cell: (ex) => (
        <span className="text-xs text-[#0F172A] font-medium flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-[#90C2E7]" /> {ex.room}
        </span>
      ),
    },
    {
      header: "Marks Scheme",
      cell: (ex) => (
        <span className="text-xs font-bold text-[#0F172A]">
          {ex.passingMarks} / {ex.totalMarks} Passing
        </span>
      ),
    },
    {
      header: "Approval / Publication",
      cell: (ex) => <StatusBadge status={ex.status} />,
    },
    {
      header: "Action",
      className: "text-right",
      cell: (ex) => (
        <button
          onClick={() => alert(`Exam ${ex.title} datesheet distributed to student portals.`)}
          className="px-2.5 py-1 rounded-md border border-[#CDD4DD] bg-[#FEF7F8] hover:bg-[#90C2E7]/25 text-[#22819A] font-semibold text-[11px]"
        >
          Datesheet
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-[#0F172A] tracking-tight">
            Examination Schedule & Results Moderation
          </h2>
          <p className="text-xs text-[#0F172A]/60">
            Publish assessment date sheets and moderate faculty marks submissions
          </p>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#22819A] hover:bg-[#1b687c] text-white text-xs font-semibold shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" /> Create Exam Schedule
        </button>
      </div>

      <DataTable
        columns={columns}
        data={exams}
        searchPlaceholder="Search exam by title, subject, grade..."
        searchQuery={search}
        onSearchChange={setSearch}
        pageSize={6}
      />

      {/* Create Exam Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-[#0F172A]/50 backdrop-blur-xs" onClick={() => setIsCreateOpen(false)} />
          <div className="relative bg-white rounded-2xl border border-[#CDD4DD] shadow-2xl max-w-lg w-full p-6 z-10 animate-in zoom-in-95 text-xs">
            <h3 className="font-bold text-base text-[#0F172A] pb-3 border-b border-[#CDD4DD]">
              Create Examination Schedule
            </h3>

            <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
              <div>
                <label className="block font-semibold text-[#0F172A] mb-1">Exam Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Fall Midterm Examination: Computer Science"
                  className="w-full px-3 py-2 text-sm bg-[#FEF7F8] border border-[#CDD4DD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22819A]"
                />
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                <div>
                  <label className="block font-semibold text-[#0F172A] mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-[#FEF7F8] border border-[#CDD4DD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22819A]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#0F172A] mb-1">Grade</label>
                  <select
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-[#FEF7F8] border border-[#CDD4DD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22819A]"
                  >
                    <option value="Grade 9">Grade 9</option>
                    <option value="Grade 10">Grade 10</option>
                    <option value="Grade 11">Grade 11</option>
                    <option value="Grade 12">Grade 12</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-[#0F172A] mb-1">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        type: e.target.value as "Midterm" | "Final" | "Quiz" | "Unit Test",
                      })
                    }
                    className="w-full px-3 py-2 text-sm bg-[#FEF7F8] border border-[#CDD4DD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22819A]"
                  >
                    <option value="Midterm">Midterm</option>
                    <option value="Final">Final</option>
                    <option value="Unit Test">Unit Test</option>
                    <option value="Quiz">Quiz</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#0F172A] mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-[#FEF7F8] border border-[#CDD4DD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22819A]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#0F172A] mb-1">Time & Duration</label>
                  <input
                    type="text"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    placeholder="09:00 AM - 12:00 PM"
                    className="w-full px-3 py-2 text-sm bg-[#FEF7F8] border border-[#CDD4DD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22819A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#0F172A] mb-1">Room / Hall</label>
                  <input
                    type="text"
                    required
                    value={formData.room}
                    onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                    placeholder="Exam Hall A"
                    className="w-full px-3 py-2 text-sm bg-[#FEF7F8] border border-[#CDD4DD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22819A]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#0F172A] mb-1">Total Marks</label>
                  <input
                    type="number"
                    required
                    value={formData.totalMarks}
                    onChange={(e) => setFormData({ ...formData, totalMarks: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-sm bg-[#FEF7F8] border border-[#CDD4DD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22819A]"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#CDD4DD] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2 border border-[#CDD4DD] rounded-lg font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#22819A] text-white rounded-lg font-semibold hover:bg-[#1b687c]"
                >
                  Publish Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

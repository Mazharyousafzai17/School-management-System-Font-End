"use client";

import React, { useState } from "react";
import { X, UserPlus, UserCheck } from "lucide-react";
import { useSchoolStore } from "@/lib/store";
import { useToast } from "@/components/providers/ToastProvider";
import { Student } from "@/types";

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddStudentModal({ isOpen, onClose }: AddStudentModalProps) {
  const { addStudent } = useSchoolStore();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    rollNo: "",
    name: "",
    email: "",
    grade: "Grade 10",
    section: "A",
    gender: "Male" as "Male" | "Female" | "Other",
    dob: "2010-06-15",
    bloodGroup: "O+",
    parentName: "",
    parentPhone: "",
    parentEmail: "",
    address: "",
    attendanceRate: 100,
    gpa: 4.0,
    status: "Enrolled" as "Enrolled" | "Graduated" | "Pending",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.rollNo) return;

    addStudent({
      ...formData,
      email: formData.email || `${formData.name.toLowerCase().replace(/\s+/g, ".")}@student.apexacademy.edu`,
    });

    toast.success(
      "Student Admitted Successfully",
      `${formData.name} (Roll #${formData.rollNo}) enrolled in ${formData.grade}-${formData.section}`
    );

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-[#0F172A]/50 backdrop-blur-xs" onClick={onClose} />

      <div className="relative bg-white rounded-2xl border border-[#CDD4DD] shadow-2xl max-w-xl w-full p-6 z-10 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-[#CDD4DD]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#90C2E7]/25 text-[#22819A] flex items-center justify-center">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#0F172A]">New Student Admission</h2>
              <p className="text-xs text-[#0F172A]/60">Enroll new pupil into campus database</p>
            </div>
          </div>
          <button onClick={onClose} className="text-[#0F172A]/50 hover:text-[#0F172A] p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1">Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Zainab Qureshi"
                className="w-full px-3 py-2 text-sm bg-[#FEF7F8] border border-[#CDD4DD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22819A]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1">Roll Number</label>
              <input
                type="text"
                required
                value={formData.rollNo}
                onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                placeholder="1048"
                className="w-full px-3 py-2 text-sm bg-[#FEF7F8] border border-[#CDD4DD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22819A]"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1">Grade</label>
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
              <label className="block text-xs font-semibold text-[#0F172A] mb-1">Section</label>
              <select
                value={formData.section}
                onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-[#FEF7F8] border border-[#CDD4DD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22819A]"
              >
                <option value="A">Section A</option>
                <option value="B">Section B</option>
                <option value="C">Section C</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1">Gender</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value as "Male" | "Female" | "Other" })}
                className="w-full px-3 py-2 text-sm bg-[#FEF7F8] border border-[#CDD4DD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22819A]"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1">Date of Birth</label>
              <input
                type="date"
                value={formData.dob}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-[#FEF7F8] border border-[#CDD4DD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22819A]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1">Blood Group</label>
              <select
                value={formData.bloodGroup}
                onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-[#FEF7F8] border border-[#CDD4DD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22819A]"
              >
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>
          </div>

          <div className="pt-2 border-t border-[#CDD4DD]">
            <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2">
              Guardian / Contact Details
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#0F172A] mb-1">Parent / Guardian Name</label>
                <input
                  type="text"
                  required
                  value={formData.parentName}
                  onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                  placeholder="Mr. Asif Qureshi"
                  className="w-full px-3 py-2 text-sm bg-[#FEF7F8] border border-[#CDD4DD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22819A]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#0F172A] mb-1">Guardian Phone Number</label>
                <input
                  type="tel"
                  required
                  value={formData.parentPhone}
                  onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                  placeholder="+1 (555) 012-3456"
                  className="w-full px-3 py-2 text-sm bg-[#FEF7F8] border border-[#CDD4DD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22819A]"
                />
              </div>
            </div>
            <div className="mt-2.5">
              <label className="block text-xs font-semibold text-[#0F172A] mb-1">Residential Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Street Address, City"
                className="w-full px-3 py-2 text-sm bg-[#FEF7F8] border border-[#CDD4DD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22819A]"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-[#CDD4DD] flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-[#0F172A]/70 hover:bg-[#FEF7F8] rounded-lg border border-[#CDD4DD]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-semibold text-white bg-[#22819A] hover:bg-[#1b687c] rounded-lg shadow-xs transition-colors"
            >
              Enroll Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function StudentDetailModal({
  student,
  isOpen,
  onClose,
}: {
  student: Student | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen || !student) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-[#0F172A]/50 backdrop-blur-xs" onClick={onClose} />
      <div className="relative bg-white rounded-2xl border border-[#CDD4DD] shadow-2xl max-w-md w-full p-6 z-10 animate-in zoom-in-95">
        <div className="flex items-center justify-between pb-3 border-b border-[#CDD4DD]">
          <h2 className="text-base font-bold text-[#0F172A]">Student Profile</h2>
          <button onClick={onClose} className="text-[#0F172A]/50 hover:text-[#0F172A] p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-3.5 text-sm">
          <div className="p-3.5 bg-[#FEF7F8] rounded-xl border border-[#CDD4DD] flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#22819A] text-white font-bold text-base flex items-center justify-center">
              {student.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-bold text-[#0F172A] text-base">{student.name}</h3>
              <p className="text-xs text-[#0F172A]/60">
                {student.grade} - Section {student.section} • Roll #{student.rollNo}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 bg-slate-50 rounded-lg border border-[#CDD4DD]/70">
              <span className="text-[#0F172A]/60 block">Attendance Rate</span>
              <span className="font-bold text-emerald-600 text-sm">{student.attendanceRate}%</span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-[#CDD4DD]/70">
              <span className="text-[#0F172A]/60 block">Academic Standing</span>
              <span className="font-bold text-[#22819A] text-sm">GPA {student.gpa} / 4.0</span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-[#CDD4DD]/70">
              <span className="text-[#0F172A]/60 block">Blood Group</span>
              <span className="font-bold text-[#0F172A]">{student.bloodGroup}</span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-[#CDD4DD]/70">
              <span className="text-[#0F172A]/60 block">Admission Date</span>
              <span className="font-bold text-[#0F172A]">{student.admissionDate}</span>
            </div>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-[#CDD4DD] text-xs">
            <div className="flex justify-between">
              <span className="text-[#0F172A]/60">Parent/Guardian:</span>
              <span className="font-semibold text-[#0F172A]">{student.parentName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#0F172A]/60">Emergency Contact:</span>
              <span className="font-semibold text-[#0F172A]">{student.parentPhone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#0F172A]/60">Email:</span>
              <span className="font-semibold text-[#0F172A]">{student.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#0F172A]/60">Address:</span>
              <span className="font-semibold text-[#0F172A] text-right truncate max-w-[200px]">
                {student.address}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-5 pt-3 border-t border-[#CDD4DD] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-white bg-[#22819A] hover:bg-[#1b687c] rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

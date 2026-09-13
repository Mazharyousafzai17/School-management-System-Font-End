"use client";

import React, { useState } from "react";
import {
  UserSquare2,
  Mail,
  Phone,
  MapPin,
  Heart,
  Calendar,
  Shield,
  User,
  GraduationCap,
  IdCard,
} from "lucide-react";
import { useSchoolStore } from "@/lib/store";
import { StudentIDCardModal } from "@/components/modals/StudentIDCardModal";

export default function StudentPersonalPage() {
  const { students } = useSchoolStore();
  const [isIdCardOpen, setIsIdCardOpen] = useState(false);
  const student = students.find((s) => s.id === "std-1") || students[0];

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-[#0F172A] tracking-tight">
            Personal Information Dossier
          </h2>
          <p className="text-xs text-[#0F172A]/60">
            Verified pupil demographics, emergency contacts, parent details, and residential record
          </p>
        </div>

        <button
          onClick={() => setIsIdCardOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--primary)] text-white text-xs font-bold hover:bg-[var(--primary-hover)] shadow-xs transition-all cursor-pointer shrink-0"
        >
          <IdCard className="w-4 h-4" />
          <span>Print Student ID Badge</span>
        </button>
      </div>

      {/* Main Profile Card */}
      <div className="bg-white rounded-2xl border border-[#CDD4DD] p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-[#CDD4DD]">
          <div className="w-24 h-24 rounded-2xl bg-[#22819A] text-white flex items-center justify-center font-bold text-3xl shadow-sm">
            {student.name.charAt(0)}
          </div>
          <div className="text-center sm:text-left space-y-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h3 className="text-xl font-bold text-[#0F172A]">{student.name}</h3>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Active Student
              </span>
            </div>
            <p className="text-xs text-[#0F172A]/60">
              Student ID: <strong className="text-[#22819A]">APX-2022-1042</strong> • Roll #{student.rollNo}
            </p>
            <p className="text-xs text-[#0F172A]/80">
              Enrolled in <strong>{student.grade} - Section {student.section}</strong> (Apex International Academy)
            </p>
          </div>
        </div>

        {/* Vital Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 text-xs">
          <div className="p-3 bg-[#FEF7F8] rounded-xl border border-[#CDD4DD]">
            <div className="flex items-center gap-1.5 text-[#0F172A]/60 font-semibold mb-1">
              <Calendar className="w-3.5 h-3.5 text-[#22819A]" /> Date of Birth
            </div>
            <span className="font-bold text-sm text-[#0F172A]">{student.dob}</span>
            <span className="text-[10px] text-[#0F172A]/50 block mt-0.5">16 Years Old</span>
          </div>

          <div className="p-3 bg-[#FEF7F8] rounded-xl border border-[#CDD4DD]">
            <div className="flex items-center gap-1.5 text-[#0F172A]/60 font-semibold mb-1">
              <User className="w-3.5 h-3.5 text-[#22819A]" /> Gender
            </div>
            <span className="font-bold text-sm text-[#0F172A]">{student.gender}</span>
            <span className="text-[10px] text-[#0F172A]/50 block mt-0.5">Campus Dorm: Non-Resident</span>
          </div>

          <div className="p-3 bg-[#FEF7F8] rounded-xl border border-[#CDD4DD]">
            <div className="flex items-center gap-1.5 text-[#0F172A]/60 font-semibold mb-1">
              <Heart className="w-3.5 h-3.5 text-rose-500" /> Blood Group
            </div>
            <span className="font-bold text-sm text-rose-600">{student.bloodGroup}</span>
            <span className="text-[10px] text-[#0F172A]/50 block mt-0.5">Rh Positive</span>
          </div>

          <div className="p-3 bg-[#FEF7F8] rounded-xl border border-[#CDD4DD]">
            <div className="flex items-center gap-1.5 text-[#0F172A]/60 font-semibold mb-1">
              <GraduationCap className="w-3.5 h-3.5 text-[#22819A]" /> Admission Date
            </div>
            <span className="font-bold text-sm text-[#0F172A]">{student.admissionDate}</span>
            <span className="text-[10px] text-[#0F172A]/50 block mt-0.5">Session 2022-2026</span>
          </div>
        </div>

        {/* Parent & Emergency Contacts */}
        <div className="mt-8 space-y-4">
          <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider pb-2 border-b border-[#CDD4DD]">
            Parent & Primary Guardian Details
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-white rounded-xl border border-[#CDD4DD] space-y-2">
              <span className="text-xs font-bold text-[#0F172A] block">Father / Guardian</span>
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-[#0F172A]/60">Full Name:</span>
                  <span className="font-semibold text-[#0F172A]">{student.parentName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#0F172A]/60">Mobile:</span>
                  <span className="font-semibold text-[#22819A]">{student.parentPhone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#0F172A]/60">Email:</span>
                  <span className="font-semibold text-[#0F172A]">{student.parentEmail}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#0F172A]/60">Occupation:</span>
                  <span className="font-semibold text-[#0F172A]">Senior Systems Consultant</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white rounded-xl border border-[#CDD4DD] space-y-2">
              <span className="text-xs font-bold text-[#0F172A] block">Mother / Secondary Contact</span>
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-[#0F172A]/60">Full Name:</span>
                  <span className="font-semibold text-[#0F172A]">Nighat Tariq</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#0F172A]/60">Mobile:</span>
                  <span className="font-semibold text-[#22819A]">+1 (555) 431-8899</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#0F172A]/60">Relationship:</span>
                  <span className="font-semibold text-[#0F172A]">Mother</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#0F172A]/60">Authorized Pickup:</span>
                  <span className="font-semibold text-emerald-600">Yes (Photo on file)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Residential Address */}
        <div className="mt-6 pt-4 border-t border-[#CDD4DD] text-xs">
          <div className="flex items-center gap-1.5 font-bold text-[#0F172A] mb-1">
            <MapPin className="w-3.5 h-3.5 text-[#22819A]" /> Verified Residential Address
          </div>
          <p className="text-[#0F172A]/70 text-sm">{student.address}</p>
        </div>
      </div>

      <StudentIDCardModal
        student={isIdCardOpen ? student : null}
        onClose={() => setIsIdCardOpen(false)}
      />
    </div>
  );
}

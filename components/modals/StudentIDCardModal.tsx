"use client";

import React, { useState } from "react";
import {
  X,
  Printer,
  Sparkles,
  QrCode,
  ShieldCheck,
  Phone,
  MapPin,
  Heart,
  Calendar,
  Layers,
  Award,
} from "lucide-react";
import { Student } from "@/types";

interface StudentIDCardModalProps {
  student: Student | null;
  onClose: () => void;
}

export function StudentIDCardModal({ student, onClose }: StudentIDCardModalProps) {
  const [activeSide, setActiveSide] = useState<"both" | "front" | "back">("both");

  if (!student) return null;

  const handlePrint = () => {
    window.print();
  };

  const studentIdNumber = `APX-2022-${student.rollNo.padStart(4, "0")}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[var(--card-bg)] rounded-3xl border border-[var(--border-color)] shadow-2xl p-6 sm:p-8 max-h-[95vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-5 border-b border-[var(--border-color)] no-print">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[var(--gradient-from)] to-[var(--gradient-to)] text-white flex items-center justify-center shadow-md shadow-[var(--shadow-color)]">
              <Award className="w-6 h-6 text-white/90" />
            </div>
            <div>
              <h2 className="text-xl font-black text-[var(--text-main)] tracking-tight font-heading">
                Official Student Identity Card
              </h2>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                Institutional Credential Badge • Apex International Academy
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--primary)] text-white font-bold text-sm hover:bg-[var(--primary-hover)] transition-all cursor-pointer shadow-md shadow-[var(--shadow-color)]"
            >
              <Printer className="w-4 h-4" />
              <span>Print Badge</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--card-subtle)] transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* View Controls */}
        <div className="flex items-center justify-center gap-2 my-5 no-print">
          <div className="p-1 bg-[var(--card-subtle)] rounded-xl border border-[var(--border-color)] flex items-center gap-1 text-xs font-bold">
            <button
              onClick={() => setActiveSide("both")}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeSide === "both"
                  ? "bg-[var(--card-bg)] text-[var(--text-main)] shadow-xs"
                  : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
              }`}
            >
              Both Sides (Print Sheet)
            </button>
            <button
              onClick={() => setActiveSide("front")}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeSide === "front"
                  ? "bg-[var(--card-bg)] text-[var(--text-main)] shadow-xs"
                  : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
              }`}
            >
              Front Side
            </button>
            <button
              onClick={() => setActiveSide("back")}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeSide === "back"
                  ? "bg-[var(--card-bg)] text-[var(--text-main)] shadow-xs"
                  : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
              }`}
            >
              Back Side
            </button>
          </div>
        </div>

        {/* ID Cards Display Container */}
        <div className="flex flex-wrap items-center justify-center gap-6 py-4">
          {/* ===================== FRONT SIDE ===================== */}
          {(activeSide === "both" || activeSide === "front") && (
            <div className="w-[340px] h-[520px] rounded-3xl bg-white text-slate-900 border-2 border-slate-300 shadow-xl overflow-hidden flex flex-col justify-between relative print-card-isolated">
              {/* Lanyard Punch Hole Indicator */}
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-12 h-2.5 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center">
                <span className="w-8 h-1 bg-slate-400/40 rounded-full" />
              </div>

              {/* Card Header */}
              <div className="pt-7 pb-4 px-5 bg-gradient-to-r from-indigo-700 via-indigo-600 to-violet-700 text-white text-center relative shadow-sm">
                <div className="w-10 h-10 mx-auto rounded-xl bg-white/15 backdrop-blur-xs flex items-center justify-center mb-1.5 border border-white/25">
                  <Sparkles className="w-5 h-5 text-amber-300" />
                </div>
                <h3 className="font-black text-sm uppercase tracking-wider font-heading leading-tight">
                  Apex International Academy
                </h3>
                <p className="text-[10px] text-indigo-100 font-semibold uppercase tracking-widest mt-0.5">
                  Student Identity Card
                </p>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-white mt-1 inline-block">
                  Academic Year 2025-2026
                </span>
              </div>

              {/* Photo & Identity Core */}
              <div className="flex-1 flex flex-col items-center justify-center px-5 py-3 text-center">
                {/* Photo Frame */}
                <div className="relative mb-3">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white flex items-center justify-center font-black text-4xl shadow-md border-4 border-white ring-2 ring-indigo-500/30">
                    {student.name.charAt(0)}
                  </div>
                  <span className="absolute -bottom-1.5 -right-1.5 px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[9px] font-extrabold shadow-xs">
                    ACTIVE
                  </span>
                </div>

                {/* Student Name & Class */}
                <h4 className="font-black text-lg text-slate-900 tracking-tight leading-tight">
                  {student.name}
                </h4>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-extrabold border border-indigo-200 mt-1">
                  <span>Class {student.grade}</span>
                  <span>•</span>
                  <span>Section {student.section}</span>
                </div>

                {/* Demographics Grid */}
                <div className="w-full grid grid-cols-2 gap-2 mt-4 text-left text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <div>
                    <span className="text-[9px] text-slate-500 font-bold uppercase block">
                      Roll Number
                    </span>
                    <strong className="text-slate-900 text-xs">{student.rollNo}</strong>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 font-bold uppercase block">
                      Student ID
                    </span>
                    <strong className="text-indigo-600 text-xs font-mono">{studentIdNumber}</strong>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 font-bold uppercase block">
                      Blood Group
                    </span>
                    <strong className="text-rose-600 text-xs">{student.bloodGroup}</strong>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 font-bold uppercase block">
                      Date of Birth
                    </span>
                    <strong className="text-slate-900 text-xs">{student.dob}</strong>
                  </div>
                </div>
              </div>

              {/* Bottom Signature & Verification */}
              <div className="px-5 py-3 border-t border-slate-200 bg-slate-50/80 flex items-center justify-between">
                <div>
                  <span className="text-[9px] text-slate-400 block font-medium">Valid Thru</span>
                  <span className="text-[11px] font-bold text-slate-700">June 2026</span>
                </div>
                <div className="text-right">
                  <div className="font-serif italic text-xs font-bold text-indigo-950 border-b border-slate-400/60 pb-0.5 px-2">
                    E. Wright
                  </div>
                  <span className="text-[9px] text-slate-500 block uppercase tracking-wider font-semibold">
                    Principal Signature
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ===================== BACK SIDE ===================== */}
          {(activeSide === "both" || activeSide === "back") && (
            <div className="w-[340px] h-[520px] rounded-3xl bg-white text-slate-900 border-2 border-slate-300 shadow-xl overflow-hidden flex flex-col justify-between relative print-card-isolated">
              {/* Lanyard Punch Hole Indicator */}
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-12 h-2.5 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center">
                <span className="w-8 h-1 bg-slate-400/40 rounded-full" />
              </div>

              {/* Top Instructions Banner */}
              <div className="pt-7 pb-3 px-5 bg-slate-100 border-b border-slate-200 text-center">
                <h5 className="font-extrabold text-xs uppercase tracking-wider text-slate-700">
                  Terms & Emergency Information
                </h5>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  This card is non-transferable and remains school property.
                </p>
              </div>

              {/* Middle Information Box */}
              <div className="flex-1 px-5 py-4 space-y-3 text-xs">
                {/* Emergency Contact */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-slate-500 font-bold uppercase text-[9px]">
                    <Phone className="w-3 h-3 text-indigo-600" /> Emergency Guardian Contact
                  </div>
                  <p className="font-bold text-slate-900 text-sm">{student.parentName}</p>
                  <p className="text-xs text-indigo-600 font-mono font-bold">{student.parentPhone}</p>
                </div>

                {/* Address */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-500 font-bold uppercase text-[9px]">
                    <MapPin className="w-3 h-3 text-indigo-600" /> Residential Address
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    {student.address}
                  </p>
                </div>

                {/* Campus Registrar Box */}
                <div className="text-[10px] text-slate-500 leading-relaxed space-y-1">
                  <p>
                    <strong className="text-slate-700">Campus:</strong> Apex International Academy
                  </p>
                  <p>
                    <strong className="text-slate-700">Helpline:</strong> +92 (51) 840-2900 • security@apexacademy.edu
                  </p>
                  <p className="text-[9px] text-slate-400 italic">
                    If found, please return to the nearest campus reception desk.
                  </p>
                </div>
              </div>

              {/* Bottom Scannable Barcode & QR Code */}
              <div className="px-5 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-4">
                <div className="flex-1">
                  {/* Realistic CSS Barcode Lines */}
                  <div className="flex items-center justify-between h-9 bg-white px-2 py-1 rounded border border-slate-200">
                    <span className="w-1 h-full bg-slate-900" />
                    <span className="w-0.5 h-full bg-slate-900" />
                    <span className="w-1.5 h-full bg-slate-900" />
                    <span className="w-0.5 h-full bg-slate-900" />
                    <span className="w-1 h-full bg-slate-900" />
                    <span className="w-2 h-full bg-slate-900" />
                    <span className="w-0.5 h-full bg-slate-900" />
                    <span className="w-1 h-full bg-slate-900" />
                    <span className="w-1.5 h-full bg-slate-900" />
                    <span className="w-0.5 h-full bg-slate-900" />
                    <span className="w-1 h-full bg-slate-900" />
                    <span className="w-2 h-full bg-slate-900" />
                    <span className="w-0.5 h-full bg-slate-900" />
                  </div>
                  <span className="text-[9px] text-center block font-mono text-slate-500 font-bold mt-1">
                    *{studentIdNumber}*
                  </span>
                </div>

                <div className="w-14 h-14 rounded-xl bg-white border border-slate-200 p-1 flex items-center justify-center shrink-0 shadow-2xs">
                  <QrCode className="w-12 h-12 text-slate-800" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="mt-5 pt-4 border-t border-[var(--border-color)] flex items-center justify-between text-xs text-[var(--text-muted)] no-print">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Digital Holographic Seal Verified</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-[var(--border-color)] bg-[var(--card-subtle)] hover:bg-[var(--card-bg)] text-[var(--text-main)] font-semibold transition-colors cursor-pointer"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { X, Receipt, Printer, CheckCircle2, Building2 } from "lucide-react";
import { useSchoolStore } from "@/lib/store";
import { FeeChallan, Student } from "@/types";

interface CreateChallanModalProps {
  isOpen: boolean;
  onClose: () => void;
  students: Student[];
}

export function CreateChallanModal({
  isOpen,
  onClose,
  students,
}: CreateChallanModalProps) {
  const { addChallan } = useSchoolStore();
  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || "");
  const [tuitionFee, setTuitionFee] = useState(450);
  const [labFee, setLabFee] = useState(80);
  const [sportsFee, setSportsFee] = useState(40);
  const [dueDate, setDueDate] = useState("2026-09-25");

  if (!isOpen) return null;

  const selectedStudent = students.find((s) => s.id === selectedStudentId) || students[0];
  const totalAmount = tuitionFee + labFee + sportsFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent) return;

    addChallan({
      studentId: selectedStudent.id,
      studentName: selectedStudent.name,
      rollNo: selectedStudent.rollNo,
      grade: selectedStudent.grade,
      section: selectedStudent.section,
      issueDate: new Date().toISOString().split("T")[0],
      dueDate,
      tuitionFee,
      labFee,
      sportsFee,
      totalAmount,
      status: "Pending",
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-[#0F172A]/50 backdrop-blur-xs" onClick={onClose} />
      <div className="relative bg-white rounded-2xl border border-[#CDD4DD] shadow-2xl max-w-md w-full p-6 z-10 animate-in zoom-in-95">
        <div className="flex items-center justify-between pb-4 border-b border-[#CDD4DD]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#90C2E7]/25 text-[#22819A] flex items-center justify-center">
              <Receipt className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#0F172A]">Generate Fee Challan</h2>
              <p className="text-xs text-[#0F172A]/60">Issue term invoice voucher for student</p>
            </div>
          </div>
          <button onClick={onClose} className="text-[#0F172A]/50 hover:text-[#0F172A] p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-xs">
          <div>
            <label className="block font-semibold text-[#0F172A] mb-1">Select Student</label>
            <select
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-[#FEF7F8] border border-[#CDD4DD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22819A]"
            >
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} (Roll #{s.rollNo} • {s.grade}-{s.section})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            <div>
              <label className="block font-semibold text-[#0F172A] mb-1">Tuition Fee ($)</label>
              <input
                type="number"
                required
                value={tuitionFee}
                onChange={(e) => setTuitionFee(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm bg-[#FEF7F8] border border-[#CDD4DD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22819A]"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#0F172A] mb-1">Lab Fee ($)</label>
              <input
                type="number"
                value={labFee}
                onChange={(e) => setLabFee(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm bg-[#FEF7F8] border border-[#CDD4DD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22819A]"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#0F172A] mb-1">Sports Fee ($)</label>
              <input
                type="number"
                value={sportsFee}
                onChange={(e) => setSportsFee(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm bg-[#FEF7F8] border border-[#CDD4DD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22819A]"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-[#0F172A] mb-1">Payment Due Date</label>
            <input
              type="date"
              required
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-[#FEF7F8] border border-[#CDD4DD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22819A]"
            />
          </div>

          <div className="p-3 bg-[#FEF7F8] rounded-xl border border-[#CDD4DD] flex items-center justify-between">
            <span className="font-semibold text-sm text-[#0F172A]">Total Challan Payable:</span>
            <span className="text-base font-bold text-[#22819A]">${totalAmount}</span>
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
              Generate Challan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function ViewChallanModal({
  challan,
  isOpen,
  onClose,
}: {
  challan: FeeChallan | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen || !challan) return null;

  const handlePrint = () => {
    window.print();
  };

  const copyTypes = [
    { title: "Bank Copy", desc: "To be retained by receiving bank branch" },
    { title: "School Copy", desc: "To be submitted to campus accounts office" },
    { title: "Student Copy", desc: "To be retained by parent / student" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-[#0F172A]/60 backdrop-blur-xs no-print" onClick={onClose} />

      <div className="relative bg-white rounded-3xl border border-[#CDD4DD] shadow-2xl max-w-5xl w-full p-6 sm:p-8 z-10 animate-in zoom-in-95 max-h-[94vh] overflow-y-auto">
        {/* Modal Toolbar (hidden in print) */}
        <div className="flex items-center justify-between pb-5 border-b border-[#CDD4DD] no-print">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#90C2E7]/25 text-[#22819A] flex items-center justify-center shadow-2xs">
              <Receipt className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-[#0F172A] font-heading">
                Official Bank Fee Challan Voucher • {challan.challanNo}
              </h2>
              <p className="text-xs text-[#0F172A]/60">
                Authorized 3-part deposit voucher for cash & online bank clearing
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#22819A] text-white hover:bg-[#1b687c] text-xs font-bold shadow-xs transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" /> Print / Save PDF
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-[#0F172A]/60 hover:text-[#0F172A] hover:bg-[#FEF7F8] border border-[#CDD4DD] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 3-Part Challan Voucher Matrix */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
          {copyTypes.map((copy, idx) => (
            <div
              key={idx}
              className="border-2 border-dashed border-[#CDD4DD] rounded-2xl p-4 sm:p-5 bg-white flex flex-col justify-between text-xs relative group hover:border-[#22819A] transition-colors"
            >
              <div>
                {/* Header */}
                <div className="text-center pb-3 border-b-2 border-[#22819A]">
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <Building2 className="w-4 h-4 text-[#22819A]" />
                    <span className="font-black text-xs text-[#0F172A] uppercase tracking-tight font-heading">
                      Apex International Academy
                    </span>
                  </div>
                  <div className="inline-block px-2.5 py-0.5 rounded-full bg-[#22819A] text-white text-[10px] font-extrabold uppercase tracking-wider">
                    {copy.title}
                  </div>
                  <p className="text-[9px] text-[#0F172A]/50 mt-1 leading-tight">
                    {copy.desc}
                  </p>
                  <div className="text-[10px] font-bold text-[#22819A] mt-1.5 bg-[#FEF7F8] py-0.5 rounded border border-[#CDD4DD]/60">
                    Voucher: {challan.challanNo}
                  </div>
                </div>

                {/* Barcode Simulation */}
                <div className="my-3 py-1 flex flex-col items-center justify-center">
                  <div className="flex items-center gap-[2px] h-7">
                    {[3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 2, 4, 1, 2, 3, 1, 4, 2, 1, 3].map((w, bi) => (
                      <div
                        key={bi}
                        className="bg-[var(--text-main)] h-full opacity-90"
                        style={{ width: `${w}px` }}
                      />
                    ))}
                  </div>
                  <span className="text-[8px] text-[#0F172A]/50 font-mono tracking-widest mt-0.5">
                    * {challan.challanNo.replace(/[^0-9]/g, "")} *
                  </span>
                </div>

                {/* Demographics */}
                <div className="py-2.5 space-y-1.5 text-[11px] border-y border-[#CDD4DD]/80 bg-[#FEF7F8]/60 px-2 rounded-lg">
                  <div className="flex justify-between">
                    <span className="text-[#0F172A]/60 font-medium">Student Name:</span>
                    <strong className="text-[#0F172A]">{challan.studentName}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#0F172A]/60 font-medium">Roll No / Class:</span>
                    <span className="font-bold text-[#0F172A]">
                      #{challan.rollNo} • {challan.grade}-{challan.section}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#0F172A]/60 font-medium">Issue Date:</span>
                    <span className="font-semibold text-[#0F172A]">{challan.issueDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold text-rose-600 dark:text-rose-400">Due Date:</span>
                    <span className="font-extrabold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-1.5 rounded">
                      {challan.dueDate}
                    </span>
                  </div>
                </div>

                {/* Fee Breakdown */}
                <div className="py-3 space-y-1.5 text-[11px]">
                  <div className="flex justify-between text-[#0F172A]/80">
                    <span>Tuition Fee (Fall 2026):</span>
                    <span className="font-semibold">${challan.tuitionFee}.00</span>
                  </div>
                  <div className="flex justify-between text-[#0F172A]/80">
                    <span>Laboratory & STEM:</span>
                    <span className="font-semibold">${challan.labFee}.00</span>
                  </div>
                  <div className="flex justify-between text-[#0F172A]/80">
                    <span>Sports & Library Fund:</span>
                    <span className="font-semibold">${challan.sportsFee}.00</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-[#CDD4DD] font-black text-xs text-[#0F172A] bg-[#90C2E7]/15 p-1.5 rounded">
                    <span>Total Payable:</span>
                    <span className="text-[#22819A] text-sm">${challan.totalAmount}.00</span>
                  </div>
                </div>
              </div>

              {/* Bank Stamp & Sign */}
              <div className="pt-3 mt-2 border-t border-[#CDD4DD] text-center space-y-2">
                <div className="h-12 border-2 border-dashed border-[#CDD4DD] rounded-lg bg-[#FEF7F8] flex items-center justify-center text-[10px] text-[#0F172A]/40 uppercase font-bold tracking-wider">
                  Bank Cashier Stamp & Signature
                </div>
                <div className="text-[9px] text-[#0F172A]/60 leading-tight">
                  Authorized Habib Bank Branch A/C # <strong>0492-91823-01</strong>
                  <br />
                  <span className="text-[8px] text-[#0F172A]/40">Payable at any online branch nationwide</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

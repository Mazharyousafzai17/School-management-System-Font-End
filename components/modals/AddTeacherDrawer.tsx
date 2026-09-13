"use client";

import React, { useState, useEffect } from "react";
import { X, Plus, Trash2, UserCheck, BookOpen } from "lucide-react";
import { useSchoolStore } from "@/lib/store";
import { Teacher, ClassMapping } from "@/types";
import { useToast } from "@/components/providers/ToastProvider";

interface AddTeacherDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  teacherToEdit?: Teacher | null;
}

export function AddTeacherDrawer({
  isOpen,
  onClose,
  teacherToEdit,
}: AddTeacherDrawerProps) {
  const { addTeacher, updateTeacher } = useSchoolStore();
  const toast = useToast();

  const [formData, setFormData] = useState({
    empId: "",
    name: "",
    email: "",
    phone: "",
    designation: "Subject Faculty",
    department: "Mathematics",
    qualification: "M.Sc. Mathematics",
    status: "Active" as "Active" | "On Leave",
  });

  const [assignedClasses, setAssignedClasses] = useState<ClassMapping[]>([
    { grade: "Grade 10", section: "A", subject: "Mathematics" },
  ]);

  useEffect(() => {
    if (teacherToEdit) {
      setFormData({
        empId: teacherToEdit.empId,
        name: teacherToEdit.name,
        email: teacherToEdit.email,
        phone: teacherToEdit.phone,
        designation: teacherToEdit.designation,
        department: teacherToEdit.department,
        qualification: teacherToEdit.qualification,
        status: teacherToEdit.status,
      });
      setAssignedClasses(teacherToEdit.assignedClasses || []);
    } else {
      setFormData({
        empId: `EMP-${Math.floor(2050 + Math.random() * 50)}`,
        name: "",
        email: "",
        phone: "",
        designation: "Subject Specialist",
        department: "Mathematics & Physical Sciences",
        qualification: "M.Sc., B.Ed.",
        status: "Active",
      });
      setAssignedClasses([{ grade: "Grade 10", section: "A", subject: "Mathematics" }]);
    }
  }, [teacherToEdit, isOpen]);

  if (!isOpen) return null;

  const handleAddClassMapping = () => {
    setAssignedClasses([
      ...assignedClasses,
      { grade: "Grade 10", section: "B", subject: "Physics" },
    ]);
  };

  const handleRemoveClassMapping = (index: number) => {
    setAssignedClasses(assignedClasses.filter((_, i) => i !== index));
  };

  const handleClassMappingChange = (
    index: number,
    field: keyof ClassMapping,
    value: string
  ) => {
    const updated = [...assignedClasses];
    updated[index] = { ...updated[index], [field]: value };
    setAssignedClasses(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    if (teacherToEdit) {
      updateTeacher(teacherToEdit.id, {
        ...formData,
        assignedClasses,
      });
      toast.success("Faculty Updated", `${formData.name}'s profile and workload have been saved.`);
    } else {
      addTeacher({
        ...formData,
        assignedClasses,
      });
      toast.success("Faculty Added", `${formData.name} added to the faculty directory.`);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-[var(--card)] border-l border-[var(--border)] h-full shadow-2xl z-10 flex flex-col animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-5 border-b border-[var(--border)] flex items-center justify-between bg-[var(--card)]">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[var(--foreground)]">
                {teacherToEdit ? "Edit Faculty Member" : "Add New Instructor"}
              </h2>
              <p className="text-xs text-[var(--foreground-muted)]">Configure profile & mapped teaching workload</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--foreground-muted)]/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
          <div className="space-y-3">
            <div>
              <label className="block font-semibold text-[var(--foreground)] mb-1">Faculty Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Usman Ali"
                className="w-full px-3 py-2 text-sm bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
              />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block font-semibold text-[var(--foreground)] mb-1">Employee ID</label>
                <input
                  type="text"
                  required
                  value={formData.empId}
                  onChange={(e) => setFormData({ ...formData, empId: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 font-mono"
                />
              </div>
              <div>
                <label className="block font-semibold text-[var(--foreground)] mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as "Active" | "On Leave" })}
                  className="w-full px-3 py-2 text-sm bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                >
                  <option value="Active">Active</option>
                  <option value="On Leave">On Leave</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block font-semibold text-[var(--foreground)] mb-1">Work Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="usman.ali@apexacademy.edu"
                  className="w-full px-3 py-2 text-sm bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                />
              </div>
              <div>
                <label className="block font-semibold text-[var(--foreground)] mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 782-4911"
                  className="w-full px-3 py-2 text-sm bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block font-semibold text-[var(--foreground)] mb-1">Department</label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  placeholder="Mathematics & Science"
                  className="w-full px-3 py-2 text-sm bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                />
              </div>
              <div>
                <label className="block font-semibold text-[var(--foreground)] mb-1">Designation</label>
                <input
                  type="text"
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  placeholder="Senior Master Faculty"
                  className="w-full px-3 py-2 text-sm bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                />
              </div>
            </div>
          </div>

          {/* Assigned Classes Mapping Flow (as explicitly requested: Usman -> Assigned Classes flow) */}
          <div className="pt-4 border-t border-[var(--border)]">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h4 className="font-bold text-[var(--foreground)] text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
                  Assigned Classes Flow
                </h4>
                <p className="text-[11px] text-[var(--foreground-muted)]">
                  Classes & subjects taught by this instructor
                </p>
              </div>
              <button
                type="button"
                onClick={handleAddClassMapping}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/20 font-bold text-xs transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Add Class
              </button>
            </div>

            <div className="space-y-2 mt-3">
              {assignedClasses.map((mapping, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl bg-[var(--background)] border border-[var(--border)] flex items-center gap-2"
                >
                  <div className="grid grid-cols-3 gap-1.5 flex-1">
                    <select
                      value={mapping.grade}
                      onChange={(e) => handleClassMappingChange(idx, "grade", e.target.value)}
                      className="px-2 py-1.5 bg-[var(--card)] text-[var(--foreground)] rounded-lg border border-[var(--border)] text-xs"
                    >
                      <option value="Grade 9">Grade 9</option>
                      <option value="Grade 10">Grade 10</option>
                      <option value="Grade 11">Grade 11</option>
                      <option value="Grade 12">Grade 12</option>
                    </select>
                    <select
                      value={mapping.section}
                      onChange={(e) => handleClassMappingChange(idx, "section", e.target.value)}
                      className="px-2 py-1.5 bg-[var(--card)] text-[var(--foreground)] rounded-lg border border-[var(--border)] text-xs"
                    >
                      <option value="A">Sec A</option>
                      <option value="B">Sec B</option>
                      <option value="C">Sec C</option>
                    </select>
                    <input
                      type="text"
                      value={mapping.subject}
                      onChange={(e) => handleClassMappingChange(idx, "subject", e.target.value)}
                      placeholder="Subject"
                      className="px-2 py-1.5 bg-[var(--card)] text-[var(--foreground)] rounded-lg border border-[var(--border)] text-xs"
                    />
                  </div>
                  {assignedClasses.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveClassMapping(idx)}
                      className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Footer Submit */}
          <div className="pt-4 border-t border-[var(--border)] flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-[var(--foreground-muted)] hover:bg-[var(--foreground-muted)]/10 rounded-xl border border-[var(--border)] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-colors"
            >
              {teacherToEdit ? "Save Changes" : "Assign Faculty"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { X, ClipboardList, CheckCircle2, Paperclip, Award } from "lucide-react";
import { useSchoolStore } from "@/lib/store";
import { Assignment, AssignmentSubmission } from "@/types";

interface CreateAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateAssignmentModal({
  isOpen,
  onClose,
}: CreateAssignmentModalProps) {
  const { addAssignment, currentUser } = useSchoolStore();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subject: "Mathematics",
    grade: "Grade 10",
    section: "A",
    dueDate: "2026-09-18",
    maxMarks: 50,
    attachmentName: "Math_Homework_ProblemSet.pdf",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;

    addAssignment({
      ...formData,
      teacherId: currentUser.id,
      teacherName: currentUser.name,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-[#0F172A]/50 backdrop-blur-xs" onClick={onClose} />
      <div className="relative bg-white rounded-2xl border border-[#CDD4DD] shadow-2xl max-w-lg w-full p-6 z-10 animate-in zoom-in-95">
        <div className="flex items-center justify-between pb-4 border-b border-[#CDD4DD]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#90C2E7]/25 text-[#22819A] flex items-center justify-center">
              <ClipboardList className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#0F172A]">Create New Assignment</h2>
              <p className="text-xs text-[#0F172A]/60">Distribute coursework to student roster</p>
            </div>
          </div>
          <button onClick={onClose} className="text-[#0F172A]/50 hover:text-[#0F172A] p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-xs">
          <div>
            <label className="block font-semibold text-[#0F172A] mb-1">Assignment Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Calculus & Derivatives Practice Set"
              className="w-full px-3 py-2 text-sm bg-[#FEF7F8] border border-[#CDD4DD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22819A]"
            />
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            <div>
              <label className="block font-semibold text-[#0F172A] mb-1">Subject</label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-[#FEF7F8] border border-[#CDD4DD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22819A]"
              >
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="English Literature">English Literature</option>
                <option value="Computer Science">Computer Science</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-[#0F172A] mb-1">Target Class</label>
              <select
                value={formData.grade}
                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-[#FEF7F8] border border-[#CDD4DD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22819A]"
              >
                <option value="Grade 10">Grade 10</option>
                <option value="Grade 9">Grade 9</option>
                <option value="Grade 11">Grade 11</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-[#0F172A] mb-1">Section</label>
              <select
                value={formData.section}
                onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-[#FEF7F8] border border-[#CDD4DD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22819A]"
              >
                <option value="A">Section A</option>
                <option value="B">Section B</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-[#0F172A] mb-1">Submission Deadline</label>
              <input
                type="date"
                required
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-[#FEF7F8] border border-[#CDD4DD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22819A]"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#0F172A] mb-1">Total Maximum Marks</label>
              <input
                type="number"
                required
                value={formData.maxMarks}
                onChange={(e) => setFormData({ ...formData, maxMarks: Number(e.target.value) })}
                className="w-full px-3 py-2 text-sm bg-[#FEF7F8] border border-[#CDD4DD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22819A]"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-[#0F172A] mb-1">Description & Instructions</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Provide guidelines, chapter references, and submission rules..."
              className="w-full px-3 py-2 text-sm bg-[#FEF7F8] border border-[#CDD4DD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22819A]"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#0F172A] mb-1">Attachment (Document / Worksheet)</label>
            <div className="flex items-center gap-2 p-2.5 rounded-lg border border-dashed border-[#CDD4DD] bg-[#FEF7F8]">
              <Paperclip className="w-4 h-4 text-[#22819A]" />
              <input
                type="text"
                value={formData.attachmentName}
                onChange={(e) => setFormData({ ...formData, attachmentName: e.target.value })}
                placeholder="Attachment file name (e.g. Worksheet.pdf)"
                className="w-full text-xs bg-transparent focus:outline-none text-[#0F172A]"
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
              Publish Assignment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function ReviewSubmissionsModal({
  assignment,
  isOpen,
  onClose,
}: {
  assignment: Assignment | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  const { submissions, gradeSubmission } = useSchoolStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [gradeMarks, setGradeMarks] = useState<number>(45);
  const [feedbackText, setFeedbackText] = useState<string>("Well done!");

  if (!isOpen || !assignment) return null;

  const assignmentSubmissions = submissions.filter((s) => s.assignmentId === assignment.id);

  const handleSaveGrade = (submissionId: string) => {
    gradeSubmission(submissionId, gradeMarks, feedbackText);
    setEditingId(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-[#0F172A]/50 backdrop-blur-xs" onClick={onClose} />
      <div className="relative bg-white rounded-2xl border border-[#CDD4DD] shadow-2xl max-w-3xl w-full p-6 z-10 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-[#CDD4DD]">
          <div>
            <h2 className="text-base font-bold text-[#0F172A]">
              Submissions Review: {assignment.title}
            </h2>
            <p className="text-xs text-[#0F172A]/60">
              {assignment.subject} • {assignment.grade}-{assignment.section} • Total Marks: {assignment.maxMarks}
            </p>
          </div>
          <button onClick={onClose} className="text-[#0F172A]/50 hover:text-[#0F172A] p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#FEF7F8] border-b border-[#CDD4DD] font-semibold text-[#0F172A]/70 uppercase">
                <th className="py-2.5 px-3">Student</th>
                <th className="py-2.5 px-3">Submitted Date</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Marks</th>
                <th className="py-2.5 px-3">Feedback</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#CDD4DD]/60">
              {assignmentSubmissions.length > 0 ? (
                assignmentSubmissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-[#FEF7F8]/60">
                    <td className="py-3 px-3 font-semibold text-[#0F172A]">
                      {sub.studentName}
                      <span className="block text-[10px] text-[#0F172A]/50 font-normal">
                        Roll #{sub.rollNo}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-[#0F172A]/70">
                      {sub.submittedDate || "Not submitted"}
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                          sub.status === "Graded"
                            ? "bg-emerald-50 text-emerald-700"
                            : sub.status === "Submitted"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-rose-50 text-rose-700"
                        }`}
                      >
                        {sub.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-bold text-[#22819A]">
                      {editingId === sub.id ? (
                        <input
                          type="number"
                          max={sub.maxMarks}
                          value={gradeMarks}
                          onChange={(e) => setGradeMarks(Number(e.target.value))}
                          className="w-14 px-1.5 py-1 bg-white border border-[#CDD4DD] rounded text-xs"
                        />
                      ) : sub.marksObtained !== undefined ? (
                        `${sub.marksObtained} / ${sub.maxMarks}`
                      ) : (
                        `— / ${sub.maxMarks}`
                      )}
                    </td>
                    <td className="py-3 px-3 max-w-xs truncate text-[#0F172A]/70">
                      {editingId === sub.id ? (
                        <input
                          type="text"
                          value={feedbackText}
                          onChange={(e) => setFeedbackText(e.target.value)}
                          className="w-full px-2 py-1 bg-white border border-[#CDD4DD] rounded text-xs"
                        />
                      ) : (
                        sub.feedback || "Pending assessment"
                      )}
                    </td>
                    <td className="py-3 px-3 text-right">
                      {editingId === sub.id ? (
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleSaveGrade(sub.id)}
                            className="px-2 py-1 rounded bg-emerald-600 text-white font-medium text-[11px]"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="px-2 py-1 rounded border border-[#CDD4DD] text-[11px]"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setEditingId(sub.id);
                            setGradeMarks(sub.marksObtained ?? assignment.maxMarks - 5);
                            setFeedbackText(sub.feedback ?? "Good submission!");
                          }}
                          className="px-2.5 py-1 rounded border border-[#CDD4DD] bg-[#FEF7F8] hover:bg-[#90C2E7]/25 text-[#22819A] font-semibold text-[11px]"
                        >
                          {sub.status === "Graded" ? "Re-grade" : "Grade"}
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-[#0F172A]/50">
                    No submissions recorded for this assignment yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-5 pt-3 border-t border-[#CDD4DD] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-white bg-[#22819A] hover:bg-[#1b687c] rounded-lg"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

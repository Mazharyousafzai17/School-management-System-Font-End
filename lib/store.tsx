"use client";

import React, { createContext, useContext, useState } from "react";
import {
  User,
  UserRole,
  School,
  Student,
  Teacher,
  AttendanceRecord,
  FeeChallan,
  Expense,
  TimetableSlot,
  Assignment,
  AssignmentSubmission,
  Exam,
  ExamResult,
  Invoice,
} from "@/types";
import {
  mockUsers,
  mockSchools,
  mockStudents,
  mockTeachers,
  mockAttendanceRecords,
  mockFeeChallans,
  mockExpenses,
  mockTimetable,
  mockAssignments,
  mockSubmissions,
  mockExams,
  mockExamResults,
  mockInvoices,
} from "@/lib/mock-data";

interface SchoolStoreContextType {
  currentUser: User;
  switchRole: (role: UserRole) => void;
  schools: School[];
  addSchool: (school: Omit<School, "id" | "createdAt">) => void;
  updateSchool: (id: string, updates: Partial<School>) => void;
  deleteSchool: (id: string) => void;
  students: Student[];
  addStudent: (student: Omit<Student, "id" | "admissionDate">) => void;
  updateStudent: (id: string, updates: Partial<Student>) => void;
  teachers: Teacher[];
  addTeacher: (teacher: Omit<Teacher, "id" | "joinDate">) => void;
  updateTeacher: (id: string, updates: Partial<Teacher>) => void;
  attendance: AttendanceRecord[];
  updateAttendance: (id: string, status: "Present" | "Absent" | "Leave", remarks?: string) => void;
  bulkMarkAttendance: (date: string, grade: string, section: string, status: "Present" | "Absent" | "Leave") => void;
  challans: FeeChallan[];
  addChallan: (challan: Omit<FeeChallan, "id" | "challanNo">) => void;
  markChallanPaid: (id: string, method?: string) => void;
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, "id">) => void;
  timetable: TimetableSlot[];
  assignments: Assignment[];
  addAssignment: (assignment: Omit<Assignment, "id" | "assignedDate" | "submissionsCount" | "totalStudents">) => void;
  submissions: AssignmentSubmission[];
  gradeSubmission: (id: string, marks: number, feedback: string) => void;
  exams: Exam[];
  addExam: (exam: Omit<Exam, "id">) => void;
  examResults: ExamResult[];
  invoices: Invoice[];
}

const SchoolStoreContext = createContext<SchoolStoreContextType | undefined>(undefined);

export function SchoolStoreProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User>(mockUsers[0]);
  const [schools, setSchools] = useState<School[]>(mockSchools);
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [teachers, setTeachers] = useState<Teacher[]>(mockTeachers);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(mockAttendanceRecords);
  const [challans, setChallans] = useState<FeeChallan[]>(mockFeeChallans);
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses);
  const [timetable] = useState<TimetableSlot[]>(mockTimetable);
  const [assignments, setAssignments] = useState<Assignment[]>(mockAssignments);
  const [submissions, setSubmissions] = useState<AssignmentSubmission[]>(mockSubmissions);
  const [exams, setExams] = useState<Exam[]>(mockExams);
  const [examResults, setExamResults] = useState<ExamResult[]>(mockExamResults);
  const [invoices] = useState<Invoice[]>(mockInvoices);

  const switchRole = (role: UserRole) => {
    const target = mockUsers.find((u) => u.role === role);
    if (target) {
      setCurrentUser(target);
    }
  };

  const addSchool = (schoolData: Omit<School, "id" | "createdAt">) => {
    const newSchool: School = {
      ...schoolData,
      id: `school-${Date.now()}`,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setSchools((prev) => [newSchool, ...prev]);
  };

  const updateSchool = (id: string, updates: Partial<School>) => {
    setSchools((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)));
  };

  const deleteSchool = (id: string) => {
    setSchools((prev) => prev.filter((s) => s.id !== id));
  };

  const addStudent = (studentData: Omit<Student, "id" | "admissionDate">) => {
    const newStudent: Student = {
      ...studentData,
      id: `std-${Date.now()}`,
      admissionDate: new Date().toISOString().split("T")[0],
    };
    setStudents((prev) => [newStudent, ...prev]);
  };

  const updateStudent = (id: string, updates: Partial<Student>) => {
    setStudents((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)));
  };

  const addTeacher = (teacherData: Omit<Teacher, "id" | "joinDate">) => {
    const newTeacher: Teacher = {
      ...teacherData,
      id: `tch-${Date.now()}`,
      joinDate: new Date().toISOString().split("T")[0],
    };
    setTeachers((prev) => [newTeacher, ...prev]);
  };

  const updateTeacher = (id: string, updates: Partial<Teacher>) => {
    setTeachers((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
  };

  const updateAttendance = (id: string, status: "Present" | "Absent" | "Leave", remarks?: string) => {
    setAttendance((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status, remarks: remarks ?? a.remarks } : a))
    );
  };

  const bulkMarkAttendance = (date: string, grade: string, section: string, status: "Present" | "Absent" | "Leave") => {
    setAttendance((prev) =>
      prev.map((a) =>
        a.date === date && a.grade === grade && a.section === section
          ? { ...a, status }
          : a
      )
    );
  };

  const addChallan = (challanData: Omit<FeeChallan, "id" | "challanNo">) => {
    const newChallan: FeeChallan = {
      ...challanData,
      id: `fc-${Date.now()}`,
      challanNo: `CHL-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    };
    setChallans((prev) => [newChallan, ...prev]);
  };

  const markChallanPaid = (id: string, method = "Online Payment") => {
    setChallans((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              status: "Paid",
              paidDate: new Date().toISOString().split("T")[0],
              paymentMethod: method,
            }
          : c
      )
    );
  };

  const addExpense = (expenseData: Omit<Expense, "id">) => {
    const newExpense: Expense = {
      ...expenseData,
      id: `exp-${Date.now()}`,
    };
    setExpenses((prev) => [newExpense, ...prev]);
  };

  const addAssignment = (assignmentData: Omit<Assignment, "id" | "assignedDate" | "submissionsCount" | "totalStudents">) => {
    const newAssignment: Assignment = {
      ...assignmentData,
      id: `asg-${Date.now()}`,
      assignedDate: new Date().toISOString().split("T")[0],
      submissionsCount: 0,
      totalStudents: 28,
    };
    setAssignments((prev) => [newAssignment, ...prev]);
  };

  const gradeSubmission = (id: string, marks: number, feedback: string) => {
    setSubmissions((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              status: "Graded",
              marksObtained: marks,
              feedback,
            }
          : s
      )
    );
  };

  const addExam = (examData: Omit<Exam, "id">) => {
    const newExam: Exam = {
      ...examData,
      id: `ex-${Date.now()}`,
    };
    setExams((prev) => [newExam, ...prev]);
  };

  return (
    <SchoolStoreContext.Provider
      value={{
        currentUser,
        switchRole,
        schools,
        addSchool,
        updateSchool,
        deleteSchool,
        students,
        addStudent,
        updateStudent,
        teachers,
        addTeacher,
        updateTeacher,
        attendance,
        updateAttendance,
        bulkMarkAttendance,
        challans,
        addChallan,
        markChallanPaid,
        expenses,
        addExpense,
        timetable,
        assignments,
        addAssignment,
        submissions,
        gradeSubmission,
        exams,
        addExam,
        examResults,
        invoices,
      }}
    >
      {children}
    </SchoolStoreContext.Provider>
  );
}

export function useSchoolStore() {
  const context = useContext(SchoolStoreContext);
  if (!context) {
    throw new Error("useSchoolStore must be used within a SchoolStoreProvider");
  }
  return context;
}

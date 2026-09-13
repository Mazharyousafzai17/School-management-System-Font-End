export type UserRole = "super_admin" | "school_admin" | "teacher" | "student";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  schoolId?: string;
  phone?: string;
}

export interface School {
  id: string;
  name: string;
  code: string;
  domain: string;
  logo?: string;
  adminName: string;
  adminEmail: string;
  plan: "Starter" | "Pro" | "Enterprise";
  status: "Active" | "Trial" | "Suspended";
  studentCount: number;
  maxStudents: number;
  createdAt: string;
  renewalDate: string;
  mrr: number;
}

export interface Student {
  id: string;
  rollNo: string;
  name: string;
  email: string;
  grade: string;
  section: string;
  gender: "Male" | "Female" | "Other";
  dob: string;
  bloodGroup: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  address: string;
  attendanceRate: number;
  gpa: number;
  status: "Enrolled" | "Graduated" | "Pending";
  admissionDate: string;
}

export interface ClassMapping {
  grade: string;
  section: string;
  subject: string;
}

export interface Teacher {
  id: string;
  empId: string;
  name: string;
  email: string;
  phone: string;
  designation: string;
  department: string;
  qualification: string;
  joinDate: string;
  assignedClasses: ClassMapping[];
  status: "Active" | "On Leave";
}

export interface AttendanceRecord {
  id: string;
  date: string;
  studentId: string;
  studentName: string;
  rollNo: string;
  grade: string;
  section: string;
  status: "Present" | "Absent" | "Leave";
  remarks?: string;
}

export interface FeeChallan {
  id: string;
  challanNo: string;
  studentId: string;
  studentName: string;
  rollNo: string;
  grade: string;
  section: string;
  issueDate: string;
  dueDate: string;
  tuitionFee: number;
  labFee: number;
  sportsFee: number;
  totalAmount: number;
  status: "Paid" | "Pending" | "Overdue";
  paidDate?: string;
  paymentMethod?: string;
}

export interface Expense {
  id: string;
  title: string;
  category: "Maintenance" | "Utilities" | "Payroll" | "Supplies" | "Lab Equipment";
  amount: number;
  date: string;
  paymentMethod: string;
  approvedBy: string;
  status: "Approved" | "Pending";
}

export interface TimetableSlot {
  id: string;
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
  period: number;
  startTime: string;
  endTime: string;
  grade: string;
  section: string;
  subject: string;
  teacherId: string;
  teacherName: string;
  room: string;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  subject: string;
  grade: string;
  section: string;
  teacherId: string;
  teacherName: string;
  assignedDate: string;
  dueDate: string;
  maxMarks: number;
  attachmentName?: string;
  submissionsCount: number;
  totalStudents: number;
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName: string;
  rollNo: string;
  submittedDate: string;
  status: "Submitted" | "Graded" | "Late" | "Pending";
  marksObtained?: number;
  maxMarks: number;
  feedback?: string;
}

export interface Exam {
  id: string;
  title: string;
  type: "Midterm" | "Final" | "Quiz" | "Unit Test";
  subject: string;
  grade: string;
  date: string;
  time: string;
  duration: string;
  room: string;
  totalMarks: number;
  passingMarks: number;
  status: "Upcoming" | "Completed" | "Marks Pending" | "Published";
}

export interface ExamResult {
  id: string;
  examId: string;
  examTitle: string;
  studentId: string;
  studentName: string;
  rollNo: string;
  grade: string;
  section: string;
  marksObtained: number;
  totalMarks: number;
  gradeLetter: string;
  gpa: number;
  remarks: string;
}

export interface Invoice {
  id: string;
  invoiceNo: string;
  schoolId: string;
  schoolName: string;
  plan: string;
  amount: number;
  issueDate: string;
  dueDate: string;
  status: "Paid" | "Overdue" | "Processing";
  billingCycle: "Monthly" | "Yearly";
}

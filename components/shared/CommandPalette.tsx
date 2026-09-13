"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  X,
  LayoutDashboard,
  GraduationCap,
  Users,
  CalendarCheck,
  CalendarDays,
  Receipt,
  FileSpreadsheet,
  Award,
  BookOpen,
  Settings,
  Sun,
  Moon,
  IdCard,
  UserPlus,
  ArrowRight,
  Sparkles,
  Command,
  CornerDownLeft,
} from "lucide-react";
import { useSchoolStore } from "@/lib/store";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useToast } from "@/components/providers/ToastProvider";

interface CommandItem {
  id: string;
  title: string;
  category: "Navigation" | "Actions" | "Students" | "Faculty";
  subtitle?: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  badge?: string;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const { students, teachers, switchRole } = useSchoolStore();
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();

  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Build command list
  const baseCommands: CommandItem[] = [
    // Quick Actions
    {
      id: "action-theme",
      title: theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode",
      category: "Actions",
      subtitle: "Toggle between obsidian dark and clean light appearance",
      icon: theme === "dark" ? Sun : Moon,
      action: () => {
        toggleTheme();
        toast.info(theme === "dark" ? "Switched to Light Mode" : "Switched to Dark Mode");
        onClose();
      },
    },
    {
      id: "action-add-student",
      title: "Enroll New Student",
      category: "Actions",
      subtitle: "Open student admission registry form",
      icon: UserPlus,
      action: () => {
        router.push("/admin/students");
        toast.info("Navigated to Student Directory");
        onClose();
      },
    },
    {
      id: "action-collect-fees",
      title: "Collect Fees & Reconcile Challans",
      category: "Actions",
      subtitle: "Jump to 3-part bank voucher clearance desk",
      icon: Receipt,
      action: () => {
        router.push("/admin/fees");
        toast.info("Opened Fee Collection Register");
        onClose();
      },
    },
    {
      id: "action-mark-attendance",
      title: "Daily Attendance Roll-Call",
      category: "Actions",
      subtitle: "Take classroom attendance for today's session",
      icon: CalendarCheck,
      action: () => {
        router.push("/admin/attendance");
        toast.info("Opened Attendance Roll-Call");
        onClose();
      },
    },

    // Navigation Links
    {
      id: "nav-admin-dash",
      title: "School Admin Dashboard",
      category: "Navigation",
      subtitle: "Campus administration telemetry & metrics",
      icon: LayoutDashboard,
      action: () => {
        switchRole("school_admin");
        router.push("/admin/dashboard");
        onClose();
      },
    },
    {
      id: "nav-students",
      title: "Students Directory",
      category: "Navigation",
      subtitle: "Pupil profiles, sections, GPA & enrollment records",
      icon: GraduationCap,
      action: () => {
        router.push("/admin/students");
        onClose();
      },
      badge: `${students.length} Pupils`,
    },
    {
      id: "nav-timetable",
      title: "Timetable & Schedule Matrix",
      category: "Navigation",
      subtitle: "Weekly 7-period grid across Monday to Friday",
      icon: CalendarDays,
      action: () => {
        router.push("/admin/timetable");
        onClose();
      },
    },
    {
      id: "nav-fees",
      title: "Fee Collection & Challans",
      category: "Navigation",
      subtitle: "Fee vouchers, arrears, and bank copies",
      icon: Receipt,
      action: () => {
        router.push("/admin/fees");
        onClose();
      },
    },
    {
      id: "nav-expenses",
      title: "Campus Expenses Ledger",
      category: "Navigation",
      subtitle: "Facility bills, payroll, laboratory equipment outlays",
      icon: FileSpreadsheet,
      action: () => {
        router.push("/admin/expenses");
        onClose();
      },
    },
    {
      id: "nav-exams",
      title: "Examinations & Result Reports",
      category: "Navigation",
      subtitle: "Term assessments, transcripts, and GPA distribution",
      icon: Award,
      action: () => {
        router.push("/admin/exams");
        onClose();
      },
    },
    {
      id: "nav-teachers",
      title: "Faculty Instructors Directory",
      category: "Navigation",
      subtitle: "Teacher departments, qualifications, room assignments",
      icon: Users,
      action: () => {
        router.push("/admin/teachers");
        onClose();
      },
      badge: `${teachers.length} Staff`,
    },
    {
      id: "nav-student-portal",
      title: "Student Academic Workspace",
      category: "Navigation",
      subtitle: "Switch to Student portal with courses, assignments & results",
      icon: BookOpen,
      action: () => {
        switchRole("student");
        router.push("/student/dashboard");
        onClose();
      },
    },
    {
      id: "nav-teacher-portal",
      title: "Teacher Faculty Workspace",
      category: "Navigation",
      subtitle: "Switch to Teacher portal for grading & schedules",
      icon: Users,
      action: () => {
        switchRole("teacher");
        router.push("/teacher/dashboard");
        onClose();
      },
    },
    {
      id: "nav-owner-portal",
      title: "Multi-Tenant Platform Owner",
      category: "Navigation",
      subtitle: "Multi-campus cloud operations, billing & platform settings",
      icon: Settings,
      action: () => {
        switchRole("super_admin");
        router.push("/owner/dashboard");
        onClose();
      },
    },
  ];

  // Dynamic Student Search Items
  const studentCommands: CommandItem[] = students.map((s) => ({
    id: `student-${s.id}`,
    title: s.name,
    category: "Students",
    subtitle: `Roll #${s.rollNo} • Class ${s.grade}-${s.section} • GPA ${s.gpa.toFixed(2)} • ${s.parentPhone}`,
    icon: GraduationCap,
    action: () => {
      router.push("/admin/students");
      toast.info(`Found student ${s.name} (Roll #${s.rollNo})`);
      onClose();
    },
    badge: s.status,
  }));

  // Dynamic Teacher Search Items
  const teacherCommands: CommandItem[] = teachers.map((t) => {
    const subjects = t.assignedClasses?.map((c) => c.subject).join(", ") || t.department;
    return {
      id: `teacher-${t.id}`,
      title: t.name,
      category: "Faculty",
      subtitle: `${t.designation} • Dept. of ${t.department} • ${subjects}`,
      icon: Users,
      action: () => {
        router.push("/admin/teachers");
        toast.info("Faculty Selected", `${t.name} (${t.designation})`);
        onClose();
      },
      badge: t.designation,
    };
  });

  const allItems = [...baseCommands, ...studentCommands, ...teacherCommands];

  // Filter based on user query
  const filtered = query.trim() === ""
    ? baseCommands
    : allItems.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          (item.subtitle && item.subtitle.toLowerCase().includes(query.toLowerCase())) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      );

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].action();
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24 p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-[var(--card-bg)] rounded-3xl border border-[var(--border-color)] shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-[var(--border-color)] flex items-center gap-3.5 bg-[var(--card-bg)]">
          <Search className="w-5 h-5 text-[var(--primary)] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a command, page name, student, or staff..."
            className="flex-1 text-base sm:text-lg bg-transparent border-none outline-none text-[var(--text-main)] placeholder:text-[var(--text-muted)] font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--card-subtle)] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs font-bold text-[var(--text-muted)] bg-[var(--card-subtle)] border border-[var(--border-color)] rounded-md shadow-2xs">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1 divide-y-0">
          {filtered.length > 0 ? (
            filtered.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;

              return (
                <div
                  key={item.id}
                  onClick={() => item.action()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-3.5 rounded-2xl cursor-pointer transition-all duration-150 group ${
                    isSelected
                      ? "bg-[var(--primary)] text-white shadow-md shadow-[var(--shadow-color)] scale-[1.01]"
                      : "hover:bg-[var(--primary-light)] text-[var(--text-main)]"
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? "bg-white/20 text-white"
                          : "bg-[var(--card-subtle)] text-[var(--primary)] group-hover:bg-[var(--primary-light)]"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm sm:text-base leading-tight truncate">
                          {item.title}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                            isSelected
                              ? "bg-white/20 text-white"
                              : "bg-[var(--card-subtle)] text-[var(--text-muted)] border border-[var(--border-color)]"
                          }`}
                        >
                          {item.category}
                        </span>
                      </div>
                      {item.subtitle && (
                        <p
                          className={`text-xs mt-0.5 truncate leading-normal ${
                            isSelected ? "text-white/80" : "text-[var(--text-muted)]"
                          }`}
                        >
                          {item.subtitle}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    {item.badge && (
                      <span
                        className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full ${
                          isSelected
                            ? "bg-white/25 text-white"
                            : "bg-[var(--primary-light)] text-[var(--primary)] border border-[var(--primary)]/20"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                    {isSelected && <CornerDownLeft className="w-4 h-4 text-white/90 animate-pulse" />}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-12 text-center text-[var(--text-muted)]">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-40 text-[var(--primary)]" />
              <p className="font-bold text-sm text-[var(--text-main)]">
                No matching results for &ldquo;{query}&rdquo;
              </p>
              <p className="text-xs mt-1">Try searching for &quot;Student&quot;, &quot;Fee&quot;, &quot;Timetable&quot;, or &quot;Theme&quot;</p>
            </div>
          )}
        </div>

        {/* Footer Shortcut Bar */}
        <div className="p-3 sm:px-5 sm:py-3.5 border-t border-[var(--border-color)] bg-[var(--card-subtle)]/60 flex items-center justify-between text-xs text-[var(--text-muted)] font-semibold">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-[var(--card-bg)] border border-[var(--border-color)] shadow-2xs font-mono text-[10px]">
                ↑
              </kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-[var(--card-bg)] border border-[var(--border-color)] shadow-2xs font-mono text-[10px]">
                ↓
              </kbd>
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-[var(--card-bg)] border border-[var(--border-color)] shadow-2xs font-mono text-[10px]">
                ↵
              </kbd>
              Select
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-[var(--card-bg)] border border-[var(--border-color)] shadow-2xs font-mono text-[10px]">
                ESC
              </kbd>
              Close
            </span>
          </div>

          <div className="flex items-center gap-1 text-[var(--primary)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>EduSphere Spotlight</span>
          </div>
        </div>
      </div>
    </div>
  );
}

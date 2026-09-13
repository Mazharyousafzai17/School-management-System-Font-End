"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  Wallet,
  Settings,
  Users,
  CalendarCheck,
  CalendarDays,
  Receipt,
  FileSpreadsheet,
  Award,
  GraduationCap,
  BookOpen,
  ClipboardList,
  CheckSquare,
  UserSquare2,
  LogOut,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { useSchoolStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { UserRole } from "@/types";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  const { currentUser } = useSchoolStore();

  const getNavItems = (role: UserRole): { title: string; items: NavItem[] }[] => {
    switch (role) {
      case "super_admin":
        return [
          {
            title: "Platform Overview",
            items: [
              { name: "Dashboard", href: "/owner/dashboard", icon: LayoutDashboard },
              { name: "School Management", href: "/owner/schools", icon: Building2, badge: "124" },
              { name: "Money Management", href: "/owner/money", icon: Wallet },
              { name: "System Settings", href: "/owner/settings", icon: Settings },
            ],
          },
        ];

      case "school_admin":
        return [
          {
            title: "Campus Administration",
            items: [
              { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
              { name: "Students Directory", href: "/admin/students", icon: GraduationCap, badge: "1,420" },
              { name: "Attendance Roll-Call", href: "/admin/attendance", icon: CalendarCheck },
              { name: "Timetable Schedule", href: "/admin/timetable", icon: CalendarDays },
              { name: "Fees & Challans", href: "/admin/fees", icon: Receipt },
              { name: "Campus Expenses", href: "/admin/expenses", icon: FileSpreadsheet },
              { name: "Exam & Result", href: "/admin/exams", icon: Award },
              { name: "Instructors / Faculty", href: "/admin/teachers", icon: Users, badge: "86" },
            ],
          },
        ];

      case "teacher":
        return [
          {
            title: "Faculty Workspace",
            items: [
              { name: "Dashboard", href: "/teacher/dashboard", icon: LayoutDashboard },
              { name: "My Students", href: "/teacher/students", icon: Users },
              { name: "Class Schedule", href: "/teacher/schedule", icon: CalendarDays },
              { name: "Take Attendance", href: "/teacher/attendance", icon: CheckSquare, badge: "Today" },
              { name: "Exam Marks", href: "/teacher/exams", icon: Award },
              { name: "Assignments & Tasks", href: "/teacher/assignments", icon: ClipboardList, badge: "3" },
            ],
          },
        ];

      case "student":
        return [
          {
            title: "Academic Portal",
            items: [
              { name: "Dashboard", href: "/student/dashboard", icon: LayoutDashboard },
              { name: "Personal Information", href: "/student/personal", icon: UserSquare2 },
              { name: "Academic Information", href: "/student/academic", icon: BookOpen },
              { name: "Results & Grades", href: "/student/results", icon: Award },
            ],
          },
        ];

      default:
        return [];
    }
  };

  const navSections = getNavItems(currentUser.role);

  return (
    <aside
      className={cn(
        "w-80 bg-[var(--card-bg)] border-r border-[var(--border-color)] flex flex-col h-full shrink-0 select-none shadow-xs z-20 transition-colors",
        className
      )}
    >
      {/* Brand & Portal Header */}
      <div className="p-6 sm:p-7 border-b border-[var(--border-color)] bg-[var(--card-bg)]">
        <Link href="/" className="flex items-center gap-4 group">
          <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-[var(--gradient-from)] to-[var(--gradient-to)] flex items-center justify-center text-white font-bold shadow-md shadow-[var(--shadow-color)] group-hover:scale-105 transition-all">
            <Sparkles className="w-7 h-7 text-white/80" />
          </div>
          <div>
            <div className="font-black text-[var(--text-main)] text-2xl leading-tight tracking-tight flex items-center gap-2 font-heading">
              EduSphere
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[var(--primary-light)] text-[var(--primary)] font-extrabold border border-[var(--primary)]/20">
                LMS
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[var(--primary)] capitalize truncate font-bold mt-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {currentUser.role.replace("_", " ")} Portal
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 py-6 px-4 space-y-6 overflow-y-auto">
        {navSections.map((section, sIdx) => (
          <div key={sIdx} className="space-y-2">
            <div className="px-4 text-xs font-black text-[var(--text-muted)] uppercase tracking-wider mb-3">
              {section.title}
            </div>
            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-bold transition-all duration-200 group relative",
                    isActive
                      ? "bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)] text-white shadow-md shadow-[var(--shadow-color)] translate-x-1"
                      : "text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--primary-light)] hover:translate-x-1"
                  )}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={cn(
                        "w-9 h-9 rounded-xl flex items-center justify-center transition-colors",
                        isActive ? "bg-white/20 text-white" : "bg-[var(--card-subtle)] text-[var(--primary)] group-hover:bg-[var(--primary-light)]"
                      )}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="leading-snug">{item.name}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={cn(
                        "text-xs font-extrabold px-2.5 py-0.5 rounded-full",
                        isActive
                          ? "bg-white/25 text-white"
                          : "bg-[var(--primary-light)] text-[var(--primary)] border border-[var(--primary)]/20"
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* User Profile & Logout Bottom Box */}
      <div className="p-4 sm:p-5 border-t border-[var(--border-color)] bg-[var(--card-subtle)]/40">
        <div className="p-3 rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] flex items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-3.5 min-w-0">
            {currentUser.avatar ? (
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-11 h-11 rounded-xl object-cover border-2 border-[var(--border-color)] shadow-2xs"
              />
            ) : (
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[var(--gradient-from)] to-[var(--gradient-to)] text-white flex items-center justify-center font-black text-base shadow-xs">
                {currentUser.name.charAt(0)}
              </div>
            )}
            <div className="min-w-0">
              <p className="text-sm sm:text-base font-bold text-[var(--text-main)] truncate">
                {currentUser.name}
              </p>
              <p className="text-xs text-[var(--primary)] font-bold truncate capitalize">
                {currentUser.role.replace("_", " ")}
              </p>
            </div>
          </div>

          <Link
            href="/login"
            className="p-2.5 rounded-xl text-[var(--text-muted)] hover:text-rose-500 hover:bg-rose-500/15 transition-colors border border-transparent hover:border-rose-500/30"
            title="Sign Out"
          >
            <LogOut className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </aside>

  );
}

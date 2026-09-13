"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Shield,
  School,
  UserCheck,
  GraduationCap,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Lock,
  Globe,
  Users,
  Building2,
  Receipt,
  CalendarDays,
  Award,
  Star,
  Sun,
  Moon,
} from "lucide-react";
import { useSchoolStore } from "@/lib/store";
import { useTheme } from "@/components/providers/ThemeProvider";
import { UserRole } from "@/types";

export default function LandingPage() {
  const router = useRouter();
  const { switchRole } = useSchoolStore();
  const { theme, toggleTheme } = useTheme();

  const rolePortals = [
    {
      role: "super_admin" as UserRole,
      title: "Super Admin / Platform Owner",
      description: "Manage multi-tenant campuses, SaaS billing, platform MRR/ARR, and global system parameters.",
      icon: Shield,
      path: "/owner/dashboard",
      badge: "Platform Control",
      user: "Alexander Vance (Super Admin)",
      features: ["124+ Schools Multi-Tenant Hub", "$248k MRR Revenue Dashboard", "School Provisioning Workflow"],
    },
    {
      role: "school_admin" as UserRole,
      title: "School Admin Portal",
      description: "Oversee campus operations, admissions pipeline, fee challans, 7-period timetable matrix, and faculty workloads.",
      icon: School,
      path: "/admin/dashboard",
      badge: "Campus Ops",
      user: "Dr. Eleanor Wright (Principal)",
      features: ["1,420 Enrolled Students Directory", "3-Part Printable Bank Challans", "7-Period Weekly Matrix"],
    },
    {
      role: "teacher" as UserRole,
      title: "Teacher Portal",
      description: "Manage assigned classes, period schedules, daily bulk roll-call, assignment grading, and exam marks calculation.",
      icon: UserCheck,
      path: "/teacher/dashboard",
      badge: "Faculty Suite",
      user: "Usman Ali (Mathematics & Physics)",
      features: ["Interactive Daily Roll-Call", "Class & Period Timetable", "Assignment Submissions Review"],
    },
    {
      role: "student" as UserRole,
      title: "Student Portal",
      description: "View daily timetable, interactive filter tabs ([Exam] | [Classes] | [Assignments] | [Attendance]), and report cards.",
      icon: GraduationCap,
      path: "/student/dashboard",
      badge: "Learner Hub",
      user: "Ayan Ahmed (Grade 10-A, Roll #1042)",
      features: ["Filter Tabs [Exam | Classes | ...]", "Official Printable Transcript", "Class Schedule & Routine"],
    },
  ];

  const handleLaunch = (role: UserRole, path: string) => {
    switchRole(role);
    router.push(path);
  };

  return (
    <div className="min-h-screen bg-[var(--canvas-bg)] flex flex-col text-[var(--text-main)]">
      {/* Top Navbar */}
      <header className="border-b border-[var(--border-color)] bg-[var(--card-bg)]/95 backdrop-blur-md sticky top-0 z-40 px-6 lg:px-12 py-4 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[var(--gradient-from)] to-[var(--gradient-to)] flex items-center justify-center text-white shadow-md shadow-[var(--shadow-color)]">
            <Sparkles className="w-6 h-6 text-white/80" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-xl text-[var(--text-main)] tracking-tight font-heading">EduSphere</span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[var(--primary-light)] text-[var(--primary)] border border-[var(--primary)]/20">
                Multi-Tenant LMS
              </span>
            </div>
            <p className="text-[11px] text-[var(--text-muted)] font-medium">Production Enterprise Suite</p>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl border border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--primary)] hover:border-[var(--primary)] hover:bg-[var(--card-subtle)] transition-all cursor-pointer shadow-2xs"
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle Dark/Light Mode"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-amber-400 rotate-0 transition-transform duration-300 hover:rotate-45" />
            ) : (
              <Moon className="w-5 h-5 text-[var(--primary)] rotate-0 transition-transform duration-300 hover:-rotate-12" />
            )}
          </button>

          <Link
            href="/login"
            className="px-4 py-2 text-xs sm:text-sm font-bold text-[var(--text-main)] hover:text-[var(--primary)] border border-[var(--border-color)] rounded-xl bg-[var(--card-bg)] hover:bg-[var(--card-subtle)] transition-all shadow-2xs"
          >
            Sign In with Account
          </Link>
          <button
            onClick={() => handleLaunch("super_admin", "/owner/dashboard")}
            className="px-5 py-2 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)] hover:opacity-95 rounded-xl shadow-md shadow-[var(--shadow-color)] transition-all cursor-pointer"
          >
            Launch System
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 max-w-[1600px] mx-auto w-full px-6 lg:px-12 py-12 lg:py-16">
        <div className="text-center max-w-4xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--primary-light)] border border-[var(--primary)]/20 text-[var(--primary)] text-xs sm:text-sm font-extrabold mb-5 shadow-2xs">
            <Sparkles className="w-4 h-4" /> Next.js App Router • Multi-Tenant School Architecture
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-[var(--text-main)] tracking-tight leading-tight font-heading">
            Next-Generation OS for <br className="hidden sm:inline" />
            <span className="text-[var(--primary)]">Schools, Teachers & Students</span>
          </h1>
          <p className="mt-5 text-base sm:text-xl text-[var(--text-muted)] max-w-3xl mx-auto leading-relaxed font-normal">
            Enterprise-grade multi-tenant educational ecosystem with dedicated, role-isolated portals for platform owners, school administrators, faculty teachers, and students.
          </p>

          {/* Live Platform Stats Bar */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 p-3 bg-[var(--card-bg)] rounded-2xl border border-[var(--border-color)] shadow-xs max-w-3xl mx-auto">
            <div className="p-3 text-center">
              <span className="text-2xl font-black text-[var(--primary)] block font-heading">124+</span>
              <span className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Active Campuses</span>
            </div>
            <div className="p-3 text-center border-l border-[var(--border-color)]">
              <span className="text-2xl font-black text-[var(--primary)] block font-heading">48,200+</span>
              <span className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Students Enrolled</span>
            </div>
            <div className="p-3 text-center border-l border-[var(--border-color)]">
              <span className="text-2xl font-black text-[var(--primary)] block font-heading">99.98%</span>
              <span className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Cloud Uptime</span>
            </div>
            <div className="p-3 text-center border-l border-[var(--border-color)]">
              <span className="text-2xl font-black text-[var(--primary)] block font-heading">$2.98M</span>
              <span className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Annual Run Rate</span>
            </div>
          </div>
        </div>

        {/* 4 Role Portal Launch Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {rolePortals.map((portal) => {
            const Icon = portal.icon;
            return (
              <div
                key={portal.role}
                className="bg-[var(--card-bg)] rounded-3xl border border-[var(--border-color)] p-7 lg:p-8 shadow-xs hover:shadow-2xl hover:border-[var(--primary)] transition-all flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-[var(--card-subtle)] border border-[var(--border-color)] flex items-center justify-center text-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-white transition-all shadow-2xs">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-[var(--primary-light)] text-[var(--primary)] border border-[var(--primary)]/20 uppercase tracking-wider">
                      {portal.badge}
                    </span>
                  </div>

                  <h3 className="font-black text-[var(--text-main)] text-lg mb-2.5 group-hover:text-[var(--primary)] transition-colors leading-snug font-heading">
                    {portal.title}
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-5">
                    {portal.description}
                  </p>

                  {/* Feature Bullets */}
                  <div className="space-y-2 mb-6 pt-4 border-t border-[var(--border-color)]/60">
                    {portal.features.map((feat, fi) => (
                      <div key={fi} className="flex items-center gap-2 text-xs text-[var(--text-main)] font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[var(--primary)] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-5 border-t border-[var(--border-color)]">
                  <div className="text-xs text-[var(--text-muted)] mb-4 bg-[var(--card-subtle)] p-2.5 rounded-xl border border-[var(--border-color)]/60">
                    <span className="font-semibold text-[var(--text-muted)] block text-[10px] uppercase tracking-wider">Demo User:</span>
                    <strong className="text-xs font-bold text-[var(--text-main)] block mt-0.5">{portal.user}</strong>
                  </div>
                  <button
                    onClick={() => handleLaunch(portal.role, portal.path)}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[var(--primary)] text-white font-bold text-sm hover:bg-[var(--primary-hover)] transition-colors shadow-xs cursor-pointer"
                  >
                    <span>Launch Portal</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Architectural Highlights Grid */}
        <div className="mt-16 bg-[var(--card-bg)] rounded-3xl border border-[var(--border-color)] p-8 lg:p-12 shadow-xs">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-xs font-black text-[var(--primary)] uppercase tracking-wider mb-2">
              System Architecture & Capabilities
            </h2>
            <h3 className="text-2xl sm:text-3xl font-black text-[var(--text-main)] font-heading">
              Built for Multi-Campus Institutional Scale
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[var(--card-subtle)] border border-[var(--border-color)]/80 hover:border-[var(--primary)] transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center mb-3">
                <Building2 className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-[var(--text-main)] text-base mb-2 font-heading">Multi-Tenant Isolation</h4>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Separate domain and campus codes for Apex Academy, Beacon Crest, and Horizon Collegiate with tenant-level security.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--card-subtle)] border border-[var(--border-color)]/80 hover:border-[var(--primary)] transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center mb-3">
                <CalendarDays className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-[var(--text-main)] text-base mb-2 font-heading">7-Period Schedule Matrix</h4>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Dynamic weekly schedule grid mapping classroom numbers, faculty workloads, and periods Monday through Friday.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--card-subtle)] border border-[var(--border-color)]/80 hover:border-[var(--primary)] transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center mb-3">
                <Receipt className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-[var(--text-main)] text-base mb-2 font-heading">Fee Challan Generator</h4>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Printable 3-part bank fee vouchers (Student, School, Bank copies) with realistic barcodes and payment status tracking.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--card-subtle)] border border-[var(--border-color)]/80 hover:border-[var(--primary)] transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center mb-3">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-[var(--text-main)] text-base mb-2 font-heading">Dynamic Filter Tabs</h4>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Instant tab switching on student dashboard: [Exam] | [Classes] | [Assignments] | [Attendance] with official transcript generation.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--border-color)] py-8 text-center text-xs sm:text-sm text-[var(--text-muted)] bg-[var(--card-bg)] font-medium">
        EduSphere Multi-Tenant LMS • Royal Indigo & Electric Violet Edition
      </footer>
    </div>
  );
}


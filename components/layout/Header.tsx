"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Menu,
  Bell,
  Search,
  Calendar,
  Sparkles,
  School,
  LogOut,
  ChevronDown,
  CheckCircle2,
  Clock,
  Command,
  Sun,
  Moon,
} from "lucide-react";
import { useSchoolStore } from "@/lib/store";
import { useTheme } from "@/components/providers/ThemeProvider";
import { MobileDrawer } from "./MobileDrawer";
import { CommandPalette } from "@/components/shared/CommandPalette";

export function Header({ title, subtitle }: { title?: string; subtitle?: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const { currentUser } = useSchoolStore();
  const { theme, toggleTheme } = useTheme();

  // Global shortcut: Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-30 bg-[var(--card-bg)]/95 backdrop-blur-md border-b border-[var(--border-color)] px-6 lg:px-10 py-4.5 flex items-center justify-between shadow-2xs">
        {/* Left: Mobile hamburger & Page Title / Campus Context */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-3 rounded-xl text-[#312B1E] hover:bg-[#FAF7F2] border border-[#E5D7C3] transition-colors"
            aria-label="Open Navigation"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl lg:text-3xl font-black text-[var(--text-main)] tracking-tight font-heading">
                {title || "Dashboard"}
              </h1>
              {currentUser.role === "school_admin" && (
                <span className="hidden sm:inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold px-3.5 py-1 rounded-full bg-[var(--primary-light)] text-[var(--primary)] border border-[var(--primary)]/20 shadow-2xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <School className="w-4 h-4" /> Apex International Academy
                </span>
              )}
              {currentUser.role === "super_admin" && (
                <span className="hidden sm:inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold px-3.5 py-1 rounded-full bg-[var(--primary-light)] text-[var(--primary)] border border-[var(--primary)]/20 shadow-2xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  Multi-Tenant Global Platform
                </span>
              )}
            </div>
            {subtitle && (
              <p className="text-sm sm:text-base text-[var(--text-muted)] hidden sm:block mt-1 font-medium">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Center: Global Search Bar */}
        <div className="hidden xl:flex items-center flex-1 max-w-lg mx-8">
          <div
            onClick={() => setCommandOpen(true)}
            className="relative w-full cursor-pointer group select-none"
            title="Press Ctrl + K to open Command Palette"
          >
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[var(--primary)] group-hover:scale-110 transition-transform" />
            <div className="w-full pl-12 pr-24 py-3 text-base bg-[var(--card-subtle)] border border-[var(--border-color)] group-hover:border-[var(--primary)] rounded-xl text-[var(--text-muted)] group-hover:text-[var(--text-main)] transition-all font-medium flex items-center justify-between shadow-2xs">
              <span className="truncate">Search students, staff, actions...</span>
            </div>
            <kbd className="absolute right-4 top-1/2 -translate-y-1/2 px-2.5 py-1 text-xs font-bold text-[var(--text-muted)] bg-[var(--card-bg)] border border-[var(--border-color)] group-hover:border-[var(--primary)] group-hover:text-[var(--primary)] rounded-md shadow-2xs transition-colors">
              Ctrl K
            </kbd>
          </div>
        </div>

        {/* Right: Academic Term, Theme Toggle, Notifications, Profile */}
        <div className="flex items-center gap-4">
          {/* Term Indicator */}
          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--card-subtle)] border border-[var(--border-color)] text-sm text-[var(--text-main)]">
            <Calendar className="w-4 h-4 text-[var(--primary)]" />
            <span className="font-semibold text-[var(--text-muted)]">Session:</span>
            <span className="font-extrabold text-[var(--primary)]">Fall 2026</span>
          </div>

          {/* Theme Toggle Button (Light / Dark) */}
          <button
            onClick={toggleTheme}
            className="p-3 rounded-xl border border-[var(--border-color)] bg-[var(--card-subtle)] text-[var(--text-main)] hover:text-[var(--primary)] hover:border-[var(--primary)] hover:bg-[var(--primary-light)] transition-all cursor-pointer relative group shadow-2xs"
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle Dark/Light Mode"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-amber-400 rotate-0 transition-transform duration-300 group-hover:rotate-45" />
            ) : (
              <Moon className="w-5 h-5 text-[var(--primary)] rotate-0 transition-transform duration-300 group-hover:-rotate-12" />
            )}
          </button>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-3 rounded-xl border border-[var(--border-color)] bg-[var(--card-subtle)] text-[var(--text-main)] hover:text-[var(--primary)] hover:border-[var(--primary)] hover:bg-[var(--primary-light)] transition-colors cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-[var(--card-bg)] animate-pulse" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-3 w-96 bg-[var(--card-bg)] rounded-2xl border border-[var(--border-color)] shadow-2xl py-3 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-5 py-3 border-b border-[var(--border-color)] flex items-center justify-between">
                  <span className="font-extrabold text-base text-[var(--text-main)]">
                    Notifications (3 new)
                  </span>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="text-xs font-bold text-[var(--primary)] cursor-pointer hover:underline"
                  >
                    Mark all read
                  </button>
                </div>
                <div className="divide-y divide-[var(--border-color)] max-h-96 overflow-y-auto">
                  <div className="p-4 hover:bg-[var(--primary-light)] transition-colors cursor-pointer">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[var(--text-main)] text-sm">
                        Fee Challans Released
                      </span>
                      <span className="text-xs text-emerald-700 dark:text-emerald-300 font-extrabold bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                        New Batch
                      </span>
                    </div>
                    <p className="text-[var(--text-muted)] text-xs mt-1.5 leading-relaxed">
                      September 2026 fee vouchers distributed for Grade 9 & 10.
                    </p>
                    <span className="text-[11px] text-[var(--text-muted)] mt-1.5 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> 10 mins ago
                    </span>
                  </div>
                  <div className="p-4 hover:bg-[var(--primary-light)] transition-colors cursor-pointer">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[var(--text-main)] text-sm">
                        Faculty Schedule Updated
                      </span>
                      <span className="text-xs text-[var(--primary)] font-extrabold bg-[var(--primary-light)] px-2.5 py-0.5 rounded-full border border-[var(--border-color)]">
                        Timetable
                      </span>
                    </div>
                    <p className="text-[var(--text-muted)] text-xs mt-1.5 leading-relaxed">
                      Prof. Usman Ali assigned to Grade 10-A Period 1 (Mathematics).
                    </p>
                    <span className="text-[11px] text-[var(--text-muted)] mt-1.5 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> 45 mins ago
                    </span>
                  </div>
                  <div className="p-4 hover:bg-[var(--primary-light)] transition-colors cursor-pointer">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[var(--text-main)] text-sm">
                        Admissions Intake Target Met
                      </span>
                      <span className="text-xs text-amber-700 dark:text-amber-300 font-extrabold bg-amber-50 dark:bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
                        Milestone
                      </span>
                    </div>
                    <p className="text-[var(--text-muted)] text-xs mt-1.5 leading-relaxed">
                      Total campus enrollment crossed 1,420 students for 2026 session.
                    </p>
                    <span className="text-[11px] text-[var(--text-muted)] mt-1.5 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> 2 hours ago
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Pill */}
          <div className="flex items-center gap-3.5 pl-3.5 border-l border-[var(--border-color)]">
            <div className="relative">
              {currentUser.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[var(--border-color)] shadow-2xs"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[var(--gradient-from)] to-[var(--gradient-to)] text-white flex items-center justify-center font-black text-base shadow-2xs">
                  {currentUser.name.charAt(0)}
                </div>
              )}
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[var(--card-bg)]" />
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-base font-bold text-[var(--text-main)] leading-tight">
                {currentUser.name}
              </p>
              <p className="text-xs text-[var(--primary)] font-extrabold capitalize flex items-center gap-1 mt-0.5">
                {currentUser.role.replace("_", " ")}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Global Quick Command Palette */}
      <CommandPalette isOpen={commandOpen} onClose={() => setCommandOpen(false)} />

      {/* Mobile navigation drawer */}
      <MobileDrawer isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}


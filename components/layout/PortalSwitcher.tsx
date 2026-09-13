"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Shield,
  School,
  GraduationCap,
  UserCheck,
  Sparkles,
  Sun,
  Moon,
} from "lucide-react";
import { useSchoolStore } from "@/lib/store";
import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";
import { UserRole } from "@/types";

export function PortalSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, switchRole } = useSchoolStore();
  const { theme, setTheme } = useTheme();
  const [zoomLevel, setZoomLevel] = useState<"normal" | "large" | "xlarge">("large");

  useEffect(() => {
    // Apply zoom class to html root
    const root = document.documentElement;
    root.classList.remove("zoom-normal", "zoom-large", "zoom-xlarge");
    if (zoomLevel === "normal") root.classList.add("zoom-normal");
    else if (zoomLevel === "large") root.classList.add("zoom-large");
    else if (zoomLevel === "xlarge") root.classList.add("zoom-xlarge");
  }, [zoomLevel]);

  const portals: { role: UserRole; name: string; path: string; icon: React.ComponentType<{ className?: string }> }[] = [
    {
      role: "super_admin",
      name: "Super Admin (Owner)",
      path: "/owner/dashboard",
      icon: Shield,
    },
    {
      role: "school_admin",
      name: "School Admin",
      path: "/admin/dashboard",
      icon: School,
    },
    {
      role: "teacher",
      name: "Teacher (Usman Ali)",
      path: "/teacher/dashboard",
      icon: UserCheck,
    },
    {
      role: "student",
      name: "Student (Ayan Ahmed)",
      path: "/student/dashboard",
      icon: GraduationCap,
    },
  ];

  const handlePortalSwitch = (role: UserRole, targetPath: string) => {
    switchRole(role);
    router.push(targetPath);
  };

  return (
    <aside
      aria-label="Role Switcher"
      className="w-full bg-[#090D16] text-white py-3 px-4 lg:px-8 border-b border-[#1E293B] flex flex-wrap items-center justify-between gap-4 shadow-lg z-50 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#111827] via-[#090D16] to-[#040711]"
    >
      {/* Left: Role Navigation Buttons */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-2 mr-2 text-xs font-black uppercase tracking-wider text-[#A5B4FC]">
          <Sparkles className="w-4 h-4 text-[#818CF8]" />
          <span>Switch Portal:</span>
        </div>

        {portals.map((p) => {
          const Icon = p.icon;
          const isActive = currentUser.role === p.role;

          return (
            <button
              key={p.role}
              onClick={() => handlePortalSwitch(p.role, p.path)}
              className={cn(
                "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 cursor-pointer",
                isActive
                  ? "bg-[#4F46E5] text-white shadow-md shadow-[#4F46E5]/40 ring-2 ring-[#818CF8]/50"
                  : "bg-[#111827] text-slate-300 hover:text-white hover:bg-[#1E293B] border border-[#1E293B]"
              )}
            >
              <Icon className={cn("w-4 h-4", isActive ? "text-white" : "text-[#818CF8]")} />
              <span>{p.name}</span>
            </button>
          );
        })}
      </div>

      {/* Right Controls: Text Size Zoom & Theme Switcher */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Text Size Zoom Controls */}
        <div className="flex items-center gap-1 bg-[#111827] p-1 rounded-xl border border-[#1E293B]">
          <span className="text-[10px] uppercase font-bold text-slate-400 px-2">Size:</span>
          <button
            onClick={() => setZoomLevel("normal")}
            className={cn(
              "px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer",
              zoomLevel === "normal"
                ? "bg-[#4F46E5] text-white shadow-xs"
                : "text-slate-400 hover:text-white"
            )}
            title="Normal Scale (100%)"
          >
            100%
          </button>
          <button
            onClick={() => setZoomLevel("large")}
            className={cn(
              "px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer",
              zoomLevel === "large"
                ? "bg-[#4F46E5] text-white shadow-xs"
                : "text-slate-400 hover:text-white"
            )}
            title="Large Scale (115% - Recommended)"
          >
            115%
          </button>
          <button
            onClick={() => setZoomLevel("xlarge")}
            className={cn(
              "px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer",
              zoomLevel === "xlarge"
                ? "bg-[#4F46E5] text-white shadow-xs"
                : "text-slate-400 hover:text-white"
            )}
            title="Extra Large Scale (130%)"
          >
            130%
          </button>
        </div>

        {/* Theme Selector (Light / Dark) */}
        <div className="flex items-center gap-1 bg-[#111827] p-1 rounded-xl border border-[#1E293B]">
          <button
            onClick={() => setTheme("light")}
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer",
              theme === "light"
                ? "bg-[#4F46E5] text-white shadow-xs"
                : "text-slate-400 hover:text-white"
            )}
            title="Light Mode"
          >
            <Sun className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline">Light</span>
          </button>
          <button
            onClick={() => setTheme("dark")}
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer",
              theme === "dark"
                ? "bg-[#4F46E5] text-white shadow-xs"
                : "text-slate-400 hover:text-white"
            )}
            title="Dark Mode"
          >
            <Moon className="w-3.5 h-3.5 text-indigo-300" />
            <span className="hidden sm:inline">Dark</span>
          </button>
        </div>
      </div>
    </aside>
  );
}

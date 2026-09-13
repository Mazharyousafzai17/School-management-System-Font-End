"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Lock,
  Mail,
  Shield,
  School,
  UserCheck,
  GraduationCap,
  ArrowRight,
  Eye,
  EyeOff,
  CheckCircle2,
} from "lucide-react";
import { useSchoolStore } from "@/lib/store";
import { UserRole } from "@/types";

export default function LoginPage() {
  const router = useRouter();
  const { switchRole } = useSchoolStore();
  const [email, setEmail] = useState("principal@apexacademy.edu");
  const [password, setPassword] = useState("secret-password");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>("school_admin");

  const roles = [
    {
      role: "super_admin" as UserRole,
      title: "Super Admin",
      user: "Alexander Vance",
      icon: Shield,
      path: "/owner/dashboard",
    },
    {
      role: "school_admin" as UserRole,
      title: "School Admin",
      user: "Dr. Eleanor Wright",
      icon: School,
      path: "/admin/dashboard",
    },
    {
      role: "teacher" as UserRole,
      title: "Teacher",
      user: "Prof. Usman Ali",
      icon: UserCheck,
      path: "/teacher/dashboard",
    },
    {
      role: "student" as UserRole,
      title: "Student",
      user: "Ayan Ahmed (#1042)",
      icon: GraduationCap,
      path: "/student/dashboard",
    },
  ];

  const handleRoleQuickLogin = (role: UserRole) => {
    switchRole(role);
    const target = roles.find((r) => r.role === role)?.path || "/admin/dashboard";
    router.push(target);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleRoleQuickLogin(selectedRole);
  };

  return (
    <div className="relative w-full max-w-lg">
      {/* Ambient background glow orbs */}
      <div className="absolute -top-16 -left-16 w-64 h-64 bg-[var(--primary)]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-[var(--secondary)]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main Glass Card */}
      <div className="relative bg-[var(--card-bg)]/95 backdrop-blur-xl rounded-3xl border border-[var(--border-color)] shadow-2xl p-8 sm:p-10 animate-in zoom-in-95">
        {/* Brand Header */}
        <div className="text-center pb-6 border-b border-[var(--border-color)]">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[var(--gradient-from)] to-[var(--gradient-to)] flex items-center justify-center text-white mx-auto mb-3 shadow-lg shadow-[var(--shadow-color)]">
            <Sparkles className="w-7 h-7 text-white/80" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[var(--text-main)] tracking-tight font-heading">
            EduSphere LMS
          </h1>
          <p className="text-xs text-[var(--text-muted)] mt-1 font-medium">
            Multi-Tenant School Operating System • Role Gateway
          </p>
        </div>

        {/* Quick Role Demo Selector */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2.5">
            <label className="text-[11px] font-extrabold text-[var(--text-muted)] uppercase tracking-wider">
              Instant 1-Click Role Login
            </label>
            <span className="text-[10px] text-[var(--primary)] font-bold bg-[var(--primary-light)] px-2.5 py-0.5 rounded-full border border-[var(--primary)]/20">
              Demo Access
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {roles.map((r) => {
              const Icon = r.icon;
              return (
                <button
                  key={r.role}
                  type="button"
                  onClick={() => handleRoleQuickLogin(r.role)}
                  className="p-3 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] hover:border-[var(--primary)] hover:bg-[var(--primary-light)] text-left transition-all group cursor-pointer shadow-2xs hover:shadow-xs"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center group-hover:bg-[var(--primary)] group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-[var(--text-main)] group-hover:text-[var(--primary)] transition-colors">
                      {r.title}
                    </span>
                  </div>
                  <span className="text-[10px] text-[var(--text-muted)] block mt-1.5 truncate font-medium">
                    {r.user}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[var(--border-color)]" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-[var(--card-bg)] px-3 text-[var(--text-muted)] uppercase tracking-wider font-semibold text-[10px]">
              Or sign in with credentials
            </span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-[var(--text-main)] mb-1.5">Target Portal Role</label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as UserRole)}
              className="w-full px-3.5 py-2.5 text-sm bg-[var(--card-subtle)] border border-[var(--border-color)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)] font-semibold text-[var(--text-main)]"
            >
              <option value="super_admin">Super Admin (Platform Owner)</option>
              <option value="school_admin">School Admin (Apex International Academy)</option>
              <option value="teacher">Teacher (Prof. Usman Ali)</option>
              <option value="student">Student (Ayan Ahmed)</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-[var(--text-main)] mb-1.5">Institutional Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-[var(--card-subtle)] border border-[var(--border-color)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--text-main)]"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block font-bold text-[var(--text-main)]">Security Password</label>
              <span className="text-[var(--primary)] hover:underline cursor-pointer text-[11px] font-semibold">
                Forgot password?
              </span>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 text-sm bg-[var(--card-subtle)] border border-[var(--border-color)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--text-main)]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-main)]"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)] text-white font-bold text-sm hover:opacity-95 transition-all shadow-md shadow-[var(--shadow-color)] flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <span>Sign In to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-[var(--text-muted)]">
          <Link href="/" className="text-[var(--primary)] font-bold hover:underline inline-flex items-center gap-1">
            ← Return to Main Gateway
          </Link>
        </div>
      </div>
    </div>
  );
}


"use client";

import React, { useEffect } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { PortalSwitcher } from "@/components/layout/PortalSwitcher";
import { useSchoolStore } from "@/lib/store";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentUser, switchRole } = useSchoolStore();

  useEffect(() => {
    if (currentUser.role !== "student") {
      switchRole("student");
    }
  }, [currentUser.role, switchRole]);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--canvas-bg)] text-[var(--text-main)]">
      {/* Top persistent portal switcher */}
      <PortalSwitcher />

      <div className="flex-1 flex min-h-0">
        {/* Desktop Fixed Sidebar */}
        <Sidebar className="hidden lg:flex" />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          <Header
            title="Student Portal"
            subtitle="Ayan Ahmed • Roll #1042 • Grade 10 - Section A"
          />
          <main className="flex-1 p-6 lg:p-10">{children}</main>
        </div>
      </div>
    </div>
  );
}

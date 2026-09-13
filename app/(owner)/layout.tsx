"use client";

import React, { useEffect } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { PortalSwitcher } from "@/components/layout/PortalSwitcher";
import { useSchoolStore } from "@/lib/store";

export default function OwnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentUser, switchRole } = useSchoolStore();

  useEffect(() => {
    if (currentUser.role !== "super_admin") {
      switchRole("super_admin");
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
            title="Super Admin / Owner Console"
            subtitle="Global multi-tenant infrastructure & subscription overview"
          />
          <main className="flex-1 p-6 lg:p-10">{children}</main>
        </div>
      </div>
    </div>
  );
}

import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--canvas-bg)] text-[var(--text-main)] flex items-center justify-center p-4">
      {children}
    </div>
  );
}

import React from "react";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const getVariant = (st: string) => {
    switch (st.toLowerCase()) {
      case "active":
      case "paid":
      case "present":
      case "enrolled":
      case "graded":
      case "approved":
      case "published":
        return "bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800";

      case "pending":
      case "trial":
      case "leave":
      case "processing":
      case "submitted":
      case "upcoming":
      case "marks pending":
        return "bg-amber-50 text-amber-700 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800";

      case "suspended":
      case "overdue":
      case "absent":
      case "late":
      case "on leave":
        return "bg-rose-50 text-rose-700 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800";

      case "starter":
        return "bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700";

      case "pro":
        return "bg-indigo-50 text-indigo-700 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800";

      case "enterprise":
        return "bg-purple-50 text-purple-700 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800 font-extrabold";

      default:
        return "bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700";
    }
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border capitalize tracking-wide shadow-2xs transition-colors",
        getVariant(status),
        className
      )}
    >
      <span className="w-2 h-2 rounded-full mr-2 bg-current opacity-80" />
      {status}
    </span>
  );
}

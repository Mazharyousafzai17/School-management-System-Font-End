import React from "react";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: {
    value: string;
    isPositive: boolean;
  };
  subtitle?: string;
  className?: string;
}

export function MetricCard({
  title,
  value,
  icon: Icon,
  change,
  subtitle,
  className,
}: MetricCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-[var(--card-bg)] rounded-3xl border border-[var(--border-color)] p-7 lg:p-8 shadow-xs transition-all duration-300 hover:shadow-xl hover:border-[var(--primary)] hover:-translate-y-1 group",
        className
      )}
    >
      {/* Decorative top corner ambient glow */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-[var(--primary)]/15 to-transparent rounded-bl-full pointer-events-none transition-opacity group-hover:opacity-100 opacity-60" />

      <div className="flex items-center justify-between relative z-10">
        <span className="text-xs sm:text-sm font-black tracking-wider text-[var(--text-muted)] uppercase">
          {title}
        </span>
        <div className="w-14 h-14 rounded-2xl bg-[var(--primary-light)] border border-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-white group-hover:rotate-3 transition-all duration-300 shadow-xs">
          <Icon className="w-7 h-7" />
        </div>
      </div>

      <div className="mt-4 relative z-10">
        <div className="text-4xl lg:text-5xl font-black tracking-tight text-[var(--text-main)] font-heading">
          {value}
        </div>

        {(change || subtitle) && (
          <div className="mt-4 flex items-center gap-3 text-sm flex-wrap">
            {change && (
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 font-extrabold px-3 py-1 rounded-lg text-xs sm:text-sm shadow-2xs",
                  change.isPositive
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800"
                    : "bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800"
                )}
              >
                {change.isPositive ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                {change.value}
              </span>
            )}
            {subtitle && (
              <span className="text-[var(--text-muted)] truncate font-semibold text-xs sm:text-sm">
                {subtitle}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}


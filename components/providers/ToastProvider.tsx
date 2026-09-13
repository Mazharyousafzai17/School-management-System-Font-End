"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type ToastType = "success" | "error" | "info";

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
}

export interface ToastMethods {
  success: (title: string, description?: string) => void;
  error: (title: string, description?: string) => void;
  info: (title: string, description?: string) => void;
}

export interface ToastContextType extends ToastMethods {
  toast: ToastMethods;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (type: ToastType, title: string, description?: string) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
      setToasts((prev) => [...prev, { id, type, title, description }]);

      // Auto dismiss after 3800ms
      setTimeout(() => {
        removeToast(id);
      }, 3800);
    },
    [removeToast]
  );

  const toastMethods: ToastMethods = {
    success: (title: string, description?: string) => addToast("success", title, description),
    error: (title: string, description?: string) => addToast("error", title, description),
    info: (title: string, description?: string) => addToast("info", title, description),
  };

  const contextValue: ToastContextType = {
    ...toastMethods,
    toast: toastMethods,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}

      {/* Floating Toasts Container */}
      <div
        aria-live="polite"
        className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            role="alert"
            className={cn(
              "pointer-events-auto flex items-start gap-3 p-4 rounded-2xl border shadow-xl backdrop-blur-md transition-all duration-300 animate-in slide-in-from-bottom-5 fade-in",
              t.type === "success" &&
                "bg-[var(--card-bg)]/95 border-emerald-300 dark:border-emerald-800/80 text-[var(--text-main)]",
              t.type === "error" &&
                "bg-[var(--card-bg)]/95 border-rose-300 dark:border-rose-800/80 text-[var(--text-main)]",
              t.type === "info" &&
                "bg-[var(--card-bg)]/95 border-[var(--primary)]/40 text-[var(--text-main)]"
            )}
          >
            {/* Type Icon */}
            <div className="shrink-0 mt-0.5">
              {t.type === "success" && (
                <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              )}
              {t.type === "error" && (
                <div className="w-8 h-8 rounded-xl bg-rose-500/15 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5" />
                </div>
              )}
              {t.type === "info" && (
                <div className="w-8 h-8 rounded-xl bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center">
                  <Info className="w-5 h-5" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h4 className="font-extrabold text-sm text-[var(--text-main)] leading-snug">
                {t.title}
              </h4>
              {t.description && (
                <p className="text-xs text-[var(--text-muted)] mt-0.5 leading-relaxed">
                  {t.description}
                </p>
              )}
            </div>

            {/* Dismiss Button */}
            <button
              onClick={() => removeToast(t.id)}
              className="shrink-0 p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--card-subtle)] transition-colors cursor-pointer"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

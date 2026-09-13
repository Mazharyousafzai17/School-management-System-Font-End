"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { Sidebar } from "./Sidebar";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0F172A]/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-[var(--card-bg)] shadow-2xl z-50 flex flex-col animate-in slide-in-from-left duration-200">
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[var(--card-subtle)] border border-[var(--border-color)] text-[var(--text-main)] hover:bg-[var(--primary-light)] transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="h-full overflow-y-auto" onClick={onClose}>
          <Sidebar className="w-full border-r-0 shadow-none h-full" />
        </div>
      </div>
    </div>
  );
}

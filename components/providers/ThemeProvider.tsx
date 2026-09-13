"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type ThemeMode = "light" | "dark";

export interface PaletteInfo {
  id: string;
  name: string;
  label: string;
  primary: string;
  secondary: string;
  dark: string;
  light: string;
}

export const PALETTES: PaletteInfo[] = [
  {
    id: "royal-indigo",
    name: "Royal Indigo",
    label: "Royal Indigo & Electric Violet (#4F46E5)",
    primary: "#4F46E5",
    secondary: "#8B5CF6",
    dark: "#0F172A",
    light: "#F8FAFC",
  },
];

interface ThemeContextType {
  theme: ThemeMode; // 'light' | 'dark'
  mode: ThemeMode;
  palette: string;
  setMode: (mode: ThemeMode) => void;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  setPalette: (palette: string) => void;
  palettes: PaletteInfo[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>("light");

  useEffect(() => {
    // 1. Read Theme Mode from localStorage or system preference
    const savedMode = localStorage.getItem("edusphere-theme") as ThemeMode | null;
    let initialMode: ThemeMode = "light";
    if (savedMode === "dark" || savedMode === "light") {
      initialMode = savedMode;
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      initialMode = "dark";
    }
    setModeState(initialMode);
    applyDOM(initialMode);
  }, []);

  const applyDOM = (m: ThemeMode) => {
    const root = document.documentElement;
    if (m === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    // Clean up any old palette attribute
    root.removeAttribute("data-palette");
  };

  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode);
    localStorage.setItem("edusphere-theme", newMode);
    applyDOM(newMode);
  };

  const toggleTheme = () => {
    const nextMode: ThemeMode = mode === "dark" ? "light" : "dark";
    setMode(nextMode);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: mode,
        mode,
        palette: "royal-indigo",
        setMode,
        setTheme: setMode,
        toggleTheme,
        setPalette: () => {},
        palettes: PALETTES,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Mode = "corporate" | "creative";

interface ThemeContextType {
  mode: Mode;
  toggleMode: () => void;
  isCreative: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>("creative");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("portfolio-mode") as Mode;
    if (saved) setMode(saved);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("portfolio-mode", mode);
      document.documentElement.setAttribute("data-mode", mode);
    }
  }, [mode, mounted]);

  const toggleMode = () => {
    setMode((prev) => (prev === "corporate" ? "creative" : "corporate"));
  };

  if (!mounted) {
    return (
      <ThemeContext.Provider value={{ mode: "creative", toggleMode, isCreative: true }}>
        <div data-mode="creative">{children}</div>
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ mode, toggleMode, isCreative: mode === "creative" }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}

"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

interface ModeToggleProps {
  compact?: boolean;
}

export default function ModeToggle({ compact = false }: ModeToggleProps) {
  const { mode, toggleMode, isCreative } = useTheme();

  if (compact) {
    return (
      <motion.button
        onClick={toggleMode}
        className="relative w-12 h-6 rounded-full bg-bg-card border border-border-default overflow-hidden"
        whileTap={{ scale: 0.9 }}
        aria-label={`Switch to ${isCreative ? "corporate" : "creative"} mode`}
      >
        <motion.div
          className="absolute top-0.5 w-5 h-5 rounded-full bg-accent-primary"
          animate={{ left: isCreative ? "calc(100% - 22px)" : "2px" }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
        <span className="absolute left-1 top-0.5 text-xs">
          {isCreative ? "" : ""}
        </span>
      </motion.button>
    );
  }

  return (
    <motion.button
      onClick={toggleMode}
      className="group relative flex items-center gap-2 px-4 py-2 rounded-full bg-toggle-bg text-toggle-text text-sm font-medium overflow-hidden"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${isCreative ? "corporate" : "creative"} mode`}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-accent-primary to-accent-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />
      <motion.span
        className="relative z-10 flex items-center gap-2"
        key={mode}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {isCreative ? (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
            Go Corporate
          </>
        ) : (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            Get Creative
          </>
        )}
      </motion.span>
    </motion.button>
  );
}
